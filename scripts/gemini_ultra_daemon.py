#!/usr/bin/env python3
"""
Daemon & sonde temps réel pour l'application Gemini Ultra • Quotas & Limites.
- Interroge en direct l'API officielle Google CloudCode / Antigravity (`retrieveUserQuotaSummary`, `retrieveUserQuota`, `loadCodeAssist`)
- Analyse l'activité locale (5h, Semaine 7j, Mois 30j) depuis les logs de sessions Antigravity / T3 Code
- Expose une API HTTP temps réel sur http://127.0.0.1:8787/api/quota (avec CORS + Private Network Access)
- Ouvre optionnellement un tunnel Cloudflare (`cloudflared`) pour l'accès mobile 4G/5G en direct
- Met à jour `gemini-ultra/quota-live.json` et synchronise avec GitHub Pages
"""
from __future__ import annotations

import argparse
import glob
import http.server
import json
import math
import os
import re
import subprocess
import threading
import time
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
APP_DIR = os.path.join(ROOT_DIR, "gemini-ultra")
QUOTA_JSON_PATH = os.path.join(APP_DIR, "quota-live.json")

TOKEN_PATHS = (
    glob.glob(os.path.expanduser("~/.t3/userdata/providers/antigravity/*/antigravity-acp/acp_token.json"))
    + [os.path.expanduser("~/.gemini/antigravity-acp/acp_token.json")]
)

USER_AGENT = (
    "antigravity/acp/0.1.0 (aidev_client; os_type=darwin; arch=arm64; "
    "auth_method=oauth-personal; host_path=zed/0.0.0; proxy_client=antigravity/sdk)"
)
ENDPOINT = "https://daily-cloudcode-pa.googleapis.com"
PORT = 8787

MODEL_LABELS = {
    "gemini-4-argon-high": ("Gemini 4 Argon (High)", "gemini", "Modèle principal Agent & Raisonnement"),
    "gemini-4-argon-medium": ("Gemini 4 Argon (Medium)", "gemini", "Raisonnement équilibré"),
    "gemini-4-argon-low": ("Gemini 4 Argon (Low)", "gemini", "Réponses rapides"),
    "gemini-3.8-flash-high": ("Gemini 3.8 Flash (High)", "gemini", "Flash haute précision"),
    "gemini-3.8-flash-medium": ("Gemini 3.8 Flash (Medium)", "gemini", "Flash standard"),
    "gemini-2.5-pro": ("Gemini 2.5 Pro", "gemini", "Contexte long 1M tokens"),
    "gemini-3-flash": ("Gemini 3 Flash", "gemini", "Génération ultra-rapide"),
    "gemini-3.1-flash-image": ("Gemini 3.1 Flash Image", "gemini", "Génération & édition d'images"),
    "claude-opus-5-5-high": ("Claude Opus 5.5 (High)", "3p", "Anthropic Vertex • Partagé 3P"),
    "claude-sonnet-5-5-high": ("Claude Sonnet 5.5 (High)", "3p", "Anthropic Vertex • Partagé 3P"),
    "gpt-oss-120b-medium": ("GPT-OSS 120B (Medium)", "3p", "OpenAI OSS • Partagé 3P"),
}

DAY_NAMES_FR = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]

_state_lock = threading.Lock()
_current_tunnel_url: str | None = None
_last_payload: dict | None = None
_last_fetch_ts: float = 0.0


def load_oauth_token() -> dict:
    for p in TOKEN_PATHS:
        if os.path.exists(p):
            with open(p, "r", encoding="utf-8") as f:
                return json.load(f)
    raise FileNotFoundError("Aucun fichier acp_token.json trouvé.")


def get_access_token(token_data: dict) -> str:
    form = urllib.parse.urlencode(
        {
            "client_id": token_data["client_id"],
            "client_secret": token_data["client_secret"],
            "refresh_token": token_data["refresh_token"],
            "grant_type": "refresh_token",
        }
    ).encode("utf-8")
    req = urllib.request.Request("https://oauth2.googleapis.com/token", data=form)
    with urllib.request.urlopen(req, timeout=10) as resp:
        return json.loads(resp.read().decode("utf-8"))["access_token"]


def call_ccpa(access_token: str, operation: str, body: dict) -> dict:
    req = urllib.request.Request(
        f"{ENDPOINT}/v1internal:{operation}",
        data=json.dumps(body).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {access_token}",
            "User-Agent": USER_AGENT,
            "Content-Type": "application/json",
        },
    )
    with urllib.request.urlopen(req, timeout=12) as resp:
        return json.loads(resp.read().decode("utf-8"))


def parse_iso(ts: str | None) -> datetime | None:
    if not ts:
        return None
    try:
        return datetime.fromisoformat(ts.replace("Z", "+00:00"))
    except Exception:
        return None


USD_TO_EUR = 0.92

# Tarifs officiels API Pay-As-You-Go ($ par 1M tokens : input, output, cache_read, cache_write)
API_PRICING_PER_M = {
    "gemini-pro": (2.00, 12.00, 0.20, 2.00),
    "gemini-flash": (0.30, 2.50, 0.03, 0.30),
    "claude-opus": (5.00, 25.00, 0.50, 6.25),
    "claude-sonnet": (3.00, 15.00, 0.30, 3.75),
    "claude-haiku": (1.00, 5.00, 0.10, 1.25),
}


def classify_pricing_tier(model_slug: str) -> tuple[str, str]:
    s = (model_slug or "").lower().strip().rstrip(".")
    if "opus" in s or "fable" in s:
        return "claude-opus", "Claude Opus 5.5"
    if "sonnet" in s:
        return "claude-sonnet", "Claude Sonnet 5.5"
    if "haiku" in s:
        return "claude-haiku", "Claude Haiku 5.5"
    if "flash" in s:
        return "gemini-flash", "Gemini Flash"
    return "gemini-pro", "Gemini 4 Argon / Pro"


