import { CARDS } from './cards.js';

export const DECKS = {
  player: [
    {
      id: 'theme-grass',
      name: 'Deck Plante (Débutant)',
      description: 'Évolution Bulbizarre → Florizarre, soignes, énergies Plante',
      list: {
        'bulbasaur': 4, 'ivysaur': 3, 'venusaur': 2,
        'oddish': 3, 'gloom': 2, 'vileplume': 1,
        'paras': 2, 'parasect': 1,
        'grass-energy': 20,
        'professor-oak': 2, 'bill': 2, 'potion': 3, 'super-potion': 2,
        'switch': 2, 'energy-retrieval': 2, 'pluspower': 2, 'full-heal': 1
      }
    },
    {
      id: 'theme-fire',
      name: 'Deck Feu (Agressif)',
      description: 'Dracaufeu rapide, défausse énergies adverse, dégâts massifs',
      list: {
        'charmander': 4, 'charmeleon': 3, 'charizard': 2,
        'growlithe': 2, 'arcanine': 1,
        'ponyta': 2, 'rapidash': 1,
        'vulpix': 2, 'ninetales': 1,
        'fire-energy': 18, 'colorless-energy': 2,
        'professor-oak': 2, 'bill': 2, 'energy-removal': 3, 'gust-of-wind': 2,
        'switch': 2, 'pluspower': 3, 'defender': 1
      }
    },
    {
      id: 'theme-water',
      name: 'Deck Eau (Contrôle)',
      description: 'Tortank + Staross, paralysie, récupération énergie',
      list: {
        'squirtle': 4, 'wartortle': 3, 'blastoise': 2,
        'psyduck': 3, 'golduck': 2,
        'staryu': 3, 'starmie': 2,
        'horsea': 2, 'seadra': 1,
        'water-energy': 20,
        'professor-oak': 2, 'bill': 2, 'potion': 2, 'super-potion': 2,
        'switch': 2, 'energy-retrieval': 3, 'full-heal': 2, 'item-finder': 1
      }
    },
    {
      id: 'theme-lightning',
      name: 'Deck Électrik (Vitesse)',
      description: 'Électhor + Raichu, paralysie, pioche massive',
      list: {
        'pikachu': 4, 'raichu': 2,
        'magnemite': 3, 'magneton': 2,
        'voltorb': 3, 'electrode': 2,
        'zapdos': 1,
        'lightning-energy': 16, 'colorless-energy': 4,
        'professor-oak': 2, 'bill': 3, 'computer-search': 2,
        'switch': 3, 'energy-retrieval': 2, 'pluspower': 2
      }
    },
    {
      id: 'theme-psychic',
      name: 'Deck Psy (Disruption)',
      description: 'Mewtwo, Alakazam, confusion, sommeil, contrôle main adverse',
      list: {
        'abra': 4, 'kadabra': 3, 'alakazam': 2,
        'drowzee': 3, 'hypno': 2,
        'mr-mime': 2,
        'mewtwo': 1,
        'psychic-energy': 18, 'colorless-energy': 2,
        'professor-oak': 2, 'bill': 2, 'energy-removal': 2,
        'switch': 2, 'full-heal': 2, 'scoop-up': 2, 'defender': 2
      }
    },
    {
      id: 'theme-fighting',
      name: 'Deck Combat/Roche (Résistance)',
      description: 'Rhinoféros, Mackogneur, résistance, dégâts constants',
      list: {
        'machop': 4, 'machoke': 3, 'machamp': 2,
        'geodude': 3, 'graveler': 2, 'golem': 1,
        'onix': 2,
        'hitmonlee': 1, 'hitmonchan': 1,
        'fighting-energy': 20,
        'professor-oak': 2, 'bill': 2, 'potion': 3, 'super-potion': 2,
        'switch': 2, 'energy-retrieval': 2, 'pluspower': 3, 'defender': 2
      }
    }
  ],

  ai: [
    {
      id: 'ai-grass',
      name: 'IA Plante',
      list: {
        'bulbasaur': 4, 'ivysaur': 3, 'venusaur': 2,
        'oddish': 3, 'gloom': 2, 'vileplume': 1,
        'bellsprout': 3, 'weepinbell': 2, 'victreebel': 1,
        'grass-energy': 22,
        'professor-oak': 2, 'bill': 2, 'potion': 4, 'super-potion': 2,
        'switch': 2, 'energy-retrieval': 2, 'full-heal': 2
      }
    },
    {
      id: 'ai-fire',
      name: 'IA Feu',
      list: {
        'charmander': 4, 'charmeleon': 3, 'charizard': 2,
        'growlithe': 3, 'arcanine': 2,
        'vulpix': 3, 'ninetales': 1,
        'fire-energy': 22,
        'professor-oak': 2, 'bill': 2, 'energy-removal': 3, 'gust-of-wind': 2,
        'switch': 2, 'pluspower': 3, 'defender': 1
      }
    },
    {
      id: 'ai-water',
      name: 'IA Eau',
      list: {
        'squirtle': 4, 'wartortle': 3, 'blastoise': 2,
        'psyduck': 3, 'golduck': 2,
        'staryu': 3, 'starmie': 2,
        'magikarp': 2, 'gyarados': 1,
        'water-energy': 22,
        'professor-oak': 2, 'bill': 2, 'potion': 3, 'super-potion': 3,
        'switch': 2, 'energy-retrieval': 3, 'full-heal': 2
      }
    },
    {
      id: 'ai-lightning',
      name: 'IA Électrik',
      list: {
        'pikachu': 4, 'raichu': 2,
        'magnemite': 4, 'magneton': 2,
        'voltorb': 3, 'electrode': 2,
        'zapdos': 1,
        'lightning-energy': 20,
        'professor-oak': 2, 'bill': 3, 'computer-search': 2,
        'switch': 3, 'energy-retrieval': 2, 'pluspower': 2
      }
    },
    {
      id: 'ai-psychic',
      name: 'IA Psy',
      list: {
        'abra': 4, 'kadabra': 3, 'alakazam': 2,
        'drowzee': 3, 'hypno': 2,
        'mr-mime': 2,
        'jynx': 1,
        'psychic-energy': 20,
        'professor-oak': 2, 'bill': 2, 'energy-removal': 2,
        'switch': 2, 'full-heal': 2, 'scoop-up': 2, 'defender': 2
      }
    },
    {
      id: 'ai-colorless',
      name: 'IA Incolore (Étoiles)',
      list: {
        'pidgey': 3, 'pidgeotto': 2, 'pidgeot': 1,
        'rattata': 3, 'raticate': 2,
        'farfetchd': 2,
        'kangaskhan': 2,
        'tauros': 2,
        'ditto': 2,
        'colorless-energy': 10, 'grass-energy': 4, 'fire-energy': 4, 'water-energy': 4,
        'professor-oak': 2, 'bill': 2, 'potion': 3, 'super-potion': 2,
        'switch': 3, 'energy-retrieval': 2, 'pluspower': 2, 'defender': 2
      }
    },
    // Deck tutoriel spécial (facile)
    {
      id: 'tutorial-1',
      name: 'Deck Tutoriel (Chen)',
      list: {
        'charmander': 3, 'charmeleon': 2,
        'squirtle': 3, 'wartortle': 2,
        'bulbasaur': 3, 'ivysaur': 2,
        'fire-energy': 8, 'water-energy': 8, 'grass-energy': 8,
        'professor-oak': 1, 'bill': 1, 'potion': 4, 'switch': 2
      }
    }
  ]
};
