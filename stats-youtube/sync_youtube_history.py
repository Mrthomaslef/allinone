#!/usr/bin/env python3
"""
Synchronizes and processes the ENTIRE YouTube & YouTube Music history of Dr Thomas Lefèvre
from Google MyActivity (2011 to present), calculates exact watch-time (in hours/minutes/seconds)
for every single video using:
  1) Exact video duration (from MyActivity metadata + YouTube watch page lookup for 2011-2020 likes)
  2) Google's recorded red progress bar (% watched) when available
  3) Chronological delta capping (time elapsed before starting the next video)
And outputs:
  - data/youtube_stats.js (complete watch-time & chronological theme stats)
  - data/youtube_full_history.js (ALL 145,740 chronological events so the user can browse every single video)
"""

from __future__ import annotations

import collections
import datetime
import json
import os
import re
from pathlib import Path

PROJECT_DIR = Path("/Users/thomaslefevre/.t3/projects/stats-youtube")
DATA_DIR = PROJECT_DIR / "data"
RAW_CACHE_DIR = Path("/tmp")

THEMES = [
    {
        "id": "gaming_twitch",
        "name": "Gaming, Twitch, JDG & Let's Play",
        "short": "Gaming & Twitch",
        "icon": "🎮",
        "color": "#3b82f6",
        "desc": "De Minecraft (Fanta & Bob, HolyCube) et Dofus jusqu'aux VODs Wankil, Joueur du Grenier, Antoine Daniel, AlphaTeam, Insym, Zelda & Age of Empires II.",
    },
    {
        "id": "medecine_radio",
        "name": "Médecine, Radiologie Ostéo-Articulaire & SIMS",
        "short": "Médecine & Radio",
        "icon": "🏥",
        "color": "#10b981",
        "desc": "Chaîne MrThomaslef (cours DIU/SIMS genou, hanche, pied, épaule, webinaire syndrome de Morton), Chirurgie du Sport & sémiologie IRM/Écho.",
    },
    {
        "id": "cinema_humour",
        "name": "Cinéma, Sketchs, Humour & Pop Culture",
        "short": "Cinéma & Humour",
        "icon": "🎬",
        "color": "#f97316",
        "desc": "Viva La Dirt League, Guillaume Genou, Koda, Wizards with Guns, Corridor Crew, Karim Debbache, Kaamelott, Studio Bagel & critiques ciné.",
    },
    {
        "id": "tech_ia_hardware",
        "name": "Tech, IA, Apple Silicon & Consoles Rétro",
        "short": "Tech, IA & Hardware",
        "icon": "💻",
        "color": "#06b6d4",
        "desc": "ETA PRIME, Linus Tech Tips, MKBHD, Retro Game Corps, CarterPCs, Mac Mini M4 Gaming, LLM/Agents locaux, émulation Switch & hardware.",
    },
    {
        "id": "histoire_geo",
        "name": "Histoire, Géopolitique, Sciences & GeoGuessr",
        "short": "Histoire & Sciences",
        "icon": "🏛️",
        "color": "#8b5cf6",
        "desc": "Nota Bene, AlterHis, La Minute Géographie, Le Moyen-Âge dans tes oreilles, In Deep Geek, Vsauce, ScienceEtonnante, Julien Bobroff & GeoWizard.",
    },
    {
        "id": "pokemon_tcg",
        "name": "Pokémon, Cartes TCG & Stratégie",
        "short": "Pokémon & TCG",
        "icon": "⚡",
        "color": "#eab308",
        "desc": "Fildrong, ShortPocketMonster, PokeMoniteur, 100 Charizards, Kiibiki TCG, ouvertures de boosters, Pokémon Pocket, Nuzlockes & épisodes animés.",
    },
    {
        "id": "musique",
        "name": "Musique, Rap FR & Chanson Française",
        "short": "Musique & Rap FR",
        "icon": "🎵",
        "color": "#a855f7",
        "desc": "Vald, Orelsan, Lujipeka, Stromae, Hoshi, Ben Mazué, Etienne Daho, Lomepal, Bigflo & Oli, Angèle et classiques sur YouTube Music.",
    },
    {
        "id": "crypto_finance",
        "name": "Crypto, Bitcoin & Macro-Finance",
        "short": "Crypto & Finance",
        "icon": "₿",
        "color": "#f59e0b",
        "desc": "Benjamin Cowen, Crypto Le Trône, Bitcoin University, Charles Gave, Grand Angle Bitcoin, The Peter McCormack Show, cycles BTC & macro-économie.",
    },
    {
        "id": "japon_voyages",
        "name": "Japon, Voyages, Gastronomie & Découverte",
        "short": "Japon & Voyages",
        "icon": "🗾",
        "color": "#ec4899",
        "desc": "Tev - Ici Japon, Tev & Louis, Abroad in Japan, Taiki Maeda, Louis-San, Tourister, reportages AILLEURS, culture japonaise & gastronomie.",
    },
    {
        "id": "sport_running",
        "name": "Course à Pied, Running, Sport & Outdoor",
        "short": "Running & Sport",
        "icon": "🏃‍♂️",
        "color": "#22c55e",
        "desc": "RunWise, Running Addict, Dans la Tête d'un Coureur, Naj B Fit, Woodsbound Outdoors, Red Bull, Formule 1, escalade & préparation marathon.",
    },
    {
        "id": "actu_societe",
        "name": "Actualités, Documentaires & Société",
        "short": "Actu & Société",
        "icon": "📰",
        "color": "#64748b",
        "desc": "Europe 1, Le Parisien, Konbini, Brut, M6+ Mag, Ludovic B, Cash Investigation, Simon Puech, EGO & grands reportages de société.",
    },
    {
        "id": "emile_famille",
        "name": "Émile, Comptines, Dessins Animés & Famille",
        "short": "Émile & Famille",
        "icon": "👶",
        "color": "#f43f5e",
        "desc": "Peppa Pig, Petit Ours Brun, Trotro, Didou dessine-moi, ACTIMOMES, Le Petit Oiseau et vidéos familiales pour Émile.",
    },
]

THEME_MAP = {t["id"]: t for t in THEMES}

