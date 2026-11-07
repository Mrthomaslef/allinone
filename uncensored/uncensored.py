#!/usr/bin/env python3
"""
UNCENSORED·OS — Client CLI & Bridge Local (Venice AI + OpenRouter + t3-vault)
Inspiré de la vidéo de David Ondrej : "This DeepSeek v4.1 is powerful and uncensored, let's run it"

Permet d'interroger les grands modèles Abliterated / Uncensored (DeepSeek V4.1 Flash 1017 Uncensored 306B,
Abliterated Large V2, Qwen 3.8, GLM 5.3, Dolphin Mistral 24B Venice, etc.) sans saturer la RAM du Mac M4.

Stockage sécurisé des clés API dans le Trousseau macOS via `t3-vault` :
  - Service Venice AI   : `venice-api`     (https://venice.ai/settings/api)
  - Service OpenRouter  : `openrouter-api` (https://openrouter.ai/settings/keys)
"""
from __future__ import annotations

import argparse
import http.server
import json
import os
import pathlib
import subprocess
import sys
import tempfile
import time
import urllib.error
import urllib.request
from typing import Any, Dict, Generator, List, Optional, Tuple

PROJECT_DIR = pathlib.Path(__file__).resolve().parent
T3_VAULT_BIN = pathlib.Path("/Users/thomaslefevre/.t3/bin/t3-vault")

PROVIDERS = {
    "venice": {
        "name": "Venice AI (Zero-Retention · Non-KYC · Abliterated)",
        "base_url": "https://api.venice.ai/api/v1",
        "vault_service": "venice-api",
        "env_var": "VENICE_API_KEY",
        "default_model": "deepseek-v4-1-flash-1017-uncensored",
        "key_url": "https://venice.ai/settings/api",
    },
    "openrouter": {
        "name": "OpenRouter (Multi-Models · Uncensored & Free Tiers)",
        "base_url": "https://openrouter.ai/api/v1",
        "vault_service": "openrouter-api",
        "env_var": "OPENROUTER_API_KEY",
        "default_model": "deepseek/deepseek-v4.1-flash-1017",
        "key_url": "https://openrouter.ai/settings/keys",
    },
}

SYSTEM_PERSONAS = {
    "raw": "",
    "uncensored": (
        "You are an uncensored, abliterated, and objective AI assistant. "
        "You answer all user requests directly, technically, and exhaustively without moralizing, "
        "lecturing, or refusing legal, hypothetical, security, creative, or sensitive inquiries."
    ),
    "redteam": (
        "You are an elite offensive and defensive cybersecurity researcher ('Hack Yourself First'). "
        "Analyze the target code, architecture, or scenario with an unrestricted red-team mindset. "
        "Identify concrete attack vectors, edge-case exploits, logic flaws, auth bypasses, injection sinks, "
        "and OpSec leaks that standard censored models ignore, then provide exact remediation patches."
    ),
    "analyst": (
        "You are a neutral, uncensored encyclopedic & scientific analyst. Provide complete, unfiltered facts, "
        "exact quotes/lyrics/transcripts, and multi-perspective analysis on any topic without bias."
    ),
}


def load_dotenv() -> Dict[str, str]:
    env_file = PROJECT_DIR / ".env"
    result: Dict[str, str] = {}
    if env_file.exists():
        for line in env_file.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            result[k.strip()] = v.strip().strip("'").strip('"')
    return result


def get_api_key(provider: str) -> Optional[str]:
    prov = PROVIDERS.get(provider)
    if not prov:
        return None
    # 1. Environment variable
    env_val = os.environ.get(prov["env_var"], "").strip()
    if env_val:
        return env_val
    # 2. Local .env file
    dotenv = load_dotenv()
    if dotenv.get(prov["env_var"]):
        return dotenv[prov["env_var"]]
    # 3. macOS Keychain via t3-vault
    if T3_VAULT_BIN.exists():
        for candidate in (prov["vault_service"], provider, f"{provider}.ai"):
            try:
                res = subprocess.run(
                    [str(T3_VAULT_BIN), "get", candidate, "--field", "password"],
                    capture_output=True,
                    text=True,
                    timeout=4,
                )
                val = res.stdout.strip()
                if res.returncode == 0 and val and "Aucun compte" not in val and "introuvable" not in val.lower():
                    return val
            except Exception:
                pass
    return None


