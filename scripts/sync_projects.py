#!/usr/bin/env python3
"""
Synchronise automatiquement tous les dépôts en production de @Mrthomaslef
et génère `projects.json` avec leurs titres, descriptions, catégories, vrais logos et URLs live.
"""
from __future__ import annotations
import json
import os
import re
import urllib.parse
import urllib.request

GITHUB_USERNAME = "Mrthomaslef"

KNOWN_METADATA = {
    "biblioosteo": {
        "title": "BiblioOstéo Cochin",
        "subtitle": "Portail bibliographique & résumés cliniques (RI & Ostéo)",
        "category": "medical-imaging",
        "emoji": "🦴",
        "logoUrl": "https://mrthomaslef.github.io/biblioosteo/assets/icon.svg",
    },
    "agenda-cochin": {
        "title": "Cochin RI — Agenda",
        "subtitle": "Planning de Radiologie Interventionnelle (Cochin Radio B)",
        "category": "medical-imaging",
        "emoji": "📅",
        "logoUrl": "https://mrthomaslef.github.io/agenda-cochin/apple-touch-icon.png",
    },
    "radio-thomas": {
        "title": "QUIZ Cochin",
        "subtitle": "Quiz d’imagerie musculosquelettique",
        "category": "medical-imaging",
        "emoji": "🧠",
        "prodUrl": "https://radio-thomas-ten.vercel.app",
        "logoUrl": "https://radio-thomas-ten.vercel.app/apple-touch-icon.png",
    },
    "dicomviewer": {
        "title": "TPack PACS",
        "subtitle": "Visionneuse DICOM & imagerie médicale pédagogique",
        "category": "medical-imaging",
        "emoji": "🖥️",
        "logoUrl": "https://mrthomaslef.github.io/dicomviewer/favicon.svg",
    },
    "tpack-cases": {
        "title": "TPack Cases",
        "subtitle": "Banque de cas cliniques d’imagerie (.tpack)",
        "category": "medical-imaging",
        "emoji": "🗂️",
        "logoUrl": "https://mrthomaslef.github.io/tpack-cases/favicon.svg",
    },
    "tomatocalc": {
        "title": "TomatoCalc.",
        "subtitle": "Calculateurs médicaux, scores cliniques & classifications",
        "category": "clinical-calc",
        "emoji": "🍅",
        "logoUrl": "https://mrthomaslef.github.io/Tomatocalc/image/logo2.png",
    },
    "medicalc": {
        "title": "MediCalc",
        "subtitle": "Calculateurs médicaux rapides & aide clinique",
        "category": "clinical-calc",
        "emoji": "⚕️",
        "logoUrl": "https://mrthomaslef.github.io/Medicalc/image/logo2.png",
    },
    "colistrack": {
        "title": "ColisTrack",
        "subtitle": "Suivi de livraisons & colis (PWA privée)",
        "category": "daily-tools",
        "emoji": "📦",
        "logoUrl": "https://mrthomaslef.github.io/colistrack/icon.svg",
    },
    "assistante-maternelle": {
        "title": "AssMat — Paie & Pajemploi",
        "subtitle": "Calculateur de salaire, présence & fiche de paie",
        "category": "daily-tools",
        "emoji": "👶",
        "logoUrl": "https://mrthomaslef.github.io/assistante-maternelle/apple-touch-icon.png",
    },
    "quiz-trentenaires": {
        "title": "QUIZ du 7TER",
        "subtitle": "Grand Quiz Show multijoueur (2 couples / 4 joueurs)",
        "category": "games-family",
        "emoji": "🎉",
        "logoUrl": "https://mrthomaslef.github.io/quiz-trentenaires/apple-touch-icon.png",
    },
    "pocket-tcg-family": {
        "title": "milTCG — Pocket Family",
        "subtitle": "Ouverture de boosters & collection de cartes en famille",
        "category": "games-family",
        "emoji": "🃏",
        "logoUrl": "https://mrthomaslef.github.io/pocket-tcg-family/apple-touch-icon.png",
    },
    "holidamn": {
        "title": "Holidamn",
        "subtitle": "Portail vidéo & souvenirs de vacances",
        "category": "games-family",
        "emoji": "🌴",
        "logoUrl": "https://mrthomaslef.github.io/Holidamn/image/logo7.png",
    },
}


