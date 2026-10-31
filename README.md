<p align="center">
  <img src="assets/logo.jpg" width="110" height="110" style="border-radius: 26px;" alt="All-In-One Nexus Logo" />
</p>

<h1 align="center">All-In-One • Hub Mobile Projets &amp; GitHub</h1>

<p align="center">
  Portail mobile unifié (PWA) regroupant l'ensemble des applications en production et dépôts GitHub de <strong>Thomas Lefèvre (<a href="https://github.com/Mrthomaslef">@Mrthomaslef</a>)</strong>, organisés par catégories avec synchronisation GitHub en temps réel.
</p>

---

## Catégories & Projets Intégrés

### 1. 🩻 Imagerie & Radiologie (Hôpital Cochin)
| Application | Description | Production | Code GitHub |
| :--- | :--- | :--- | :--- |
| **BiblioOstéo Cochin** | Portail bibliographique & résumés cliniques (RI & Ostéo-Articulaire) | [Ouvrir](https://mrthomaslef.github.io/biblioosteo/) | [Repo](https://github.com/Mrthomaslef/biblioosteo) |
| **Cochin RI — Agenda** | Planning & agenda de Radiologie Interventionnelle (Cochin Radio B) | [Ouvrir](https://mrthomaslef.github.io/agenda-cochin/) | [Repo](https://github.com/Mrthomaslef/agenda-cochin) |
| **QUIZ Cochin (Radio-Thomas)** | Quiz interactif d'imagerie musculosquelettique (Vercel) | [Ouvrir](https://radio-thomas-ten.vercel.app) | [Repo](https://github.com/Mrthomaslef/radio-thomas) |
| **TPack PACS — DICOM Viewer** | Console PACS pédagogique d'imagerie médicale | [Ouvrir](https://mrthomaslef.github.io/dicomviewer/) | [Repo](https://github.com/Mrthomaslef/dicomviewer) |
| **TPack Cases (.tpack)** | Banque de cas cliniques d'imagerie médicale | [Ouvrir](https://mrthomaslef.github.io/tpack-cases/) | [Repo](https://github.com/Mrthomaslef/tpack-cases) |

### 2. 🧮 Calculateurs & Scores Cliniques
| Application | Description | Production | Code GitHub |
| :--- | :--- | :--- | :--- |
| **TomatoCalc.** | Calculateurs médicaux, scores cliniques & classifications | [Ouvrir](https://mrthomaslef.github.io/Tomatocalc/) | [Repo](https://github.com/Mrthomaslef/Tomatocalc) |
| **MediCalc** | Suite rapide de calculateurs médicaux et aide clinique | [Ouvrir](https://mrthomaslef.github.io/Medicalc/) | [Repo](https://github.com/Mrthomaslef/Medicalc) |

### 3. 📦 Quotidien & Vie Pratique
| Application | Description | Production | Code GitHub |
| :--- | :--- | :--- | :--- |
| **ColisTrack PWA** | Suivi de livraisons & colis en temps réel (verrouillé par PIN) | [Ouvrir](https://mrthomaslef.github.io/colistrack/) | [Repo](https://github.com/Mrthomaslef/colistrack) |
| **AssMat — Paie & Pajemploi** | Calculateur de rémunération, présence, bulletin de salaire & Pajemploi | [Ouvrir](https://mrthomaslef.github.io/assistante-maternelle/) | [Repo](https://github.com/Mrthomaslef/assistante-maternelle) |

### 4. 🎮 Jeux, Famille & Souvenirs
| Application | Description | Production | Code GitHub |
| :--- | :--- | :--- | :--- |
| **QUIZ du 7TER — Trentenaires** | Grand Quiz Show multijoueur local (4 joueurs / 2 couples • 300 questions) | [Ouvrir](https://mrthomaslef.github.io/quiz-trentenaires/) | [Repo](https://github.com/Mrthomaslef/quiz-trentenaires) |
| **milTCG — Pocket TCG Family** | Collection de cartes & ouverture de boosters thématiques en famille | [Ouvrir](https://mrthomaslef.github.io/pocket-tcg-family/) | [Repo](https://github.com/Mrthomaslef/pocket-tcg-family) |
| **Holidamn** | Portail vidéo & archives chronologiques de souvenirs de vacances | [Ouvrir](https://mrthomaslef.github.io/Holidamn/) | [Repo](https://github.com/Mrthomaslef/Holidamn) |

---

## Fonctionnalités Mobile-First
- **Logo sur-mesure & PWA installable** (`manifest.json` + `apple-touch-icon`) pour l'ajouter directement sur l'écran d'accueil iPhone/Android.
- **Synchronisation GitHub en direct** via l'API publique `api.github.com/users/Mrthomaslef/repos` (détection automatique des nouveaux projets publiés et des dernières dates de mise à jour).
- **3 modes d'affichage** : Cartes détaillées, Liste compacte, ou Grille d'icônes iOS (Launchpad).
- **Tiroir d'aperçu en direct (`iframe`)** + réorganisation personnalisée des catégories et favoris épinglés.