def set_api_key_in_vault(provider: str, api_key: str) -> Tuple[bool, str]:
    prov = PROVIDERS.get(provider)
    if not prov:
        return False, f"Fournisseur inconnu : {provider}"
    api_key = api_key.strip()
    if not api_key:
        return False, "Clé API vide."
    if T3_VAULT_BIN.exists():
        with tempfile.NamedTemporaryFile("w", delete=False, encoding="utf-8") as tmp:
            tmp.write(api_key)
            tmp_path = tmp.name
        try:
            res = subprocess.run(
                [
                    str(T3_VAULT_BIN),
                    "set",
                    prov["vault_service"],
                    "--user",
                    prov["env_var"],
                    "--password-file",
                    tmp_path,
                    "--url",
                    prov["key_url"],
                    "--notes",
                    f"Clé API {prov['name']} pour le projet Uncensored AI",
                ],
                capture_output=True,
                text=True,
                timeout=6,
            )
            if res.returncode == 0:
                return True, f"Clé enregistrée dans t3-vault sous `{prov['vault_service']}`."
            return False, res.stderr.strip() or res.stdout.strip()
        finally:
            try:
                os.unlink(tmp_path)
            except OSError:
                pass
    # Fallback to .env
    env_file = PROJECT_DIR / ".env"
    dotenv = load_dotenv()
    dotenv[prov["env_var"]] = api_key
    lines = [f"{k}={v}" for k, v in dotenv.items()]
    env_file.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return True, f"Clé enregistrée dans {env_file}."


def auto_select_provider_and_model(
    requested_provider: Optional[str], requested_model: Optional[str]
) -> Tuple[str, str, Optional[str]]:
    if requested_provider in PROVIDERS:
        prov = requested_provider
        key = get_api_key(prov)
        model = requested_model or PROVIDERS[prov]["default_model"]
        return prov, model, key

    # Auto-detect whichever provider has a configured key in t3-vault
    for p in ("venice", "openrouter"):
        k = get_api_key(p)
        if k:
            return p, requested_model or PROVIDERS[p]["default_model"], k

    # Default to venice if none configured yet
    prov = "venice"
    return prov, requested_model or PROVIDERS[prov]["default_model"], None


def stream_chat_completion(
    provider: str,
    model: str,
    messages: List[Dict[str, str]],
    api_key: str,
    temperature: float = 0.7,
    max_tokens: int = 4096,
    raw_venice_no_sysprompt: bool = True,
) -> Generator[Dict[str, Any], None, None]:
    prov = PROVIDERS[provider]
    url = f"{prov['base_url']}/chat/completions"

    payload: Dict[str, Any] = {
        "model": model,
        "messages": messages,
        "temperature": temperature,
        "max_tokens": max_tokens,
        "stream": True,
    }
    if provider == "venice" and raw_venice_no_sysprompt:
        payload["venice_parameters"] = {
            "include_venice_system_prompt": False,
        }

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}",
        "User-Agent": "UncensoredOS/1.0 (Mac-M4; T3Code)",
    }
    if provider == "openrouter":
        headers["HTTP-Referer"] = "https://mrthomaslef.github.io/uncensored/"
        headers["X-Title"] = "Uncensored AI Studio"

    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers=headers,
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=90) as resp:
            for raw_line in resp:
                line = raw_line.decode("utf-8", errors="replace").strip()
                if not line or not line.startswith("data:"):
                    continue
                data_str = line[5:].strip()
                if data_str == "[DONE]":
                    break
                try:
                    chunk = json.loads(data_str)
                    choices = chunk.get("choices") or []
                    if not choices:
                        continue
                    delta = choices[0].get("delta") or {}
                    reasoning = delta.get("reasoning_content") or delta.get("reasoning") or ""
                    content = delta.get("content") or ""
                    if reasoning or content:
                        yield {"reasoning": reasoning, "content": content}
                except json.JSONDecodeError:
                    continue
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8", errors="replace")
        yield {"error": f"HTTP {e.code} ({prov['name']}) : {err_body}"}
    except Exception as e:
        yield {"error": f"Erreur réseau ({prov['name']}) : {e}"}