def compute_step_cost(
    pricing_key: str,
    in_tok: int,
    out_tok: int,
    cache_read_tok: int,
    cache_write_tok: int = 0,
) -> tuple[float, float]:
    p_in, p_out, p_cread, p_cwrite = API_PRICING_PER_M.get(pricing_key, API_PRICING_PER_M["gemini-pro"])
    api_usd = (
        (in_tok * p_in)
        + (cache_write_tok * p_cwrite)
        + (out_tok * p_out)
        + (cache_read_tok * p_cread)
    ) / 1_000_000.0
    uncached_usd = (
        ((in_tok + cache_write_tok + cache_read_tok) * p_in)
        + (out_tok * p_out)
    ) / 1_000_000.0
    return api_usd, uncached_usd


def _new_token_bucket() -> dict:
    return {
        "prompts": 0,
        "steps": 0,
        "inputTokens": 0,
        "outputTokens": 0,
        "cachedTokens": 0,
        "activeTokens": 0,
        "totalTokensWithCache": 0,
        "apiCostUsd": 0.0,
        "uncachedValueUsd": 0.0,
    }


def _add_to_bucket(
    b: dict,
    is_prompt: bool,
    has_step: bool,
    in_tok: int,
    out_tok: int,
    cache_tok: int,
    api_usd: float,
    uncached_usd: float,
) -> None:
    if is_prompt:
        b["prompts"] += 1
    if has_step:
        b["steps"] += 1
    active = in_tok + out_tok
    b["inputTokens"] += in_tok
    b["outputTokens"] += out_tok
    b["cachedTokens"] += cache_tok
    b["activeTokens"] += active
    b["totalTokensWithCache"] += active + cache_tok
    b["apiCostUsd"] += api_usd
    b["uncachedValueUsd"] += uncached_usd


def _finalize_bucket(b: dict) -> dict:
    api_usd = round(b["apiCostUsd"], 2)
    unc_usd = round(b["uncachedValueUsd"], 2)
    return {
        **b,
        "apiCostUsd": api_usd,
        "apiCostEur": round(api_usd * USD_TO_EUR, 2),
        "uncachedValueUsd": unc_usd,
        "uncachedValueEur": round(unc_usd * USD_TO_EUR, 2),
    }


