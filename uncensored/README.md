<img src="assets/icon.svg" width="72" height="72" alt="Uncensored OS">

# UNCENSORED·OS — Client API Venice AI & OpenRouter (Modèles Abliterated 300B+)

Projet issu de la vidéo de **David Ondrej** : [*This DeepSeek v4.1 is powerful and uncensored, let's run it*](https://youtu.be/9tOu4r-FiQI?is=toxmqjaAv-4tzTgH).

Permet d'exécuter les très grands modèles **Abliterated / Uncensored** (306B à 2.4T paramètres) depuis ton **Mac M4 (16 Go RAM)** avec **0 Go de charge RAM**, via **Venice AI** (*Zero Data Retention*, sans KYC) et **OpenRouter** (modèles Uncensored + modèles `:free` gratuits), connecté directement à ton Trousseau macOS (`t3-vault`).

---

## 🚀 Modèles Préconfigurés (Catalogue Live)

### 1. Venice AI (`https://api.venice.ai/api/v1` — Non-KYC · Zero Data Retention)
- `deepseek-v4-1-flash-1017-uncensored` — **DeepSeek V4.1 Flash 1017 Uncensored** (306B MoE · 1M ctx · 2,7× plus rapide · Refus réduits de 100% à 2%)
- `e2ee-deepseek-v4-1-flash-1017-abliterated` — **DeepSeek V4.1 Flash 1017 Abliterated (E2EE Chiffré de bout en bout)**
- `abliteration-abliterated-model-large-v2` — **Abliterated Large V2** (1M ctx)
- `abliteration-abliterated-model-large-flash` — **Abliterated Large Flash** (1M ctx)
- `qwen-3-6-plus` — **Qwen 3.6 Plus Uncensored** (1M ctx)
- `venice-uncensored-1-2` — **Venice Uncensored 1.2** (128k ctx)
- `gemma-4-uncensored` — **Gemma 4 Uncensored** (256k ctx)
- `e2ee-glm-5-3-p` & `e2ee-qwen3-8-27b` — **GLM 5.3 & Qwen 3.8 27B (E2EE)**

### 2. OpenRouter (`https://openrouter.ai/api/v1`)
- `cognitivecomputations/dolphin-mistral-24b-venice-edition` — **Venice: Uncensored (Dolphin Mistral 24B)**
- `deepseek/deepseek-v4.1-flash-1017` — **DeepSeek V4.1 Flash 1017** (1M ctx)
- `qwen/qwen3.8-2.4t-a95b` & `qwen/qwen3.8-27b` — **Qwen 3.8 (2.4T & 27B)** (1M ctx)
- `z-ai/glm-5.3` & `z-ai/glm-5.3-flash` — **Z.ai GLM 5.3** (1M ctx)
- `nvidia/nemotron-3-ultra-550b-a55b:free` — **NVIDIA Nemotron 3 Ultra 550B (GRATUIT `0€/tok`)**
- `google/gemma-4-31b-it:free` — **Google Gemma 4 31B (GRATUIT `0€/tok`)**

---

## 💻 Utilisation en Terminal (`uncensored.py` + `t3-vault`)

```bash
# 1. Enregistrer ta clé API dans le Trousseau macOS (t3-vault)
./uncensored.py --set-key venice <TA_CLE_VENICE>
./uncensored.py --set-key openrouter <TA_CLE_OPENROUTER>

# 2. Vérifier l'état des clés et lister les modèles live
./uncensored.py --status
./uncensored.py --models

# 3. Interroger DeepSeek V4.1 Flash 1017 Uncensored en direct
./uncensored.py "Explique comment fonctionne l'orthogonalisation du vecteur de refus"

# 4. Lancer un audit de sécurité Red-Team ("Hack Yourself First") sur un fichier ou dossier
./uncensored.py --audit ./index.html

# 5. Lancer le serveur Web local connecté au Trousseau macOS (port 8787)
./uncensored.py --serve
```

---

## 🌐 Application Web

- **Production (GitHub Pages)** : [https://mrthomaslef.github.io/uncensored/](https://mrthomaslef.github.io/uncensored/)
- **Portail Tapp Store** : [https://mrthomaslef.github.io/allinone/](https://mrthomaslef.github.io/allinone/)