CHANNEL_MAP = {
    # Emile & Famille
    "Peppa Pig Français - Chaîne Officielle": "emile_famille",
    "Didou dessine-moi | Officiel": "emile_famille",
    "TROTRO OFFICIEL 🇫🇷": "emile_famille",
    "Dessin Animé En Francais": "emile_famille",
    "ACTIMOMES": "emile_famille",
    # Medecine & Radio
    "MrThomaslef": "medecine_radio",
    "chirurgiedusport": "medecine_radio",
    "Albert Einstein College of Medicine": "medecine_radio",
    "BODY3D": "medecine_radio",
    "BartVetPhysio": "medecine_radio",
    # Pokemon & TCG
    "Fildrong": "pokemon_tcg",
    "ShortPocketMonster": "pokemon_tcg",
    "PokeMoniteur": "pokemon_tcg",
    "100 Charizards": "pokemon_tcg",
    "Kiibiki TCG": "pokemon_tcg",
    "Coop's Collection": "pokemon_tcg",
    "Pokémon TV": "pokemon_tcg",
    "spragels Pocket": "pokemon_tcg",
    "Danireon | Danireon Cards": "pokemon_tcg",
    "pChal": "pokemon_tcg",
    "Goated Pullz": "pokemon_tcg",
    "Rayquamaster": "pokemon_tcg",
    "La chaîne officielle Pokémon en français": "pokemon_tcg",
    # Crypto & Finance
    "Benjamin Cowen": "crypto_finance",
    "Crypto Le Trone": "crypto_finance",
    "Bitcoin University": "crypto_finance",
    "Charles Gave-Université de l'Epargne": "crypto_finance",
    "Grand Angle Bitcoin": "crypto_finance",
    "The Peter McCormack Show": "crypto_finance",
    "Grand Angle": "crypto_finance",
    "Inseeder Capital": "crypto_finance",
    "Empire des Monnaies": "crypto_finance",
    "Coffeezilla": "crypto_finance",
    "Preston Pysh": "crypto_finance",
    "Crypto Quebec": "crypto_finance",
    "Crypto Critics' Corner": "crypto_finance",
    "Mark Tilbury": "crypto_finance",
    "Caleb Hammer": "crypto_finance",
    "Altcoin Daily": "crypto_finance",
    "Coin Compass": "crypto_finance",
    "Market Chasers": "crypto_finance",
    # Tech, IA & Hardware
    "ETA PRIME": "tech_ia_hardware",
    "Linus Tech Tips": "tech_ia_hardware",
    "Marques Brownlee": "tech_ia_hardware",
    "CarterPCs": "tech_ia_hardware",
    "Phone Repair Guru": "tech_ia_hardware",
    "Retro Game Corps": "tech_ia_hardware",
    "TechTablets": "tech_ia_hardware",
    "UFD Tech": "tech_ia_hardware",
    "Underscore_": "tech_ia_hardware",
    "Lex Fridman": "tech_ia_hardware",
    "Dave2D": "tech_ia_hardware",
    "Gadget Glimpse": "tech_ia_hardware",
    "JerryRigEverything": "tech_ia_hardware",
    "The Phawx": "tech_ia_hardware",
    "EXCESSORIZE ME.": "tech_ia_hardware",
    "Mark Rober": "tech_ia_hardware",
    "Hardisk": "tech_ia_hardware",
    "Frandroid": "tech_ia_hardware",
    "The Verge": "tech_ia_hardware",
    "Unbox Therapy": "tech_ia_hardware",
    "TechSource": "tech_ia_hardware",
    "Jonathan Morrison ": "tech_ia_hardware",
    "NCIX Tech Tips": "tech_ia_hardware",
    "BFM Tech": "tech_ia_hardware",
    "RandomGaminginHD": "tech_ia_hardware",
    "The Sciencoder": "tech_ia_hardware",
    "AiVideoClub": "tech_ia_hardware",
    "McNallyOfficial": "tech_ia_hardware",
    "I did a thing": "tech_ia_hardware",
    "The Laser Symphony": "tech_ia_hardware",
    # Histoire, Geo & Sciences
    "Nota Bene": "histoire_geo",
    "Nota Bonus": "histoire_geo",
    "AlterHis": "histoire_geo",
    "GeoWizard": "histoire_geo",
    "Vsauce": "histoire_geo",
    "In Deep Geek": "histoire_geo",
    "La Minute Géographie": "histoire_geo",
    "Lindsay Nikole": "histoire_geo",
    "Survive History": "histoire_geo",
    "L'Histoire nous le dira": "histoire_geo",
    "Modern History TV": "histoire_geo",
    "rainbolt clips": "histoire_geo",
    "RAINBOLT TWO": "histoire_geo",
    "Storiavoce, un podcast d'Histoire & Civilisations": "histoire_geo",
    "Le Moyen-Âge dans tes oreilles": "histoire_geo",
    "toldinstone": "histoire_geo",
    "La Folle Histoire": "histoire_geo",
    "La Voix des lieux": "histoire_geo",
    "blumineck": "histoire_geo",
    "Le Précepteur": "histoire_geo",
    "Batailles de France": "histoire_geo",
    "zi8gzag": "histoire_geo",
    "Dr Nozman": "histoire_geo",
    "Kurzgesagt – In a Nutshell": "histoire_geo",
    "Yann Bouvier | YannToutCourt": "histoire_geo",
    "vt.physics": "histoire_geo",
    "C'est pas sorcier": "histoire_geo",
    "Jamy - Epicurieux": "histoire_geo",
    "SandRhoman History": "histoire_geo",
    "Rivenzi - Le cercle de l'Histoire": "histoire_geo",
    "HerodoteVideos": "histoire_geo",
    "DirtyBiology": "histoire_geo",
    "e-penser 2.0": "histoire_geo",
    "Poisson Fécond": "histoire_geo",
    "Julien Bobroff": "histoire_geo",
    "ScienceEtonnante": "histoire_geo",
    "Premodernist": "histoire_geo",
    "OverSimplified": "histoire_geo",
    "T. Folse Nuclear": "histoire_geo",
    "Lectec | Everyday Science": "histoire_geo",
    "MedievalMadness": "histoire_geo",
    "Academy of Ideas": "histoire_geo",
    "NileRed": "histoire_geo",
    "Monsieur Phi": "histoire_geo",
    "Veritasium": "histoire_geo",
    "Max Bird": "histoire_geo",
    "BoardHistorical": "histoire_geo",
    "Odd Animal Specimens": "histoire_geo",
    "Action Lab Shorts": "histoire_geo",
    "The Ocean Cleanup": "histoire_geo",
    "Julien Song": "histoire_geo",
    # Sport, Running & Outdoor
    "RunWise": "sport_running",
    "Running Addict": "sport_running",
    "Naj B Fit": "sport_running",
    "Woodsbound Outdoors": "sport_running",
    "Red Bull": "sport_running",
    "Red Bull Checkpoint": "sport_running",
    "Göran Winblad": "sport_running",
    "Anton Fomenko": "sport_running",
    "Dans la Tête d'un Coureur ": "sport_running",
    "Bob Reese": "sport_running",
    "Nicole Coenen": "sport_running",
    "Lauren Jumps": "sport_running",
    "MovementbyDavid": "sport_running",
    "gymnast86": "sport_running",
    "Fitness-Muscu": "sport_running",
    "Depielo": "sport_running",
    "Outdoor Boys": "sport_running",
    "GrimpeGamin": "sport_running",
    "Cabinland": "sport_running",
    "Pêcheur De Trésors": "sport_running",
    "Forrest's Auto Reviews": "sport_running",
    # Japon & Voyages
    "Tev - Ici Japon": "japon_voyages",
    "Tev & Louis": "japon_voyages",
    "Taiki Maeda": "japon_voyages",
    "Abroad in Japan": "japon_voyages",
    "Louis-San": "japon_voyages",
    "AILLEURS ▸ reportages voyages": "japon_voyages",
    "Indigo Traveller": "japon_voyages",
    "Tourister": "japon_voyages",
    "Chris Kohler": "japon_voyages",
    "Prowalk Tours": "japon_voyages",
    "Le French Gourmet": "japon_voyages",
    "Luisier Affineur": "japon_voyages",
    # Actu, Societe & Documentaires
    "Europe 1": "actu_societe",
    "Le Parisien": "actu_societe",
    "Konbini": "actu_societe",
    "Brut": "actu_societe",
    "M6+ Mag": "actu_societe",
    "Documentaire Société": "actu_societe",
    "Ludovic B": "actu_societe",
    "BLAST, Le souffle de l'info": "actu_societe",
    "neo - Sacrés Français": "actu_societe",
    "Le Média Positif": "actu_societe",
    "Cash Investigation - France Télévisions": "actu_societe",
    "HugoDécrypte - Actus du jour": "actu_societe",
    "Simon Puech": "actu_societe",
    "Sylvqin": "actu_societe",
    "EGO": "actu_societe",
    "Sept à huit": "actu_societe",
    "Folding Ideas": "actu_societe",
    "Data Gueule": "actu_societe",
    "Ordinary Things": "actu_societe",
    "TF1+": "actu_societe",
    "BBC": "actu_societe",
    "LEGEND": "actu_societe",
    "Popcorn": "actu_societe",
    "Zen Emission": "actu_societe",
    "LORIS GIULIANO": "actu_societe",
    # Gaming & Twitch
    "Wankil Studio - Laink et Terracid": "gaming_twitch",
    "Wankil Studio - Les VOD": "gaming_twitch",
    "Best Of du Grenier": "gaming_twitch",
    "Bazar du Grenier": "gaming_twitch",
    "Joueur Du Grenier": "gaming_twitch",
    "VOD du Grenier": "gaming_twitch",
    "Antoine Daniel - Les VOD": "gaming_twitch",
    "Antoine Daniel - Clips": "gaming_twitch",
    "Best Of Antoine Daniel": "gaming_twitch",
    "MrAntoineDaniel": "gaming_twitch",
    "AlphaTeam": "gaming_twitch",
    "AlphaReplay": "gaming_twitch",
    "Insym": "gaming_twitch",
    "ZeratoR": "gaming_twitch",
    "Humility": "gaming_twitch",
    "Seryno": "gaming_twitch",
    "BenzaieLive": "gaming_twitch",
    "benzaieTV": "gaming_twitch",
    "Hugo Délire - Les VOD": "gaming_twitch",
    "SQUEEZIE GAMING": "gaming_twitch",
    "SQUEEZIE": "gaming_twitch",
    "JirayaTV - Replay": "gaming_twitch",
    "JirayaTV": "gaming_twitch",
    "Linkus7": "gaming_twitch",
    "Linkus Daily": "gaming_twitch",
    "Ascuns": "gaming_twitch",
    "Jeando Gaming": "gaming_twitch",
    "Any Austin": "gaming_twitch",
    "3houses": "gaming_twitch",
    "SmallAnt": "gaming_twitch",
    "DougDoug": "gaming_twitch",
    "TARTIN": "gaming_twitch",
    "GOTAGA": "gaming_twitch",
    "GotagaTV": "gaming_twitch",
    "Clips du lundiz": "gaming_twitch",
    "LOCKLEAR": "gaming_twitch",
    "Sheshounet": "gaming_twitch",
    "Astérion": "gaming_twitch",
    "RTBF iXPé": "gaming_twitch",
    "T90Official - Age Of Empires 2": "gaming_twitch",
    "JV - Jeux Vidéo": "gaming_twitch",
    "Kombo": "gaming_twitch",
    "mistermv": "gaming_twitch",
    "FitMC": "gaming_twitch",
    "Joov": "gaming_twitch",
    "The Spiffing Brit": "gaming_twitch",
    "TheGreatReview": "gaming_twitch",
    "ohnepixel raw": "gaming_twitch",
    "Ludwig": "gaming_twitch",
    "Ponce Replay": "gaming_twitch",
    "Domingo": "gaming_twitch",
    "Rivenzi": "gaming_twitch",
    "TheFantasio974": "gaming_twitch",
    "Bob Lennon": "gaming_twitch",
    "The Yogscast": "gaming_twitch",
    "PewDiePie": "gaming_twitch",
    "Cinemassacre": "gaming_twitch",
    "TheViper": "gaming_twitch",
    "Hunter Gaming": "gaming_twitch",
    "Etoiles": "gaming_twitch",
    "Smant": "gaming_twitch",
    "La Taverne d’Alwyn": "gaming_twitch",
    "Top Gaming Plays": "gaming_twitch",
    "Bazinga Gaming Videos": "gaming_twitch",
    # Musique
    "Plenitude Music": "musique",
    "Fin Draper": "musique",
    "Billie Eilish": "musique",
    "Daniel Champagne": "musique",
    "Rudy Ayoub": "musique",
}