def classify_repo(name: str, description: str, topics: list[str]) -> tuple[str, str]:
    t_list = [t.lower() for t in (topics or [])]
    text = f"{name} {description or ''} {' '.join(t_list)}".lower()
    if "imagerie" in t_list or "radiologie" in t_list or re.search(
        r"(cochin|osteo|dicom|pacs|radio|tpack|imagerie|irm|scanner|rx|echographie|anatomie)", text
    ):
        return "medical-imaging", "🩻"
    if "calculateur" in t_list or "medical" in t_list or re.search(
        r"(calc|score|medi|clinique|dose|formule|clairance)", text
    ):
        return "clinical-calc", "🧮"
    if "jeu" in t_list or "famille" in t_list or re.search(
        r"(quiz|tcg|game|jeu|holidamn|family|vacances|carte|soiree|blindtest)", text
    ):
        return "games-family", "🎮"
    return "daily-tools", "🚀"


def fetch_live_page_meta(url: str) -> tuple[str | None, str | None]:
    title = None
    logo_url = None
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "allinone-sync/1.0"})
        with urllib.request.urlopen(req, timeout=5) as r:
            html = r.read().decode("utf-8", errors="ignore")
            m = re.search(r"<title>(.*?)</title>", html, re.I | re.S)
            if m and m.group(1).strip():
                title = re.sub(r"\s+", " ", m.group(1).strip())
            # Look for apple-touch-icon or icon
            for link in re.findall(r"<link[^>]+>", html, re.I):
                if re.search(r'rel=["\']?(?:apple-touch-icon|icon)', link, re.I):
                    href = re.search(r'href=["\']([^"\'>]+)["\']', link, re.I)
                    if href:
                        logo_url = urllib.parse.urljoin(url, href.group(1))
                        if "apple-touch-icon" in link.lower():
                            break
    except Exception:
        pass
    return title, logo_url


def main():
    headers = {
        "User-Agent": "allinone-sync/1.0",
        "Accept": "application/vnd.github+json",
    }
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        headers["Authorization"] = f"Bearer {token}"

    req = urllib.request.Request(
        f"https://api.github.com/users/{GITHUB_USERNAME}/repos?per_page=100&sort=pushed",
        headers=headers,
    )
    with urllib.request.urlopen(req, timeout=15) as r:
        repos = json.loads(r.read().decode("utf-8"))

    output = []
    for repo in repos:
        name = repo.get("name")
        if not name or name.lower() == "allinone":
            continue

        key = name.lower()
        known = KNOWN_METADATA.get(key)
        homepage = (repo.get("homepage") or "").strip()
        has_pages = bool(repo.get("has_pages"))

        if not (has_pages or homepage.startswith("http") or known):
            continue

        prod_url = (
            homepage
            if homepage.startswith("http")
            else (known.get("prodUrl") if known and known.get("prodUrl") else f"https://{GITHUB_USERNAME.lower()}.github.io/{name}/")
        )

        auto_cat, auto_emoji = classify_repo(name, repo.get("description") or "", repo.get("topics") or [])

        live_title, live_logo = (None, None)
        if not known:
            live_title, live_logo = fetch_live_page_meta(prod_url)

        title = known["title"] if known else (live_title or name.replace("-", " ").title())
        logo_url = (
            known["logoUrl"]
            if known and known.get("logoUrl")
            else (live_logo or f"{prod_url.rstrip('/')}/apple-touch-icon.png")
        )
        subtitle = (
            known["subtitle"]
            if known
            else (repo.get("description") or "Application en production sur GitHub")
        )

        output.append(
            {
                "id": name,
                "title": title,
                "subtitle": subtitle,
                "category": known["category"] if known else auto_cat,
                "emoji": known["emoji"] if known else auto_emoji,
                "logoUrl": logo_url,
                "prodUrl": prod_url,
                "githubUrl": repo.get("html_url") or f"https://github.com/{GITHUB_USERNAME}/{name}",
                "pushedAt": repo.get("pushed_at") or repo.get("updated_at"),
            }
        )

    # Include built-in Gemini Ultra live quota app
    if not any(item["id"].lower() == "gemini-ultra" for item in output):
        output.insert(
            0,
            {
                "id": "gemini-ultra",
                "title": "Gemini Ultra — Quotas Live",
                "subtitle": "Limites temps réel 5h, Semaine & Mois (Abonnement Google AI Ultra)",
                "category": "daily-tools",
                "emoji": "✨",
                "logoUrl": "https://mrthomaslef.github.io/allinone/gemini-ultra/assets/icon.svg",
                "prodUrl": "https://mrthomaslef.github.io/allinone/gemini-ultra/",
                "githubUrl": f"https://github.com/{GITHUB_USERNAME}/allinone/tree/main/gemini-ultra",
                "pushedAt": output[0]["pushedAt"] if output else None,
            },
        )

    out_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "projects.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
        f.write("\n")

    print(f"Synced {len(output)} production projects into projects.json")


if __name__ == "__main__":
    main()