def compute_local_telemetry(
    now: datetime,
    five_h_start: datetime,
    weekly_start: datetime,
    weekly_used_pct: float,
    five_h_used_pct: float,
    tier_id: str = "g1-ultra-tier",
) -> dict:
    transcripts = (
        glob.glob(os.path.expanduser("~/.gemini/antigravity/brain/*/.system_generated/logs/transcript.jsonl"))
        + glob.glob(
            os.path.expanduser(
                "~/.t3/userdata/providers/antigravity/*/antigravity-acp/brain/*/.system_generated/logs/transcript.jsonl"
            )
        )
    )
    claude_transcripts = (
        glob.glob(os.path.expanduser("~/.claude/projects/*/*.jsonl"))
        + glob.glob(os.path.expanduser("~/.t3/userdata/providers/claude*/**/*.jsonl"), recursive=True)
    )

    t_30d = now - timedelta(days=30)
    t_7d = now - timedelta(days=7)
    t_5h = now - timedelta(hours=5)
    today_str = now.astimezone().strftime("%Y-%m-%d")

    b_5h_win = _new_token_bucket()
    b_5h_roll = _new_token_bucket()
    b_today = _new_token_bucket()
    b_week_win = _new_token_bucket()
    b_7d_roll = _new_token_bucket()
    b_30d = _new_token_bucket()
    b_all = _new_token_bucket()

    by_model_30d: dict[str, dict] = {}

    sessions_30d = set()
    sessions_7d = set()
    sessions_5h = set()
    sessions_today = set()

    daily_map: dict[str, dict] = {}
    hourly_map: dict[str, dict] = {}

    for i in range(6):
        h_dt = (now - timedelta(hours=5 - i)).astimezone()
        h_key = h_dt.strftime("%Y-%m-%d %H:00")
        hourly_map[h_key] = {
            "label": h_dt.strftime("%Hh"),
            "steps": 0,
            "prompts": 0,
            "tokens": 0,
            "cachedTokens": 0,
            "totalTokensWithCache": 0,
            "apiCostUsd": 0.0,
        }

    for i in range(30):
        d_dt = (now - timedelta(days=29 - i)).astimezone()
        d_key = d_dt.strftime("%Y-%m-%d")
        daily_map[d_key] = {
            "date": d_key,
            "label": f"{DAY_NAMES_FR[d_dt.weekday()]} {d_dt.strftime('%d/%m')}",
            "shortLabel": DAY_NAMES_FR[d_dt.weekday()],
            "steps": 0,
            "prompts": 0,
            "tokens": 0,
            "cachedTokens": 0,
            "totalTokensWithCache": 0,
            "apiCostUsd": 0.0,
        }

    def record_event(
        conv_id: str,
        dt: datetime,
        is_prompt: bool,
        has_step: bool,
        in_tok: int,
        out_tok: int,
        cache_read_tok: int,
        cache_write_tok: int,
        model_slug: str,
    ) -> None:
        p_key, p_label = classify_pricing_tier(model_slug)
        api_usd, unc_usd = compute_step_cost(p_key, in_tok, out_tok, cache_read_tok, cache_write_tok)
        eff_in = in_tok + cache_write_tok
        step_tokens = eff_in + out_tok

        local_dt = dt.astimezone()
        d_key = local_dt.strftime("%Y-%m-%d")
        h_key = local_dt.strftime("%Y-%m-%d %H:00")

        _add_to_bucket(b_all, is_prompt, has_step, eff_in, out_tok, cache_read_tok, api_usd, unc_usd)

        if d_key == today_str:
            _add_to_bucket(b_today, is_prompt, has_step, eff_in, out_tok, cache_read_tok, api_usd, unc_usd)
            sessions_today.add(conv_id)

        if dt >= t_30d:
            _add_to_bucket(b_30d, is_prompt, has_step, eff_in, out_tok, cache_read_tok, api_usd, unc_usd)
            sessions_30d.add(conv_id)
            if step_tokens > 0 or cache_read_tok > 0:
                m_entry = by_model_30d.setdefault(
                    p_key,
                    {
                        "id": p_key,
                        "label": p_label,
                        **_new_token_bucket(),
                    },
                )
                _add_to_bucket(m_entry, is_prompt, has_step, eff_in, out_tok, cache_read_tok, api_usd, unc_usd)
            if d_key in daily_map:
                if has_step:
                    daily_map[d_key]["steps"] += 1
                daily_map[d_key]["tokens"] += step_tokens
                daily_map[d_key]["cachedTokens"] += cache_read_tok
                daily_map[d_key]["totalTokensWithCache"] += step_tokens + cache_read_tok
                daily_map[d_key]["apiCostUsd"] = round(daily_map[d_key]["apiCostUsd"] + api_usd, 2)
                if is_prompt:
                    daily_map[d_key]["prompts"] += 1

        if dt >= t_7d:
            _add_to_bucket(b_7d_roll, is_prompt, has_step, eff_in, out_tok, cache_read_tok, api_usd, unc_usd)
            sessions_7d.add(conv_id)

        if dt >= weekly_start:
            _add_to_bucket(b_week_win, is_prompt, has_step, eff_in, out_tok, cache_read_tok, api_usd, unc_usd)

        if dt >= t_5h:
            _add_to_bucket(b_5h_roll, is_prompt, has_step, eff_in, out_tok, cache_read_tok, api_usd, unc_usd)
            sessions_5h.add(conv_id)
            if h_key in hourly_map:
                if has_step:
                    hourly_map[h_key]["steps"] += 1
                hourly_map[h_key]["tokens"] += step_tokens
                hourly_map[h_key]["cachedTokens"] += cache_read_tok
                hourly_map[h_key]["totalTokensWithCache"] += step_tokens + cache_read_tok
                hourly_map[h_key]["apiCostUsd"] = round(hourly_map[h_key]["apiCostUsd"] + api_usd, 2)
                if is_prompt:
                    hourly_map[h_key]["prompts"] += 1

        if dt >= five_h_start:
            _add_to_bucket(b_5h_win, is_prompt, has_step, eff_in, out_tok, cache_read_tok, api_usd, unc_usd)

    seen_conv_ids = set()
    for path in transcripts:
        parts = path.split(os.sep)
        conv_id = parts[-4] if len(parts) >= 5 else path
        if conv_id in seen_conv_ids:
            continue
        seen_conv_ids.add(conv_id)

        cur_model = "gemini-4-argon"
        try:
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                for line in f:
                    if not line.strip():
                        continue
                    try:
                        obj = json.loads(line)
                    except Exception:
                        continue
                    ca = obj.get("created_at")
                    dt = parse_iso(ca)
                    if not dt:
                        continue
                    is_prompt = obj.get("type") == "USER_INPUT"
                    if is_prompt:
                        m = re.search(
                            r"running in T3 Code through the [^\n]*?, as ([a-zA-Z0-9._-]+)",
                            obj.get("content") or "",
                        )
                        if m:
                            cur_model = m.group(1).rstrip(".")
                    in_tok = int(obj.get("input_tokens") or 0)
                    out_tok = int(obj.get("output_tokens") or 0)
                    cache_tok = int(obj.get("cache_read_tokens") or 0)

                    record_event(
                        conv_id=conv_id,
                        dt=dt,
                        is_prompt=is_prompt,
                        has_step=True,
                        in_tok=in_tok,
                        out_tok=out_tok,
                        cache_read_tok=cache_tok,
                        cache_write_tok=0,
                        model_slug=cur_model,
                    )
        except Exception:
            pass

    # Include Claude Code direct sessions (deduplicated by message id)
    seen_claude_files = set()
    for cpath in claude_transcripts:
        real_p = os.path.realpath(cpath)
        if real_p in seen_claude_files:
            continue
        seen_claude_files.add(real_p)
        conv_id = f"claude-{os.path.basename(cpath)}"
        msg_by_id: dict[str, tuple[datetime, str, dict]] = {}
        try:
            with open(cpath, "r", encoding="utf-8", errors="ignore") as f:
                for line in f:
                    if not line.strip():
                        continue
                    try:
                        obj = json.loads(line)
                    except Exception:
                        continue
                    dt = parse_iso(obj.get("timestamp"))
                    if not dt:
                        continue
                    if obj.get("type") == "user" and not obj.get("isMeta"):
                        msg_c = (obj.get("message") or {}).get("content")
                        if isinstance(msg_c, str) or (
                            isinstance(msg_c, list)
                            and any(isinstance(x, dict) and x.get("type") == "text" for x in msg_c)
                        ):
                            record_event(
                                conv_id=conv_id,
                                dt=dt,
                                is_prompt=True,
                                has_step=False,
                                in_tok=0,
                                out_tok=0,
                                cache_read_tok=0,
                                cache_write_tok=0,
                                model_slug="claude-opus-5-5",
                            )
                    msg = obj.get("message") or {}
                    if isinstance(msg, dict) and msg.get("usage") and msg.get("id"):
                        msg_by_id[msg["id"]] = (dt, msg.get("model") or "claude-opus-5-5", msg["usage"])
            for _, (dt, model_slug, u) in msg_by_id.items():
                in_t = int(u.get("input_tokens") or 0)
                cw_t = int(u.get("cache_creation_input_tokens") or 0)
                cr_t = int(u.get("cache_read_input_tokens") or 0)
                out_t = int(u.get("output_tokens") or 0)
                record_event(
                    conv_id=conv_id,
                    dt=dt,
                    is_prompt=False,
                    has_step=True,
                    in_tok=in_t,
                    out_tok=out_t,
                    cache_read_tok=cr_t,
                    cache_write_tok=cw_t,
                    model_slug=model_slug,
                )
        except Exception:
            pass

    # Calibrated capacities for Google AI Ultra (g1-ultra-tier has ~2.5x the quota of g1-ultra-lite-tier)
    is_full_ultra = tier_id == "g1-ultra-tier"
    default_weekly_cap = 25000 if is_full_ultra else 10000
    default_5h_cap = 7500 if is_full_ultra else 3500

    steps_week_window = b_week_win["steps"]
    steps_5h_window = b_5h_win["steps"]

    if weekly_used_pct > 5 and steps_week_window > 100:
        est_weekly_capacity = int(round(steps_week_window / (weekly_used_pct / 100.0)))
    else:
        est_weekly_capacity = default_weekly_cap

    if five_h_used_pct > 3 and steps_5h_window > 50:
        est_5h_capacity = int(round(steps_5h_window / (five_h_used_pct / 100.0)))
    else:
        est_5h_capacity = default_5h_cap

    # Monthly capacity on Google AI Ultra = 4.29 weekly cycles (30 days / 7 days)
    weekly_cycles_per_month = 30.0 / 7.0
    est_monthly_capacity = int(round(est_weekly_capacity * weekly_cycles_per_month))
    monthly_used_pct = min(100.0, round((weekly_used_pct / weekly_cycles_per_month), 2))
    monthly_remaining_pct = round(max(0.0, 100.0 - monthly_used_pct), 2)
    weekly_cycles_used = round(weekly_used_pct / 100.0, 2)

    daily_list = list(daily_map.values())
    active_days_30d = sum(1 for d in daily_list if d["steps"] > 0)

    f_5h_win = _finalize_bucket(b_5h_win)
    f_5h_roll = _finalize_bucket(b_5h_roll)
    f_today = _finalize_bucket(b_today)
    f_week_win = _finalize_bucket(b_week_win)
    f_7d_roll = _finalize_bucket(b_7d_roll)
    f_30d = _finalize_bucket(b_30d)
    f_all = _finalize_bucket(b_all)

    models_breakdown = sorted(
        [_finalize_bucket(v) for v in by_model_30d.values()],
        key=lambda x: x["apiCostUsd"],
        reverse=True,
    )

    return {
        "fiveHour": {
            "promptsWindow": f_5h_win["prompts"],
            "stepsWindow": f_5h_win["steps"],
            "tokensWindow": f_5h_win["activeTokens"],
            "inputTokensWindow": f_5h_win["inputTokens"],
            "outputTokensWindow": f_5h_win["outputTokens"],
            "cachedTokensWindow": f_5h_win["cachedTokens"],
            "totalTokensWithCacheWindow": f_5h_win["totalTokensWithCache"],
            "apiCostUsdWindow": f_5h_win["apiCostUsd"],
            "apiCostEurWindow": f_5h_win["apiCostEur"],
            "uncachedValueUsdWindow": f_5h_win["uncachedValueUsd"],
            "promptsRolling": f_5h_roll["prompts"],
            "stepsRolling": f_5h_roll["steps"],
            "tokensRolling": f_5h_roll["activeTokens"],
            "cachedTokensRolling": f_5h_roll["cachedTokens"],
            "totalTokensWithCacheRolling": f_5h_roll["totalTokensWithCache"],
            "apiCostUsdRolling": f_5h_roll["apiCostUsd"],
            "apiCostEurRolling": f_5h_roll["apiCostEur"],
            "uncachedValueUsdRolling": f_5h_roll["uncachedValueUsd"],
            "sessionsCount": len(sessions_5h),
            "estimatedCapacitySteps": est_5h_capacity,
            "hourlyBreakdown": list(hourly_map.values()),
        },
        "weekly": {
            "promptsWindow": f_week_win["prompts"],
            "stepsWindow": f_week_win["steps"],
            "tokensWindow": f_week_win["activeTokens"],
            "inputTokensWindow": f_week_win["inputTokens"],
            "outputTokensWindow": f_week_win["outputTokens"],
            "cachedTokensWindow": f_week_win["cachedTokens"],
            "totalTokensWithCacheWindow": f_week_win["totalTokensWithCache"],
            "apiCostUsdWindow": f_week_win["apiCostUsd"],
            "apiCostEurWindow": f_week_win["apiCostEur"],
            "uncachedValueUsdWindow": f_week_win["uncachedValueUsd"],
            "promptsRolling": f_7d_roll["prompts"],
            "stepsRolling": f_7d_roll["steps"],
            "tokensRolling": f_7d_roll["activeTokens"],
            "inputTokensRolling": f_7d_roll["inputTokens"],
            "outputTokensRolling": f_7d_roll["outputTokens"],
            "cachedTokensRolling": f_7d_roll["cachedTokens"],
            "totalTokensWithCacheRolling": f_7d_roll["totalTokensWithCache"],
            "apiCostUsdRolling": f_7d_roll["apiCostUsd"],
            "apiCostEurRolling": f_7d_roll["apiCostEur"],
            "uncachedValueUsdRolling": f_7d_roll["uncachedValueUsd"],
            "sessionsCount": len(sessions_7d),
            "estimatedCapacitySteps": est_weekly_capacity,
            "dailyBreakdown": daily_list[-7:],
        },
        "monthly": {
            "usedPercent": monthly_used_pct,
            "remainingPercent": monthly_remaining_pct,
            "promptsCount": f_week_win["prompts"],
            "stepsCount": f_week_win["steps"],
            "tokensCount": f_week_win["activeTokens"],
            "promptsRolling30d": f_30d["prompts"],
            "stepsRolling30d": f_30d["steps"],
            "tokensRolling30d": f_30d["activeTokens"],
            "inputTokensCount": f_30d["inputTokens"],
            "outputTokensCount": f_30d["outputTokens"],
            "cachedTokensCount": f_30d["cachedTokens"],
            "totalTokensWithCache30d": f_30d["totalTokensWithCache"],
            "apiCostUsd30d": f_30d["apiCostUsd"],
            "apiCostEur30d": f_30d["apiCostEur"],
            "uncachedValueUsd30d": f_30d["uncachedValueUsd"],
            "uncachedValueEur30d": f_30d["uncachedValueEur"],
            "sessionsCount": len(sessions_30d),
            "activeDays": active_days_30d,
            "estimatedCapacitySteps": est_monthly_capacity,
            "weeklyCyclesUsed": weekly_cycles_used,
            "weeklyCyclesTotal": round(weekly_cycles_per_month, 2),
            "dailyBreakdown": daily_list[-14:],
        },
        "tokenSummary": {
            "currencyRateEurPerUsd": USD_TO_EUR,
            "pricingNote": "Estimation Pay-As-You-Go API officielle (Gemini 4 Argon/Pro: $2/M in, $12/M out, $0.20/M cache • Claude Opus 5.5: $5/M in, $25/M out, $0.50/M cache)",
            "fiveHour": {**f_5h_win, "sessionsCount": len(sessions_5h)},
            "today": {**f_today, "sessionsCount": len(sessions_today)},
            "sevenDays": {**f_7d_roll, "sessionsCount": len(sessions_7d)},
            "thirtyDays": {**f_30d, "sessionsCount": len(sessions_30d), "activeDays": active_days_30d},
            "allTime": f_all,
            "byModel": models_breakdown,
        },
    }