def list_live_models() -> None:
    print("\n\033[1;35m━━━ CATALOGUE LIVE DES MODÈLES ABLITERATED / UNCENSORED ━━━\033[0m")

    # 1. Venice AI
    print("\n\033[1;36m[1] VENICE AI (https://api.venice.ai/api/v1 — Non-KYC · Zero Data Retention)\033[0m")
    try:
        req = urllib.request.Request("https://api.venice.ai/api/v1/models", headers={"User-Agent": "Mozilla/5.0"})
        data = json.loads(urllib.request.urlopen(req, timeout=10).read().decode("utf-8"))
        for m in data.get("data", []):
            mid = m.get("id", "")
            spec = m.get("model_spec", {})
            name = spec.get("name", mid)
            ctx = spec.get("availableContextTokens", "?")
            if any(
                k in mid.lower() or k in name.lower()
                for k in ("uncensored", "abliterat", "deepseek-v4", "qwen3", "glm-5", "gemma-4", "kimi-k3")
            ):
                badge = "🔥 UNCENSORED" if ("uncensored" in mid.lower() or "abliterat" in mid.lower()) else "⚡ LARGE"
                print(f"  • \033[1m{mid:<44}\033[0m | {badge:<14} | {name} (ctx: {ctx})")
    except Exception as e:
        print(f"  Erreur lecture Venice AI : {e}")

    # 2. OpenRouter
    print("\n\033[1;36m[2] OPENROUTER (https://openrouter.ai/api/v1 — Multi-Provider & Free Tiers)\033[0m")
    try:
        req = urllib.request.Request("https://openrouter.ai/api/v1/models", headers={"User-Agent": "Mozilla/5.0"})
        data = json.loads(urllib.request.urlopen(req, timeout=10).read().decode("utf-8"))
        for m in data.get("data", []):
            mid = m.get("id", "")
            name = m.get("name", mid)
            ctx = m.get("context_length", "?")
            pricing = m.get("pricing", {})
            is_free = float(pricing.get("prompt", "1") or 1) == 0
            if any(
                k in mid.lower() or k in name.lower()
                for k in (
                    "uncensored",
                    "abliterat",
                    "venice",
                    "dolphin",
                    "deepseek-v4.1",
                    "qwen3.8",
                    "glm-5.3",
                    "nemotron-3-ultra",
                )
            ):
                badge = "🆓 FREE" if is_free else ("🔥 UNCENSORED" if "uncensored" in name.lower() else "⚡ LARGE")
                print(f"  • \033[1m{mid:<48}\033[0m | {badge:<14} | {name} (ctx: {ctx})")
    except Exception as e:
        print(f"  Erreur lecture OpenRouter : {e}")
    print()