def classify(title: str, channel: str, action: str, product: str) -> str:
    if channel in CHANNEL_MAP:
        theme = CHANNEL_MAP[channel]
        if channel == "MrThomaslef" and any(k in title.lower() for k in ["petit oiseau", "papini"]):
            return "emile_famille"
        return theme

    if (
        product in ("YouTube\u00a0Music", "YouTube Music")
        or channel.endswith("- Topic")
        or "vevo" in channel.lower()
    ):
        return "musique"

    t = (title + " " + channel).lower()

    if any(
        k in t
        for k in [
            "peppa pig", "petit ours brun", "trotro", "comptine", "didou",
            "pat patrouille", "bluey", "bébé", "maternelle", "papini et mamiso",
            "le petit oiseau", "dessin animé", "berceuse",
        ]
    ):
        return "emile_famille"

    if any(
        k in t
        for k in [
            "irm", "échographie", "echographie", "ménisque", "menisque", "ligament",
            "hanche", "épaule", "epaule", "cheville", "chirurgie", "radiologie",
            "anatomie", "morton", "tendon", "prothèse", "prothese", "clinique",
            "médecine", "medecine", "sims 20", "fémoropatellaire", "biopsie",
            "infiltration", "rachis", "ostéo", "osteo", "pédiatrie", "pediatrie",
        ]
    ):
        return "medecine_radio"

    if any(
        k in t
        for k in [
            "pokémon", "pokemon", "charizard", "pikachu", "dracaufeu", "tcg",
            "booster", "pokedex", "pokédex", "nuzlocke", "shiny", "magikarp",
            "magicarpe", "snorlax", "eevee", "pixelmon", "pokopia", "mewtwo",
            "rayquaza", "riolu", "lucario",
        ]
    ):
        return "pokemon_tcg"

    if any(
        k in t
        for k in [
            "bitcoin", "btc", "crypto", "ethereum", "eth", "altcoin", "xrp",
            "ripple", "ledger", "metamask", "quickswap", "binance", "inflation",
            "bourse", "investissement", "trading", "forex", "fed ", "charles gave",
            "cowen", "sp500", "nasdaq", "bull run", "halving", "market",
        ]
    ):
        return "crypto_finance"

    if any(
        k in t
        for k in [
            "macbook", "mac mini", "m4 ", "m3 ", "m2 ", "m1 ", "iphone", "ipad",
            "airpods", "apple", "nvidia", "rtx", "amd", "intel", "steam deck",
            "emulation", "émulation", "chatgpt", "openai", "claude", "gemini",
            "llm", "deepseek", "esp32", "raspberry", "linux", "pc build", "huawei",
            "samsung", "pixel ", "unboxing", "benchmark", "tech", "hardware",
            "console", "switch 2", "moonlight", "parsec", "oled", "amoled",
        ]
    ):
        return "tech_ia_hardware"

    if any(
        k in t
        for k in [
            "moyen âge", "moyen-âge", "moyen age", "histoire", "history",
            "empire romain", "rome", "napoléon", "napoleon", "guerre mondiale",
            "géopolitique", "geopolitique", "géographie", "geographie", "geoguessr",
            "archéologie", "archeologie", "mythologie", "philosophie", "physique",
            "astronomie", "espace", "dinosaure", "évolution", "science",
            "quantique", "médiéval", "medieval", "chevalier", "antiquité",
        ]
    ):
        return "histoire_geo"

    if any(
        k in t
        for k in [
            "marathon", "running", "course à pied", "courir", "trail", "strava",
            "garmin", "muscu", "fitness", "escalade", "climbing", "vélo",
            "cyclisme", "f1 ", "formule 1", "verstappen", "ricciardo", "tennis",
            "football", "jo 2024", "jeux olympiques", "bouldering", "workout",
        ]
    ):
        return "sport_running"

    if any(
        k in t
        for k in [
            "japon", "japan", "tokyo", "kyoto", "osaka", "ramen", "sushi",
            "voyage", "corse", "valloire", "strasbourg", "valence",
        ]
    ):
        return "japon_voyages"

    if any(
        k in t
        for k in [
            "vald", "orelsan", "stromae", "lujipeka", "hoshi", "ben mazué",
            "bigflo", "lomepal", "angèle", "damso", "nekfeu", "daho", "balavoine",
            "aznavour", "goldman", "cabrel", "brel", "brassens", "indochine",
            "daft punk", "clip officiel", "official music video", "lyrics",
            "paroles", "concert", "live performance", "chanson", "album", "ost ",
            "soundtrack", "l'impératrice", "therapie taxi", "casseurs flowters",
            "clara luciani", "solann", "sam sauvage", "renaud", "souchon", "bénabar",
        ]
    ):
        return "musique"

    if any(
        k in t
        for k in [
            "zelda", "minecraft", "dofus", "skyrim", "fallout", "elden ring",
            "baldur", "valheim", "foxhole", "overwatch", "hearthstone",
            "age of empires", "aoe2", "civilization", "starcraft", "warcraft",
            "league of legends", "valorant", "csgo", "cs2", "gta", "red dead",
            "witcher", "cyberpunk", "dark souls", "sekiro", "hollow knight",
            "mario", "nintendo", "switch", "ps5", "xbox", "steam", "twitch",
            "speedrun", "let's play", "gameplay", "walkthrough", "joueur du grenier",
            "jdg", "wankil", "laink", "terracid", "antoine daniel", "zerator",
            "squeezie", "kameto", "gotaga", "mistermv", "bob lennon", "fantasio",
            "holycube", "gamer", "gaming", "rpg", "mmorpg", "boss",
        ]
    ):
        return "gaming_twitch"

    if any(
        k in t
        for k in [
            "actualité", "info", "journal", "reportage", "documentaire",
            "politique", "macron", "trump", "ukraine", "russie", "europe 1",
            "le parisien", "konbini", "brut", "m6", "arte", "france 2", "enquete", "enquête",
        ]
    ):
        return "actu_societe"

    return "cinema_humour"


