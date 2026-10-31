---
name: mobile-pull-to-refresh
description: Standard obligatoire pour toutes les applications web et PWA de Thomas Lefèvre (@Mrthomaslef) : implanter systématiquement une fonction d'actualisation en glissant vers le bas (Pull-to-Refresh tactile et souris).
---

# Standard Systématique : Pull-to-Refresh (Drag vers le bas)

Dans **toutes les applications web, PWA et projets mobiles** créés ou modifiés pour l'utilisateur :
1. **Toujours implanter une fonction d'actualisation en tirant vers le bas (Pull-to-Refresh)** en haut de page (`window.scrollY === 0`).
2. **Comportement attendu** :
   - `overscroll-behavior-y: contain;` sur `html, body` pour éviter les conflits en mode PWA standalone iOS/Android.
   - Indicateur visuel fluide en haut d'écran avec résistance élastique (`Tirer pour actualiser` → rotation à 180° `Relâcher pour actualiser` → spinner `Actualisation...` → `À jour ✓`).
   - Déclenche le rafraîchissement des données en direct (API / cache / `location.reload()`) + retour haptique `navigator.vibrate(12)` si supporté.
   - Compatible **tactile (`touchstart`/`touchmove`/`touchend`)** et **souris (`mousedown`/`mousemove`/`mouseup`)**.