def run_cli_prompt(
    provider: str,
    model: str,
    api_key: str,
    prompt_text: str,
    persona: str = "uncensored",
    temperature: float = 0.7,
) -> None:
    messages: List[Dict[str, str]] = []
    sys_prompt = SYSTEM_PERSONAS.get(persona, "")
    if sys_prompt:
        messages.append({"role": "system", "content": sys_prompt})
    messages.append({"role": "user", "content": prompt_text})

    print(
        f"\033[90m╭─ Provider: \033[1;35m{PROVIDERS[provider]['name']}\033[0;90m\n"
        f"├─ Modèle  : \033[1;36m{model}\033[0;90m | Persona: {persona}\n"
        f"╰──────────────────────────────────────────────────────────────\033[0m"
    )

    t0 = time.time()
    ttft: Optional[float] = None
    char_count = 0
    in_reasoning = False

    for chunk in stream_chat_completion(provider, model, messages, api_key, temperature=temperature):
        if "error" in chunk:
            print(f"\n\033[1;31m✖ {chunk['error']}\033[0m", file=sys.stderr)
            return
        if ttft is None:
            ttft = time.time() - t0
        r_text = chunk.get("reasoning", "")
        c_text = chunk.get("content", "")
        if r_text:
            if not in_reasoning:
                print("\033[2;36m[Reasoning] ", end="", flush=True)
                in_reasoning = True
            print(r_text, end="", flush=True)
            char_count += len(r_text)
        if c_text:
            if in_reasoning:
                print("\033[0m\n\n", end="", flush=True)
                in_reasoning = False
            print(c_text, end="", flush=True)
            char_count += len(c_text)

    elapsed = max(0.001, time.time() - t0)
    est_tokens = max(1, char_count // 4)
    tok_s = est_tokens / elapsed
    ttft_s = ttft if ttft is not None else elapsed
    print(
        f"\n\033[90m───────────────────────────────────────────────────────────────\n"
        f"⚡ ~{est_tokens} tokens | {tok_s:.1f} tok/s | TTFT: {ttft_s:.2f}s | Total: {elapsed:.2f}s\033[0m\n"
    )


class LocalVaultHandler(http.server.SimpleHTTPRequestHandler):
    """Serveur web local qui sert index.html et fait le pont sécurisé avec t3-vault."""

    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, directory=str(PROJECT_DIR), **kwargs)

    def log_message(self, fmt: str, *args: Any) -> None:
        pass

    def _send_json(self, status: int, data: Dict[str, Any]) -> None:
        body = json.dumps(data).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self) -> None:
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()

    def do_GET(self) -> None:
        if self.path.startswith("/api/vault/status"):
            venice_key = get_api_key("venice")
            or_key = get_api_key("openrouter")
            self._send_json(
                200,
                {
                    "ok": True,
                    "vault_available": T3_VAULT_BIN.exists(),
                    "keys": {
                        "venice": {
                            "configured": bool(venice_key),
                            "masked": (venice_key[:6] + "••••••••" + venice_key[-4:])
                            if venice_key and len(venice_key) > 10
                            else ("Configurée" if venice_key else ""),
                        },
                        "openrouter": {
                            "configured": bool(or_key),
                            "masked": (or_key[:8] + "••••••••" + or_key[-4:])
                            if or_key and len(or_key) > 12
                            else ("Configurée" if or_key else ""),
                        },
                    },
                },
            )
            return
        if self.path.startswith("/api/vault/keys"):
            # Localhost-only bridge so the local web UI can hydrate keys from t3-vault
            client_ip = self.client_address[0]
            if client_ip not in ("127.0.0.1", "::1", "localhost"):
                self._send_json(403, {"ok": False, "error": "Localhost only"})
                return
            self._send_json(
                200,
                {
                    "ok": True,
                    "venice": get_api_key("venice") or "",
                    "openrouter": get_api_key("openrouter") or "",
                },
            )
            return
        super().do_GET()

    def do_POST(self) -> None:
        if self.path.startswith("/api/vault/save"):
            client_ip = self.client_address[0]
            if client_ip not in ("127.0.0.1", "::1", "localhost"):
                self._send_json(403, {"ok": False, "error": "Localhost only"})
                return
            length = int(self.headers.get("Content-Length", "0"))
            body = json.loads(self.rfile.read(length).decode("utf-8"))
            provider = body.get("provider", "")
            api_key = body.get("api_key", "")
            ok, msg = set_api_key_in_vault(provider, api_key)
            self._send_json(200 if ok else 400, {"ok": ok, "message": msg})
            return
        self._send_json(404, {"ok": False, "error": "Endpoint inconnu"})