def parse_dur(s: str) -> int:
    if not s or not isinstance(s, str):
        return 0
    parts = [int(p) for p in s.strip().split(":") if p.isdigit()]
    if len(parts) == 3:
        return parts[0] * 3600 + parts[1] * 60 + parts[2]
    if len(parts) == 2:
        return parts[0] * 60 + parts[1]
    if len(parts) == 1:
        return parts[0]
    return 0


def fmt_dur(sec: int) -> str:
    sec = int(round(sec))
    if sec <= 0:
        return "—"
    h = sec // 3600
    m = (sec % 3600) // 60
    s = sec % 60
    if h > 0:
        return f"{h}:{m:02d}:{s:02d}"
    return f"{m}:{s:02d}"


ERAS = [
    {
        "id": "era_2011_2014",
        "period": "2011 – 2014",
        "years": [2011, 2012, 2013, 2014],
        "title": "L'Âge d'Or des Pionniers : Minecraft, Fanta & Bob, JDG et Débuts en Médecine",
        "subtitle": "Les fondations du compte YouTube (Octobre 2011)",
        "badge": "Chapitre I",
        "color": "#3b82f6",
        "narrative": (
            "Tout commence le 11 octobre 2011 à 20h12 avec le 'Fanta Bob Show Adventure - Ep 5' (15 min 47 s). "
            "Cette première grande époque est dominée à plus de 90% par l'âge d'or du gaming francophone et anglophone : "
            "TheFantasio974 & Bob Lennon (Freestyle Fanta Show, Pixelmon, HolyCube UHC, Fallout 3, Skyrim), The Yogscast (MoonQuest, YogLabs), "
            "les premiers épisodes cultes du Joueur du Grenier (Home Alone, RPG #2, Young Indiana Jones) et les sketchs de Studio Bagel, Mister V et Squeezie. "
            "Dès le 18 mai 2012 apparaît déjà le tout premier marqueur médical : l'abonnement à la chaîne 'chirurgiedusport'."
        ),
    },
    {
        "id": "era_2015_2018",
        "period": "2015 – 2018",
        "years": [2015, 2016, 2017, 2018],
        "title": "L'Ère Hardware, PC Building, Overwatch, Dofus & Vulgarisation",
        "subtitle": "L'essor de la Tech US, du Bazar du Grenier et des sciences",
        "badge": "Chapitre II",
        "color": "#06b6d4",
        "narrative": (
            "Entre 2015 et 2018, vos centres d'intérêt s'élargissent fortement vers le hardware et la tech anglophone "
            "(Linus Tech Tips, Unbox Therapy, TechSource, Jonathan Morrison, The Verge) ainsi que la vulgarisation scientifique et historique "
            "(Nota Bene, DirtyBiology, e-penser, Vsauce, Poisson Fécond). Côté gaming, les Let's Play narratifs du Bazar du Grenier (Civilization V, Endless Space 2), "
            "Overwatch, Hearthstone et le PvP Dofus (Humility, Kolirush) côtoient Benzaie (Hard Corner), AVGN, JonTron et PewDiePie."
        ),
    },
    {
        "id": "era_2019_2021",
        "period": "2019 – 2021",
        "years": [2019, 2020, 2021],
        "title": "Dofus Rétro, Bull Run Crypto & Éclosion Rap FR / Pop",
        "subtitle": "L'arrivée de l'historique complet et la vague Bitcoin / Altcoins",
        "badge": "Chapitre III",
        "color": "#f59e0b",
        "narrative": (
            "À partir de 2019-2020, trois nouveaux piliers s'installent durablement : "
            "1) Le cycle Crypto & Macro-Finance (Benjamin Cowen, Altcoin Daily, Coin Compass, XRP/Ledger, QuickSwap) ; "
            "2) L'explosion musicale avec Vald ('Désaccordé', 'Résidus'), Lujipeka, Angèle, L'Impératrice et La Femme ; "
            "3) L'ouverture sur le Japon avec Tev - Ici Japon, accompagnée de l'aventure Dofus Rétro / Monocompte et des premières vidéos Formule 1."
        ),
    },
    {
        "id": "era_2022_2023",
        "period": "2022 – 2023",
        "years": [2022, 2023],
        "title": "L'Apogée YouTube Music, l'Histoire Médiévale & les Grands Lives Twitch",
        "subtitle": "4 830 heures de visionnage réel : VODs Wankil, JDG, Antoine Daniel, Vald & Orelsan",
        "badge": "Chapitre IV",
        "color": "#a855f7",
        "narrative": (
            "En 2022-2023, vous cumulez 4 830 heures de temps réel passé sur YouTube et YouTube Music (6,6 h/jour en moyenne, VODs en fond et musique comprises) : "
            "Bazar du Grenier, Best Of du Grenier, Wankil Studio et Antoine Daniel dominent le temps d'écoute en heures, tandis que Vald, Orelsan, Lujipeka, Hoshi, Stromae et Ben Mazué tournent en boucle sur YouTube Music."
        ),
    },
    {
        "id": "era_2024_2025",
        "period": "2024 – 2025",
        "years": [2024, 2025],
        "title": "VODs Fleuves, Sketchs & Cinéma, Pokémon TCG, Running & Radiologie SIMS",
        "subtitle": "5 101 heures de visionnage réel : Antoine Daniel, AlphaTeam, Insym, VLDL & Chaîne MrThomaslef",
        "badge": "Chapitre V",
        "color": "#f97316",
        "narrative": (
            "En 2024 et 2025, le temps réel passé atteint 5 101 heures (2 721 h en 2024 et 2 381 h en 2025). "
            "En temps passé, les grandes VODs (Antoine Daniel, AlphaTeam/AlphaReplay, Insym, Wankil, Bazar du Grenier) et les analyses de Benjamin Cowen / Crypto Le Trône représentent le cœur des heures d'écoute, "
            "tandis que votre chaîne 'MrThomaslef' centralise vos cours de radiologie ostéo-articulaire de la SIMS (hanche, genou, cheville, ongle)."
        ),
    },
    {
        "id": "era_2026",
        "period": "2026",
        "years": [2026],
        "title": "Papa d'Émile, Agents IA & Mac Mini M4 Gaming, Géopolitique & Webinaires Cochin",
        "subtitle": "2 055 heures de visionnage réel en 2026 : entre Peppa Pig (74 h), IA locale, Histoire et Imagerie MSK",
        "badge": "Chapitre VI",
        "color": "#10b981",
        "narrative": (
            "En 2026 (2 055 heures de temps réel passé), votre historique YouTube reflète fidèlement votre quotidien : "
            "plus de 74 heures sur Peppa Pig, Petit Ours Brun, Trotro et Didou pour Émile, "
            "vos webinaires de radiologie ostéo-articulaire à Cochin (Syndrome de Morton Sept 2026, DIU Genou/Épaule/Pied sur MrThomaslef), "
            "vos recherches sur les agents IA locaux (Claude Code, DeepSeek) et le gaming sur Mac Mini M4 / Switch 2."
        ),
    },
]


