#!/usr/bin/env python3
"""
Synchronise automatiquement tous les dépôts en production de @Mrthomaslef
et génère `projects.json` avec leurs titres, descriptions, catégories, vrais logos officiels et URLs live.
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
        "logoUrl": "https://mrthomaslef.github.io/agenda-cochin/icon.svg?v=3",
    },
    "agenda-internes": {
        "title": "Espace Internes — Radio B",
        "subtitle": "Planning, Vacances, Cas du Mardi, Biblio du Vendredi & Annuaire",
        "category": "medical-imaging",
        "emoji": "🩺",
        "logoUrl": "https://mrthomaslef.github.io/agenda-internes/icon.svg?v=6",
    },
    "guide-interne-cochin-os": {
        "title": "COCHIN·OS — Guide Internes",
        "subtitle": "Portail & Annuaire des Internes de Radiologie B (Ostéo & RI Cochin)",
        "category": "medical-imaging",
        "emoji": "🦴",
        "logoUrl": "https://mrthomaslef.github.io/guide-interne-cochin-os/assets/icon.svg",
    },
    "quiz-imagerie": {
        "title": "QUIZ Imagerie — 1 Image 1 Diag",
        "subtitle": "Défi diagnostique rapide en imagerie ostéo-articulaire (Cochin)",
        "category": "medical-imaging",
        "emoji": "🩻",
        "logoUrl": "https://mrthomaslef.github.io/quiz-imagerie/apple-touch-icon.png",
    },
    "radio-thomas": {
        "title": "QUIZ Cochin MSK",
        "subtitle": "Quiz interactif d’imagerie musculosquelettique",
        "category": "medical-imaging",
        "emoji": "🧠",
        "prodUrl": "https://radio-thomas-ten.vercel.app",
        "logoUrl": "https://radio-thomas-ten.vercel.app/apple-touch-icon.png",
    },
    "dicomviewer": {
        "title": "TPack PACS",
        "subtitle": "Visionneuse DICOM & console d’imagerie médicale pédagogique",
        "category": "medical-imaging",
        "emoji": "🖥️",
        "logoUrl": "https://mrthomaslef.github.io/dicomviewer/favicon.svg",
    },
    "tpack-cases": {
        "title": "TPack Cases",
        "subtitle": "Banque de dossiers et cas cliniques d’imagerie (.tpack)",
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
        "subtitle": "Calculateurs médicaux rapides & aide clinique au quotidien",
        "category": "clinical-calc",
        "emoji": "⚕️",
        "logoUrl": "https://mrthomaslef.github.io/Medicalc/image/logo2.png",
    },
    "colistrack": {
        "title": "ColisTrack",
        "subtitle": "Suivi de livraisons & colis en temps réel (PWA privée)",
        "category": "daily-tools",
        "emoji": "📦",
        "logoUrl": "https://mrthomaslef.github.io/colistrack/icon.svg",
    },
    "assistante-maternelle": {
        "title": "AssMat — Paie & Pajemploi",
        "subtitle": "Calculateur de salaire, présence, congés & fiche de paie",
        "category": "daily-tools",
        "emoji": "👶",
        "logoUrl": "https://mrthomaslef.github.io/assistante-maternelle/apple-touch-icon.png",
    },
    "agenda-famille": {
        "title": "Agenda Famille — Marie & Thomas",
        "subtitle": "Planning partagé, gardes & indisponibilités à la maison",
        "category": "daily-tools",
        "emoji": "🏡",
        "logoUrl": "https://mrthomaslef.github.io/agenda-famille/icon.svg",
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
        "subtitle": "Portail vidéo & souvenirs de vacances au soleil",
        "category": "games-family",
        "emoji": "🌴",
        "logoUrl": "https://mrthomaslef.github.io/Holidamn/image/logo7.png",
    },
    "m4-gaming": {
        "title": "M4 Gaming",
        "subtitle": "Télécommande Mac mini M4 (Mode TV 1080p/4K, ES-DE, Steam & Audio)",
        "category": "games-family",
        "emoji": "🎮",
        "prodUrl": "http://192.168.1.111:8765",
        "logoUrl": "assets/m4-gaming-icon.png",
    },
    "monopoly": {
        "title": "Jolly Roger's — Monopoly 3D",
        "subtitle": "Jeu de plateau Monopoly 3D des Caraïbes (Batailles navales, Îles & Trésors)",
        "category": "games-family",
        "emoji": "🏴‍☠️",
        "logoUrl": "https://mrthomaslef.github.io/monopoly/assets/pirate_logo.png",
    },
    "dinociel-app-educative": {
        "title": "DinoCiel — Petit Dino",
        "subtitle": "App éducative interactive pour enfants de 3 ans avec Petit Dino animé",
        "category": "games-family",
        "emoji": "🦕",
        "logoUrl": "https://mrthomaslef.github.io/dinociel-app-educative/assets/dino-emotion-happy.jpg",
    },
    "quiz-pokemon": {
        "title": "PokéQuiz — Attrape-les tous !",
        "subtitle": "Quiz interactif pour apprendre les noms des Pokémon (Générations 1 à 3)",
        "category": "games-family",
        "emoji": "⚡",
        "logoUrl": "https://mrthomaslef.github.io/quiz-pokemon/apple-touch-icon.png",
    },
}


def classify_repo(name: str, description: str, topics: list[str]) -> tuple[str, str]:
    t_list = [t.lower() for t in (topics or [])]
    text = f"{name} {description or ''} {' '.join(t_list)}".lower()
    if "imagerie" in t_list or "radiologie" in t_list or re.search(
        r"(cochin|osteo|dicom|pacs|radio|tpack|imagerie|irm|scanner|rx|echographie|anatomie|interne)", text
    ):
        return "medical-imaging", "🩺"
    if "calculateur" in t_list or "medical" in t_list or re.search(
        r"(calc|score|medi|clinique|dose|formule|clairance)", text
    ):
        return "clinical-calc", "🧮"
    if "jeu" in t_list or "famille" in t_list or "game" in t_list or re.search(
        r"(quiz|tcg|game|jeu|holidamn|vacances|carte|soiree|soirée|blindtest|monopoly|pirate|plunder|pokemon|poké|dino|enfant|plateau|board|arcade|dice|puzzle|play|joueur|multijoueur|aventure|casino|poker|ludo)",
        text,
    ):
        return "games-family", "🎮"
    return "daily-tools", "🚀"


def _is_placeholder_svg(icon_url: str) -> bool:
    if not icon_url.lower().split("?")[0].endswith(".svg"):
        return False
    try:
        req = urllib.request.Request(icon_url, headers={"User-Agent": "tappstore-sync/1.0"})
        with urllib.request.urlopen(req, timeout=3) as r:
            body = r.read().decode("utf-8", errors="ignore")
            return len(body) < 450 and "<text" in body
    except Exception:
        return True


def fetch_live_page_meta(url: str) -> tuple[str | None, str | None]:
    title = None
    logo_url = None
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "tappstore-sync/1.0"})
        with urllib.request.urlopen(req, timeout=5) as r:
            html = r.read().decode("utf-8", errors="ignore")
            m = re.search(r"<title>(.*?)</title>", html, re.I | re.S)
            if m and m.group(1).strip():
                title = re.sub(r"\s+", " ", m.group(1).strip())

            apple_icons: list[str] = []
            other_icons: list[str] = []
            ico_icons: list[str] = []
            brand_imgs: list[str] = []
            manifest_url: str | None = None

            for link in re.findall(r"<link[^>]+>", html, re.I):
                href_m = re.search(r'href=["\']([^"\'>]+)["\']', link, re.I)
                if not href_m:
                    continue
                resolved = urllib.parse.urljoin(url, href_m.group(1))
                if re.search(r'rel=["\']?apple-touch-icon', link, re.I):
                    apple_icons.append(resolved)
                elif re.search(r'rel=["\']?(?:shortcut\s+)?icon', link, re.I):
                    if resolved.split("?")[0].lower().endswith(".ico"):
                        ico_icons.append(resolved)
                    else:
                        other_icons.append(resolved)
                elif re.search(r'rel=["\']?manifest', link, re.I):
                    manifest_url = resolved

            for img in re.findall(r"<img[^>]+>", html, re.I):
                src_m = re.search(r'src=["\']([^"\'>]+)["\']', img, re.I)
                if not src_m or src_m.group(1).startswith("data:"):
                    continue
                if re.search(r"(logo|brand|icon|thumb)", img, re.I):
                    brand_imgs.append(urllib.parse.urljoin(url, src_m.group(1)))

            if apple_icons:
                logo_url = apple_icons[0]
            else:
                if manifest_url:
                    try:
                        mreq = urllib.request.Request(manifest_url, headers={"User-Agent": "tappstore-sync/1.0"})
                        with urllib.request.urlopen(mreq, timeout=3) as mr:
                            mdata = json.loads(mr.read().decode("utf-8", errors="ignore"))
                            for ic in mdata.get("icons") or []:
                                src = ic.get("src")
                                if src:
                                    cand = urllib.parse.urljoin(manifest_url, src)
                                    if not _is_placeholder_svg(cand):
                                        logo_url = cand
                                        break
                    except Exception:
                        pass
                if not logo_url:
                    for cand in other_icons:
                        if not _is_placeholder_svg(cand):
                            logo_url = cand
                            break
                if not logo_url and brand_imgs:
                    logo_url = brand_imgs[0]
                if not logo_url and ico_icons:
                    logo_url = ico_icons[0]
    except Exception:
        pass
    return title, logo_url


def main():
    headers = {
        "User-Agent": "tappstore-sync/1.0",
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
        if not known or not known.get("logoUrl"):
            live_title, live_logo = fetch_live_page_meta(prod_url)

        title = known["title"] if known and known.get("title") else (live_title or name.replace("-", " ").title())
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

    if not any(item["id"].lower() == "gemini-ultra" for item in output):
        output.insert(
            0,
            {
                "id": "gemini-ultra",
                "title": "Agent Tracking",
                "subtitle": "Consommation Gemini & Claude (Tokens, Prix API & Quotas)",
                "category": "daily-tools",
                "emoji": "🤖",
                "logoUrl": "gemini-ultra/assets/icon.svg",
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