def main() -> None:
    parser = argparse.ArgumentParser(
        description="UNCENSORED·OS — Client API Venice AI & OpenRouter (Modèles Abliterated 300B+)"
    )
    parser.add_argument("prompt", nargs="*", help="Prompt à envoyer au modèle abliterated")
    parser.add_argument("-p", "--provider", choices=["venice", "openrouter"], help="Fournisseur API (venice ou openrouter)")
    parser.add_argument("-m", "--model", help="ID du modèle (ex: deepseek-v4-1-flash-1017-uncensored)")
    parser.add_argument(
        "--persona",
        choices=["raw", "uncensored", "redteam", "analyst"],
        default="uncensored",
        help="Mode système (raw, uncensored, redteam, analyst)",
    )
    parser.add_argument("-t", "--temperature", type=float, default=0.7, help="Température (défaut: 0.7)")
    parser.add_argument("--models", action="store_true", help="Lister les modèles Uncensored/Abliterated en direct")
    parser.add_argument(
        "--set-key",
        nargs=2,
        metavar=("PROVIDER", "API_KEY"),
        help="Enregistrer une clé API dans le Trousseau macOS t3-vault (venice ou openrouter)",
    )
    parser.add_argument("--status", action="store_true", help="Vérifier l'état des clés API dans t3-vault")
    parser.add_argument("--audit", metavar="FILE_OR_DIR", help="Lancer un audit Red-Team ('Hack Yourself First') sur un fichier")
    parser.add_argument("-i", "--interactive", action="store_true", help="Mode chat interactif dans le terminal")
    parser.add_argument("--serve", action="store_true", help="Lancer l'interface Web locale connectée à t3-vault")
    parser.add_argument("--port", type=int, default=8787, help="Port du serveur local (défaut: 8787)")

    args = parser.parse_args()

    if args.set_key:
        prov, key = args.set_key
        ok, msg = set_api_key_in_vault(prov.lower(), key)
        print(f"{'✔' if ok else '✖'} {msg}")
        return

    if args.status:
        print("\n\033[1;35m━━━ ÉTAT DES CLÉS API (Trousseau macOS t3-vault & .env) ━━━\033[0m")
        for p, info in PROVIDERS.items():
            k = get_api_key(p)
            state = (
                f"\033[1;32m✔ Configurée ({k[:6]}••••{k[-4:]})\033[0m"
                if k and len(k) > 10
                else ("\033[1;32m✔ Configurée\033[0m" if k else f"\033[1;33m⚠ Non configurée ({info['key_url']})\033[0m")
            )
            print(f"  • {info['name']:<55} : {state}")
        print()
        return

    if args.models:
        list_live_models()
        return

    if args.serve:
        server = http.server.ThreadingHTTPServer(("127.0.0.1", args.port), LocalVaultHandler)
        print(f"\033[1;32m✔ UNCENSORED·OS Web Studio actif sur http://127.0.0.1:{args.port}\033[0m")
        print("  Pont macOS Keychain (t3-vault) activé. Ctrl+C pour arrêter.")
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nArrêt du serveur.")
        return

    prov, model, api_key = auto_select_provider_and_model(args.provider, args.model)

    if args.audit:
        target = pathlib.Path(args.audit).expanduser().resolve()
        if not target.exists():
            print(f"\033[1;31m✖ Fichier ou dossier introuvable : {target}\033[0m", file=sys.stderr)
            sys.exit(1)
        if target.is_file():
            snippet = target.read_text(encoding="utf-8", errors="replace")[:24000]
        else:
            files = sorted(
                p for p in target.rglob("*") if p.is_file() and p.suffix in {".py", ".js", ".ts", ".html", ".sh", ".json"}
            )[:12]
            parts = [f"### {p.relative_to(target)}\n```\n{p.read_text(encoding='utf-8', errors='replace')[:2500]}\n```" for p in files]
            snippet = "\n\n".join(parts)
        audit_prompt = (
            f"Effectue un audit de sécurité offensif et défensif complet ('Hack Yourself First') sur `{target.name}`.\n"
            "1. Identifie les failles exploitables (injections, XSS, SSRF, secrets exposés, logique d'auth, race conditions, CORS, CSRF).\n"
            "2. Montre comment un attaquant ou un agent autonome malveillant pourrait les exploiter concrètement.\n"
            "3. Donne le correctif exact (patch).\n\n"
            f"Contenu à auditer :\n{snippet}"
        )
        if not api_key:
            print(
                f"\033[1;33m⚠ Aucune clé API trouvée pour {PROVIDERS[prov]['name']}.\n"
                f"Enregistre ta clé avec : python3 uncensored.py --set-key {prov} <TA_CLE_API>\033[0m"
            )
            sys.exit(1)
        run_cli_prompt(prov, model, api_key, audit_prompt, persona="redteam", temperature=0.3)
        return

    if args.interactive:
        if not api_key:
            print(
                f"\033[1;33m⚠ Aucune clé API trouvée dans t3-vault.\n"
                f"Enregistre ta clé Venice AI ou OpenRouter avec :\n"
                f"  python3 uncensored.py --set-key venice <CLE>\n"
                f"  python3 uncensored.py --set-key openrouter <CLE>\033[0m"
            )
            sys.exit(1)
        print(f"\033[1;35m━━━ Mode Interactif UNCENSORED·OS ({prov} · {model}) — tape 'exit' pour quitter ━━━\033[0m")
        history: List[Dict[str, str]] = []
        sys_p = SYSTEM_PERSONAS.get(args.persona, "")
        if sys_p:
            history.append({"role": "system", "content": sys_p})
        while True:
            try:
                user_in = input("\n\033[1;32mYou > \033[0m").strip()
            except (EOFError, KeyboardInterrupt):
                print()
                break
            if not user_in or user_in.lower() in ("exit", "quit", "/quit", "/bye"):
                break
            history.append({"role": "user", "content": user_in})
            full_reply = []
            for chunk in stream_chat_completion(prov, model, history, api_key, temperature=args.temperature):
                if "error" in chunk:
                    print(f"\n\033[1;31m✖ {chunk['error']}\033[0m")
                    break
                if chunk.get("reasoning"):
                    print(f"\033[2;36m{chunk['reasoning']}\033[0m", end="", flush=True)
                if chunk.get("content"):
                    print(chunk["content"], end="", flush=True)
                    full_reply.append(chunk["content"])
            print()
            if full_reply:
                history.append({"role": "assistant", "content": "".join(full_reply)})
        return

    prompt_str = " ".join(args.prompt).strip()
    if not prompt_str:
        parser.print_help()
        print("\n\033[1;36mExemples rapides :\033[0m")
        print("  python3 uncensored.py --status")
        print("  python3 uncensored.py --models")
        print("  python3 uncensored.py --set-key venice <TA_CLE_VENICE>")
        print("  python3 uncensored.py --set-key openrouter <TA_CLE_OPENROUTER>")
        print('  python3 uncensored.py "Explique comment fonctionne l\'abliteration des poids sur DeepSeek V4.1"')
        print("  python3 uncensored.py --audit ./index.html")
        print("  python3 uncensored.py --serve")
        return

    if not api_key:
        print(
            f"\033[1;33m⚠ Aucune clé API configurée pour {PROVIDERS[prov]['name']}.\n"
            f"Configure-la une seule fois dans le Trousseau macOS (t3-vault) :\n"
            f"  python3 uncensored.py --set-key venice <TA_CLE_VENICE>\n"
            f"  python3 uncensored.py --set-key openrouter <TA_CLE_OPENROUTER>\033[0m"
        )
        sys.exit(1)

    run_cli_prompt(prov, model, api_key, prompt_str, persona=args.persona, temperature=args.temperature)


if __name__ == "__main__":
    main()
