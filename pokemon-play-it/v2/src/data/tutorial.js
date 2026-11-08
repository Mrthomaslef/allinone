export const TUTORIAL = [
  {
    target: '[data-zone="player-hand"]',
    position: 'bottom',
    text: 'Bienvenue ! Je suis le Professeur Chen. Cette zone en bas est votre MAIN. Vous y piochez des cartes au début de chaque tour.'
  },
  {
    target: '[data-zone="player-deck"]',
    position: 'bottom',
    text: 'Ici se trouve votre DECK (60 cartes). Cliquez dessus pour piocher au début de votre tour. S\'il est vide, vous perdez !'
  },
  {
    target: '[data-zone="player-prizes"]',
    position: 'bottom',
    text: 'Ce sont vos 6 CARTES PRIX. À chaque K.O. adverse, vous en prenez une dans votre main. Les 6 prises = VICTOIRE !'
  },
  {
    target: '[data-zone="player-active"]',
    position: 'bottom',
    text: 'Votre POKÉMON ACTIF combat ici. Un seul à la fois. Glissez un Pokémon de base de votre main vers cet emplacement pour commencer.'
  },
  {
    target: '[data-zone="player-bench"]',
    position: 'bottom',
    text: 'Votre BANC (max 5 Pokémon). Ils attendent leur tour. Glissez d\'autres Pokémon de base ici. Ils peuvent monter à l\'actif via Échange.'
  },
  {
    target: '.hand-card',
    position: 'top',
    text: 'Essayez : glissez un Pokémon (cadre vert) de votre main vers "Actif" ou "Banc". Puis cliquez "Fin de tour".'
  },
  {
    target: '#btn-attack',
    position: 'top',
    text: 'Quand votre actif a assez d\'Énergies (symboles en haut à droite de la carte), cliquez "Attaquer" pour choisir une attaque et infliger des dégâts !'
  }
];
