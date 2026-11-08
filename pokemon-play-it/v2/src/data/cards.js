// Cartes officielles Pokémon TCG (Set de Base + Jungle + Fossile) — Images FR HD TCGdex
export const CARDS = {
  "alakazam": {
    "id": "alakazam",
    "name": "Alakazam",
    "type": "Pokemon",
    "stage": "Stage 2",
    "evolvesFrom": "Kadabra",
    "hp": 80,
    "maxHp": 80,
    "energyType": "Psychic",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Onde Folie",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "damage": 30,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon défenseur est maintenant Confus."
      }
    ],
    "set": "base",
    "number": "1/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/1/high.webp",
    "power": {
      "id": "damage_swap",
      "name": "Transfert de dégâts",
      "passive": false,
      "text": "Autant de fois que vous le voulez pendant votre tour (avant votre attaque), vous pouvez déplacer 1 marqueur de dégâts (10 PV) d'un de vos Pokémon vers un autre tant que cela ne met pas ce Pokémon K.O."
    }
  },
  "blastoise": {
    "id": "blastoise",
    "name": "Tortank",
    "type": "Pokemon",
    "stage": "Stage 2",
    "evolvesFrom": "Carabaffe",
    "hp": 100,
    "maxHp": 100,
    "energyType": "Water",
    "weakness": "Lightning",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Hydrocanon",
        "cost": [
          "Water",
          "Water",
          "Water"
        ],
        "damage": 40,
        "effect": "Inflige 40 dégâts plus 10 dégâts supplémentaires pour chaque Énergie {W} attachée à Tortank en plus du coût en Énergie de cette attaque. Les Énergies {W} supplémentaires après la seconde ne comptent pas."
      }
    ],
    "set": "base",
    "number": "2/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/2/high.webp",
    "power": {
      "id": "rain_dance",
      "name": "Danse de la pluie",
      "passive": false,
      "text": "Autant de fois que vous le voulez pendant votre tour (avant votre attaque), vous pouvez attacher 1 carte Énergie Eau de votre main à 1 de vos Pokémon Eau."
    }
  },
  "chansey": {
    "id": "chansey",
    "name": "Leveinard",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 120,
    "maxHp": 120,
    "energyType": "Colorless",
    "weakness": "Fighting",
    "resistance": "Psychic",
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Compresse",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 0,
        "effect": "Lancez une pièce. Si c'est face, prévenez tous les dégâts infligés à Leveinard pendant le prochain tour de votre adversaire. (Tout autre effet ou attaque est toujours valide.)"
      },
      {
        "name": "Damoclès",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 80,
        "effect": "Leveinard s'inflige 80 points de dégâts."
      }
    ],
    "set": "base",
    "number": "3/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/3/high.webp"
  },
  "charizard": {
    "id": "charizard",
    "name": "Dracaufeu",
    "type": "Pokemon",
    "stage": "Stage 2",
    "evolvesFrom": "Reptincel",
    "hp": 120,
    "maxHp": 120,
    "energyType": "Fire",
    "weakness": "Water",
    "resistance": "Fighting",
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Danseflamme",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Fire"
        ],
        "damage": 100,
        "effect": "Défaussez 2 cartes Énergie attachées à Dracaufeu pour pouvoir utiliser cette attaque."
      }
    ],
    "set": "base",
    "number": "4/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/4/high.webp",
    "power": {
      "id": "energy_burn",
      "name": "Combustion d'Énergie",
      "passive": true,
      "text": "Toutes les Énergies attachées à Dracaufeu comptent comme de l'Énergie Feu au lieu de leur type habituel."
    }
  },
  "clefairy": {
    "id": "clefairy",
    "name": "Mélofée",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 40,
    "maxHp": 40,
    "energyType": "Colorless",
    "weakness": "Fighting",
    "resistance": "Psychic",
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Berceuse",
        "cost": [
          "Colorless"
        ],
        "damage": 0,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Endormi."
      },
      {
        "name": "Métronome",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 0,
        "effect": "Choisissez 1 des attaques du Pokémon Défenseur. Métronome copie cette attaque à l'exception de son coût d'Énergie et de toute autre action requise pour utiliser cette attaque, comme par exemple, défausser des cartes Énergie. (Quel que soit le type du Pokémon Défenseur, Mélofée demeure de type Incolore.)"
      }
    ],
    "set": "base",
    "number": "5/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/5/high.webp"
  },
  "gyarados": {
    "id": "gyarados",
    "name": "Léviator",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Magicarpe",
    "hp": 100,
    "maxHp": 100,
    "energyType": "Water",
    "weakness": "Grass",
    "resistance": "Fighting",
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Draco-Rage",
        "cost": [
          "Water",
          "Water",
          "Water"
        ],
        "damage": 50,
        "effect": ""
      },
      {
        "name": "Bulles d'O",
        "cost": [
          "Water",
          "Water",
          "Water",
          "Water"
        ],
        "damage": 40,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Paralysé."
      }
    ],
    "set": "base",
    "number": "6/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/6/high.webp"
  },
  "hitmonchan": {
    "id": "hitmonchan",
    "name": "Tygnon",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 70,
    "maxHp": 70,
    "energyType": "Fighting",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Taquet",
        "cost": [
          "Fighting"
        ],
        "damage": 20,
        "effect": ""
      },
      {
        "name": "Punch Spécial",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "damage": 40,
        "effect": ""
      }
    ],
    "set": "base",
    "number": "7/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/7/high.webp"
  },
  "machamp": {
    "id": "machamp",
    "name": "Mackogneur",
    "type": "Pokemon",
    "stage": "Stage 2",
    "evolvesFrom": "Machopeur",
    "hp": 100,
    "maxHp": 100,
    "energyType": "Fighting",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Frappe Atlas",
        "cost": [
          "Fighting",
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "damage": 60,
        "effect": ""
      }
    ],
    "set": "base",
    "number": "8/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/8/high.webp",
    "power": {
      "id": "strikes_back",
      "name": "Riposte",
      "passive": true,
      "text": "Chaque fois que l'attaque de votre adversaire inflige des dégâts à Mackogneur (même s'il est mis K.O.), ce pouvoir inflige 10 dégâts au Pokémon Attaquant."
    }
  },
  "magneton": {
    "id": "magneton",
    "name": "Magnéton",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Magnéti",
    "hp": 60,
    "maxHp": 60,
    "energyType": "Lightning",
    "weakness": "Fighting",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Cage-éclair",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "damage": 30,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Paralysé."
      },
      {
        "name": "Destruction",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "damage": 80,
        "effect": "Inflige 20 dégâts à chaque Pokémon sur le Banc de chaque joueur. (Ne pas appliquer la Faiblesse et la Résistance aux Pokémon sur le Banc.) Magneton s'inflige 80 dégâts."
      }
    ],
    "set": "base",
    "number": "9/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/9/high.webp"
  },
  "mewtwo": {
    "id": "mewtwo",
    "name": "Mewtwo",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 60,
    "maxHp": 60,
    "energyType": "Psychic",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Psyko",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "damage": 10,
        "effect": "Inflige 10 dégâts plus 10 dégâts supplémentaires pour chaque carte Énergie attachée au Pokémon Défenseur."
      },
      {
        "name": "Bouclier",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "damage": 0,
        "effect": "Défaussez 1 carte Énergie {P} attachée à Mewtwo pour pouvoir utiliser cette attaque. Pendant le prochain tour de votre adversaire, prévenez tous les effets ou attaques, y compris les dégâts, infligés à Mewtwo."
      }
    ],
    "set": "base",
    "number": "10/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/10/high.webp"
  },
  "nidoking": {
    "id": "nidoking",
    "name": "Nidoking",
    "type": "Pokemon",
    "stage": "Stage 2",
    "evolvesFrom": "Nidorino",
    "hp": 90,
    "maxHp": 90,
    "energyType": "Grass",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Mania",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "damage": 30,
        "effect": "Lancez une pièce. Si c'est face, cette attaque inflige 30 dégâts plus 10 dégâts supplémentaires ; si c'est pile, cette attaque inflige 30 dégâts et Nidoking s'inflige 10 dégâts."
      },
      {
        "name": "Toxik",
        "cost": [
          "Grass",
          "Grass",
          "Grass"
        ],
        "damage": 20,
        "effect": "Le Pokémon Défenseur est maintenant Empoisonné. Il subit maintenant 20 dégâts Poison au lieu de 10 après le tour de chaque joueur (même s'il était déjà empoisonné)."
      }
    ],
    "set": "base",
    "number": "11/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/11/high.webp"
  },
  "ninetales": {
    "id": "ninetales",
    "name": "Feunard",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Goupix",
    "hp": 80,
    "maxHp": 80,
    "energyType": "Fire",
    "weakness": "Water",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Leurre",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 0,
        "effect": "Si votre adversaire a des Pokémon sur le Banc, choisissez 1 d'entre eux et échangez-le avec le Pokémon Défenseur."
      },
      {
        "name": "Déflagration",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Fire"
        ],
        "damage": 80,
        "effect": "Défaussez 1 carte Énergie {R} attachée à Feunard pour pouvoir utiliser cette attaque."
      }
    ],
    "set": "base",
    "number": "12/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/12/high.webp"
  },
  "poliwrath": {
    "id": "poliwrath",
    "name": "Tartard",
    "type": "Pokemon",
    "stage": "Stage 2",
    "evolvesFrom": "Têtarte",
    "hp": 90,
    "maxHp": 90,
    "energyType": "Water",
    "weakness": "Grass",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Pistolet à O",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "damage": 30,
        "effect": "Inflige 30 dégâts plus 10 dégâts supplémentaires pour chaque Énergie {W} attachée à Tartard en plus du coût en Énergie de cette attaque. Les Énergies {W} supplémentaires après la seconde ne comptent pas."
      },
      {
        "name": "Lessiveuse",
        "cost": [
          "Water",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "damage": 40,
        "effect": "Si des cartes Énergie sont attachées au Pokémon Défenseur, choisissez 1 d'elle et défaussez-la."
      }
    ],
    "set": "base",
    "number": "13/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/13/high.webp"
  },
  "raichu": {
    "id": "raichu",
    "name": "Raichu",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Pikachu",
    "hp": 80,
    "maxHp": 80,
    "energyType": "Lightning",
    "weakness": "Fighting",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Hâte",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "damage": 20,
        "effect": "Lancez une pièce. Si c'est face, pendant le prochain tour de votre adversaire, prévenez tous les effets ou attaques, y compris les dégâts, infligés à Raichu."
      },
      {
        "name": "Fatal-Foudre",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "damage": 60,
        "effect": "Lancez une pièce. Si c'est pile, Raichu s'inflige 30 dégâts."
      }
    ],
    "set": "base",
    "number": "14/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/14/high.webp"
  },
  "venusaur": {
    "id": "venusaur",
    "name": "Florizarre",
    "type": "Pokemon",
    "stage": "Stage 2",
    "evolvesFrom": "Herbizarre",
    "hp": 100,
    "maxHp": 100,
    "energyType": "Grass",
    "weakness": "Fire",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Lance-Soleil",
        "cost": [
          "Grass",
          "Grass",
          "Grass",
          "Grass"
        ],
        "damage": 60,
        "effect": ""
      }
    ],
    "set": "base",
    "number": "15/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/15/high.webp",
    "power": {
      "id": "energy_trans",
      "name": "Transfert d'Énergie",
      "passive": false,
      "text": "Autant de fois que vous le voulez pendant votre tour (avant votre attaque), vous pouvez déplacer 1 carte Énergie Plante attachée à l'un de vos Pokémon vers un autre de vos Pokémon."
    }
  },
  "zapdos": {
    "id": "zapdos",
    "name": "Électhor",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 90,
    "maxHp": 90,
    "energyType": "Lightning",
    "weakness": null,
    "resistance": "Fighting",
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Tonnerre",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "damage": 60,
        "effect": "Lancez une pièce. Si c'est pile, Électhor s'inflige 30 dégâts."
      },
      {
        "name": "Fatal-Foudre",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "damage": 100,
        "effect": "Défaussez toutes les cartes Énergie attachées à Électhor pour pouvoir utiliser cette attaque."
      }
    ],
    "set": "base",
    "number": "16/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/16/high.webp"
  },
  "beedrill": {
    "id": "beedrill",
    "name": "Dardargnan",
    "type": "Pokemon",
    "stage": "Stage 2",
    "evolvesFrom": "Coconfort",
    "hp": 80,
    "maxHp": 80,
    "energyType": "Grass",
    "weakness": "Fire",
    "resistance": "Fighting",
    "retreatCost": [],
    "attacks": [
      {
        "name": "Double-Dard",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 30,
        "effect": "Lancez 2 pièces. Cette attaque inflige 30 dégâts multipliés par le nombre de faces."
      },
      {
        "name": "Dard-Venin",
        "cost": [
          "Grass",
          "Grass",
          "Grass"
        ],
        "damage": 40,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Empoisonné."
      }
    ],
    "set": "base",
    "number": "17/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/17/high.webp"
  },
  "dragonair": {
    "id": "dragonair",
    "name": "Draco",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Minidraco",
    "hp": 80,
    "maxHp": 80,
    "energyType": "Colorless",
    "weakness": null,
    "resistance": "Psychic",
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Souplesse",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 30,
        "effect": "Lancez 2 pièces. Cette attaque inflige 30 dégâts multipliés par le nombre de faces."
      },
      {
        "name": "Ultralaser",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 20,
        "effect": "Si des cartes Énergie sont attachées au Pokémon Défenseur, choisissez 1 d'elle et défaussez-la."
      }
    ],
    "set": "base",
    "number": "18/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/18/high.webp"
  },
  "dugtrio": {
    "id": "dugtrio",
    "name": "Triopikeur",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Taupiqueur",
    "hp": 70,
    "maxHp": 70,
    "energyType": "Fighting",
    "weakness": "Grass",
    "resistance": "Lightning",
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Tranche",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "damage": 40,
        "effect": ""
      },
      {
        "name": "Séisme",
        "cost": [
          "Fighting",
          "Fighting",
          "Fighting",
          "Fighting"
        ],
        "damage": 70,
        "effect": "Inflige 10 dégâts à chacun des Pokémon sur votre propre Banc. (Ne pas appliquer la Faiblesse et la Résistance aux Pokémon sur le Banc.)"
      }
    ],
    "set": "base",
    "number": "19/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/19/high.webp"
  },
  "electabuzz": {
    "id": "electabuzz",
    "name": "Élektek",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 70,
    "maxHp": 70,
    "energyType": "Lightning",
    "weakness": "Fighting",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Éclair",
        "cost": [
          "Lightning"
        ],
        "damage": 10,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Paralysé."
      },
      {
        "name": "Poing-Éclair",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "damage": 30,
        "effect": "Lancez une pièce. Si c'est face, cette attaque inflige 30 dégâts plus 10 dégâts supplémentaires ; si c'est pile, cette attaque inflige 30 dégâts et Élektek s'inflige 10 dégâts."
      }
    ],
    "set": "base",
    "number": "20/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/20/high.webp"
  },
  "electrode": {
    "id": "electrode",
    "name": "Électrode",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Voltorbe",
    "hp": 80,
    "maxHp": 80,
    "energyType": "Lightning",
    "weakness": "Fighting",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Choc Électrique",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "damage": 50,
        "effect": "Lancez une pièce. Si c'est pile, Électrode s'inflige 10 dégâts."
      }
    ],
    "set": "base",
    "number": "21/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/21/high.webp",
    "power": {
      "id": "buzzap",
      "name": "Buzzap",
      "passive": false,
      "text": "Pendant votre tour (avant votre attaque), vous pouvez mettre Électrode K.O. (l'adversaire prend 1 Récompense) et l'attacher à un autre de vos Pokémon comme 2 Énergies de n'importe quel type."
    }
  },
  "pidgeotto": {
    "id": "pidgeotto",
    "name": "Roucoups",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Roucool",
    "hp": 60,
    "maxHp": 60,
    "energyType": "Colorless",
    "weakness": "Lightning",
    "resistance": "Fighting",
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Cyclone",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 20,
        "effect": "Si votre adversaire a au moins un Pokémon sur le Banc, il ou elle choisit l'1 d'eux et l'échange avec le Pokémon Défenseur. (Appliquez les dégâts avant d'échanger les Pokémon.)"
      },
      {
        "name": "Mimique",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 0,
        "effect": "Si Roucoups a été attaqué pendant le tour précédent, appliquez le résultat final de cette attaque infligée à Roucoups sur le Pokémon Défenseur."
      }
    ],
    "set": "base",
    "number": "22/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/22/high.webp"
  },
  "arcanine": {
    "id": "arcanine",
    "name": "Arcanin",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Caninos",
    "hp": 100,
    "maxHp": 100,
    "energyType": "Fire",
    "weakness": "Water",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Lance-Flamme",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "damage": 50,
        "effect": "Défaussez 1 carte Énergie {R} attachée à Arcanin pour pouvoir utiliser cette attaque."
      },
      {
        "name": "Bélier",
        "cost": [
          "Fire",
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "damage": 80,
        "effect": "Arcanin s'inflige 30 dégâts."
      }
    ],
    "set": "base",
    "number": "23/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/23/high.webp"
  },
  "charmeleon": {
    "id": "charmeleon",
    "name": "Reptincel",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Salamèche",
    "hp": 80,
    "maxHp": 80,
    "energyType": "Fire",
    "weakness": "Water",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Tranche",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 30,
        "effect": ""
      },
      {
        "name": "Lance-flamme",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "damage": 50,
        "effect": "Défaussez 1 carte Énergie {R} attachée à Reptincel pour pouvoir utiliser cette attaque."
      }
    ],
    "set": "base",
    "number": "24/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/24/high.webp"
  },
  "dewgong": {
    "id": "dewgong",
    "name": "Lamantine",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Otaria",
    "hp": 80,
    "maxHp": 80,
    "energyType": "Water",
    "weakness": "Lightning",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Onde Boréale",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "damage": 50,
        "effect": ""
      },
      {
        "name": "Laser Glace",
        "cost": [
          "Water",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "damage": 30,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Paralysé."
      }
    ],
    "set": "base",
    "number": "25/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/25/high.webp"
  },
  "dratini": {
    "id": "dratini",
    "name": "Minidraco",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 40,
    "maxHp": 40,
    "energyType": "Colorless",
    "weakness": null,
    "resistance": "Psychic",
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Écras' Face",
        "cost": [
          "Colorless"
        ],
        "damage": 10,
        "effect": ""
      }
    ],
    "set": "base",
    "number": "26/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/26/high.webp"
  },
  "farfetchd": {
    "id": "farfetchd",
    "name": "Canarticho",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 50,
    "maxHp": 50,
    "energyType": "Colorless",
    "weakness": "Lightning",
    "resistance": "Fighting",
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Coup d'oignon",
        "cost": [
          "Colorless"
        ],
        "damage": 30,
        "effect": "Lancez une pièce. Si c'est pile, cette attaque est sans effet. Quel que soit le résultat, vous ne pouvez plus utiliser cette attaque aussi longtemps que Canarticho reste en jeu (même renvoyer Canarticho sur le Banc ne vous permet pas de l'utiliser à nouveau)."
      },
      {
        "name": "Coup de casserole",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 30,
        "effect": ""
      }
    ],
    "set": "base",
    "number": "27/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/27/high.webp"
  },
  "growlithe": {
    "id": "growlithe",
    "name": "Caninos",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 60,
    "maxHp": 60,
    "energyType": "Fire",
    "weakness": "Water",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Intimidation",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "damage": 20,
        "effect": ""
      }
    ],
    "set": "base",
    "number": "28/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/28/high.webp"
  },
  "haunter": {
    "id": "haunter",
    "name": "Spectrum",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Fantominus",
    "hp": 60,
    "maxHp": 60,
    "energyType": "Psychic",
    "weakness": null,
    "resistance": "Fighting",
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Hypnose",
        "cost": [
          "Psychic"
        ],
        "damage": 0,
        "effect": "Le Pokémon Défenseur est maintenant Endormi."
      },
      {
        "name": "Dévorêve",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "damage": 50,
        "effect": "Vous ne pouvez utiliser cette attaque que si le Pokémon Défenseur est Endormi."
      }
    ],
    "set": "base",
    "number": "29/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/29/high.webp"
  },
  "ivysaur": {
    "id": "ivysaur",
    "name": "Herbizarre",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Bulbizarre",
    "hp": 60,
    "maxHp": 60,
    "energyType": "Grass",
    "weakness": "Fire",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Fouet Lianes",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "damage": 30,
        "effect": ""
      },
      {
        "name": "Poudre Toxik",
        "cost": [
          "Grass",
          "Grass",
          "Grass"
        ],
        "damage": 20,
        "effect": "Le Pokémon Défenseur est maintenant Empoisonné."
      }
    ],
    "set": "base",
    "number": "30/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/30/high.webp"
  },
  "jynx": {
    "id": "jynx",
    "name": "Lippoutou",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 70,
    "maxHp": 70,
    "energyType": "Psychic",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Torgnoles",
        "cost": [
          "Psychic"
        ],
        "damage": 10,
        "effect": "Lancez 2 pièces. Cette attaque inflige 10 dégâts multipliés par le nombre de faces."
      },
      {
        "name": "Yoga",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "damage": 20,
        "effect": "Inflige 20 dégâts plus 10 dégâts supplémentaires pour chaque marqueur de dégâts sur le Pokémon Défenseur."
      }
    ],
    "set": "base",
    "number": "31/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/31/high.webp"
  },
  "kadabra": {
    "id": "kadabra",
    "name": "Kadabra",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Abra",
    "hp": 60,
    "maxHp": 60,
    "energyType": "Psychic",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Soin",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "damage": 0,
        "effect": "Défaussez 1 carte Énergie {P} attachée à Kadabra pour pouvoir utiliser cette attaque. Retirez tous les marqueurs de dégâts sur Kadabra."
      },
      {
        "name": "Super Psy",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "damage": 50,
        "effect": ""
      }
    ],
    "set": "base",
    "number": "32/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/32/high.webp"
  },
  "kakuna": {
    "id": "kakuna",
    "name": "Coconfort",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Aspicot",
    "hp": 80,
    "maxHp": 80,
    "energyType": "Grass",
    "weakness": "Fire",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Armure",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 0,
        "effect": "Lancez une pièce. Si c'est face, prévenez tous les dégâts infligés à Coconfort pendant le prochain tour de votre adversaire. (Tout autre effet ou attaque est toujours valide.)"
      },
      {
        "name": "Poudre Toxik",
        "cost": [
          "Grass",
          "Grass"
        ],
        "damage": 20,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Empoisonné."
      }
    ],
    "set": "base",
    "number": "33/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/33/high.webp"
  },
  "machoke": {
    "id": "machoke",
    "name": "Machopeur",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Machoc",
    "hp": 80,
    "maxHp": 80,
    "energyType": "Fighting",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Poing-Karaté",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "damage": 50,
        "effect": "Inflige 50 dégâts moins 10 dégâts pour chaque marqueur de dégâts sur Machopeur."
      },
      {
        "name": "Sacrifice",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "damage": 60,
        "effect": "Machopeur s'inflige 20 dégâts."
      }
    ],
    "set": "base",
    "number": "34/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/34/high.webp"
  },
  "magikarp": {
    "id": "magikarp",
    "name": "Magicarpe",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 30,
    "maxHp": 30,
    "energyType": "Water",
    "weakness": "Lightning",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Charge",
        "cost": [
          "Colorless"
        ],
        "damage": 10,
        "effect": ""
      },
      {
        "name": "Nageoire",
        "cost": [
          "Water"
        ],
        "damage": 10,
        "effect": "Inflige 10 dégâts multipliés par le nombre de marqueurs de dégâts sur Magicarpe."
      }
    ],
    "set": "base",
    "number": "35/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/35/high.webp"
  },
  "magmar": {
    "id": "magmar",
    "name": "Magmar",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 50,
    "maxHp": 50,
    "energyType": "Fire",
    "weakness": "Water",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Poing de Feu",
        "cost": [
          "Fire",
          "Fire"
        ],
        "damage": 30,
        "effect": ""
      },
      {
        "name": "Lance-flamme",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "damage": 50,
        "effect": "Défaussez 1 carte Énergie {R} attachée à Magmar pour pouvoir utiliser cette attaque."
      }
    ],
    "set": "base",
    "number": "36/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/36/high.webp"
  },
  "nidorino": {
    "id": "nidorino",
    "name": "Nidorino",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Nidoran ♂",
    "hp": 60,
    "maxHp": 60,
    "energyType": "Grass",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Double Pied",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "damage": 30,
        "effect": "Lancez 2 pièces. Cette attaque inflige 30 dégâts multipliés par le nombre de faces."
      },
      {
        "name": "Empal' Korne",
        "cost": [
          "Grass",
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "damage": 50,
        "effect": ""
      }
    ],
    "set": "base",
    "number": "37/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/37/high.webp"
  },
  "poliwhirl": {
    "id": "poliwhirl",
    "name": "Têtarte",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Ptitard",
    "hp": 60,
    "maxHp": 60,
    "energyType": "Water",
    "weakness": "Grass",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Amnésie",
        "cost": [
          "Water",
          "Water"
        ],
        "damage": 0,
        "effect": "Choisissez 1 des attaques du Pokémon Défenseur. Ce Pokémon ne peut pas utiliser cette attaque pendant le prochain tour de votre adversaire."
      },
      {
        "name": "Torgnoles",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "damage": 30,
        "effect": "Lancez 2 pièces. Cette attaque inflige 30 dégâts multipliés par le nombre de faces."
      }
    ],
    "set": "base",
    "number": "38/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/38/high.webp"
  },
  "porygon": {
    "id": "porygon",
    "name": "Porygon",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 30,
    "maxHp": 30,
    "energyType": "Colorless",
    "weakness": "Fighting",
    "resistance": "Psychic",
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Adaptation 1",
        "cost": [
          "Colorless"
        ],
        "damage": 0,
        "effect": "Si le Pokémon Défenseur avait une Faiblesse, vous pouvez la changer pour le type de votre choix, excepté Incolore."
      },
      {
        "name": "Adaptation 2",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 0,
        "effect": "Changez la Résistance de Porygon pour un type de votre choix, excepté Incolore."
      }
    ],
    "set": "base",
    "number": "39/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/39/high.webp"
  },
  "raticate": {
    "id": "raticate",
    "name": "Rattatac",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Rattata",
    "hp": 60,
    "maxHp": 60,
    "energyType": "Colorless",
    "weakness": "Fighting",
    "resistance": "Psychic",
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Morsure",
        "cost": [
          "Colorless"
        ],
        "damage": 20,
        "effect": ""
      },
      {
        "name": "Croc Fatal",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 0,
        "effect": "Inflige une quantité de dégâts au Pokémon Défenseur égale à la moitié de ses PV restants (arrondis à la dizaine la plus proche)."
      }
    ],
    "set": "base",
    "number": "40/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/40/high.webp"
  },
  "seel": {
    "id": "seel",
    "name": "Otaria",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 60,
    "maxHp": 60,
    "energyType": "Water",
    "weakness": "Lightning",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Coup d'Boule",
        "cost": [
          "Water"
        ],
        "damage": 10,
        "effect": ""
      }
    ],
    "set": "base",
    "number": "41/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/41/high.webp"
  },
  "wartortle": {
    "id": "wartortle",
    "name": "Carabaffe",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Carapuce",
    "hp": 70,
    "maxHp": 70,
    "energyType": "Water",
    "weakness": "Lightning",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Repli",
        "cost": [
          "Water",
          "Colorless"
        ],
        "damage": 0,
        "effect": "Lancez une pièce. Si c'est face, prévenez tous les dégâts infligés à Carabaffe pendant le prochain tour de votre adversaire. (Tout autre effet ou attaque est toujours valide.)"
      },
      {
        "name": "Morsure",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "damage": 40,
        "effect": ""
      }
    ],
    "set": "base",
    "number": "42/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/42/high.webp"
  },
  "abra": {
    "id": "abra",
    "name": "Abra",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 30,
    "maxHp": 30,
    "energyType": "Psychic",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [],
    "attacks": [
      {
        "name": "Choc Psy",
        "cost": [
          "Colorless"
        ],
        "damage": 10,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Paralysé."
      }
    ],
    "set": "base",
    "number": "43/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/43/high.webp"
  },
  "bulbasaur": {
    "id": "bulbasaur",
    "name": "Bulbizarre",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 40,
    "maxHp": 40,
    "energyType": "Grass",
    "weakness": "Fire",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Vampigraine",
        "cost": [
          "Grass",
          "Grass"
        ],
        "damage": 20,
        "effect": "À moins que tous les dégâts infligés par cette attaque ne soient prévenus, vous pouvez retirer 1 marqueur de dégâts de Bulbizarre."
      }
    ],
    "set": "base",
    "number": "44/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/44/high.webp"
  },
  "caterpie": {
    "id": "caterpie",
    "name": "Chenipan",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 40,
    "maxHp": 40,
    "energyType": "Grass",
    "weakness": "Fire",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Sécrétion",
        "cost": [
          "Grass"
        ],
        "damage": 10,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Paralysé."
      }
    ],
    "set": "base",
    "number": "45/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/45/high.webp"
  },
  "charmander": {
    "id": "charmander",
    "name": "Salamèche",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 50,
    "maxHp": 50,
    "energyType": "Fire",
    "weakness": "Water",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Griffe",
        "cost": [
          "Colorless"
        ],
        "damage": 10,
        "effect": ""
      },
      {
        "name": "Flammèche",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "damage": 30,
        "effect": "Défaussez 1 carte Énergie {R} attachée à Salamèche pour pouvoir utiliser cette attaque."
      }
    ],
    "set": "base",
    "number": "46/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/46/high.webp"
  },
  "diglett": {
    "id": "diglett",
    "name": "Taupiqueur",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 30,
    "maxHp": 30,
    "energyType": "Fighting",
    "weakness": "Grass",
    "resistance": "Lightning",
    "retreatCost": [],
    "attacks": [
      {
        "name": "Tunnel",
        "cost": [
          "Fighting"
        ],
        "damage": 10,
        "effect": ""
      },
      {
        "name": "Jet de boue",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "damage": 30,
        "effect": ""
      }
    ],
    "set": "base",
    "number": "47/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/47/high.webp"
  },
  "doduo": {
    "id": "doduo",
    "name": "Doduo",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 50,
    "maxHp": 50,
    "energyType": "Colorless",
    "weakness": "Lightning",
    "resistance": "Fighting",
    "retreatCost": [],
    "attacks": [
      {
        "name": "Furie",
        "cost": [
          "Colorless"
        ],
        "damage": 10,
        "effect": "Lancez 2 pièces. Cette attaque inflige 10 dégâts multipliés par le nombre de faces."
      }
    ],
    "set": "base",
    "number": "48/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/48/high.webp"
  },
  "drowzee": {
    "id": "drowzee",
    "name": "Soporifik",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 50,
    "maxHp": 50,
    "energyType": "Psychic",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Écras' Face",
        "cost": [
          "Colorless"
        ],
        "damage": 10,
        "effect": ""
      },
      {
        "name": "Onde Folie",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "damage": 10,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Confus."
      }
    ],
    "set": "base",
    "number": "49/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/49/high.webp"
  },
  "gastly": {
    "id": "gastly",
    "name": "Fantominus",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 30,
    "maxHp": 30,
    "energyType": "Psychic",
    "weakness": null,
    "resistance": "Fighting",
    "retreatCost": [],
    "attacks": [
      {
        "name": "Gaz Soporifique",
        "cost": [
          "Psychic"
        ],
        "damage": 0,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Endormi."
      },
      {
        "name": "Prélèvement du Destin",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "damage": 0,
        "effect": "Défaussez 1 carte Énergie {P} attachée à Fantominus pour pouvoir utiliser cette attaque. Si un Pokémon met Fantominus K.O. pendant le prochain tour de votre adversaire, mettez ce Pokémon K.O."
      }
    ],
    "set": "base",
    "number": "50/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/50/high.webp"
  },
  "koffing": {
    "id": "koffing",
    "name": "Smogo",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 50,
    "maxHp": 50,
    "energyType": "Grass",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Gaz infect",
        "cost": [
          "Grass",
          "Grass"
        ],
        "damage": 10,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Empoisonné ; si c'est pile, il est maintenant Confus."
      }
    ],
    "set": "base",
    "number": "51/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/51/high.webp"
  },
  "machop": {
    "id": "machop",
    "name": "Machoc",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 50,
    "maxHp": 50,
    "energyType": "Fighting",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Balayage",
        "cost": [
          "Fighting"
        ],
        "damage": 20,
        "effect": ""
      }
    ],
    "set": "base",
    "number": "52/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/52/high.webp"
  },
  "magnemite": {
    "id": "magnemite",
    "name": "Magnéti",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 40,
    "maxHp": 40,
    "energyType": "Lightning",
    "weakness": "Fighting",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Cage-Éclair",
        "cost": [
          "Lightning"
        ],
        "damage": 10,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Paralysé."
      },
      {
        "name": "Destruction",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "damage": 40,
        "effect": "Inflige 10 dégâts à chaque Pokémon sur le Banc de chaque joueur. (Ne pas appliquer la Faiblesse et la Résistance aux Pokémon sur le Banc.) Magneti s'inflige 40 dégâts."
      }
    ],
    "set": "base",
    "number": "53/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/53/high.webp"
  },
  "metapod": {
    "id": "metapod",
    "name": "Chrysacier",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Chenipan",
    "hp": 70,
    "maxHp": 70,
    "energyType": "Grass",
    "weakness": "Fire",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Armure",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 0,
        "effect": "Lancez une pièce. Si c'est face, prévenez tous les dégâts infligés à Chrysacier pendant le prochain tour de votre adversaire. (Tout autre effet ou attaque est toujours valide.)"
      },
      {
        "name": "Para-spore",
        "cost": [
          "Grass",
          "Grass"
        ],
        "damage": 20,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Paralysé."
      }
    ],
    "set": "base",
    "number": "54/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/54/high.webp"
  },
  "nidoran-m": {
    "id": "nidoran-m",
    "name": "Nidoran ♂",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 40,
    "maxHp": 40,
    "energyType": "Grass",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Chanc' Korne",
        "cost": [
          "Grass"
        ],
        "damage": 30,
        "effect": "Lancez une pièce. Si c'est pile, cette attaque est sans effet."
      }
    ],
    "set": "base",
    "number": "55/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/55/high.webp"
  },
  "onix": {
    "id": "onix",
    "name": "Onix",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 90,
    "maxHp": 90,
    "energyType": "Fighting",
    "weakness": "Grass",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Jet-Pierres",
        "cost": [
          "Fighting"
        ],
        "damage": 10,
        "effect": ""
      },
      {
        "name": "Armure",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "damage": 0,
        "effect": "Pendant le prochain tour de votre adversaire, à chaque fois que 30 dégâts ou moins sont infligés à Onix (après application de la Faiblesse et de la Résistance), prévenez ces dégâts. (Tout autre effet ou attaque est toujours valide.)"
      }
    ],
    "set": "base",
    "number": "56/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/56/high.webp"
  },
  "pidgey": {
    "id": "pidgey",
    "name": "Roucool",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 40,
    "maxHp": 40,
    "energyType": "Colorless",
    "weakness": "Lightning",
    "resistance": "Fighting",
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Cyclone",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 10,
        "effect": "Si votre adversaire a au moins un Pokémon sur le Banc, il ou elle choisit l'1 d'eux et l'échange avec le Pokémon Défenseur. (Appliquez les dégâts avant d'échanger les Pokémon.)"
      }
    ],
    "set": "base",
    "number": "57/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/57/high.webp"
  },
  "pikachu": {
    "id": "pikachu",
    "name": "Pikachu",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 40,
    "maxHp": 40,
    "energyType": "Lightning",
    "weakness": "Fighting",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Rogne",
        "cost": [
          "Colorless"
        ],
        "damage": 10,
        "effect": ""
      },
      {
        "name": "Secousse Tonnerre",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "damage": 30,
        "effect": "Lancez une pièce. Si c'est pile, Pikachu s'inflige 10 dégâts."
      }
    ],
    "set": "base",
    "number": "58/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/58/high.webp"
  },
  "poliwag": {
    "id": "poliwag",
    "name": "Ptitard",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 40,
    "maxHp": 40,
    "energyType": "Water",
    "weakness": "Grass",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Pistolet à O",
        "cost": [
          "Water"
        ],
        "damage": 10,
        "effect": "Inflige 30 dégâts plus 10 dégâts supplémentaires pour chaque Énergie {W} attachée à Ptitard en plus du coût en Énergie de cette attaque. Les Énergies {W} supplémentaires après la seconde ne comptent pas."
      }
    ],
    "set": "base",
    "number": "59/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/59/high.webp"
  },
  "ponyta": {
    "id": "ponyta",
    "name": "Ponyta",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 40,
    "maxHp": 40,
    "energyType": "Fire",
    "weakness": "Water",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Ruade",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 20,
        "effect": ""
      },
      {
        "name": "Queue de flamme",
        "cost": [
          "Fire",
          "Fire"
        ],
        "damage": 30,
        "effect": ""
      }
    ],
    "set": "base",
    "number": "60/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/60/high.webp"
  },
  "rattata": {
    "id": "rattata",
    "name": "Rattata",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 30,
    "maxHp": 30,
    "energyType": "Colorless",
    "weakness": "Fighting",
    "resistance": "Psychic",
    "retreatCost": [],
    "attacks": [
      {
        "name": "Morsure",
        "cost": [
          "Colorless"
        ],
        "damage": 20,
        "effect": ""
      }
    ],
    "set": "base",
    "number": "61/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/61/high.webp"
  },
  "sandshrew": {
    "id": "sandshrew",
    "name": "Sabelette",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 40,
    "maxHp": 40,
    "energyType": "Fighting",
    "weakness": "Grass",
    "resistance": "Lightning",
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Jet de Sable",
        "cost": [
          "Fighting"
        ],
        "damage": 10,
        "effect": "Si le Pokémon Défenseur essaie d'attaquer pendant le prochain tour de votre adversaire, votre adversaire doit lancer une pièce. Si c'est pile, l'attaque est sans effet."
      }
    ],
    "set": "base",
    "number": "62/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/62/high.webp"
  },
  "squirtle": {
    "id": "squirtle",
    "name": "Carapuce",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 40,
    "maxHp": 40,
    "energyType": "Water",
    "weakness": "Lightning",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Écume",
        "cost": [
          "Water"
        ],
        "damage": 10,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Paralysé."
      },
      {
        "name": "Repli",
        "cost": [
          "Water",
          "Colorless"
        ],
        "damage": 0,
        "effect": "Lancez une pièce. Si c'est face, prévenez tous les dégâts infligés à Carapuce pendant le prochain tour de votre adversaire. (Tout autre effet ou attaque est toujours valide.)"
      }
    ],
    "set": "base",
    "number": "63/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/63/high.webp"
  },
  "starmie": {
    "id": "starmie",
    "name": "Staross",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Stari",
    "hp": 60,
    "maxHp": 60,
    "energyType": "Water",
    "weakness": "Lightning",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Soin",
        "cost": [
          "Water",
          "Water"
        ],
        "damage": 0,
        "effect": "Défaussez 1 carte Énergie {W} attachée à Staross pour pouvoir utiliser cette attaque. Retirez tous les marqueurs de dégâts sur Staross."
      },
      {
        "name": "Étoile gelante",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "damage": 20,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Paralysé."
      }
    ],
    "set": "base",
    "number": "64/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/64/high.webp"
  },
  "staryu": {
    "id": "staryu",
    "name": "Stari",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 40,
    "maxHp": 40,
    "energyType": "Water",
    "weakness": "Lightning",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Gifle",
        "cost": [
          "Water"
        ],
        "damage": 20,
        "effect": ""
      }
    ],
    "set": "base",
    "number": "65/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/65/high.webp"
  },
  "tangela": {
    "id": "tangela",
    "name": "Saquedeneu",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 50,
    "maxHp": 50,
    "energyType": "Grass",
    "weakness": "Fire",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Étreinte",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "damage": 20,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Paralysé."
      },
      {
        "name": "Poudre Toxik",
        "cost": [
          "Grass",
          "Grass",
          "Grass"
        ],
        "damage": 20,
        "effect": "Le Pokémon Défenseur est maintenant Empoisonné."
      }
    ],
    "set": "base",
    "number": "66/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/66/high.webp"
  },
  "voltorb": {
    "id": "voltorb",
    "name": "Voltorbe",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 40,
    "maxHp": 40,
    "energyType": "Lightning",
    "weakness": "Fighting",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Charge",
        "cost": [
          "Colorless"
        ],
        "damage": 10,
        "effect": ""
      }
    ],
    "set": "base",
    "number": "67/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/67/high.webp"
  },
  "vulpix": {
    "id": "vulpix",
    "name": "Goupix",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 50,
    "maxHp": 50,
    "energyType": "Fire",
    "weakness": "Water",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Onde Folie",
        "cost": [
          "Fire",
          "Fire"
        ],
        "damage": 10,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Confus."
      }
    ],
    "set": "base",
    "number": "68/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/68/high.webp"
  },
  "weedle": {
    "id": "weedle",
    "name": "Aspicot",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 40,
    "maxHp": 40,
    "energyType": "Grass",
    "weakness": "Fire",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Dard-Venin",
        "cost": [
          "Grass"
        ],
        "damage": 10,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Empoisonné"
      }
    ],
    "set": "base",
    "number": "69/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/69/high.webp"
  },
  "clefairy-doll": {
    "id": "clefairy-doll",
    "name": "Peluche Mélofée",
    "type": "Trainer",
    "trainerType": "Item",
    "effect": "Jouez Peluche Mélofée comme un Pokémon de base. Lorsqu'il est en jeu, Peluche Mélofée compte comme un Pokémon (au lieu d'une carte Dresseur). Peluche Mélofée n'a pas d'attaque, ne peut pas battre en retraite, et ne peut pas être Endormi, Confus, Paralysé ou Empoisonné. Si Peluche Mélofée est mis K.O., il ne compte pas comme un Pokémon mis K.O. À tout moment pendant votre tour et avant votre attaque, vous pouvez défausser Peluche Mélofée.",
    "set": "base",
    "number": "70/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/70/high.webp"
  },
  "computer-search": {
    "id": "computer-search",
    "name": "Recherche informatique",
    "type": "Trainer",
    "trainerType": "Item",
    "effect": "Défaussez 2 des autres cartes de votre main pour chercher n'importe quelle carte dans votre deck et la placer dans votre main. Ensuite, mélangez votre deck.",
    "set": "base",
    "number": "71/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/71/high.webp"
  },
  "devolution-spray": {
    "id": "devolution-spray",
    "name": "Vaporisateur rétrograde",
    "type": "Trainer",
    "trainerType": "Item",
    "effect": "Choisissez 1 de vos propres Pokémon en jeu et un Niveau d'évolution. Défaussez toutes les cartes Évolution de ce stade ou supérieur attachée(s) à ce Pokémon. Ce Pokémon n'est plus Endormi, Confus, Paralysé, Empoisonné ou tout autre effet résultant d'une attaque (comme si vous veniez juste de le faire évoluer).",
    "set": "base",
    "number": "72/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/72/high.webp"
  },
  "impostor-professor-oak": {
    "id": "impostor-professor-oak",
    "name": "Faux Professeur Chen",
    "type": "Trainer",
    "trainerType": "Item",
    "effect": "Votre adversaire mélange sa main avec son deck, puis pioche 7 cartes.",
    "set": "base",
    "number": "73/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/73/high.webp"
  },
  "item-finder": {
    "id": "item-finder",
    "name": "Récupérateur",
    "type": "Trainer",
    "trainerType": "Item",
    "effect": "Défaussez 2 des autres cartes de votre main pour placer une carte Dresseur de votre pile de défausse dans votre main.",
    "set": "base",
    "number": "74/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/74/high.webp"
  },
  "lass": {
    "id": "lass",
    "name": "Fillette",
    "type": "Trainer",
    "trainerType": "Item",
    "effect": "Vous révélez votre main ainsi que votre adversaire, puis mélangez toutes les cartes Dresseur de vos mains dans vos decks respectifs.",
    "set": "base",
    "number": "75/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/75/high.webp"
  },
  "pokemon-breeder": {
    "id": "pokemon-breeder",
    "name": "Éleveur de Pokémon",
    "type": "Trainer",
    "trainerType": "Item",
    "effect": "Placez une carte Évolution de Niveau 2 de votre main sur le Pokémon de base correspondant. Vous ne pouvez jouer cette carte que quand il vous serait possible de faire évoluer ce Pokémon de toute façon.",
    "set": "base",
    "number": "76/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/76/high.webp"
  },
  "pokemon-trader": {
    "id": "pokemon-trader",
    "name": "Marchand de Pokémon",
    "type": "Trainer",
    "trainerType": "Item",
    "effect": "Échangez 1 carte Pokémon de base ou Évolution de votre main contre 1 carte Pokémon de base ou Évolution de votre deck. Montrez les deux cartes à votre adversaire. Ensuite, mélangez votre deck.",
    "set": "base",
    "number": "77/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/77/high.webp"
  },
  "scoop-up": {
    "id": "scoop-up",
    "name": "Rappel",
    "type": "Trainer",
    "trainerType": "Item",
    "effect": "Choisissez 1 de vos Pokémon en jeu et reprenez sa carte Pokémon de base dans votre main. (Défaussez toutes les cartes attachées à cette carte.)",
    "set": "base",
    "number": "78/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/78/high.webp"
  },
  "super-energy-removal": {
    "id": "super-energy-removal",
    "name": "Double Suppression d'Énergie",
    "type": "Trainer",
    "trainerType": "Item",
    "effect": "Défaussez 1 carte Énergie attachée à 1 de vos propres Pokémon et choisissez 1 Pokémon de votre adversaire et jusqu'à 2 cartes Énergie attachées à ce Pokémon. Défaussez ces cartes Énergie.",
    "set": "base",
    "number": "79/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/79/high.webp"
  },
  "defender": {
    "id": "defender",
    "name": "Défenseur",
    "type": "Trainer",
    "trainerType": "Item",
    "effect": "Attachez Defender à 1 de vos Pokémon. À la fin du prochain tour de votre adversaire, défaussez Defender. Les dégâts infligés à ce Pokémon par des attaques sont réduits de 20 (après application de la Faiblesse et de la Résistance).",
    "set": "base",
    "number": "80/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/80/high.webp"
  },
  "energy-retrieval": {
    "id": "energy-retrieval",
    "name": "Sauvegarde d'Énergie",
    "type": "Trainer",
    "trainerType": "Item",
    "effect": "Ajoutez à votre main jusqu'à 2 cartes Énergie de base de votre pile de défausse.",
    "set": "base",
    "number": "81/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/81/high.webp"
  },
  "full-heal": {
    "id": "full-heal",
    "name": "Guérison Totale",
    "type": "Trainer",
    "trainerType": "Item",
    "effect": "Votre Pokémon actif n'est plus Endormi, Confus, Paralysé ou Empoisonné.",
    "set": "base",
    "number": "82/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/82/high.webp"
  },
  "maintenance": {
    "id": "maintenance",
    "name": "Entretien",
    "type": "Trainer",
    "trainerType": "Item",
    "effect": "Mélangez 2 des autres cartes de votre main avec votre deck pour piocher une carte.",
    "set": "base",
    "number": "83/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/83/high.webp"
  },
  "pluspower": {
    "id": "pluspower",
    "name": "PlusPower",
    "type": "Trainer",
    "trainerType": "Item",
    "effect": "Attachez PlusPower à votre Pokémon actif. À la fin de votre tour, défaussez PlusPower. Si l'attaque de ce Pokémon inflige des dégâts au Pokémon Défenseur (après application de la Faiblesse et de la Résistance), l'attaque inflige 10 dégâts supplémentaires au Pokémon Défenseur.",
    "set": "base",
    "number": "84/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/84/high.webp"
  },
  "pokemon-center": {
    "id": "pokemon-center",
    "name": "Centre Pokémon",
    "type": "Trainer",
    "trainerType": "Item",
    "effect": "Retirez tous les marqueurs de dégâts de tous vos propres Pokémon ayant des marqueurs de dégâts sur eux, puis défaussez toutes les cartes Énergie attachées à ces Pokémon.",
    "set": "base",
    "number": "85/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/85/high.webp"
  },
  "pokemon-flute": {
    "id": "pokemon-flute",
    "name": "Flûte Pokémon",
    "type": "Trainer",
    "trainerType": "Item",
    "effect": "Choisissez 1 carte Pokémon de base dans la pile de défausse de votre adversaire et placez-la sur son Banc. (Vous ne pouvez pas jouer Flûte Pokémon si le Banc de votre adversaire est plein).",
    "set": "base",
    "number": "86/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/86/high.webp"
  },
  "pokedex": {
    "id": "pokedex",
    "name": "Pokédex",
    "type": "Trainer",
    "trainerType": "Item",
    "effect": "Regardez jusqu'à 5 des 5 premières cartes du dessus de votre deck et triez-les comme bon vous semble.",
    "set": "base",
    "number": "87/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/87/high.webp"
  },
  "professor-oak": {
    "id": "professor-oak",
    "name": "Professeur Chen",
    "type": "Trainer",
    "trainerType": "Supporter",
    "effect": "Défaussez-vous de votre main, puis piochez 7 cartes.",
    "set": "base",
    "number": "88/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/88/high.webp"
  },
  "revive": {
    "id": "revive",
    "name": "Réanimation",
    "type": "Trainer",
    "trainerType": "Item",
    "effect": "Placez 1 carte Pokémon de base de votre pile de défausse sur votre Banc. Placez sur lui un nombre de marqueurs de dégâts égal à la moitié de ses PV (arrondis à la dizaine inférieure la plus proche). (Vous ne pouvez pas jouer Réanimation si votre Banc est plein.)",
    "set": "base",
    "number": "89/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/89/high.webp"
  },
  "super-potion": {
    "id": "super-potion",
    "name": "Super Potion",
    "type": "Trainer",
    "trainerType": "Item",
    "effect": "Défaussez 1 carte Énergie attachée à 1 de vos propres Pokémon afin de retirer jusqu'à 4 marqueurs de dégâts de ce Pokémon.",
    "set": "base",
    "number": "90/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/90/high.webp"
  },
  "bill": {
    "id": "bill",
    "name": "Léo",
    "type": "Trainer",
    "trainerType": "Supporter",
    "effect": "Piochez 2 cartes.",
    "set": "base",
    "number": "91/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/91/high.webp"
  },
  "energy-removal": {
    "id": "energy-removal",
    "name": "Suppression d'Énergie",
    "type": "Trainer",
    "trainerType": "Item",
    "effect": "Choisissez 1 carte Énergie attachée à 1 des Pokémon de votre adversaire et défaussez-la.",
    "set": "base",
    "number": "92/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/92/high.webp"
  },
  "gust-of-wind": {
    "id": "gust-of-wind",
    "name": "Rafale de vent",
    "type": "Trainer",
    "trainerType": "Item",
    "effect": "Choisissez 1 Pokémon du Banc votre adversaire et échangez-le avec son Pokémon actif.",
    "set": "base",
    "number": "93/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/93/high.webp"
  },
  "potion": {
    "id": "potion",
    "name": "Potion",
    "type": "Trainer",
    "trainerType": "Item",
    "effect": "Retirez jusqu'à 2 marqueurs de dégâts d'1 de vos Pokémon.",
    "set": "base",
    "number": "94/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/94/high.webp"
  },
  "switch": {
    "id": "switch",
    "name": "Transfert",
    "type": "Trainer",
    "trainerType": "Item",
    "effect": "Échangez 1 Pokémon de votre Banc avec votre Pokémon actif.",
    "set": "base",
    "number": "95/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/95/high.webp"
  },
  "colorless-energy": {
    "id": "colorless-energy",
    "name": "Double Énergie Incolore",
    "type": "Energy",
    "energyType": "Colorless",
    "set": "base",
    "number": "96/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/96/high.webp"
  },
  "fighting-energy": {
    "id": "fighting-energy",
    "name": "Énergie Combat",
    "type": "Energy",
    "energyType": "Fighting",
    "set": "base",
    "number": "97/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/97/high.webp"
  },
  "fire-energy": {
    "id": "fire-energy",
    "name": "Énergie Feu",
    "type": "Energy",
    "energyType": "Fire",
    "set": "base",
    "number": "98/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/98/high.webp"
  },
  "grass-energy": {
    "id": "grass-energy",
    "name": "Énergie Plante",
    "type": "Energy",
    "energyType": "Grass",
    "set": "base",
    "number": "99/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/99/high.webp"
  },
  "lightning-energy": {
    "id": "lightning-energy",
    "name": "Énergie Électrique",
    "type": "Energy",
    "energyType": "Lightning",
    "set": "base",
    "number": "100/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/100/high.webp"
  },
  "psychic-energy": {
    "id": "psychic-energy",
    "name": "Énergie Psy",
    "type": "Energy",
    "energyType": "Psychic",
    "set": "base",
    "number": "101/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/101/high.webp"
  },
  "water-energy": {
    "id": "water-energy",
    "name": "Énergie Eau",
    "type": "Energy",
    "energyType": "Water",
    "set": "base",
    "number": "102/102",
    "image": "https://assets.tcgdex.net/fr/base/base1/102/high.webp"
  },
  "clefable": {
    "id": "clefable",
    "name": "Mélodelfe",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Mélofée",
    "hp": 70,
    "maxHp": 70,
    "energyType": "Colorless",
    "weakness": "Fighting",
    "resistance": "Psychic",
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Métronome",
        "cost": [
          "Colorless"
        ],
        "damage": 0,
        "effect": "Choisissez 1 des attaques du Pokémon Défenseur. Métronome copie cette attaque à l'exception de son coût d'Énergie et de toute autre action requise pour utiliser cette attaque, comme par exemple, défausser des cartes Énergie. (Quel que soit le type du Pokémon Défenseur, Mélodelfe demeure de type Incolore.)"
      },
      {
        "name": "Lilliput",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 0,
        "effect": "Tous les dégâts infligés à Mélodelfe par des attaques pendant le prochain tour de votre adversaire sont réduits de 20 (après application de la Faiblesse et de la Résistance)."
      }
    ],
    "set": "jungle",
    "number": "1/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/1/high.webp"
  },
  "electrode-base2-2": {
    "id": "electrode-base2-2",
    "name": "Électrode",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Voltorbe",
    "hp": 90,
    "maxHp": 90,
    "energyType": "Lightning",
    "weakness": "Fighting",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Charge",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 20,
        "effect": ""
      },
      {
        "name": "Rafale de foudre",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "damage": 20,
        "effect": "Si le Pokémon Défenseur n'est pas de type Incolore, cette attaque inflige 10 dégâts à chacun des Pokémon du même type que le Pokémon Défenseur qui sont sur un Banc (y compris le vôtre)."
      }
    ],
    "set": "jungle",
    "number": "2/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/2/high.webp"
  },
  "flareon": {
    "id": "flareon",
    "name": "Pyroli",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Évoli",
    "hp": 70,
    "maxHp": 70,
    "energyType": "Fire",
    "weakness": "Water",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Vive-attaque",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 10,
        "effect": "Lancez une pièce. Si c'est face, cette attaque inflige 10 dégâts plus 20 dégâts supplémentaires ; si c'est pile, cette attaque inflige 10 dégâts."
      },
      {
        "name": "Lance-flammes",
        "cost": [
          "Fire",
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "damage": 60,
        "effect": "Défaussez 1 carte Énergie  attachée à Pyroli pour pouvoir utiliser cette attaque."
      }
    ],
    "set": "jungle",
    "number": "3/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/3/high.webp"
  },
  "jolteon": {
    "id": "jolteon",
    "name": "Voltali",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Évoli",
    "hp": 70,
    "maxHp": 70,
    "energyType": "Lightning",
    "weakness": "Fighting",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Vive-attaque",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 10,
        "effect": "Lancez une pièce. Si c'est face, cette attaque inflige 10 dégâts plus 20 dégâts supplémentaires ; si c'est pile, cette attaque inflige 10 dégâts."
      },
      {
        "name": "Dard-nuée",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "damage": 20,
        "effect": "Lancez 4 pièces. Cette attaque inflige 20 dégâts multipliés par le nombre de faces."
      }
    ],
    "set": "jungle",
    "number": "4/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/4/high.webp"
  },
  "kangaskhan": {
    "id": "kangaskhan",
    "name": "Kangourex",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 90,
    "maxHp": 90,
    "energyType": "Colorless",
    "weakness": "Fighting",
    "resistance": "Psychic",
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Rapporte",
        "cost": [
          "Colorless"
        ],
        "damage": 0,
        "effect": "Piochez une carte."
      },
      {
        "name": "Poing comète",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 20,
        "effect": "Lancez 4 pièces. Cette attaque inflige 20 dégâts multipliés par le nombre de faces."
      }
    ],
    "set": "jungle",
    "number": "5/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/5/high.webp"
  },
  "mr-mime": {
    "id": "mr-mime",
    "name": "M. Mime",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 40,
    "maxHp": 40,
    "energyType": "Psychic",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Yoga",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "damage": 10,
        "effect": "Inflige 10 dégâts plus 10 dégâts supplémentaires pour chaque marqueur de dégâts sur le Pokémon Défenseur."
      }
    ],
    "set": "jungle",
    "number": "6/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/6/high.webp",
    "power": {
      "id": "invisible_wall",
      "name": "Mur invisible",
      "passive": true,
      "text": "Chaque fois qu'une attaque inflige 30 dégâts ou plus à M. Mime (après Faiblesse et Résistance), prévenez ces dégâts."
    }
  },
  "nidoqueen": {
    "id": "nidoqueen",
    "name": "Nidoqueen",
    "type": "Pokemon",
    "stage": "Stage 2",
    "evolvesFrom": "Nidorina",
    "hp": 90,
    "maxHp": 90,
    "energyType": "Grass",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Fiancés",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "damage": 20,
        "effect": "Inflige 20 dégâts plus 20 dégâts supplémentaires pour chaque Nidoking que vous avez en jeu."
      },
      {
        "name": "Ultimapoing",
        "cost": [
          "Grass",
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "damage": 50,
        "effect": ""
      }
    ],
    "set": "jungle",
    "number": "7/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/7/high.webp"
  },
  "pidgeot": {
    "id": "pidgeot",
    "name": "Roucarnage",
    "type": "Pokemon",
    "stage": "Stage 2",
    "evolvesFrom": "Roucoups",
    "hp": 80,
    "maxHp": 80,
    "energyType": "Colorless",
    "weakness": "Lightning",
    "resistance": "Fighting",
    "retreatCost": [],
    "attacks": [
      {
        "name": "Cru-aile",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 20,
        "effect": ""
      },
      {
        "name": "Ouragan",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 30,
        "effect": "À moins que cette attaque ne mette le Pokémon Défenseur K.O., renvoyez le Pokémon Défenseur et toutes les cartes qui lui sont attachées dans la main de votre adversaire."
      }
    ],
    "set": "jungle",
    "number": "8/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/8/high.webp"
  },
  "pinsir": {
    "id": "pinsir",
    "name": "Scarabrute",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 60,
    "maxHp": 60,
    "energyType": "Grass",
    "weakness": "Fire",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Poigne de fer",
        "cost": [
          "Grass",
          "Grass"
        ],
        "damage": 20,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Paralysé."
      },
      {
        "name": "Guillotine",
        "cost": [
          "Grass",
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "damage": 50,
        "effect": ""
      }
    ],
    "set": "jungle",
    "number": "9/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/9/high.webp"
  },
  "scyther": {
    "id": "scyther",
    "name": "Insécateur",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 70,
    "maxHp": 70,
    "energyType": "Grass",
    "weakness": "Fire",
    "resistance": "Fighting",
    "retreatCost": [],
    "attacks": [
      {
        "name": "Danse-lames",
        "cost": [
          "Grass"
        ],
        "damage": 0,
        "effect": "Pendant votre prochain tour, l'attaque Tranche d'Insécateur inflige 60 dégâts de base au lieu de 30."
      },
      {
        "name": "Tranche",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 30,
        "effect": ""
      }
    ],
    "set": "jungle",
    "number": "10/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/10/high.webp"
  },
  "snorlax": {
    "id": "snorlax",
    "name": "Ronflex",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 90,
    "maxHp": 90,
    "energyType": "Colorless",
    "weakness": "Fighting",
    "resistance": "Psychic",
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Plaquage",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 30,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Paralysé."
      }
    ],
    "set": "jungle",
    "number": "11/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/11/high.webp",
    "power": {
      "id": "thick_skinned",
      "name": "Peau épaisse",
      "passive": true,
      "text": "Ronflex ne peut pas devenir Endormi, Confus, Paralysé ou Empoisonné."
    }
  },
  "vaporeon": {
    "id": "vaporeon",
    "name": "Aquali",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Évoli",
    "hp": 80,
    "maxHp": 80,
    "energyType": "Water",
    "weakness": "Lightning",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Vive-attaque",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 10,
        "effect": "Lancez une pièce. Si c'est face, cette attaque inflige 10 dégâts plus 20 dégâts supplémentaires ; si c'est pile, cette attaque inflige 10 dégâts."
      },
      {
        "name": "Pistolet à O",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "damage": 30,
        "effect": "Inflige 30 dégâts plus 10 dégâts supplémentaires pour chaque Énergie  attachée à Aquali en plus du coût en Énergie de cette attaque. Les Énergies  supplémentaires après la seconde ne comptent pas."
      }
    ],
    "set": "jungle",
    "number": "12/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/12/high.webp"
  },
  "venomoth": {
    "id": "venomoth",
    "name": "Aéromite",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Mimitoss",
    "hp": 70,
    "maxHp": 70,
    "energyType": "Grass",
    "weakness": "Fire",
    "resistance": "Fighting",
    "retreatCost": [],
    "attacks": [
      {
        "name": "Poudre venimeuse",
        "cost": [
          "Grass",
          "Grass"
        ],
        "damage": 10,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Confus et Empoisonné."
      }
    ],
    "set": "jungle",
    "number": "13/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/13/high.webp",
    "power": {
      "id": "shift",
      "name": "Changement",
      "passive": false,
      "oncePerTurn": true,
      "text": "Une fois pendant votre tour (avant votre attaque), vous pouvez changer le type d'Aéromite pour le type de n'importe quel autre Pokémon en jeu (autre qu'Incolore)."
    }
  },
  "victreebel": {
    "id": "victreebel",
    "name": "Empiflor",
    "type": "Pokemon",
    "stage": "Stage 2",
    "evolvesFrom": "Boustiflor",
    "hp": 80,
    "maxHp": 80,
    "energyType": "Grass",
    "weakness": "Fire",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Attraction",
        "cost": [
          "Grass"
        ],
        "damage": 0,
        "effect": "Si votre adversaire a des Pokémon sur son Banc, choisissez l'un d'eux et échangez-le avec son Pokémon Actif."
      },
      {
        "name": "Acide",
        "cost": [
          "Grass",
          "Grass"
        ],
        "damage": 20,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur ne peut pas battre en retraite pendant le prochain tour de votre adversaire."
      }
    ],
    "set": "jungle",
    "number": "14/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/14/high.webp"
  },
  "vileplume": {
    "id": "vileplume",
    "name": "Raflésia",
    "type": "Pokemon",
    "stage": "Stage 2",
    "evolvesFrom": "Ortide",
    "hp": 80,
    "maxHp": 80,
    "energyType": "Grass",
    "weakness": "Fire",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Danse-fleur",
        "cost": [
          "Grass",
          "Grass",
          "Grass"
        ],
        "damage": 40,
        "effect": "Lancez 3 pièces. Cette attaque inflige 40 dégâts multipliés par le nombre de faces. Raflésia est maintenant Confus (après résolution des dégâts)."
      }
    ],
    "set": "jungle",
    "number": "15/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/15/high.webp",
    "power": {
      "id": "heal",
      "name": "Soins",
      "passive": false,
      "oncePerTurn": true,
      "text": "Une fois pendant votre tour (avant votre attaque), vous pouvez lancer une pièce. Si c'est face, retirez 1 marqueur de dégâts (10 dégâts) d'un de vos Pokémon."
    }
  },
  "wigglytuff": {
    "id": "wigglytuff",
    "name": "Grodoudou",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Rondoudou",
    "hp": 80,
    "maxHp": 80,
    "energyType": "Colorless",
    "weakness": "Fighting",
    "resistance": "Psychic",
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Comptine",
        "cost": [
          "Colorless"
        ],
        "damage": 0,
        "effect": "Le Pokémon Défenseur est maintenant Endormi."
      },
      {
        "name": "Faites la vague",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 10,
        "effect": "Infligez 10 dégâts plus 10 dégâts supplémentaires pour chacun des Pokémon de votre Banc."
      }
    ],
    "set": "jungle",
    "number": "16/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/16/high.webp"
  },
  "clefable-base2-17": {
    "id": "clefable-base2-17",
    "name": "Mélodelfe",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Mélofée",
    "hp": 70,
    "maxHp": 70,
    "energyType": "Colorless",
    "weakness": "Fighting",
    "resistance": "Psychic",
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Métronome",
        "cost": [
          "Colorless"
        ],
        "damage": 0,
        "effect": "Choisissez 1 des attaques du Pokémon Défenseur. Métronome copie cette attaque à l'exception de son coût d'Énergie et de toute autre action requise pour utiliser cette attaque, comme par exemple, défausser des cartes Énergie. (Quel que soit le type du Pokémon Défenseur, Mélodelfe demeure de type Incolore.)"
      },
      {
        "name": "Lilliput",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 0,
        "effect": "Tous les dégâts infligés à Mélodelfe par des attaques pendant le prochain tour de votre adversaire sont réduits de 20 (après application de la Faiblesse et de la Résistance)."
      }
    ],
    "set": "jungle",
    "number": "17/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/17/high.webp"
  },
  "electrode-base2-18": {
    "id": "electrode-base2-18",
    "name": "Électrode",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Voltorbe",
    "hp": 90,
    "maxHp": 90,
    "energyType": "Lightning",
    "weakness": "Fighting",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Charge",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 20,
        "effect": ""
      },
      {
        "name": "Rafale de foudre",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "damage": 20,
        "effect": "Si le Pokémon Défenseur n'est pas de type Incolore, cette attaque inflige 10 dégâts à chacun des Pokémon du même type que le Pokémon Défenseur qui sont sur un Banc (y compris le vôtre)."
      }
    ],
    "set": "jungle",
    "number": "18/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/18/high.webp"
  },
  "flareon-base2-19": {
    "id": "flareon-base2-19",
    "name": "Pyroli",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Évoli",
    "hp": 70,
    "maxHp": 70,
    "energyType": "Fire",
    "weakness": "Water",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Vive-attaque",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 10,
        "effect": "Lancez une pièce. Si c'est face, cette attaque inflige 10 dégâts plus 20 dégâts supplémentaires ; si c'est pile, cette attaque inflige 10 dégâts."
      },
      {
        "name": "Lance-flammes",
        "cost": [
          "Fire",
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "damage": 60,
        "effect": "Défaussez 1 carte Énergie  attachée à Pyroli pour pouvoir utiliser cette attaque."
      }
    ],
    "set": "jungle",
    "number": "19/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/19/high.webp"
  },
  "jolteon-base2-20": {
    "id": "jolteon-base2-20",
    "name": "Voltali",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Évoli",
    "hp": 70,
    "maxHp": 70,
    "energyType": "Lightning",
    "weakness": "Fighting",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Vive-attaque",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 10,
        "effect": "Lancez une pièce. Si c'est face, cette attaque inflige 10 dégâts plus 20 dégâts supplémentaires ; si c'est pile, cette attaque inflige 10 dégâts."
      },
      {
        "name": "Dard-nuée",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "damage": 20,
        "effect": "Lancez 4 pièces. Cette attaque inflige 20 dégâts multipliés par le nombre de faces."
      }
    ],
    "set": "jungle",
    "number": "20/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/20/high.webp"
  },
  "kangaskhan-base2-21": {
    "id": "kangaskhan-base2-21",
    "name": "Kangourex",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 90,
    "maxHp": 90,
    "energyType": "Colorless",
    "weakness": "Fighting",
    "resistance": "Psychic",
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Rapporte",
        "cost": [
          "Colorless"
        ],
        "damage": 0,
        "effect": "Piochez une carte."
      },
      {
        "name": "Poing comète",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 20,
        "effect": "Lancez 4 pièces. Cette attaque inflige 20 dégâts multipliés par le nombre de faces."
      }
    ],
    "set": "jungle",
    "number": "21/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/21/high.webp"
  },
  "mr-mime-base2-22": {
    "id": "mr-mime-base2-22",
    "name": "M. Mime",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 40,
    "maxHp": 40,
    "energyType": "Psychic",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Yoga",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "damage": 10,
        "effect": "Inflige 10 dégâts plus 10 dégâts supplémentaires pour chaque marqueur de dégâts sur le Pokémon Défenseur."
      }
    ],
    "set": "jungle",
    "number": "22/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/22/high.webp",
    "power": {
      "id": "invisible_wall",
      "name": "Mur invisible",
      "passive": true,
      "text": "Chaque fois qu'une attaque inflige 30 dégâts ou plus à M. Mime (après Faiblesse et Résistance), prévenez ces dégâts."
    }
  },
  "nidoqueen-base2-23": {
    "id": "nidoqueen-base2-23",
    "name": "Nidoqueen",
    "type": "Pokemon",
    "stage": "Stage 2",
    "evolvesFrom": "Nidorina",
    "hp": 90,
    "maxHp": 90,
    "energyType": "Grass",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Fiancés",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "damage": 20,
        "effect": "Inflige 20 dégâts plus 20 dégâts supplémentaires pour chaque Nidoking que vous avez en jeu."
      },
      {
        "name": "Ultimapoing",
        "cost": [
          "Grass",
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "damage": 50,
        "effect": ""
      }
    ],
    "set": "jungle",
    "number": "23/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/23/high.webp"
  },
  "pidgeot-base2-24": {
    "id": "pidgeot-base2-24",
    "name": "Roucarnage",
    "type": "Pokemon",
    "stage": "Stage 2",
    "evolvesFrom": "Roucoups",
    "hp": 80,
    "maxHp": 80,
    "energyType": "Colorless",
    "weakness": "Lightning",
    "resistance": "Fighting",
    "retreatCost": [],
    "attacks": [
      {
        "name": "Cru-aile",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 20,
        "effect": ""
      },
      {
        "name": "Ouragan",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 30,
        "effect": "À moins que cette attaque ne mette le Pokémon Défenseur K.O., renvoyez le Pokémon Défenseur et toutes les cartes qui lui sont attachées dans la main de votre adversaire."
      }
    ],
    "set": "jungle",
    "number": "24/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/24/high.webp"
  },
  "pinsir-base2-25": {
    "id": "pinsir-base2-25",
    "name": "Scarabrute",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 60,
    "maxHp": 60,
    "energyType": "Grass",
    "weakness": "Fire",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Poing de fer",
        "cost": [
          "Grass",
          "Grass"
        ],
        "damage": 20,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Paralysé."
      },
      {
        "name": "Guillotine",
        "cost": [
          "Grass",
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "damage": 50,
        "effect": ""
      }
    ],
    "set": "jungle",
    "number": "25/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/25/high.webp"
  },
  "scyther-base2-26": {
    "id": "scyther-base2-26",
    "name": "Insécateur",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 70,
    "maxHp": 70,
    "energyType": "Grass",
    "weakness": "Fire",
    "resistance": "Fighting",
    "retreatCost": [],
    "attacks": [
      {
        "name": "Danse-lames",
        "cost": [
          "Grass"
        ],
        "damage": 0,
        "effect": "Pendant votre prochain tour, l'attaque Tranche d'Insécateur inflige 60 dégâts de base au lieu de 30."
      },
      {
        "name": "Tranche",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 30,
        "effect": ""
      }
    ],
    "set": "jungle",
    "number": "26/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/26/high.webp"
  },
  "snorlax-base2-27": {
    "id": "snorlax-base2-27",
    "name": "Ronflex",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 90,
    "maxHp": 90,
    "energyType": "Colorless",
    "weakness": "Fighting",
    "resistance": "Psychic",
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Plaquage",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 30,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Paralysé."
      }
    ],
    "set": "jungle",
    "number": "27/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/27/high.webp",
    "power": {
      "id": "thick_skinned",
      "name": "Peau épaisse",
      "passive": true,
      "text": "Ronflex ne peut pas devenir Endormi, Confus, Paralysé ou Empoisonné."
    }
  },
  "vaporeon-base2-28": {
    "id": "vaporeon-base2-28",
    "name": "Aquali",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Évoli",
    "hp": 80,
    "maxHp": 80,
    "energyType": "Water",
    "weakness": "Lightning",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Vive-attaque",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 10,
        "effect": "Lancez une pièce. Si c'est face, cette attaque inflige 10 dégâts plus 20 dégâts supplémentaires ; si c'est pile, cette attaque inflige 10 dégâts."
      },
      {
        "name": "Pistolet à O",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "damage": 30,
        "effect": "Inflige 30 dégâts plus 10 dégâts supplémentaires pour chaque Énergie  attachée à Aquali en plus du coût en Énergie de cette attaque. Les Énergies  supplémentaires après la seconde ne comptent pas."
      }
    ],
    "set": "jungle",
    "number": "28/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/28/high.webp"
  },
  "venomoth-base2-29": {
    "id": "venomoth-base2-29",
    "name": "Aéromite",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Mimitoss",
    "hp": 70,
    "maxHp": 70,
    "energyType": "Grass",
    "weakness": "Fire",
    "resistance": "Fighting",
    "retreatCost": [],
    "attacks": [
      {
        "name": "Poudre venimeuse",
        "cost": [
          "Grass",
          "Grass"
        ],
        "damage": 10,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Confus et Empoisonné."
      }
    ],
    "set": "jungle",
    "number": "29/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/29/high.webp",
    "power": {
      "id": "shift",
      "name": "Changement",
      "passive": false,
      "oncePerTurn": true,
      "text": "Une fois pendant votre tour (avant votre attaque), vous pouvez changer le type d'Aéromite pour le type de n'importe quel autre Pokémon en jeu (autre qu'Incolore)."
    }
  },
  "victreebel-base2-30": {
    "id": "victreebel-base2-30",
    "name": "Empiflor",
    "type": "Pokemon",
    "stage": "Stage 2",
    "evolvesFrom": "Boustiflor",
    "hp": 80,
    "maxHp": 80,
    "energyType": "Grass",
    "weakness": "Fire",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Attraction",
        "cost": [
          "Grass"
        ],
        "damage": 0,
        "effect": "Si votre adversaire a des Pokémon sur son Banc, choisissez l'un d'eux et échangez-le avec son Pokémon Actif."
      },
      {
        "name": "Acide",
        "cost": [
          "Grass",
          "Grass"
        ],
        "damage": 20,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur ne peut pas battre en retraite pendant le prochain tour de votre adversaire."
      }
    ],
    "set": "jungle",
    "number": "30/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/30/high.webp"
  },
  "vileplume-base2-31": {
    "id": "vileplume-base2-31",
    "name": "Raflésia",
    "type": "Pokemon",
    "stage": "Stage 2",
    "evolvesFrom": "Ortide",
    "hp": 80,
    "maxHp": 80,
    "energyType": "Grass",
    "weakness": "Fire",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Danse-fleur",
        "cost": [
          "Grass",
          "Grass",
          "Grass"
        ],
        "damage": 40,
        "effect": "Lancez 3 pièces. Cette attaque inflige 40 dégâts multipliés par le nombre de faces. Raflésia est maintenant Confus (après résolution des dégâts)."
      }
    ],
    "set": "jungle",
    "number": "31/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/31/high.webp",
    "power": {
      "id": "heal",
      "name": "Soins",
      "passive": false,
      "oncePerTurn": true,
      "text": "Une fois pendant votre tour (avant votre attaque), vous pouvez lancer une pièce. Si c'est face, retirez 1 marqueur de dégâts (10 dégâts) d'un de vos Pokémon."
    }
  },
  "wigglytuff-base2-32": {
    "id": "wigglytuff-base2-32",
    "name": "Grodoudou",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Rondoudou",
    "hp": 80,
    "maxHp": 80,
    "energyType": "Colorless",
    "weakness": "Fighting",
    "resistance": "Psychic",
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Comptine",
        "cost": [
          "Colorless"
        ],
        "damage": 0,
        "effect": "Le Pokémon Défenseur est maintenant Endormi."
      },
      {
        "name": "Faites la vague",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 10,
        "effect": "Infligez 10 dégâts plus 10 dégâts supplémentaires pour chacun des Pokémon de votre Banc."
      }
    ],
    "set": "jungle",
    "number": "32/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/32/high.webp"
  },
  "butterfree": {
    "id": "butterfree",
    "name": "Papilusion",
    "type": "Pokemon",
    "stage": "Stage 2",
    "evolvesFrom": "Chrysacier",
    "hp": 70,
    "maxHp": 70,
    "energyType": "Grass",
    "weakness": "Fire",
    "resistance": "Fighting",
    "retreatCost": [],
    "attacks": [
      {
        "name": "Cyclone",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 20,
        "effect": "Si votre adversaire a au moins 1 Pokémon sur son Banc, il choisit l'un d'eux et l'échange avec son Pokémon Défenseur. (Infligez les dégâts avant de faire l'échange des Pokémon.)"
      },
      {
        "name": "Mega-sangsue",
        "cost": [
          "Grass",
          "Grass",
          "Grass",
          "Grass"
        ],
        "damage": 40,
        "effect": "Retirez de Papilusion un nombre de marqueurs de dégâts égal à la moitié des dégâts infligés au Pokémon Défenseur (après application de la Faiblesse et de la Résistance) (arrondir à la dizaine la plus proche). Si Papilusion a moins de marqueurs de 10 dégâts, retirez-les tous."
      }
    ],
    "set": "jungle",
    "number": "33/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/33/high.webp"
  },
  "dodrio": {
    "id": "dodrio",
    "name": "Dodrio",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Doduo",
    "hp": 70,
    "maxHp": 70,
    "energyType": "Colorless",
    "weakness": "Lightning",
    "resistance": "Fighting",
    "retreatCost": [],
    "attacks": [
      {
        "name": "Frénésie",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 10,
        "effect": "Inflige 10 dégâts plus 10 dégâts supplémentaires pour chaque marqueur de dégâts placé sur Dodrio."
      }
    ],
    "set": "jungle",
    "number": "34/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/34/high.webp",
    "power": {
      "id": "retreat_aid",
      "name": "Soutien de retraite",
      "passive": true,
      "text": "Tant que Dodrio est sur votre Banc, payez 1 Énergie de moins pour faire battre en retraite votre Pokémon Actif."
    }
  },
  "exeggutor": {
    "id": "exeggutor",
    "name": "Noadkoko",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Nœufnœuf",
    "hp": 80,
    "maxHp": 80,
    "energyType": "Grass",
    "weakness": "Fire",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Téléport",
        "cost": [
          "Psychic"
        ],
        "damage": 0,
        "effect": "Échangez Noadkoko avec 1 des Pokémon de votre Banc."
      },
      {
        "name": "Grosse éclate",
        "cost": [
          "Colorless"
        ],
        "damage": 20,
        "effect": "Lancez un nombre de pièces égal au nombre d'Énergies attachées à Noadkoko. Cette attaque inflige 20 dégâts multipliés par le nombre de faces."
      }
    ],
    "set": "jungle",
    "number": "35/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/35/high.webp"
  },
  "fearow": {
    "id": "fearow",
    "name": "Rapasdepic",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Piafabec",
    "hp": 70,
    "maxHp": 70,
    "energyType": "Colorless",
    "weakness": "Lightning",
    "resistance": "Fighting",
    "retreatCost": [],
    "attacks": [
      {
        "name": "Hâte",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 20,
        "effect": "Lancez une pièce. Si c'est face, pendant le prochain tour de votre adversaire, prévenez tous les effets d'attaques, y compris les dégâts, infligés à Rapasdepic."
      },
      {
        "name": "Bec vrille",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 40,
        "effect": ""
      }
    ],
    "set": "jungle",
    "number": "36/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/36/high.webp"
  },
  "gloom": {
    "id": "gloom",
    "name": "Ortide",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Mystherbe",
    "hp": 60,
    "maxHp": 60,
    "energyType": "Grass",
    "weakness": "Fire",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Poudre toxik",
        "cost": [
          "Grass"
        ],
        "damage": 0,
        "effect": "Le Pokémon Défenseur est maintenant Empoisonné."
      },
      {
        "name": "Odeur fétide",
        "cost": [
          "Grass",
          "Grass"
        ],
        "damage": 20,
        "effect": "Le Pokémon Défenseur et Ortide sont maintenant tous deux Confus (après le calcul des dégâts)."
      }
    ],
    "set": "jungle",
    "number": "37/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/37/high.webp"
  },
  "lickitung": {
    "id": "lickitung",
    "name": "Excelangue",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 90,
    "maxHp": 90,
    "energyType": "Colorless",
    "weakness": "Fighting",
    "resistance": "Psychic",
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Léchouille",
        "cost": [
          "Colorless"
        ],
        "damage": 10,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Paralysé."
      },
      {
        "name": "Ultrason",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 0,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Confus."
      }
    ],
    "set": "jungle",
    "number": "38/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/38/high.webp"
  },
  "marowak": {
    "id": "marowak",
    "name": "Ossatueur",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Osselait",
    "hp": 60,
    "maxHp": 60,
    "energyType": "Fighting",
    "weakness": "Grass",
    "resistance": "Lightning",
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Osmerang",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "damage": 30,
        "effect": "Lancez 2 pièces. Cette attaque inflige 30 dégâts multipliés par le nombre de faces."
      },
      {
        "name": "À la rescousse !",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "damage": 0,
        "effect": "Cherchez dans votre deck une carte Pokémon  de base et placez-la sur votre Banc. Mélangez ensuite votre deck. (Vous ne pouvez pas utiliser cette attaque si votre Banc est plein.)"
      }
    ],
    "set": "jungle",
    "number": "39/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/39/high.webp"
  },
  "nidorina": {
    "id": "nidorina",
    "name": "Nidorina",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Nidoran ♀",
    "hp": 70,
    "maxHp": 70,
    "energyType": "Grass",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Ultrason",
        "cost": [
          "Grass"
        ],
        "damage": 0,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Confus."
      },
      {
        "name": "Double pied",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "damage": 30,
        "effect": "Lancez 2 pièces. Cette attaque inflige 30 dégâts multipliés par le nombre de faces."
      }
    ],
    "set": "jungle",
    "number": "40/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/40/high.webp"
  },
  "parasect": {
    "id": "parasect",
    "name": "Parasect",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Paras",
    "hp": 60,
    "maxHp": 60,
    "energyType": "Grass",
    "weakness": "Fire",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Spore",
        "cost": [
          "Grass",
          "Grass"
        ],
        "damage": 0,
        "effect": "Le Pokémon Défenseur est maintenant Endormi."
      },
      {
        "name": "Tranche",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 30,
        "effect": ""
      }
    ],
    "set": "jungle",
    "number": "41/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/41/high.webp"
  },
  "persian": {
    "id": "persian",
    "name": "Persian",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Miaouss",
    "hp": 70,
    "maxHp": 70,
    "energyType": "Colorless",
    "weakness": "Fighting",
    "resistance": "Psychic",
    "retreatCost": [],
    "attacks": [
      {
        "name": "Griffe",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 20,
        "effect": ""
      },
      {
        "name": "Bond",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 30,
        "effect": "Si le Pokémon Défenseur attaque Persian pendant le prochain tour de votre adversaire, les dégâts infligés par cette attaque sont réduits de 10 (après application de la Faiblesse et de la Résistance). (Si l'un des deux Pokémon bat en retraite, cet effet prend fin.)"
      }
    ],
    "set": "jungle",
    "number": "42/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/42/high.webp"
  },
  "primeape": {
    "id": "primeape",
    "name": "Colossinge",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Férosinge",
    "hp": 70,
    "maxHp": 70,
    "energyType": "Fighting",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Combo-griffe",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "damage": 20,
        "effect": "Lancez 3 pièces. Cette attaque inflige 20 dégâts multipliés par le nombre de faces."
      },
      {
        "name": "Mauvaise humeur",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "damage": 50,
        "effect": "Lancez une pièce. Si c'est pile, Colossinge est maintenant Confus (après le calcul des dégâts)."
      }
    ],
    "set": "jungle",
    "number": "43/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/43/high.webp"
  },
  "rapidash": {
    "id": "rapidash",
    "name": "Galopa",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Ponyta",
    "hp": 70,
    "maxHp": 70,
    "energyType": "Fire",
    "weakness": "Water",
    "resistance": null,
    "retreatCost": [],
    "attacks": [
      {
        "name": "Écrasement",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 20,
        "effect": "Lancez une pièce. Si c'est face, cette attaque inflige 20 dégâts plus 10 dégâts supplémentaires ; si c'est pile, cette attaque inflige 20 dégâts."
      },
      {
        "name": "Hâte",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "damage": 30,
        "effect": "Lancez une pièce. Si c'est face, pendant le prochain tour de votre adversaire, prévenez tous les effets d'attaques, y compris les dégâts, infligés à Galopa."
      }
    ],
    "set": "jungle",
    "number": "44/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/44/high.webp"
  },
  "rhydon": {
    "id": "rhydon",
    "name": "Rhinoféros",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Rhinocorne",
    "hp": 100,
    "maxHp": 100,
    "energyType": "Fighting",
    "weakness": "Grass",
    "resistance": "Lightning",
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Koud'korne",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "damage": 30,
        "effect": ""
      },
      {
        "name": "Défonce",
        "cost": [
          "Fighting",
          "Fighting",
          "Fighting",
          "Fighting"
        ],
        "damage": 50,
        "effect": "Rhinoféros s'inflige 20 dégâts. Si votre adversaire a au moins 1 Pokémon sur son Banc, il choisit l'un d'eux et l'échange avec son Pokémon Défenseur. (Infligez les dégâts avant de faire l'échange des Pokémon. Échangez les Pokémon même si Rhinoféros est K.O.)"
      }
    ],
    "set": "jungle",
    "number": "45/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/45/high.webp"
  },
  "seaking": {
    "id": "seaking",
    "name": "Poissoroy",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Poissirène",
    "hp": 70,
    "maxHp": 70,
    "energyType": "Water",
    "weakness": "Lightning",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Koud'korne",
        "cost": [
          "Water"
        ],
        "damage": 10,
        "effect": ""
      },
      {
        "name": "Cascade",
        "cost": [
          "Water",
          "Colorless"
        ],
        "damage": 30,
        "effect": ""
      }
    ],
    "set": "jungle",
    "number": "46/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/46/high.webp"
  },
  "tauros": {
    "id": "tauros",
    "name": "Tauros",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 60,
    "maxHp": 60,
    "energyType": "Colorless",
    "weakness": "Fighting",
    "resistance": "Psychic",
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Écrasement",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 20,
        "effect": "Lancez une pièce. Si c'est face, cette attaque inflige 20 dégâts plus 10 dégâts supplémentaires ; si c'est pile, cette attaque inflige 20 dégâts."
      },
      {
        "name": "Saccage",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 20,
        "effect": "Cette attaque inflige 20 dégâts plus 10 dégâts supplémentaires pour chaque marqueur de dégâts sur Tauros. Lancez une pièce. Si c'est pile, Tauros est maintenant Confus (après le calcul des dégâts)."
      }
    ],
    "set": "jungle",
    "number": "47/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/47/high.webp"
  },
  "weepinbell": {
    "id": "weepinbell",
    "name": "Boustiflor",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Chétiflor",
    "hp": 70,
    "maxHp": 70,
    "energyType": "Grass",
    "weakness": "Fire",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Poudre toxik",
        "cost": [
          "Grass"
        ],
        "damage": 10,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Empoisonné."
      },
      {
        "name": "Tranch'herbe",
        "cost": [
          "Grass",
          "Grass"
        ],
        "damage": 30,
        "effect": ""
      }
    ],
    "set": "jungle",
    "number": "48/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/48/high.webp"
  },
  "bellsprout": {
    "id": "bellsprout",
    "name": "Chétiflor",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 40,
    "maxHp": 40,
    "energyType": "Grass",
    "weakness": "Fire",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Fouet liane",
        "cost": [
          "Grass"
        ],
        "damage": 10,
        "effect": ""
      },
      {
        "name": "Appel à la famille",
        "cost": [
          "Grass"
        ],
        "damage": 0,
        "effect": "Cherchez dans votre deck un Pokémon de base appelé Chétiflor et placez-le sur votre Banc. Mélangez ensuite votre deck. (Vous ne pouvez pas utiliser cette attaque si votre Banc est plein.)"
      }
    ],
    "set": "jungle",
    "number": "49/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/49/high.webp"
  },
  "cubone": {
    "id": "cubone",
    "name": "Osselait",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 40,
    "maxHp": 40,
    "energyType": "Fighting",
    "weakness": "Grass",
    "resistance": "Lightning",
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Pleurnicherie",
        "cost": [
          "Colorless"
        ],
        "damage": 0,
        "effect": "Si le Pokémon Défenseur attaque Osselait pendant le prochain tour de votre adversaire, les dégâts infligés par l'attaque sont réduits de 20 (après application de la Faiblesse et de la Résistance). (Si l'un des Pokémon bat en retraite, cet effet prend fin.)"
      },
      {
        "name": "Frénésie",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "damage": 10,
        "effect": "Inflige 10 dégâts plus 10 dégâts supplémentaires pour chaque marqueur de dégâts placé sur Osselait."
      }
    ],
    "set": "jungle",
    "number": "50/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/50/high.webp"
  },
  "eevee": {
    "id": "eevee",
    "name": "Évoli",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 50,
    "maxHp": 50,
    "energyType": "Colorless",
    "weakness": "Fighting",
    "resistance": "Psychic",
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Mouvemend'keu",
        "cost": [
          "Colorless"
        ],
        "damage": 0,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur ne peut pas attaquer Évoli pendant le prochain tour de votre adversaire. (Si l'un des deux Pokémon bat en retraite, cet effet prend fin.)"
      },
      {
        "name": "Vive-attaque",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 10,
        "effect": "Lancez une pièce. Si c'est face, cette attaque inflige 10 dégâts plus 20 dégâts supplémentaires ; si c'est pile, cette attaque inflige 10 dégâts."
      }
    ],
    "set": "jungle",
    "number": "51/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/51/high.webp"
  },
  "exeggcute": {
    "id": "exeggcute",
    "name": "Nœufnœuf",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 50,
    "maxHp": 50,
    "energyType": "Grass",
    "weakness": "Fire",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Hypnose",
        "cost": [
          "Psychic"
        ],
        "damage": 0,
        "effect": "Le Pokémon Défenseur est maintenant Endormi."
      },
      {
        "name": "Vampigraine",
        "cost": [
          "Grass",
          "Grass"
        ],
        "damage": 20,
        "effect": "À moins que tous les dégâts infligés par cette attaque ne soient prévenus, vous pouvez retirer 1 marqueur de dégâts de Nœufnœuf."
      }
    ],
    "set": "jungle",
    "number": "52/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/52/high.webp"
  },
  "goldeen": {
    "id": "goldeen",
    "name": "Poissirène",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 40,
    "maxHp": 40,
    "energyType": "Water",
    "weakness": "Lightning",
    "resistance": null,
    "retreatCost": [],
    "attacks": [
      {
        "name": "Koud'korne",
        "cost": [
          "Water"
        ],
        "damage": 10,
        "effect": ""
      }
    ],
    "set": "jungle",
    "number": "53/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/53/high.webp"
  },
  "jigglypuff": {
    "id": "jigglypuff",
    "name": "Rondoudou",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 60,
    "maxHp": 60,
    "energyType": "Colorless",
    "weakness": "Fighting",
    "resistance": "Psychic",
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Comptine",
        "cost": [
          "Colorless"
        ],
        "damage": 0,
        "effect": "Le Pokémon Défenseur est maintenant Endormi."
      },
      {
        "name": "Écras'face",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 20,
        "effect": ""
      }
    ],
    "set": "jungle",
    "number": "54/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/54/high.webp"
  },
  "mankey": {
    "id": "mankey",
    "name": "Férosinge",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 30,
    "maxHp": 30,
    "energyType": "Fighting",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [],
    "attacks": [
      {
        "name": "Griffe",
        "cost": [
          "Colorless"
        ],
        "damage": 10,
        "effect": ""
      }
    ],
    "set": "jungle",
    "number": "55/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/55/high.webp",
    "power": {
      "id": "peek",
      "name": "Espionnage",
      "passive": false,
      "oncePerTurn": true,
      "text": "Une fois pendant votre tour (avant votre attaque), vous pouvez regarder la carte du dessus d'un deck, une carte de la main adverse ou une Récompense."
    }
  },
  "meowth": {
    "id": "meowth",
    "name": "Miaouss",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 50,
    "maxHp": 50,
    "energyType": "Colorless",
    "weakness": "Fighting",
    "resistance": "Psychic",
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Jackpot",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 10,
        "effect": "Lancez une pièce. Si c'est face, piochez une carte."
      }
    ],
    "set": "jungle",
    "number": "56/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/56/high.webp"
  },
  "nidoran-f": {
    "id": "nidoran-f",
    "name": "Nidoran ♀",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 60,
    "maxHp": 60,
    "energyType": "Grass",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Combo-griffe",
        "cost": [
          "Grass"
        ],
        "damage": 10,
        "effect": "Lancez 3 pièces. Cette attaque inflige 10 dégâts multipliés par le nombre de faces."
      },
      {
        "name": "Appel à la famille",
        "cost": [
          "Grass",
          "Grass"
        ],
        "damage": 0,
        "effect": "Cherchez dans votre deck un Pokémon de base appelé Nidoran ♀ or Nidoran ♂ et placez-le sur votre Banc. Mélangez ensuite votre deck. (Vous ne pouvez pas utiliser cette attaque si votre Banc est plein.)"
      }
    ],
    "set": "jungle",
    "number": "57/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/57/high.webp"
  },
  "oddish": {
    "id": "oddish",
    "name": "Mystherbe",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 50,
    "maxHp": 50,
    "energyType": "Grass",
    "weakness": "Fire",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Para-spore",
        "cost": [
          "Grass"
        ],
        "damage": 10,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Paralysé."
      },
      {
        "name": "Repousse",
        "cost": [
          "Grass",
          "Grass"
        ],
        "damage": 0,
        "effect": "Cherchez dans votre deck un Pokémon de base appelé Mystherbe et placez-le sur votre Banc. Mélangez ensuite votre deck. (Vous ne pouvez pas utiliser cette attaque si votre Banc est plein.)"
      }
    ],
    "set": "jungle",
    "number": "58/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/58/high.webp"
  },
  "paras": {
    "id": "paras",
    "name": "Paras",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 40,
    "maxHp": 40,
    "energyType": "Grass",
    "weakness": "Fire",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Griffe",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 20,
        "effect": ""
      },
      {
        "name": "Spore",
        "cost": [
          "Grass",
          "Grass"
        ],
        "damage": 0,
        "effect": "Le Pokémon Défenseur est maintenant Endormi."
      }
    ],
    "set": "jungle",
    "number": "59/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/59/high.webp"
  },
  "pikachu-base2-60": {
    "id": "pikachu-base2-60",
    "name": "Pikachu",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 50,
    "maxHp": 50,
    "energyType": "Lightning",
    "weakness": "Fighting",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Étincelle",
        "cost": [
          "Lightning",
          "Lightning"
        ],
        "damage": 20,
        "effect": "Si votre adversaire a au moins 1 Pokémon sur son Banc, choisissez l'un d'eux ; cette attaque lui inflige 10 dégâts. (Ne pas appliquer la Faiblesse et la Résistance au Pokémon du Banc.)"
      }
    ],
    "set": "jungle",
    "number": "60/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/60/high.webp"
  },
  "rhyhorn": {
    "id": "rhyhorn",
    "name": "Rhinocorne",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 70,
    "maxHp": 70,
    "energyType": "Fighting",
    "weakness": "Grass",
    "resistance": "Lightning",
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Groz'yeux",
        "cost": [
          "Colorless"
        ],
        "damage": 0,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur ne peut pas attaquer Rhinocorne pendant le prochain tour de votre adversaire. (Si l'un des deux Pokémon bat en retraite, cet effet prend fin.)"
      },
      {
        "name": "Koud'korne",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "damage": 30,
        "effect": ""
      }
    ],
    "set": "jungle",
    "number": "61/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/61/high.webp"
  },
  "spearow": {
    "id": "spearow",
    "name": "Piafabec",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 50,
    "maxHp": 50,
    "energyType": "Colorless",
    "weakness": "Lightning",
    "resistance": "Fighting",
    "retreatCost": [],
    "attacks": [
      {
        "name": "Picpic",
        "cost": [
          "Colorless"
        ],
        "damage": 10,
        "effect": ""
      },
      {
        "name": "Mimique",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 0,
        "effect": "Si Piafabec a été attaqué durant le tour précédent, infligez le résultat final de cette attaque sur Piafabec au Pokémon Défenseur."
      }
    ],
    "set": "jungle",
    "number": "62/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/62/high.webp"
  },
  "venonat": {
    "id": "venonat",
    "name": "Mimitoss",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 40,
    "maxHp": 40,
    "energyType": "Grass",
    "weakness": "Fire",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Para-spore",
        "cost": [
          "Grass"
        ],
        "damage": 10,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Paralysé."
      },
      {
        "name": "Vampirisme",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "damage": 10,
        "effect": "Retirez de Mimitoss un nombre de marqueurs de dégâts égal aux dégâts infligés au Pokémon Défenseur (après application de la Faiblesse et de la Résistance). Si Mimitoss a moins de marqueurs de 10 dégâts, retirez-les tous."
      }
    ],
    "set": "jungle",
    "number": "63/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/63/high.webp"
  },
  "poke-ball": {
    "id": "poke-ball",
    "name": "Poké Balle",
    "type": "Trainer",
    "trainerType": "Item",
    "effect": "Lancez une pièce. Si c'est face, vous pouvez chercher n'importe quelle carte Pokémon de base ou Évolution dans votre deck. Montrez cette carte à votre adversaire, puis placez-la dans votre main. Mélangez ensuite votre deck.",
    "set": "jungle",
    "number": "64/64",
    "image": "https://assets.tcgdex.net/fr/base/base2/64/high.webp"
  },
  "aerodactyl": {
    "id": "aerodactyl",
    "name": "Ptéra",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Mystérieux Fossile",
    "hp": 60,
    "maxHp": 60,
    "energyType": "Fighting",
    "weakness": "Grass",
    "resistance": "Fighting",
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Cru-aile",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 30,
        "effect": ""
      }
    ],
    "set": "fossil",
    "number": "1/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/1/high.webp",
    "power": {
      "id": "prehistoric_power",
      "name": "Pouvoir préhistorique",
      "passive": true,
      "text": "Plus aucune carte Évolution ne peut être jouée tant que Ptéra est en jeu."
    }
  },
  "articuno": {
    "id": "articuno",
    "name": "Artikodin",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 70,
    "maxHp": 70,
    "energyType": "Water",
    "weakness": null,
    "resistance": "Fighting",
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Blocage glacial",
        "cost": [
          "Water",
          "Water",
          "Water"
        ],
        "damage": 30,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Paralysé."
      },
      {
        "name": "Blizzard",
        "cost": [
          "Water",
          "Water",
          "Water",
          "Water"
        ],
        "damage": 50,
        "effect": "Lancez une pièce. Si c'est face, cette attaque inflige 10 dégâts à chacun des Pokémon du Banc de votre adversaire. Si c'est pile, cette attaque inflige 10 dégâts à chacun des Pokémon de votre Banc. (Ne pas appliquer la Faiblesse et la Résistance aux Pokémon qui sont sur un Banc.)"
      }
    ],
    "set": "fossil",
    "number": "2/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/2/high.webp"
  },
  "ditto": {
    "id": "ditto",
    "name": "Métamorph",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 50,
    "maxHp": 50,
    "energyType": "Colorless",
    "weakness": "Fighting",
    "resistance": "Psychic",
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [],
    "set": "fossil",
    "number": "3/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/3/high.webp",
    "power": {
      "id": "transform",
      "name": "Morphing",
      "passive": true,
      "text": "Si Métamorph est votre Pokémon Actif, il copie les PV, le type, le coût de retraite et les attaques du Pokémon Défenseur (toute Énergie attachée à Métamorph fournit n'importe quel type)."
    }
  },
  "dragonite": {
    "id": "dragonite",
    "name": "Dracolosse",
    "type": "Pokemon",
    "stage": "Stage 2",
    "evolvesFrom": "Draco",
    "hp": 100,
    "maxHp": 100,
    "energyType": "Colorless",
    "weakness": null,
    "resistance": "Fighting",
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Souplesse",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 40,
        "effect": "Lancez 2 pièces. Cette attaque inflige 40 dégâts multipliés par le nombre de faces."
      }
    ],
    "set": "fossil",
    "number": "4/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/4/high.webp",
    "power": {
      "id": "step_in",
      "name": "En avant",
      "passive": false,
      "oncePerTurn": true,
      "text": "Une fois pendant votre tour (avant votre attaque), si Dracolosse est sur votre Banc, vous pouvez l'échanger gratuitement avec votre Pokémon Actif."
    }
  },
  "gengar": {
    "id": "gengar",
    "name": "Ectoplasma",
    "type": "Pokemon",
    "stage": "Stage 2",
    "evolvesFrom": "Spectrum",
    "hp": 80,
    "maxHp": 80,
    "energyType": "Psychic",
    "weakness": null,
    "resistance": "Fighting",
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Sombre-esprit",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "damage": 30,
        "effect": "Si votre adversaire a des Pokémon sur son Banc, choisissez l'un d'eux et cette attaque lui inflige 10 dégâts. (Ne pas appliquer la Résistance et la Faiblesse au Pokémon du Banc.)"
      }
    ],
    "set": "fossil",
    "number": "5/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/5/high.webp",
    "power": {
      "id": "curse",
      "name": "Malédiction",
      "passive": false,
      "oncePerTurn": true,
      "text": "Une fois pendant votre tour (avant votre attaque), vous pouvez déplacer 1 marqueur de dégâts (10 dégâts) d'un des Pokémon de votre adversaire vers un autre de ses Pokémon (même si cela le met K.O.)."
    }
  },
  "haunter-base3-6": {
    "id": "haunter-base3-6",
    "name": "Spectrum",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Fantominus",
    "hp": 50,
    "maxHp": 50,
    "energyType": "Psychic",
    "weakness": null,
    "resistance": "Fighting",
    "retreatCost": [],
    "attacks": [
      {
        "name": "Cauchemar",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "damage": 10,
        "effect": "Le Pokémon Défenseur est maintenant Endormi."
      }
    ],
    "set": "fossil",
    "number": "6/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/6/high.webp",
    "power": {
      "id": "transparency",
      "name": "Transparence",
      "passive": true,
      "text": "Chaque fois qu'une attaque fait quoi que ce soit à Spectrum, lancez une pièce. Si c'est face, prévenez tous les effets de cette attaque, y compris les dégâts, infligés à Spectrum."
    }
  },
  "hitmonlee": {
    "id": "hitmonlee",
    "name": "Kicklee",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 60,
    "maxHp": 60,
    "energyType": "Fighting",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Allonge",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "damage": 0,
        "effect": "Si votre adversaire a des Pokémon sur son Banc, choisissez l'un d'eux et cette attaque lui inflige 20 dégâts. (Ne pas appliquer la Faiblesse et la Résistance aux Pokémon du Banc.)"
      },
      {
        "name": "Pied Voltige",
        "cost": [
          "Fighting",
          "Fighting",
          "Fighting"
        ],
        "damage": 50,
        "effect": ""
      }
    ],
    "set": "fossil",
    "number": "7/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/7/high.webp"
  },
  "hypno": {
    "id": "hypno",
    "name": "Hypnomade",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Soporifik",
    "hp": 90,
    "maxHp": 90,
    "energyType": "Psychic",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Prophétie",
        "cost": [
          "Psychic"
        ],
        "damage": 0,
        "effect": "Regardez jusqu'à 3 cartes du dessus du deck d'un des deux joueurs et réarrangez-les comme bon vous semble."
      },
      {
        "name": "Sombre-esprit",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "damage": 30,
        "effect": "Si votre adversaire a des Pokémon sur son Banc, choisissez l'un d'eux et cette attaque lui inflige 10 dégâts. (Ne pas appliquer la Résistance et la Faiblesse au Pokémon du Banc.)"
      }
    ],
    "set": "fossil",
    "number": "8/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/8/high.webp"
  },
  "kabutops": {
    "id": "kabutops",
    "name": "Kabutops",
    "type": "Pokemon",
    "stage": "Stage 2",
    "evolvesFrom": "Kabuto",
    "hp": 60,
    "maxHp": 60,
    "energyType": "Fighting",
    "weakness": "Grass",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Lame-aiguisée",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "damage": 30,
        "effect": ""
      },
      {
        "name": "Vol-vie",
        "cost": [
          "Fighting",
          "Fighting",
          "Fighting",
          "Fighting"
        ],
        "damage": 40,
        "effect": "Retirez de Kabutops un nombre de marqueurs de dégâts égal à la moitié des dégâts infligés au Pokémon Défenseur (après application de la Faiblesse et de la Résistance) (arrondis à la dizaine la plus proche.) Si le nombre de marqueurs sur Kabutops est inférieur à ce résultat, retirez-les tous."
      }
    ],
    "set": "fossil",
    "number": "9/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/9/high.webp"
  },
  "lapras": {
    "id": "lapras",
    "name": "Lokhlass",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 80,
    "maxHp": 80,
    "energyType": "Water",
    "weakness": "Lightning",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Pistolet à O",
        "cost": [
          "Water"
        ],
        "damage": 10,
        "effect": "Inflige 10 dégâts plus 10 dégâts supplémentaires pour chaque Énergie  attachée à Lokhlass en plus du coût en Énergie de cette attaque. Vous ne pouvez pas ajouter plus de 20 dégâts de cette façon."
      },
      {
        "name": "Onde folie",
        "cost": [
          "Water",
          "Water"
        ],
        "damage": 10,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Confus."
      }
    ],
    "set": "fossil",
    "number": "10/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/10/high.webp"
  },
  "magneton-base3-11": {
    "id": "magneton-base3-11",
    "name": "Magnéton",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Magnéti",
    "hp": 80,
    "maxHp": 80,
    "energyType": "Lightning",
    "weakness": "Fighting",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Sonicboom",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "damage": 20,
        "effect": "Ne pas appliquer la Faiblesse et la Résistance à cette attaque. (Tout autre effet se produisant après application de la Faiblesse et de la Résistance est toujours valide.)"
      },
      {
        "name": "Destruction",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "damage": 100,
        "effect": "Inflige 20 dégâts à chacun des Pokémon du Banc de chaque joueur. (Ne pas appliquer la Faiblesse et la Résistance aux Pokémon du Banc.) Magneton s'inflige 100 dégâts."
      }
    ],
    "set": "fossil",
    "number": "11/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/11/high.webp"
  },
  "moltres": {
    "id": "moltres",
    "name": "Sulfura",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 70,
    "maxHp": 70,
    "energyType": "Fire",
    "weakness": null,
    "resistance": "Fighting",
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Feu sauvage",
        "cost": [
          "Fire"
        ],
        "damage": 0,
        "effect": "Vous pouvez défausser autant de cartes Énergies  attachées à Sulfura que vous le désirez lorsque vous utilisez cette attaque. Défaussez ensuite le même nombre de cartes du sommet du deck de votre adversaire."
      },
      {
        "name": "Bombardement",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Fire"
        ],
        "damage": 80,
        "effect": "Lancez une pièce. Si c'est pile, cette attaque n'inflige aucun dégât."
      }
    ],
    "set": "fossil",
    "number": "12/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/12/high.webp"
  },
  "muk": {
    "id": "muk",
    "name": "Grotadmorv",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Tadmorv",
    "hp": 70,
    "maxHp": 70,
    "energyType": "Grass",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Détritus",
        "cost": [
          "Grass",
          "Grass",
          "Grass"
        ],
        "damage": 30,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Empoisonné."
      }
    ],
    "set": "fossil",
    "number": "13/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/13/high.webp",
    "power": {
      "id": "toxic_gas",
      "name": "Gaz toxique",
      "passive": true,
      "text": "Ignorez tous les Pouvoirs Pokémon autres que Gaz toxique ! Ce pouvoir cesse de fonctionner si Grotadmorv est Endormi, Confus ou Paralysé."
    }
  },
  "raichu-base3-14": {
    "id": "raichu-base3-14",
    "name": "Raichu",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Pikachu",
    "hp": 90,
    "maxHp": 90,
    "energyType": "Lightning",
    "weakness": "Fighting",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Éléctrochok",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "damage": 30,
        "effect": "Choisissez 3 Pokémon du Banc de votre adversaire et cette attaque inflige 10 dégâts à chacun d'eux. (Ne pas appliquer la Faiblesse et la Résistance aux Pokémon du Banc.) Si votre adversaire a moins de 3 Pokémon, infligez les dégâts à chacun d'eux."
      }
    ],
    "set": "fossil",
    "number": "14/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/14/high.webp"
  },
  "zapdos-base3-15": {
    "id": "zapdos-base3-15",
    "name": "Élector",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 80,
    "maxHp": 80,
    "energyType": "Lightning",
    "weakness": null,
    "resistance": "Fighting",
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Orage",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "damage": 40,
        "effect": "Pour chacun des Pokémon du Banc de votre adversaire, lancez une pièce. Si c'est face, cette attaque inflige 20 dégâts au Pokémon concerné. (Ne pas appliquer la Faiblesse et la Résistance aux Pokémon du Banc.) Ensuite, Élector s'inflige 10 dégâts pour chaque pile."
      }
    ],
    "set": "fossil",
    "number": "15/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/15/high.webp"
  },
  "aerodactyl-base3-16": {
    "id": "aerodactyl-base3-16",
    "name": "Ptéra",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Mystérieux Fossile",
    "hp": 60,
    "maxHp": 60,
    "energyType": "Fighting",
    "weakness": "Grass",
    "resistance": "Fighting",
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Cru-aile",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 30,
        "effect": ""
      }
    ],
    "set": "fossil",
    "number": "16/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/16/high.webp",
    "power": {
      "id": "prehistoric_power",
      "name": "Pouvoir préhistorique",
      "passive": true,
      "text": "Plus aucune carte Évolution ne peut être jouée tant que Ptéra est en jeu."
    }
  },
  "articuno-base3-17": {
    "id": "articuno-base3-17",
    "name": "Artikodin",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 70,
    "maxHp": 70,
    "energyType": "Water",
    "weakness": null,
    "resistance": "Fighting",
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Blocage glacial",
        "cost": [
          "Water",
          "Water",
          "Water"
        ],
        "damage": 30,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Paralysé."
      },
      {
        "name": "Blizzard",
        "cost": [
          "Water",
          "Water",
          "Water",
          "Water"
        ],
        "damage": 50,
        "effect": "Lancez une pièce. Si c'est face, cette attaque inflige 10 dégâts à chacun des Pokémon du Banc de votre adversaire. Si c'est pile, cette attaque inflige 10 dégâts à chacun des Pokémon de votre Banc. (Ne pas appliquer la Faiblesse et la Résistance aux Pokémon qui sont sur un Banc.)"
      }
    ],
    "set": "fossil",
    "number": "17/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/17/high.webp"
  },
  "ditto-base3-18": {
    "id": "ditto-base3-18",
    "name": "Métamorph",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 50,
    "maxHp": 50,
    "energyType": "Colorless",
    "weakness": "Fighting",
    "resistance": "Psychic",
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [],
    "set": "fossil",
    "number": "18/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/18/high.webp",
    "power": {
      "id": "transform",
      "name": "Morphing",
      "passive": true,
      "text": "Si Métamorph est votre Pokémon Actif, il copie les PV, le type, le coût de retraite et les attaques du Pokémon Défenseur (toute Énergie attachée à Métamorph fournit n'importe quel type)."
    }
  },
  "dragonite-base3-19": {
    "id": "dragonite-base3-19",
    "name": "Dracolosse",
    "type": "Pokemon",
    "stage": "Stage 2",
    "evolvesFrom": "Draco",
    "hp": 100,
    "maxHp": 100,
    "energyType": "Colorless",
    "weakness": null,
    "resistance": "Fighting",
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Souplesse",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 40,
        "effect": "Lancez 2 pièces. Cette attaque inflige 40 dégâts multipliés par le nombre de faces."
      }
    ],
    "set": "fossil",
    "number": "19/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/19/high.webp",
    "power": {
      "id": "step_in",
      "name": "En avant",
      "passive": false,
      "oncePerTurn": true,
      "text": "Une fois pendant votre tour (avant votre attaque), si Dracolosse est sur votre Banc, vous pouvez l'échanger gratuitement avec votre Pokémon Actif."
    }
  },
  "gengar-base3-20": {
    "id": "gengar-base3-20",
    "name": "Ectoplasma",
    "type": "Pokemon",
    "stage": "Stage 2",
    "evolvesFrom": "Spectrum",
    "hp": 80,
    "maxHp": 80,
    "energyType": "Psychic",
    "weakness": null,
    "resistance": "Fighting",
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Sombre-esprit",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "damage": 30,
        "effect": "Si votre adversaire a des Pokémon sur son Banc, choisissez l'un d'eux et cette attaque lui inflige 10 dégâts. (Ne pas appliquer la Résistance et la Faiblesse au Pokémon du Banc.)"
      }
    ],
    "set": "fossil",
    "number": "20/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/20/high.webp",
    "power": {
      "id": "curse",
      "name": "Malédiction",
      "passive": false,
      "oncePerTurn": true,
      "text": "Une fois pendant votre tour (avant votre attaque), vous pouvez déplacer 1 marqueur de dégâts (10 dégâts) d'un des Pokémon de votre adversaire vers un autre de ses Pokémon (même si cela le met K.O.)."
    }
  },
  "haunter-base3-21": {
    "id": "haunter-base3-21",
    "name": "Spectrum",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Fantominus",
    "hp": 50,
    "maxHp": 50,
    "energyType": "Psychic",
    "weakness": null,
    "resistance": "Fighting",
    "retreatCost": [],
    "attacks": [
      {
        "name": "Cauchemar",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "damage": 10,
        "effect": "Le Pokémon Défenseur est maintenant Endormi."
      }
    ],
    "set": "fossil",
    "number": "21/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/21/high.webp",
    "power": {
      "id": "transparency",
      "name": "Transparence",
      "passive": true,
      "text": "Chaque fois qu'une attaque fait quoi que ce soit à Spectrum, lancez une pièce. Si c'est face, prévenez tous les effets de cette attaque, y compris les dégâts, infligés à Spectrum."
    }
  },
  "hitmonlee-base3-22": {
    "id": "hitmonlee-base3-22",
    "name": "Kicklee",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 60,
    "maxHp": 60,
    "energyType": "Fighting",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Allonge",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "damage": 0,
        "effect": "Si votre adversaire a des Pokémon sur son Banc, choisissez l'un d'eux et cette attaque lui inflige 20 dégâts. (Ne pas appliquer la Faiblesse et la Résistance aux Pokémon du Banc.)"
      },
      {
        "name": "Pied Voltige",
        "cost": [
          "Fighting",
          "Fighting",
          "Fighting"
        ],
        "damage": 50,
        "effect": ""
      }
    ],
    "set": "fossil",
    "number": "22/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/22/high.webp"
  },
  "hypno-base3-23": {
    "id": "hypno-base3-23",
    "name": "Hypnomade",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Soporifik",
    "hp": 90,
    "maxHp": 90,
    "energyType": "Psychic",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Prophétie",
        "cost": [
          "Psychic"
        ],
        "damage": 0,
        "effect": "Regardez jusqu'à 3 cartes du dessus du deck d'un des deux joueurs et réarrangez-les comme bon vous semble."
      },
      {
        "name": "Sombre-esprit",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "damage": 30,
        "effect": "Si votre adversaire a des Pokémon sur son Banc, choisissez l'un d'eux et cette attaque lui inflige 10 dégâts. (Ne pas appliquer la Résistance et la Faiblesse au Pokémon du Banc.)"
      }
    ],
    "set": "fossil",
    "number": "23/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/23/high.webp"
  },
  "kabutops-base3-24": {
    "id": "kabutops-base3-24",
    "name": "Kabutops",
    "type": "Pokemon",
    "stage": "Stage 2",
    "evolvesFrom": "Kabuto",
    "hp": 60,
    "maxHp": 60,
    "energyType": "Fighting",
    "weakness": "Grass",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Lame-aiguisée",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "damage": 30,
        "effect": ""
      },
      {
        "name": "Vol-vie",
        "cost": [
          "Fighting",
          "Fighting",
          "Fighting",
          "Fighting"
        ],
        "damage": 40,
        "effect": "Retirez de Kabutops un nombre de marqueurs de dégâts égal à la moitié des dégâts infligés au Pokémon Défenseur (après application de la Faiblesse et de la Résistance) (arrondis à la dizaine la plus proche.) Si le nombre de marqueurs sur Kabutops est inférieur à ce résultat, retirez-les tous."
      }
    ],
    "set": "fossil",
    "number": "24/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/24/high.webp"
  },
  "lapras-base3-25": {
    "id": "lapras-base3-25",
    "name": "Lokhlass",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 80,
    "maxHp": 80,
    "energyType": "Water",
    "weakness": "Lightning",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Pistolet à O",
        "cost": [
          "Water"
        ],
        "damage": 10,
        "effect": "Inflige 10 dégâts plus 10 dégâts supplémentaires pour chaque Énergie  attachée à Lokhlass en plus du coût en Énergie de cette attaque. Vous ne pouvez pas ajouter plus de 20 dégâts de cette façon."
      },
      {
        "name": "Onde folie",
        "cost": [
          "Water",
          "Water"
        ],
        "damage": 10,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Confus."
      }
    ],
    "set": "fossil",
    "number": "25/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/25/high.webp"
  },
  "magneton-base3-26": {
    "id": "magneton-base3-26",
    "name": "Magnéton",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Magnéti",
    "hp": 80,
    "maxHp": 80,
    "energyType": "Lightning",
    "weakness": "Fighting",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Sonicboom",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "damage": 20,
        "effect": "Ne pas appliquer la Faiblesse et la Résistance à cette attaque. (Tout autre effet se produisant après application de la Faiblesse et de la Résistance est toujours valide.)"
      },
      {
        "name": "Destruction",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "damage": 100,
        "effect": "Inflige 20 dégâts à chacun des Pokémon du Banc de chaque joueur. (Ne pas appliquer la Faiblesse et la Résistance aux Pokémon du Banc.) Magneton s'inflige 100 dégâts."
      }
    ],
    "set": "fossil",
    "number": "26/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/26/high.webp"
  },
  "moltres-base3-27": {
    "id": "moltres-base3-27",
    "name": "Sulfura",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 70,
    "maxHp": 70,
    "energyType": "Fire",
    "weakness": null,
    "resistance": "Fighting",
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Feu sauvage",
        "cost": [
          "Fire"
        ],
        "damage": 0,
        "effect": "Vous pouvez défausser autant de cartes Énergies  attachées à Sulfura que vous le désirez lorsque vous utilisez cette attaque. Défaussez ensuite le même nombre de cartes du sommet du deck de votre adversaire."
      },
      {
        "name": "Bombardement",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Fire"
        ],
        "damage": 80,
        "effect": "Lancez une pièce. Si c'est pile, cette attaque n'inflige aucun dégât."
      }
    ],
    "set": "fossil",
    "number": "27/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/27/high.webp"
  },
  "muk-base3-28": {
    "id": "muk-base3-28",
    "name": "Grotadmorv",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Tadmorv",
    "hp": 70,
    "maxHp": 70,
    "energyType": "Grass",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Détritus",
        "cost": [
          "Grass",
          "Grass",
          "Grass"
        ],
        "damage": 30,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Empoisonné."
      }
    ],
    "set": "fossil",
    "number": "28/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/28/high.webp",
    "power": {
      "id": "toxic_gas",
      "name": "Gaz toxique",
      "passive": true,
      "text": "Ignorez tous les Pouvoirs Pokémon autres que Gaz toxique ! Ce pouvoir cesse de fonctionner si Grotadmorv est Endormi, Confus ou Paralysé."
    }
  },
  "raichu-base3-29": {
    "id": "raichu-base3-29",
    "name": "Raichu",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Pikachu",
    "hp": 90,
    "maxHp": 90,
    "energyType": "Lightning",
    "weakness": "Fighting",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Éléctrochok",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "damage": 30,
        "effect": "Choisissez 3 Pokémon du Banc de votre adversaire et cette attaque inflige 10 dégâts à chacun d'eux. (Ne pas appliquer la Faiblesse et la Résistance aux Pokémon du Banc.) Si votre adversaire a moins de 3 Pokémon, infligez les dégâts à chacun d'eux."
      }
    ],
    "set": "fossil",
    "number": "29/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/29/high.webp"
  },
  "zapdos-base3-30": {
    "id": "zapdos-base3-30",
    "name": "Élector",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 80,
    "maxHp": 80,
    "energyType": "Lightning",
    "weakness": null,
    "resistance": "Fighting",
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Orage",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "damage": 40,
        "effect": "Pour chacun des Pokémon du Banc de votre adversaire, lancez une pièce. Si c'est face, cette attaque inflige 20 dégâts au Pokémon concerné. (Ne pas appliquer la Faiblesse et la Résistance aux Pokémon du Banc.) Ensuite, Élector s'inflige 10 dégâts pour chaque pile."
      }
    ],
    "set": "fossil",
    "number": "30/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/30/high.webp"
  },
  "arbok": {
    "id": "arbok",
    "name": "Arbok",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Abo",
    "hp": 60,
    "maxHp": 60,
    "energyType": "Grass",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Raid terrifiant",
        "cost": [
          "Grass"
        ],
        "damage": 10,
        "effect": "Lancez une pièce. Si c'est face et si votre adversaire a un ou plusieurs Pokémon sur son Banc, il choisit l'un d'eux et l'échange avec son Pokémon Défenseur. (Infligez les dégâts avant d'échanger les Pokémon.)"
      },
      {
        "name": "Croc-poison",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "damage": 20,
        "effect": "Le Pokémon Défenseur est maintenant Empoisonné."
      }
    ],
    "set": "fossil",
    "number": "31/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/31/high.webp"
  },
  "cloyster": {
    "id": "cloyster",
    "name": "Crustabri",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Kokiyas",
    "hp": 50,
    "maxHp": 50,
    "energyType": "Water",
    "weakness": "Lightning",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Claquoir",
        "cost": [
          "Water",
          "Water"
        ],
        "damage": 30,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Paralysé. Si c'est pile, cette attaque n'a aucun effet (pas même les dégâts)."
      },
      {
        "name": "Picanon",
        "cost": [
          "Water",
          "Water"
        ],
        "damage": 30,
        "effect": "Lancez 2 pièces. Cette attaque inflige 30 dégâts multipliés par le nombre de faces."
      }
    ],
    "set": "fossil",
    "number": "32/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/32/high.webp"
  },
  "gastly-base3-33": {
    "id": "gastly-base3-33",
    "name": "Fantominus",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 50,
    "maxHp": 50,
    "energyType": "Psychic",
    "weakness": null,
    "resistance": "Fighting",
    "retreatCost": [],
    "attacks": [
      {
        "name": "Léchouille",
        "cost": [
          "Psychic"
        ],
        "damage": 10,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Paralysé."
      },
      {
        "name": "Conversion d'Énergie",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "damage": 0,
        "effect": "Placez jusqu'à 2 cartes Énergie de votre pile de défausse dans votre main. Fantominus s'inflige 10 dégâts."
      }
    ],
    "set": "fossil",
    "number": "33/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/33/high.webp"
  },
  "golbat": {
    "id": "golbat",
    "name": "Nosferalto",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Nosferapti",
    "hp": 60,
    "maxHp": 60,
    "energyType": "Grass",
    "weakness": "Psychic",
    "resistance": "Fighting",
    "retreatCost": [],
    "attacks": [
      {
        "name": "Cru-aile",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 30,
        "effect": ""
      },
      {
        "name": "Vampirisme",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "damage": 20,
        "effect": "Retirez de Nosferalto un nombre de marqueurs de dégâts égal au nombre de dégâts infligés au Pokémon Défenseur (après application de la Faiblesse et de la Résistance.) Si le nombre de marqueurs sur Nosferalto est inférieur à ce résultat, retirez-les tous."
      }
    ],
    "set": "fossil",
    "number": "34/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/34/high.webp"
  },
  "golduck": {
    "id": "golduck",
    "name": "Akwakwak",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Psykokwak",
    "hp": 70,
    "maxHp": 70,
    "energyType": "Water",
    "weakness": "Lightning",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Choc psy",
        "cost": [
          "Psychic"
        ],
        "damage": 10,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Paralysé."
      },
      {
        "name": "Ultralaser",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "damage": 20,
        "effect": "Si des cartes Énergies sont attachées au Pokémon, choisissez l'une d'elle et défaussez-la."
      }
    ],
    "set": "fossil",
    "number": "35/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/35/high.webp"
  },
  "golem": {
    "id": "golem",
    "name": "Grolem",
    "type": "Pokemon",
    "stage": "Stage 2",
    "evolvesFrom": "Gravalanch",
    "hp": 80,
    "maxHp": 80,
    "energyType": "Fighting",
    "weakness": "Grass",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Avalanche",
        "cost": [
          "Fighting",
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "damage": 60,
        "effect": ""
      },
      {
        "name": "Destruction",
        "cost": [
          "Fighting",
          "Fighting",
          "Fighting",
          "Fighting"
        ],
        "damage": 100,
        "effect": "Inflige 20 dégâts à chacun des Pokémon du Banc de chaque joueur. (Ne pas appliquer la Faiblesse et la Résistance aux Pokémon du Banc.) Grolem s'inflige 100 dégâts."
      }
    ],
    "set": "fossil",
    "number": "36/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/36/high.webp"
  },
  "graveler": {
    "id": "graveler",
    "name": "Gravalanch",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Racaillou",
    "hp": 60,
    "maxHp": 60,
    "energyType": "Fighting",
    "weakness": "Grass",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Armure",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "damage": 0,
        "effect": "Pendant le prochain tour de votre adversaire, à chaque fois que 30 dégâts ou moins sont infligés à Gravalanch (après application de la Faiblesse et de la Résistance), prévenez ces dégâts. (Tout autre effet ou attaque est toujours valide.)"
      },
      {
        "name": "Jet-pierres",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "damage": 40,
        "effect": ""
      }
    ],
    "set": "fossil",
    "number": "37/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/37/high.webp"
  },
  "kingler": {
    "id": "kingler",
    "name": "Krabboss",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Krabby",
    "hp": 60,
    "maxHp": 60,
    "energyType": "Water",
    "weakness": "Lightning",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Nageoire",
        "cost": [
          "Water"
        ],
        "damage": 10,
        "effect": "Inflige 10 dégâts multipliés par le nombre de marqueurs de dégâts sur Krabboss."
      },
      {
        "name": "Pince-masse",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "damage": 40,
        "effect": ""
      }
    ],
    "set": "fossil",
    "number": "38/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/38/high.webp"
  },
  "magmar-base3-39": {
    "id": "magmar-base3-39",
    "name": "Magmar",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 70,
    "maxHp": 70,
    "energyType": "Fire",
    "weakness": "Water",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Brouillard",
        "cost": [
          "Fire"
        ],
        "damage": 10,
        "effect": "Si le Pokémon Défenseur essaie d'attaquer pendant le prochain tour de votre adversaire, votre adversaire doit lancer une pièce. Si c'est pile, cette attaque n'a aucun effet."
      },
      {
        "name": "Purédpois",
        "cost": [
          "Fire",
          "Fire"
        ],
        "damage": 20,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Empoisonné."
      }
    ],
    "set": "fossil",
    "number": "39/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/39/high.webp"
  },
  "omastar": {
    "id": "omastar",
    "name": "Amonistar",
    "type": "Pokemon",
    "stage": "Stage 2",
    "evolvesFrom": "Amonita",
    "hp": 70,
    "maxHp": 70,
    "energyType": "Water",
    "weakness": "Grass",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Pistolet à O",
        "cost": [
          "Water",
          "Colorless"
        ],
        "damage": 20,
        "effect": "Inflige 20 dégâts plus 10 dégâts supplémentaires pour chaque Énergie  attachée à Amonistar en plus du coût d'Énergie de cette attaque. Vous ne pouvez pas ajouter plus de 20 dégâts de cette façon."
      },
      {
        "name": "Picanon",
        "cost": [
          "Water",
          "Water"
        ],
        "damage": 30,
        "effect": "Lancez 2 pièces. Cette attaque inflige 30 dégâts multipliés par le nombre de faces."
      }
    ],
    "set": "fossil",
    "number": "40/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/40/high.webp"
  },
  "sandslash": {
    "id": "sandslash",
    "name": "Sablaireau",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Sabelette",
    "hp": 70,
    "maxHp": 70,
    "energyType": "Fighting",
    "weakness": "Grass",
    "resistance": "Lightning",
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Tranche",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 20,
        "effect": ""
      },
      {
        "name": "Combo-griffe",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "damage": 20,
        "effect": "Lancez 3 pièces. Cette attaque inflige 20 dégâts multipliés par le nombre de faces."
      }
    ],
    "set": "fossil",
    "number": "41/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/41/high.webp"
  },
  "seadra": {
    "id": "seadra",
    "name": "Hypocéan",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Hypotrempe",
    "hp": 60,
    "maxHp": 60,
    "energyType": "Water",
    "weakness": "Lightning",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Pistolet à O",
        "cost": [
          "Water",
          "Colorless"
        ],
        "damage": 20,
        "effect": "Inflige 20 dégâts plus 10 dégâts supplémentaires pour chaque carte Énergie  attachée à Hypocéan en plus du coût en Énergie de cette attaque. Vous ne pouvez pas ajouter plus de 20 dégâts de cette façon."
      },
      {
        "name": "Hâte",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "damage": 20,
        "effect": "Lancez une pièce. Si c'est face, pendant le prochain tour de votre adversaire, prévenez tous les effets ou attaques, y compris les dégâts, infligés Hypocéan."
      }
    ],
    "set": "fossil",
    "number": "42/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/42/high.webp"
  },
  "slowbro": {
    "id": "slowbro",
    "name": "Flagadoss",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Ramoloss",
    "hp": 60,
    "maxHp": 60,
    "energyType": "Psychic",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Choc psy",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "damage": 20,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Paralysé."
      }
    ],
    "set": "fossil",
    "number": "43/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/43/high.webp",
    "power": {
      "id": "strange_behavior",
      "name": "Comportement étrange",
      "passive": false,
      "text": "Autant de fois que vous le voulez pendant votre tour (avant votre attaque), vous pouvez déplacer 1 marqueur de dégâts d'un de vos Pokémon vers Flagadoss tant que cela ne met pas Flagadoss K.O."
    }
  },
  "tentacruel": {
    "id": "tentacruel",
    "name": "Tentacruel",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Tentacool",
    "hp": 60,
    "maxHp": 60,
    "energyType": "Water",
    "weakness": "Lightning",
    "resistance": null,
    "retreatCost": [],
    "attacks": [
      {
        "name": "Ultrason",
        "cost": [
          "Water"
        ],
        "damage": 0,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Confus."
      },
      {
        "name": "Dard-méduse",
        "cost": [
          "Water",
          "Water"
        ],
        "damage": 10,
        "effect": "Le Pokémon Défenseur est maintenant Empoisonné."
      }
    ],
    "set": "fossil",
    "number": "44/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/44/high.webp"
  },
  "weezing": {
    "id": "weezing",
    "name": "Smogogo",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Smogo",
    "hp": 60,
    "maxHp": 60,
    "energyType": "Grass",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Purédpois",
        "cost": [
          "Grass",
          "Grass"
        ],
        "damage": 20,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Empoisonné."
      },
      {
        "name": "Destruction",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "damage": 60,
        "effect": "Inflige 10 dégâts à chacun des Pokémon du Banc de chaque joueur. (Ne pas appliquer la Faiblesse et la Résistance aux Pokémon du Banc.) Smogogo s'inflige 60 dégâts."
      }
    ],
    "set": "fossil",
    "number": "45/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/45/high.webp"
  },
  "ekans": {
    "id": "ekans",
    "name": "Abo",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 40,
    "maxHp": 40,
    "energyType": "Grass",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Crache-venin",
        "cost": [
          "Grass"
        ],
        "damage": 0,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Empoisonné."
      },
      {
        "name": "Ligotage",
        "cost": [
          "Colorless",
          "Grass"
        ],
        "damage": 20,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Paralysé."
      }
    ],
    "set": "fossil",
    "number": "46/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/46/high.webp"
  },
  "geodude": {
    "id": "geodude",
    "name": "Racaillou",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 50,
    "maxHp": 50,
    "energyType": "Fighting",
    "weakness": "Grass",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Barrage de pierre",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "damage": 10,
        "effect": "Lancez une pièce jusqu'à ce que ce soit pile. Cette attaque inflige 10 dégâts multipliés par le nombre de faces."
      }
    ],
    "set": "fossil",
    "number": "47/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/47/high.webp"
  },
  "grimer": {
    "id": "grimer",
    "name": "Tadmorv",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 50,
    "maxHp": 50,
    "energyType": "Grass",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Mauvaise mélasse",
        "cost": [
          "Colorless"
        ],
        "damage": 10,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Paralysé."
      },
      {
        "name": "Lilliput",
        "cost": [
          "Grass"
        ],
        "damage": 0,
        "effect": "Tous les dégâts infligés à Tadmorv par des attaques durant le prochain tour de votre adversaire sont réduits de 20 (après application de la Faiblesse et de la Résistance.)"
      }
    ],
    "set": "fossil",
    "number": "48/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/48/high.webp"
  },
  "horsea": {
    "id": "horsea",
    "name": "Hypotrempe",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 40,
    "maxHp": 40,
    "energyType": "Water",
    "weakness": "Lightning",
    "resistance": null,
    "retreatCost": [],
    "attacks": [
      {
        "name": "Brouillard",
        "cost": [
          "Water"
        ],
        "damage": 10,
        "effect": "Si le Pokémon Défenseur essaie d'attaquer pendant le prochain tour de votre adversaire, votre adversaire doit lancer une pièce. Si c'est pile, cette attaque n'a aucun effet."
      }
    ],
    "set": "fossil",
    "number": "49/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/49/high.webp"
  },
  "kabuto": {
    "id": "kabuto",
    "name": "Kabuto",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Mystérieux Fossile",
    "hp": 30,
    "maxHp": 30,
    "energyType": "Fighting",
    "weakness": "Grass",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Griffe",
        "cost": [
          "Colorless"
        ],
        "damage": 10,
        "effect": ""
      }
    ],
    "set": "fossil",
    "number": "50/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/50/high.webp",
    "power": {
      "id": "kabuto_armor",
      "name": "Armure de Kabuto",
      "passive": true,
      "text": "Lorsqu'une attaque inflige des dégâts à Kabuto, ces dégâts sont divisés par deux (arrondis à la dizaine inférieure la plus proche, après application de la Faiblesse et de la Résistance)."
    }
  },
  "krabby": {
    "id": "krabby",
    "name": "Krabby",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 50,
    "maxHp": 50,
    "energyType": "Water",
    "weakness": "Lightning",
    "resistance": null,
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Appel à la famille",
        "cost": [
          "Water"
        ],
        "damage": 0,
        "effect": "Cherchez dans votre deck un Pokémon de base appelé Krabby et placez-le sur votre Banc. Mélangez ensuite votre deck. (Vous ne pouvez pas utiliser cette attaque si votre Banc est plein.)"
      },
      {
        "name": "Poigne de fer",
        "cost": [
          "Water",
          "Colorless"
        ],
        "damage": 20,
        "effect": ""
      }
    ],
    "set": "fossil",
    "number": "51/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/51/high.webp"
  },
  "omanyte": {
    "id": "omanyte",
    "name": "Amonita",
    "type": "Pokemon",
    "stage": "Stage 1",
    "evolvesFrom": "Mystérieux Fossile",
    "hp": 40,
    "maxHp": 40,
    "energyType": "Water",
    "weakness": "Grass",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Pistolet à O",
        "cost": [
          "Water"
        ],
        "damage": 10,
        "effect": "Inflige 10 dégâts plus 10 dégâts supplémentaires pour chaque Énergie  attachée à Amonita en plus du coût en Énergie de cette attaque. Vous ne pouvez pas ajouter plus de 20 dégâts de cette façon."
      }
    ],
    "set": "fossil",
    "number": "52/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/52/high.webp",
    "power": {
      "id": "clairvoyance",
      "name": "Clairevoyance",
      "passive": true,
      "text": "Votre adversaire joue avec sa main découverte."
    }
  },
  "psyduck": {
    "id": "psyduck",
    "name": "Psykokwak",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 50,
    "maxHp": 50,
    "energyType": "Water",
    "weakness": "Lightning",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Migraine",
        "cost": [
          "Psychic"
        ],
        "damage": 0,
        "effect": "Votre adversaire ne peut pas jouer de carte Dresseur durant son prochain tour."
      },
      {
        "name": "Combo-griffe",
        "cost": [
          "Water"
        ],
        "damage": 10,
        "effect": "Lancez 3 pièces. Cette attaque inflige 10 dégâts multipliés par le nombre de faces."
      }
    ],
    "set": "fossil",
    "number": "53/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/53/high.webp"
  },
  "shellder": {
    "id": "shellder",
    "name": "Kokiyas",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 30,
    "maxHp": 30,
    "energyType": "Water",
    "weakness": "Lightning",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Ultrason",
        "cost": [
          "Water"
        ],
        "damage": 0,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Confus."
      },
      {
        "name": "Cache-coquille",
        "cost": [
          "Water"
        ],
        "damage": 0,
        "effect": "Lancez une pièce. Si c'est face, prévenez tous les dégâts infligés à Kokiyas pendant le prochain tour de votre adversaire. (Tout autre effet ou attaque est toujours valide.)"
      }
    ],
    "set": "fossil",
    "number": "54/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/54/high.webp"
  },
  "slowpoke": {
    "id": "slowpoke",
    "name": "Ramoloss",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 50,
    "maxHp": 50,
    "energyType": "Psychic",
    "weakness": "Psychic",
    "resistance": null,
    "retreatCost": [
      "Colorless"
    ],
    "attacks": [
      {
        "name": "Trou d'Memoire",
        "cost": [
          "Colorless"
        ],
        "damage": 0,
        "effect": "Lancez une pièce. Si c'est face, retirez un marqueur de dégâts de Ramoloss. Cette attaque ne peut pas être utilisée si Ramoloss n'a pas de marqueur de dégâts sur lui."
      },
      {
        "name": "Farfouille",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "damage": 0,
        "effect": "Défaussez 1 carte Énergie  attachée à Ramoloss afin de pouvoir utiliser cette attaque. Déplacez une carte Dresseur depuis votre pile de défausse vers votre main."
      }
    ],
    "set": "fossil",
    "number": "55/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/55/high.webp"
  },
  "tentacool": {
    "id": "tentacool",
    "name": "Tentacool",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 30,
    "maxHp": 30,
    "energyType": "Water",
    "weakness": "Lightning",
    "resistance": null,
    "retreatCost": [],
    "attacks": [
      {
        "name": "Urticos",
        "cost": [
          "Water"
        ],
        "damage": 10,
        "effect": ""
      }
    ],
    "set": "fossil",
    "number": "56/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/56/high.webp",
    "power": {
      "id": "cowardice",
      "name": "Couardise",
      "passive": false,
      "text": "À tout moment pendant votre tour (avant votre attaque), vous pouvez reprendre Tentacool dans votre main (défaussez toutes les cartes qui lui sont attachées). Ne peut pas être utilisé le tour où Tentacool est mis en jeu."
    }
  },
  "zubat": {
    "id": "zubat",
    "name": "Nosferapti",
    "type": "Pokemon",
    "stage": "Basic",
    "evolvesFrom": null,
    "hp": 40,
    "maxHp": 40,
    "energyType": "Grass",
    "weakness": "Psychic",
    "resistance": "Fighting",
    "retreatCost": [],
    "attacks": [
      {
        "name": "Ultrason",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 0,
        "effect": "Lancez une pièce. Si c'est face, le Pokémon Défenseur est maintenant Confus."
      },
      {
        "name": "Vampirisme",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "damage": 10,
        "effect": "Retirez de Nosferapti un nombre de marqueurs de dégâts égal au nombre de dégâts infligés au Pokémon Défenseur (après application de la Faiblesse et de la Résistance.) Si le nombre de marqueurs sur Nosferapti est inférieur à ce résultat, retirez-les tous."
      }
    ],
    "set": "fossil",
    "number": "57/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/57/high.webp"
  },
  "mr-fuji": {
    "id": "mr-fuji",
    "name": "M. Fuji",
    "type": "Trainer",
    "trainerType": "Item",
    "effect": "Choisissez un Pokémon de votre Banc. Mélangez-le dans votre deck avec toutes les cartes qui lui sont attachées.",
    "set": "fossil",
    "number": "58/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/58/high.webp"
  },
  "energy-search": {
    "id": "energy-search",
    "name": "Recherche d'Énergie",
    "type": "Trainer",
    "trainerType": "Item",
    "effect": "Cherchez une carte Énergie de base dans votre deck et placez-la dans votre main. Mélangez ensuite votre deck.",
    "set": "fossil",
    "number": "59/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/59/high.webp"
  },
  "gambler": {
    "id": "gambler",
    "name": "Joueur",
    "type": "Trainer",
    "trainerType": "Item",
    "effect": "Mélangez votre main dans votre deck. Lancez une pièce. Si c'est face, piochez 8 cartes. Si c'est pile, piochez 1 carte.",
    "set": "fossil",
    "number": "60/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/60/high.webp"
  },
  "recycle": {
    "id": "recycle",
    "name": "Recyclage",
    "type": "Trainer",
    "trainerType": "Item",
    "effect": "Lancez une pièce. Si c'est face, déplacez une carte de votre pile de défausse vers le sommet de votre deck.",
    "set": "fossil",
    "number": "61/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/61/high.webp"
  },
  "mysterious-fossil": {
    "id": "mysterious-fossil",
    "name": "Mystérieux Fossile",
    "type": "Trainer",
    "trainerType": "Item",
    "effect": "Jouez Mystérieux Fossile comme si c'était un Pokémon de Base. Lorsqu'il est en jeu, Mystérieux Fossile compte comme un Pokémon (au lieu d'une carte Dresseur.) Mystérieux Fossile n'a pas d'attaque, ne peut pas battre en retraite, et ne peut pas être Endormi, Confus, Paralysé, ou Empoisonné. Si Mystérieux Fossile est mis K.O., il ne compte pas comme un Pokémon K.O. (Défaussez-le de toute façon.) À tout moment durant votre tour avant votre attaque, vous pouvez défausser Mystérieux Fossile du jeu.",
    "set": "fossil",
    "number": "62/62",
    "image": "https://assets.tcgdex.net/fr/base/base3/62/high.webp"
  }
};