def fetch_claude_pro_quota(now: datetime) -> dict:
    info = {
        "active": False,
        "planName": "Claude Pro",
        "email": "thomaslefevre18@live.fr",
        "orgId": None,
        "subscriptionType": "pro",
        "billingType": "apple / claude.ai",
        "upgradedAt": None,
        "fiveHour": {
            "id": "claude-5h",
            "durationMins": 300,
            "usedPercent": 0.0,
            "remainingPercent": 100.0,
            "resetsAt": None,
            "remainingSeconds": 18000,
            "status": "idle",
        },
        "weekly": {
            "id": "claude-weekly",
            "durationMins": 10080,
            "usedPercent": 0.0,
            "remainingPercent": 100.0,
            "resetsAt": None,
            "remainingSeconds": 604800,
        },
        "models": [
            {
                "id": "claude-opus-5-5",
                "label": "Claude Opus 5.5",
                "family": "claude-pro",
                "description": "Claude Pro Direct • Raisonnement Low → Ultrathink + Fast Mode",
                "remainingPercent": 100.0,
                "usedPercent": 0.0,
                "resetsAt": None,
            },
            {
                "id": "claude-sonnet-5-5",
                "label": "Claude Sonnet 5.5",
                "family": "claude-pro",
                "description": "Claude Pro Direct • Raisonnement rapide & efficace",
                "remainingPercent": 100.0,
                "usedPercent": 0.0,
                "resetsAt": None,
            },
            {
                "id": "claude-fable-5-1",
                "label": "Claude Fable 5.1",
                "family": "claude-pro",
                "description": "Claude Pro Direct • Défis complexes & Ultracode",
                "remainingPercent": 100.0,
                "usedPercent": 0.0,
                "resetsAt": None,
            },
            {
                "id": "claude-haiku-5-5",
                "label": "Claude Haiku 5.5",
                "family": "claude-pro",
                "description": "Claude Pro Direct • Réponses instantanées",
                "remainingPercent": 100.0,
                "usedPercent": 0.0,
                "resetsAt": None,
            },
        ],
    }

    # 1. Fallback from T3 claudeAgent.json cache
    cache_path = os.path.expanduser("~/.t3/caches/claudeAgent.json")
    if os.path.exists(cache_path):
        try:
            with open(cache_path, "r", encoding="utf-8") as f:
                c_data = json.load(f)
            auth = c_data.get("auth") or {}
            if auth.get("status") == "authenticated":
                info["active"] = True
                if auth.get("email"):
                    info["email"] = auth["email"]
                if auth.get("workspaceId"):
                    info["orgId"] = auth["workspaceId"]
                if auth.get("type"):
                    info["planName"] = auth["type"]
            ul = c_data.get("usageLimits") or {}
            for w in ul.get("windows", []):
                wid = w.get("id")
                used = round(float(w.get("usedPercent") or 0.0), 2)
                rem = round(max(0.0, 100.0 - used), 2)
                r_at = w.get("resetsAt")
                if wid == "five_hour":
                    info["fiveHour"]["usedPercent"] = used
                    info["fiveHour"]["remainingPercent"] = rem
                    info["fiveHour"]["resetsAt"] = r_at
                    info["fiveHour"]["status"] = "active" if r_at else "idle"
                elif wid == "seven_day":
                    info["weekly"]["usedPercent"] = used
                    info["weekly"]["remainingPercent"] = rem
                    info["weekly"]["resetsAt"] = r_at
        except Exception:
            pass

    # 2. Direct live OAuth query to Anthropic API via macOS Keychain
    try:
        raw_cred = subprocess.check_output(
            ["security", "find-generic-password", "-s", "Claude Code-credentials", "-w"],
            text=True,
            stderr=subprocess.DEVNULL,
            timeout=3,
        ).strip()
        cred_json = json.loads(raw_cred).get("claudeAiOauth", {})
        token = cred_json.get("accessToken")
        if token:
            info["active"] = True
            sub_type = cred_json.get("subscriptionType") or "pro"
            info["subscriptionType"] = sub_type
            info["planName"] = "Claude Max" if "max" in sub_type.lower() else "Claude Pro"

            headers = {
                "Authorization": f"Bearer {token}",
                "anthropic-beta": "oauth-2025-04-20",
                "User-Agent": "claude-code/2.1.316",
                "Accept": "application/json",
            }
            req_u = urllib.request.Request("https://api.anthropic.com/api/oauth/usage", headers=headers)
            with urllib.request.urlopen(req_u, timeout=6) as resp_u:
                u_data = json.loads(resp_u.read().decode("utf-8"))

            fh = u_data.get("five_hour") or {}
            fh_used = round(float(fh.get("utilization") or 0.0), 2)
            fh_rem = round(max(0.0, 100.0 - fh_used), 2)
            fh_resets = fh.get("resets_at")
            fh_dt = parse_iso(fh_resets)
            info["fiveHour"] = {
                "id": "claude-5h",
                "durationMins": 300,
                "usedPercent": fh_used,
                "remainingPercent": fh_rem,
                "resetsAt": fh_dt.strftime("%Y-%m-%dT%H:%M:%SZ") if fh_dt else None,
                "remainingSeconds": int(max(0.0, (fh_dt - now).total_seconds())) if fh_dt else 18000,
                "status": "active" if fh_dt else "idle",
            }

            sd = u_data.get("seven_day") or {}
            sd_used = round(float(sd.get("utilization") or 0.0), 2)
            sd_rem = round(max(0.0, 100.0 - sd_used), 2)
            sd_resets = sd.get("resets_at")
            sd_dt = parse_iso(sd_resets)
            info["weekly"] = {
                "id": "claude-weekly",
                "durationMins": 10080,
                "usedPercent": sd_used,
                "remainingPercent": sd_rem,
                "resetsAt": sd_dt.strftime("%Y-%m-%dT%H:%M:%SZ") if sd_dt else None,
                "remainingSeconds": int(max(0.0, (sd_dt - now).total_seconds())) if sd_dt else 604800,
            }

            try:
                req_p = urllib.request.Request("https://api.anthropic.com/api/oauth/profile", headers=headers)
                with urllib.request.urlopen(req_p, timeout=5) as resp_p:
                    p_data = json.loads(resp_p.read().decode("utf-8"))
                acc = p_data.get("account") or {}
                org = p_data.get("organization") or {}
                if acc.get("email"):
                    info["email"] = acc["email"]
                if org.get("uuid"):
                    info["orgId"] = org["uuid"]
                if org.get("subscription_created_at"):
                    info["upgradedAt"] = org["subscription_created_at"]
            except Exception:
                pass
    except Exception:
        pass

    eff_rem = min(info["fiveHour"]["remainingPercent"], info["weekly"]["remainingPercent"])
    eff_used = round(100.0 - eff_rem, 2)
    eff_reset = info["fiveHour"]["resetsAt"] or info["weekly"]["resetsAt"]
    for m in info["models"]:
        m["remainingPercent"] = eff_rem
        m["usedPercent"] = eff_used
        m["resetsAt"] = eff_reset

    return info