def main() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    liked_meta_path = RAW_CACHE_DIR / "liked_videos_meta.json"
    liked_meta = {}
    if liked_meta_path.exists():
        with open(liked_meta_path, encoding="utf-8") as f:
            liked_meta = json.load(f)

    sources = [
        ("watch_search", RAW_CACHE_DIR / "youtube_raw_history.json"),
        ("likes", RAW_CACHE_DIR / "youtube_likes.json"),
        ("subscriptions", RAW_CACHE_DIR / "youtube_subscriptions.json"),
        ("comments", RAW_CACHE_DIR / "youtube_comments.json"),
        ("comment_likes", RAW_CACHE_DIR / "youtube_comment_likes.json"),
        ("live_chat", RAW_CACHE_DIR / "youtube_live_chat.json"),
        ("posts", RAW_CACHE_DIR / "youtube_posts_activity.json"),
        ("hype", RAW_CACHE_DIR / "youtube_video_hype.json"),
        ("sharing", RAW_CACHE_DIR / "youtube_sharing_activity.json"),
    ]

    seen_ids = set()
    records = []

    for src, path in sources:
        if not path.exists():
            continue
        with open(path, encoding="utf-8") as f:
            items = json.load(f)
        for it in items:
            uid = f"{src}:{it[5]}:{it[4]}"
            if uid in seen_ids:
                continue
            seen_ids.add(uid)
            ts = it[4] / 1e6
            dt = datetime.datetime.fromtimestamp(ts)
            title_blk = it[9] if len(it) > 9 and it[9] else []
            title = (title_blk[0] if len(title_blk) > 0 else "") or ""
            action = (title_blk[2] if len(title_blk) > 2 else src) or src
            url = (title_blk[3] if len(title_blk) > 3 else "") or ""
            channel_blk = it[32] if len(it) > 32 and it[32] else []
            channel_name = (channel_blk[0][1] if channel_blk and len(channel_blk[0]) > 1 else "") or ""
            channel_url = (channel_blk[0][3] if channel_blk and len(channel_blk[0]) > 3 else "") or ""
            thumb_blk = it[23] if len(it) > 23 and it[23] else []
            thumb = (thumb_blk[0] if len(thumb_blk) > 0 else "") or ""
            duration_str = (thumb_blk[1] if len(thumb_blk) > 1 else "") or ""
            watch_pct = thumb_blk[2] if len(thumb_blk) > 2 else None
            product = (it[7][0] if len(it) > 7 and it[7] else "YouTube") or "YouTube"
            platform = (it[19][0][0] if len(it) > 19 and it[19] and it[19][0] else "") or ""

            dur_sec = parse_dur(duration_str)
            m_vid = re.search(r"v=([a-zA-Z0-9_-]{11})", url)
            vid_id = m_vid.group(1) if m_vid else ""

            if dur_sec == 0 and vid_id and vid_id in liked_meta:
                lm = liked_meta[vid_id]
                if lm.get("dur_sec", 0) > 0:
                    dur_sec = int(lm["dur_sec"])
                    duration_str = fmt_dur(dur_sec)
                if not channel_name and lm.get("channel"):
                    channel_name = lm["channel"]
                if (not title or title.startswith("http")) and lm.get("title"):
                    title = lm["title"]

            if not title and url:
                title = url

            theme_id = classify(title, channel_name, action, product)

            alow = action.lower()
            if "regard" in alow:
                atype = "watch"
            elif "recherch" in alow:
                atype = "search"
            elif "aimé" in alow and "n'a pas" not in alow:
                atype = "like"
            elif "n'a pas aimé" in alow:
                atype = "dislike"
            elif "abonné" in alow:
                atype = "subscribe"
            elif "consult" in alow:
                atype = "browse"
            elif src == "comments":
                atype = "comment"
            else:
                atype = src

            records.append(
                {
                    "ts": ts,
                    "dt": dt.strftime("%Y-%m-%d %H:%M"),
                    "date": dt.strftime("%Y-%m-%d"),
                    "year": dt.year,
                    "month": dt.strftime("%Y-%m"),
                    "hour": dt.hour,
                    "weekday": dt.weekday(),
                    "title": title,
                    "channel": channel_name,
                    "channel_url": channel_url,
                    "url": url,
                    "vid_id": vid_id,
                    "thumb": thumb,
                    "duration": duration_str,
                    "dur_sec": dur_sec,
                    "watch_pct": watch_pct,
                    "action": action,
                    "atype": atype,
                    "product": "YouTube Music" if "Music" in product else "YouTube",
                    "platform": platform,
                    "theme": theme_id,
                }
            )

    # Sort strictly chronologically (oldest -> newest)
    records.sort(key=lambda r: r["ts"])

    # Compute exact watch time for every record
    # First collect indices of video events (watch or pre-2021 like)
    video_indices = [
        i
        for i, r in enumerate(records)
        if r["atype"] == "watch" or (r["atype"] == "like" and r["year"] <= 2020)
    ]

    total_raw_dur_sec = 0.0
    total_pct_dur_sec = 0.0
    total_real_watch_sec = 0.0

    for pos, idx in enumerate(video_indices):
        r = records[idx]
        dur = float(r["dur_sec"] or 0)
        pct = r["watch_pct"]
        total_raw_dur_sec += dur

        if dur > 0:
            if pct is not None and 0 < pct <= 100:
                est = dur * (float(pct) / 100.0)
            else:
                est = dur
        else:
            est = 0.0

        total_pct_dur_sec += est

        # Cap by time delta until the next video watched if applicable
        if r["atype"] == "watch" and pos + 1 < len(video_indices):
            next_r = records[video_indices[pos + 1]]
            gap = max(0.0, next_r["ts"] - r["ts"])
            if 0 < gap < est:
                real_sec = gap
            else:
                real_sec = est
        else:
            real_sec = est

        r["real_sec"] = int(round(real_sec))
        total_real_watch_sec += real_sec

    for r in records:
        if "real_sec" not in r:
            r["real_sec"] = 0

    years = sorted({r["year"] for r in records})

    # 1. Theme stats (both event counts AND real watch hours)
    theme_stats = {}
    for th in THEMES:
        tid = th["id"]
        t_recs = [r for r in records if r["theme"] == tid]
        if not t_recs:
            continue
        by_y_cnt = collections.Counter(r["year"] for r in t_recs)
        by_y_sec = collections.Counter()
        ch_cnt = collections.Counter()
        ch_sec = collections.Counter()
        for r in t_recs:
            by_y_sec[r["year"]] += r["real_sec"]
            if r["channel"]:
                ch_cnt[r["channel"]] += 1
                ch_sec[r["channel"]] += r["real_sec"]

        searches = [r["title"] for r in t_recs if r["atype"] == "search" and r["title"]]
        search_counter = collections.Counter(s.lower().strip() for s in searches)

        t_watch_sec = sum(r["real_sec"] for r in t_recs)
        t_raw_sec = sum(r["dur_sec"] for r in t_recs)

        first_item = t_recs[0]
        last_item = t_recs[-1]

        by_year_samples = []
        seen_titles = set()
        for y in sorted(by_y_cnt, reverse=True):
            y_watches = [
                r
                for r in t_recs
                if r["year"] == y
                and r["atype"] == "watch"
                and not r["title"].startswith("http")
            ]
            y_Pool = y_watches if y_watches else [
                r
                for r in t_recs
                if r["year"] == y
                and r["atype"] in ("like", "subscribe")
                and not r["title"].startswith("http")
            ]
            y_Pool.sort(
                key=lambda x: (-x["real_sec"], x["ts"])
            )
            picked = 0
            for cand in y_Pool:
                key = (cand["title"][:40].lower(), cand["channel"].lower())
                if key in seen_titles:
                    continue
                seen_titles.add(key)
                by_year_samples.append(
                    {
                        "year": y,
                        "date": cand["date"],
                        "title": cand["title"][:110],
                        "channel": cand["channel"],
                        "url": cand["url"],
                        "dur": cand["duration"],
                        "real_dur": fmt_dur(cand["real_sec"]),
                        "real_sec": cand["real_sec"],
                        "pct": cand["watch_pct"],
                        "atype": cand["atype"],
                    }
                )
                picked += 1
                if picked >= (3 if y >= 2021 else 1):
                    break

        peak_year = by_y_sec.most_common(1)[0][0] if sum(by_y_sec.values()) > 0 else by_y_cnt.most_common(1)[0][0]

        # Top channels sorted by real watch time (or count if 0 sec)
        top_ch_by_time = sorted(
            ch_cnt.keys(),
            key=lambda k: (ch_sec[k], ch_cnt[k]),
            reverse=True,
        )[:15]

        theme_stats[tid] = {
            **th,
            "count": len(t_recs),
            "pct": round(len(t_recs) / len(records) * 100, 2),
            "watch_hours": round(t_watch_sec / 3600.0, 1),
            "raw_hours": round(t_raw_sec / 3600.0, 1),
            "watch_pct_share": round(t_watch_sec / max(1.0, total_real_watch_sec) * 100, 2),
            "first_date": first_item["date"],
            "first_year": first_item["year"],
            "first_item": {
                "date": first_item["date"],
                "title": first_item["title"][:110],
                "channel": first_item["channel"],
                "url": first_item["url"],
                "dur": first_item["duration"],
                "atype": first_item["atype"],
            },
            "last_date": last_item["date"],
            "last_item": {
                "date": last_item["date"],
                "title": last_item["title"][:110],
                "channel": last_item["channel"],
                "url": last_item["url"],
                "dur": last_item["duration"],
                "atype": last_item["atype"],
            },
            "peak_year": peak_year,
            "by_year": {str(y): by_y_cnt.get(y, 0) for y in years},
            "by_year_hours": {str(y): round(by_y_sec.get(y, 0) / 3600.0, 1) for y in years},
            "top_channels": [
                {
                    "name": k,
                    "count": ch_cnt[k],
                    "hours": round(ch_sec[k] / 3600.0, 1),
                }
                for k in top_ch_by_time
            ],
            "top_searches": [
                {"query": k, "count": v} for k, v in search_counter.most_common(12)
            ],
            "chronological_samples": by_year_samples,
        }

    # 2. Year-by-year breakdown with exact watch hours
    yearly_breakdown = []
    for y in years:
        y_recs = [r for r in records if r["year"] == y]
        y_watch_sec = sum(r["real_sec"] for r in y_recs)
        y_raw_sec = sum(r["dur_sec"] for r in y_recs)
        th_cnt = collections.Counter(r["theme"] for r in y_recs)
        th_sec = collections.Counter()
        ch_cnt = collections.Counter()
        ch_sec = collections.Counter()
        for r in y_recs:
            th_sec[r["theme"]] += r["real_sec"]
            if r["channel"]:
                ch_cnt[r["channel"]] += 1
                ch_sec[r["channel"]] += r["real_sec"]

        srch_cnt = collections.Counter(
            r["title"].lower().strip()
            for r in y_recs
            if r["atype"] == "search" and r["title"]
        )
        subs_recs = [r for r in y_recs if r["atype"] == "subscribe"]

        # Longest watched videos in that year
        top_watched_vids = sorted(
            [r for r in y_recs if r["real_sec"] > 0 and not r["title"].startswith("http")],
            key=lambda x: x["real_sec"],
            reverse=True,
        )[:15]

        highlights = []
        seen_h = set()
        for cand in top_watched_vids + y_recs[:: max(1, len(y_recs) // 20)]:
            if cand["title"].startswith("http"):
                continue
            k = cand["title"][:35].lower()
            if k in seen_h:
                continue
            seen_h.add(k)
            highlights.append(
                {
                    "date": cand["date"],
                    "title": cand["title"][:100],
                    "channel": cand["channel"],
                    "theme": cand["theme"],
                    "atype": cand["atype"],
                    "url": cand["url"],
                    "dur": cand["duration"],
                    "real_dur": fmt_dur(cand["real_sec"]),
                    "real_sec": cand["real_sec"],
                    "pct": cand["watch_pct"],
                }
            )
            if len(highlights) >= 16:
                break

        highlights.sort(key=lambda x: x["date"])

        top_chs = sorted(
            ch_cnt.keys(),
            key=lambda k: (ch_sec[k], ch_cnt[k]),
            reverse=True,
        )[:14]

        yearly_breakdown.append(
            {
                "year": y,
                "total": len(y_recs),
                "watch_hours": round(y_watch_sec / 3600.0, 1),
                "raw_hours": round(y_raw_sec / 3600.0, 1),
                "watch_days": round(y_watch_sec / 86400.0, 1),
                "daily_avg_hours": round((y_watch_sec / 3600.0) / 365.0, 2),
                "watches": sum(1 for r in y_recs if r["atype"] == "watch"),
                "searches": sum(1 for r in y_recs if r["atype"] == "search"),
                "likes": sum(1 for r in y_recs if r["atype"] == "like"),
                "subscribes": len(subs_recs),
                "music_count": sum(1 for r in y_recs if r["product"] == "YouTube Music"),
                "themes": [
                    {
                        "id": tid,
                        "count": cnt,
                        "hours": round(th_sec[tid] / 3600.0, 1),
                        "pct": round(cnt / len(y_recs) * 100, 1),
                        "hours_pct": round(th_sec[tid] / max(1, y_watch_sec) * 100, 1),
                    }
                    for tid, cnt in sorted(
                        th_cnt.items(),
                        key=lambda kv: (th_sec[kv[0]], kv[1]),
                        reverse=True,
                    )
                ],
                "top_channels": [
                    {
                        "name": k,
                        "count": ch_cnt[k],
                        "hours": round(ch_sec[k] / 3600.0, 1),
                        "theme": classify("", k, "watch", "YouTube"),
                    }
                    for k in top_chs
                ],
                "top_searches": [
                    {"query": k, "count": v} for k, v in srch_cnt.most_common(10)
                ],
                "subscriptions_added": [
                    {"date": s["date"], "channel": s["title"], "url": s["url"]}
                    for s in subs_recs[:15]
                ],
                "highlights": highlights,
            }
        )

    # 3. Enrich ERAS with watch-time stats
    enriched_eras = []
    for era in ERAS:
        e_years = set(era["years"])
        e_recs = [r for r in records if r["year"] in e_years]
        e_watch_sec = sum(r["real_sec"] for r in e_recs)
        th_cnt = collections.Counter(r["theme"] for r in e_recs)
        th_sec = collections.Counter()
        ch_cnt = collections.Counter()
        ch_sec = collections.Counter()
        for r in e_recs:
            th_sec[r["theme"]] += r["real_sec"]
            if r["channel"]:
                ch_cnt[r["channel"]] += 1
                ch_sec[r["channel"]] += r["real_sec"]

        watches_pool = [
            r
            for r in e_recs
            if r["atype"] == "watch"
            and not r["title"].startswith("http")
            and r["real_sec"] > 0
        ]
        watches_pool.sort(key=lambda x: (-x["real_sec"], x["ts"]))
        likes_pool = [
            r
            for r in e_recs
            if r["atype"] in ("like", "subscribe")
            and not r["title"].startswith("http")
        ]
        priority_pool = watches_pool[:80] if len(watches_pool) >= 12 else (watches_pool + likes_pool)
        step = max(1, len(priority_pool) // 16)
        milestones = []
        seen_m = set()
        for cand in priority_pool[::step]:
            k = cand["title"][:35].lower()
            if k in seen_m:
                continue
            seen_m.add(k)
            milestones.append(
                {
                    "date": cand["date"],
                    "title": cand["title"][:100],
                    "channel": cand["channel"],
                    "theme": cand["theme"],
                    "atype": cand["atype"],
                    "url": cand["url"],
                    "dur": cand["duration"],
                    "real_dur": fmt_dur(cand["real_sec"]),
                }
            )
            if len(milestones) >= 12:
                break

        top_chs = sorted(
            ch_cnt.keys(),
            key=lambda k: (ch_sec[k], ch_cnt[k]),
            reverse=True,
        )[:10]

        enriched_eras.append(
            {
                **era,
                "total_events": len(e_recs),
                "watch_hours": round(e_watch_sec / 3600.0, 1),
                "top_themes": [
                    {
                        "id": tid,
                        "count": cnt,
                        "hours": round(th_sec[tid] / 3600.0, 1),
                        "pct": round(cnt / max(1, len(e_recs)) * 100, 1),
                    }
                    for tid, cnt in th_cnt.most_common(6)
                ],
                "top_channels": [
                    {
                        "name": k,
                        "count": ch_cnt[k],
                        "hours": round(ch_sec[k] / 3600.0, 1),
                        "theme": classify("", k, "watch", "YouTube"),
                    }
                    for k in top_chs
                ],
                "milestones": milestones,
            }
        )

    # 4. Global channels & rhythms (both counts and hours)
    hour_cnt = collections.Counter()
    hour_sec = collections.Counter()
    weekday_cnt = collections.Counter()
    weekday_sec = collections.Counter()
    overall_ch_cnt = collections.Counter()
    overall_ch_sec = collections.Counter()

    for r in records:
        hour_cnt[r["hour"]] += 1
        hour_sec[r["hour"]] += r["real_sec"]
        weekday_cnt[r["weekday"]] += 1
        weekday_sec[r["weekday"]] += r["real_sec"]
        if r["channel"]:
            overall_ch_cnt[r["channel"]] += 1
            overall_ch_sec[r["channel"]] += r["real_sec"]

    top_ch_by_hours = sorted(
        overall_ch_cnt.keys(),
        key=lambda k: overall_ch_sec[k],
        reverse=True,
    )[:100]

    top_ch_by_count = [k for k, _ in overall_ch_cnt.most_common(100)]

    all_subs = [
        {
            "date": r["date"],
            "year": r["year"],
            "channel": r["title"],
            "url": r["url"],
            "theme": classify(r["title"], r["title"], "subscribe", "YouTube"),
        }
        for r in records
        if r["atype"] == "subscribe"
    ]

    payload = {
        "generated_at": datetime.datetime.now().strftime("%Y-%m-%d %H:%M"),
        "account_email": "blopdu94@gmail.com",
        "channel_owner": "Dr Thomas Lefèvre (MrThomaslef)",
        "summary": {
            "total_events": len(records),
            "total_watches": sum(1 for r in records if r["atype"] == "watch"),
            "total_searches": sum(1 for r in records if r["atype"] == "search"),
            "total_likes": sum(1 for r in records if r["atype"] == "like"),
            "total_subscriptions": len(all_subs),
            "total_comments": sum(1 for r in records if r["atype"] == "comment"),
            "total_music": sum(1 for r in records if r["product"] == "YouTube Music"),
            "unique_channels": len(overall_ch_cnt),
            "total_real_watch_hours": round(total_real_watch_sec / 3600.0, 1),
            "total_real_watch_days": round(total_real_watch_sec / 86400.0, 1),
            "total_pct_watch_hours": round(total_pct_dur_sec / 3600.0, 1),
            "total_raw_video_hours": round(total_raw_dur_sec / 3600.0, 1),
            "videos_with_duration": sum(1 for r in records if r["dur_sec"] > 0),
            "videos_with_red_bar_pct": sum(1 for r in records if r["watch_pct"] is not None),
            "first_event_date": records[0]["dt"],
            "first_event_title": records[0]["title"],
            "first_event_channel": records[0]["channel"],
            "last_event_date": records[-1]["dt"],
            "years_span": len(years),
            "years": years,
        },
        "themes": [theme_stats[th["id"]] for th in THEMES if th["id"] in theme_stats],
        "eras": enriched_eras,
        "yearly": yearly_breakdown,
        "rhythms": {
            "by_hour": [hour_cnt.get(h, 0) for h in range(24)],
            "by_hour_hours": [round(hour_sec.get(h, 0) / 3600.0, 1) for h in range(24)],
            "by_weekday": [weekday_cnt.get(w, 0) for w in range(7)],
            "by_weekday_hours": [round(weekday_sec.get(w, 0) / 3600.0, 1) for w in range(7)],
        },
        "top_channels_by_hours": [
            {
                "name": k,
                "count": overall_ch_cnt[k],
                "hours": round(overall_ch_sec[k] / 3600.0, 1),
                "theme": classify("", k, "watch", "YouTube"),
            }
            for k in top_ch_by_hours
        ],
        "top_channels_by_count": [
            {
                "name": k,
                "count": overall_ch_cnt[k],
                "hours": round(overall_ch_sec[k] / 3600.0, 1),
                "theme": classify("", k, "watch", "YouTube"),
            }
            for k in top_ch_by_count
        ],
        "subscriptions_chronological": all_subs,
    }

    js_path = DATA_DIR / "youtube_stats.js"
    with open(js_path, "w", encoding="utf-8") as f:
        f.write("window.YOUTUBE_HISTORY_DATA = ")
        json.dump(payload, f, ensure_ascii=False, separators=(",", ":"))
        f.write(";\n")

    # Write ALL 145,740 chronological records in a compact array format so the user has the 100% real, unfiltered video history!
    # Format per row: [datetime_str, action_code, title, channel, duration_str, real_sec, watch_pct_or_null, theme_id, video_id_or_url]
    ACTION_CODE = {
        "watch": 0,
        "search": 1,
        "like": 2,
        "subscribe": 3,
        "comment": 4,
        "browse": 5,
        "dislike": 6,
    }
    THEME_INDEX = {th["id"]: idx for idx, th in enumerate(THEMES)}

    full_rows = []
    for r in records:
        ac = ACTION_CODE.get(r["atype"], 4)
        ti = THEME_INDEX.get(r["theme"], 0)
        vid_or_url = r["vid_id"] if r["vid_id"] else r["url"]
        full_rows.append(
            [
                r["dt"],
                ac,
                r["title"][:120],
                r["channel"][:55],
                r["duration"],
                r["real_sec"],
                r["watch_pct"] if r["watch_pct"] is not None else -1,
                ti,
                vid_or_url,
            ]
        )

    full_js_path = DATA_DIR / "youtube_full_history.js"
    with open(full_js_path, "w", encoding="utf-8") as f:
        f.write("window.YOUTUBE_FULL_HISTORY = ")
        json.dump(full_rows, f, ensure_ascii=False, separators=(",", ":"))
        f.write(";\n")

    print(f"Wrote {js_path} ({js_path.stat().st_size / 1024:.1f} KB)")
    print(f"Wrote {full_js_path} ({full_js_path.stat().st_size / (1024*1024):.2f} MB) with ALL {len(full_rows)} records!")


if __name__ == "__main__":
    main()
