#!/usr/bin/env python3
"""
Synchronise automatiquement tous les dépôts en production de @Mrthomaslef
et génère `projects.json` avec leurs titres, descriptions, catégories et URLs live.
"""
from __future__ import annotations
import json
import os
import re
import urllib.request

GITHUB_USERNAME = "Mrthomaslef"

KNOWN_METADATA = {
    "biblioosteo": {
        "title": "BiblioOstéo Cochin",
        "subtitle": "Portail bibliographique & résumés cliniques (RI & Ostéo)",
        "category": "medical-imaging",
        "emoji": "🦴",
    },
    "agenda-cochin": {
        "title": "Cochin RI — Agenda",
        "subtitle": "Planning de Radiologie Interventionnelle (Cochin Radio B)",
        "category": "medical-imaging",
        "emoji": "📅",
    },
    "radio-thomas": {
        "title": "QUIZ Cochin",
        "subtitle": "Quiz d’imagerie musculosquelettique",
        "category": "medical-imaging",
        "emoji": "🧠",
        "prodUrl": "https://radio-thomas-ten.vercel.app",
    },
    "dicomviewer": {
        "title": "TPack PACS",
        "subtitle": "Visionneuse DICOM & imagerie médicale pédagogique",
        "category": "medical-imaging",
        "emoji": "🖥️",
    },
    "tpack-cases": {
        "title": "TPack Cases",
        "subtitle": "Banque de cas cliniques d’imagerie (.tpack)",
        "category": "medical-imaging",
        "emoji": "🗂️",
    },
    "tomatocalc": {
        "title": "TomatoCalc.",
        "subtitle": "Calculateurs médicaux, scores cliniques & classifications",
        "category": "clinical-calc",
        "emoji": "🍅",
    },
    "medicalc": {
        "title": "MediCalc",
        "subtitle": "Calculateurs médicaux rapides & aide clinique",
        "category": "clinical-calc",
        "emoji": "⚕️",
    },
    "colistrack": {
        "title": "ColisTrack",
        "subtitle": "Suivi de livraisons & colis (PWA privée)",
        "category": "daily-tools",
        "emoji": "📦",
    },
    "assistante-maternelle": {
        "title": "AssMat — Paie & Pajemploi",
        "subtitle": "Calculateur de salaire, présence & fiche de paie",
        "category": "daily-tools",
        "emoji": "👶",
    },
    "quiz-trentenaires": {
        "title": "QUIZ du 7TER",
        "subtitle": "Grand Quiz Show multijoueur (2 couples / 4 joueurs)",
        "category": "games-family",
        "emoji": "🎉",
    },
    "pocket-tcg-family": {
        "title": "milTCG — Pocket Family",
        "subtitle": "Ouverture de boosters & collection de cartes en famille",
        "category": "games-family",
        "emoji": "🃏",
    },
    "holidamn": {
        "title": "Holidamn",
        "subtitle": "Portail vidéo & souvenirs de vacances",
        "category": "games-family",
        "emoji": "🌴",
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


def fetch_live_page_title(url: str) -> str | None:
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "allinone-sync/1.0"})
        with urllib.request.urlopen(req, timeout=5) as r:
            html = r.read().decode("utf-8", errors="ignore")
            m = re.search(r"<title>(.*?)</title>", html, re.I | re.S)
            if m and m.group(1).strip():
                return re.sub(r"\s+", " ", m.group(1).strip())
    except Exception:
        pass
    return None


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

        title = known["title"] if known else (fetch_live_page_title(prod_url) or name.replace("-", " ").title())
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
                "prodUrl": prod_url,
                "githubUrl": repo.get("html_url") or f"https://github.com/{GITHUB_USERNAME}/{name}",
                "pushedAt": repo.get("pushed_at") or repo.get("updated_at"),
            }
        )

    out_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "projects.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
        f.write("\n")

    print(f"Synced {len(output)} production projects into projects.json")


if __name__ == "__main__":
    main()