def build_live_quota_payload() -> dict:
    now = datetime.now(timezone.utc)
    token_data = load_oauth_token()
    access_token = get_access_token(token_data)
    project_id = token_data.get("project_id") or "aicode-consumers"

    summary = call_ccpa(access_token, "retrieveUserQuotaSummary", {"project": project_id})
    raw_quota = call_ccpa(access_token, "retrieveUserQuota", {"project": project_id})

    tier_name = "Google AI Ultra"
    tier_id = "g1-ultra-tier"
    tier_desc = "You are subscribed to the best Google AI plan."
    try:
        load_res = call_ccpa(
            access_token,
            "loadCodeAssist",
            {"cloudaicompanionProject": project_id, "metadata": {"ideType": "ANTIGRAVITY"}},
        )
        paid = load_res.get("paidTier") or load_res.get("currentTier") or {}
        if paid.get("name"):
            tier_name = paid["name"]
        if paid.get("id"):
            tier_id = paid["id"]
        if paid.get("upgradeSubscriptionText"):
            tier_desc = paid["upgradeSubscriptionText"]
    except Exception:
        pass

    buckets_by_id: dict[str, dict] = {}
    for group in summary.get("groups", []):
        for b in group.get("buckets", []):
            bid = b.get("bucketId")
            if bid:
                buckets_by_id[bid] = {**b, "groupName": group.get("displayName", "")}

    def extract_window(bid: str, duration_mins: int) -> dict:
        b = buckets_by_id.get(bid, {})
        rem_frac = float(b.get("remainingFraction", 1.0))
        rem_frac = max(0.0, min(1.0, rem_frac))
        rem_pct = round(rem_frac * 100.0, 2)
        used_pct = round((1.0 - rem_frac) * 100.0, 2)
        resets_at_str = b.get("resetTime")
        resets_dt = parse_iso(resets_at_str) or (now + timedelta(minutes=duration_mins))
        started_dt = resets_dt - timedelta(minutes=duration_mins)
        elapsed_sec = max(0.0, (now - started_dt).total_seconds())
        total_sec = duration_mins * 60.0
        remaining_sec = max(0.0, (resets_dt - now).total_seconds())
        elapsed_pct = round(min(100.0, (elapsed_sec / total_sec) * 100.0), 2)
        pace_delta = round(used_pct - elapsed_pct, 2)

        elapsed_hours = max(0.1, elapsed_sec / 3600.0)
        burn_rate_per_hour = round(used_pct / elapsed_hours, 2)

        return {
            "id": bid,
            "remainingFraction": rem_frac,
            "remainingPercent": rem_pct,
            "usedPercent": used_pct,
            "resetsAt": resets_dt.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "startedAt": started_dt.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "durationMins": duration_mins,
            "remainingSeconds": int(remaining_sec),
            "elapsedPercent": elapsed_pct,
            "paceDeltaPercent": pace_delta,
            "burnRatePerHour": burn_rate_per_hour,
            "description": b.get("description", ""),
        }

    gem_5h = extract_window("gemini-5h", 300)
    gem_weekly = extract_window("gemini-weekly", 10080)
    tp_5h = extract_window("3p-5h", 300)
    tp_weekly = extract_window("3p-weekly", 10080)

    weekly_start_dt = parse_iso(gem_weekly["startedAt"]) or (now - timedelta(days=7))
    telemetry = compute_local_telemetry(
        now=now,
        five_h_start=parse_iso(gem_5h["startedAt"]) or (now - timedelta(hours=5)),
        weekly_start=weekly_start_dt,
        weekly_used_pct=gem_weekly["usedPercent"],
        five_h_used_pct=gem_5h["usedPercent"],
        tier_id=tier_id,
    )

    days_left_week = max(0.1, gem_weekly["remainingSeconds"] / 86400.0)
    gem_weekly["dailyBudgetRemainingPercent"] = round(gem_weekly["remainingPercent"] / days_left_week, 2)
    gem_weekly["burnRatePerDay"] = round(gem_weekly["burnRatePerHour"] * 24.0, 1)

    # Monthly billing cycle anchored to the active subscription start (30-day cycle)
    monthly_end_dt = weekly_start_dt + timedelta(days=30)
    month_elapsed_pct = round(
        min(100.0, max(0.0, ((now - weekly_start_dt).total_seconds() / (30.0 * 86400.0)) * 100.0)),
        2,
    )

    gem_5h.update(telemetry["fiveHour"])
    gem_weekly.update(telemetry["weekly"])

    monthly_window = {
        "id": "gemini-monthly",
        "durationMins": 43200,
        "resetsAt": monthly_end_dt.strftime("%Y-%m-%dT%H:%M:%SZ"),
        "startedAt": weekly_start_dt.strftime("%Y-%m-%dT%H:%M:%SZ"),
        "remainingSeconds": int(max(0.0, (monthly_end_dt - now).total_seconds())),
        "elapsedPercent": month_elapsed_pct,
        **telemetry["monthly"],
    }

    models_list = []
    for m_bucket in raw_quota.get("buckets", []):
        mid = m_bucket.get("modelId", "")
        if mid not in MODEL_LABELS:
            continue
        label, family, desc = MODEL_LABELS[mid]
        rem_f = max(0.0, min(1.0, float(m_bucket.get("remainingFraction", 1.0))))
        models_list.append(
            {
                "id": mid,
                "label": label,
                "family": family,
                "description": desc,
                "remainingPercent": round(rem_f * 100.0, 2),
                "usedPercent": round((1.0 - rem_f) * 100.0, 2),
                "resetsAt": m_bucket.get("resetTime"),
            }
        )

    claude_pro = fetch_claude_pro_quota(now)
    models_list = list(claude_pro.get("models", [])) + models_list

    with _state_lock:
        tunnel_url = _current_tunnel_url
    if not tunnel_url and os.path.exists(QUOTA_JSON_PATH):
        try:
            with open(QUOTA_JSON_PATH, "r", encoding="utf-8") as f:
                prev_q = json.load(f)
                if prev_q.get("tunnelUrl"):
                    tunnel_url = prev_q["tunnelUrl"]
        except Exception:
            pass

    payload = {
        "checkedAt": now.strftime("%Y-%m-%dT%H:%M:%SZ"),
        "liveEndpoint": f"http://127.0.0.1:{PORT}/api/quota",
        "tunnelUrl": tunnel_url,
        "subscription": {
            "planName": tier_name,
            "tierId": tier_id,
            "tierDescription": tier_desc,
            "upgradedAt": gem_weekly["startedAt"],
            "harness": "Google AI Ultra • Antigravity",
            "projectId": project_id,
            "status": "active",
        },
        "claudeSubscription": {
            "active": claude_pro["active"],
            "planName": claude_pro["planName"],
            "email": claude_pro["email"],
            "orgId": claude_pro["orgId"],
            "subscriptionType": claude_pro["subscriptionType"],
            "upgradedAt": claude_pro["upgradedAt"],
            "harness": "Anthropic Claude Code • Compte Apple",
        },
        "tokenSummary": telemetry["tokenSummary"],
        "windows": {
            "fiveHour": gem_5h,
            "weekly": gem_weekly,
            "monthly": monthly_window,
            "thirdParty5h": tp_5h,
            "thirdPartyWeekly": tp_weekly,
            "claudeFiveHour": claude_pro["fiveHour"],
            "claudeWeekly": claude_pro["weekly"],
        },
        "models": models_list,
    }
    return payload


def sync_t3_antigravity_cache(payload: dict) -> None:
    cache_path = os.path.expanduser("~/.t3/caches/antigravity.json")
    if not os.path.exists(cache_path):
        return
    try:
        with open(cache_path, "r", encoding="utf-8") as f:
            cache_data = json.load(f)

        w = payload.get("windows", {})
        gem_5h = w.get("fiveHour", {})
        gem_wk = w.get("weekly", {})
        tp_5h = w.get("thirdParty5h", {})
        tp_wk = w.get("thirdPartyWeekly", {})

        new_windows = []
        if gem_5h:
            new_windows.append(
                {
                    "id": "gemini-5h",
                    "label": "Gemini · 5-hour",
                    "kind": "session",
                    "usedPercent": gem_5h.get("usedPercent", 0),
                    "resetsAt": gem_5h.get("resetsAt"),
                    "windowDurationMins": 300,
                }
            )
        if gem_wk:
            new_windows.append(
                {
                    "id": "gemini-weekly",
                    "label": "Gemini · Weekly",
                    "kind": "weekly",
                    "usedPercent": gem_wk.get("usedPercent", 0),
                    "resetsAt": gem_wk.get("resetsAt"),
                    "windowDurationMins": 10080,
                }
            )
        if tp_5h:
            new_windows.append(
                {
                    "id": "3p-5h",
                    "label": "Claude & GPT (shared) · 5-hour",
                    "kind": "session",
                    "usedPercent": tp_5h.get("usedPercent", 0),
                    "resetsAt": tp_5h.get("resetsAt"),
                    "windowDurationMins": 300,
                }
            )
        if tp_wk:
            new_windows.append(
                {
                    "id": "3p-weekly",
                    "label": "Claude & GPT (shared) · Weekly",
                    "kind": "weekly",
                    "usedPercent": tp_wk.get("usedPercent", 0),
                    "resetsAt": tp_wk.get("resetsAt"),
                    "windowDurationMins": 10080,
                }
            )

        if "usageLimits" not in cache_data or not isinstance(cache_data["usageLimits"], dict):
            cache_data["usageLimits"] = {}
        cache_data["usageLimits"]["checkedAt"] = payload.get("checkedAt")
        cache_data["usageLimits"]["windows"] = new_windows

        existing_models = [
            m for m in cache_data.get("models", [])
            if not m.get("isCustom") and m.get("slug") not in (
                "claude-opus-5-5-high",
                "claude-sonnet-5-5-high",
                "gemini-3.8-flash-high",
            )
        ]
        for m in existing_models:
            if m.get("slug") in ("claude-opus-5-5", "claude-sonnet-5-5"):
                for desc in m.get("capabilities", {}).get("optionDescriptors", []):
                    if desc.get("id") == "thinking_level" and "currentValue" not in desc:
                        desc["currentValue"] = "high"
            elif m.get("slug") == "gpt-oss-120b-medium":
                for desc in m.get("capabilities", {}).get("optionDescriptors", []):
                    if desc.get("id") == "thinking_level" and "currentValue" not in desc:
                        desc["currentValue"] = "medium"
        cache_data["models"] = existing_models

        tmp_cache = cache_path + ".tmp"
        with open(tmp_cache, "w", encoding="utf-8") as f:
            json.dump(cache_data, f, indent=2, ensure_ascii=False)
            f.write("\n")
        os.replace(tmp_cache, cache_path)
    except Exception:
        pass


def save_quota_payload(payload: dict) -> None:
    os.makedirs(APP_DIR, exist_ok=True)
    tmp_path = QUOTA_JSON_PATH + ".tmp"
    with open(tmp_path, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
        f.write("\n")
    os.replace(tmp_path, QUOTA_JSON_PATH)
    sync_t3_antigravity_cache(payload)


def refresh_and_save(force: bool = False) -> dict:
    global _last_payload, _last_fetch_ts
    now_ts = time.time()
    if not force and _last_payload is not None and (now_ts - _last_fetch_ts) < 8.0:
        with _state_lock:
            if _current_tunnel_url:
                _last_payload["tunnelUrl"] = _current_tunnel_url
            return _last_payload

    payload = build_live_quota_payload()
    save_quota_payload(payload)
    with _state_lock:
        _last_payload = payload
        _last_fetch_ts = now_ts
    return payload


def push_snapshot_to_github() -> bool:
    try:
        subprocess.run(
            ["git", "add", "gemini-ultra/quota-live.json"],
            cwd=ROOT_DIR,
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        diff = subprocess.run(
            ["git", "diff", "--cached", "--quiet", "--", "gemini-ultra/quota-live.json"],
            cwd=ROOT_DIR,
        )
        if diff.returncode == 0:
            return False
        subprocess.run(
            ["git", "commit", "-m", "chore(quota): auto-sync live Gemini Ultra limits snapshot"],
            cwd=ROOT_DIR,
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        subprocess.run(
            ["git", "push", "origin", "main"],
            cwd=ROOT_DIR,
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        return True
    except Exception:
        return False


def start_cloudflared_tunnel() -> None:
    global _current_tunnel_url
    cf_candidates = glob.glob(os.path.expanduser("~/.t3/tools/cloudflared/*/*/cloudflared"))
    if not cf_candidates:
        return
    cf_bin = cf_candidates[0]
    try:
        proc = subprocess.Popen(
            [cf_bin, "tunnel", "--url", f"http://127.0.0.1:{PORT}", "--no-autoupdate"],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
        )
        for line in proc.stdout:
            m = re.search(r"https://[a-zA-Z0-9-]+\.trycloudflare\.com", line)
            if m:
                url = m.group(0)
                with _state_lock:
                    _current_tunnel_url = url
                try:
                    refresh_and_save(force=True)
                    push_snapshot_to_github()
                except Exception:
                    pass
    except Exception:
        pass


class QuotaHTTPRequestHandler(http.server.BaseHTTPRequestHandler):
    def _send_cors(self) -> None:
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Accept, Cache-Control")
        self.send_header("Access-Control-Allow-Private-Network", "true")
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")

    def do_OPTIONS(self) -> None:
        self.send_response(204)
        self._send_cors()
        self.end_headers()

    def do_GET(self) -> None:
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path in ("/api/quota", "/quota-live.json", "/"):
            qs = urllib.parse.parse_qs(parsed.query)
            force = "refresh" in qs or "force" in qs
            try:
                data = refresh_and_save(force=force)
                raw = json.dumps(data, ensure_ascii=False).encode("utf-8")
                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Content-Length", str(len(raw)))
                self._send_cors()
                self.end_headers()
                self.wfile.write(raw)
            except Exception as e:
                err = json.dumps({"error": str(e)}).encode("utf-8")
                self.send_response(500)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self._send_cors()
                self.end_headers()
                self.wfile.write(err)
        else:
            self.send_response(404)
            self._send_cors()
            self.end_headers()

    def log_message(self, format: str, *args) -> None:
        pass


def background_sync_loop() -> None:
    last_git_push = 0.0
    last_pushed_5h = -1.0
    last_pushed_week = -1.0

    while True:
        time.sleep(60)
        try:
            payload = refresh_and_save(force=True)
            u5 = payload["windows"]["fiveHour"]["usedPercent"]
            uw = payload["windows"]["weekly"]["usedPercent"]
            c5 = payload["windows"].get("claudeFiveHour", {}).get("usedPercent", 0.0)
            cw = payload["windows"].get("claudeWeekly", {}).get("usedPercent", 0.0)
            now_ts = time.time()
            changed = abs((u5 + c5) - last_pushed_5h) >= 0.2 or abs((uw + cw) - last_pushed_week) >= 0.1
            if changed and (now_ts - last_git_push) >= 180:
                if push_snapshot_to_github():
                    last_git_push = now_ts
                    last_pushed_5h = u5 + c5
                    last_pushed_week = uw + cw
        except Exception:
            pass


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--once", action="store_true", help="Exécute une seule sonde et met à jour quota-live.json")
    parser.add_argument("--daemon", action="store_true", help="Lance le serveur temps réel 127.0.0.1:8787 + tunnel + sync")
    args = parser.parse_args()

    payload = refresh_and_save(force=True)
    if args.once or not args.daemon:
        w5 = payload["windows"]["fiveHour"]
        ww = payload["windows"]["weekly"]
        wm = payload["windows"]["monthly"]
        print(
            f"[Gemini Ultra Live] 5h: {w5['remainingPercent']}% restant ({w5['usedPercent']}% utilisé) | "
            f"Semaine: {ww['remainingPercent']}% restant ({ww['usedPercent']}% utilisé) | "
            f"Mois: {wm['remainingPercent']}% restant ({wm['usedPercent']}% utilisé)"
        )
        return

    threading.Thread(target=start_cloudflared_tunnel, daemon=True).start()
    threading.Thread(target=background_sync_loop, daemon=True).start()

    server = http.server.ThreadingHTTPServer(("127.0.0.1", PORT), QuotaHTTPRequestHandler)
    print(f"Gemini Ultra Real-Time API listening on http://127.0.0.1:{PORT}/api/quota")
    server.serve_forever()


if __name__ == "__main__":
    main()
