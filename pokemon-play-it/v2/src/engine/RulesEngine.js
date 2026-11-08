export class RulesEngine {
  constructor() {
    this.weaknessMultiplier = 2; // Base Set: x2 faiblesse
    this.resistanceValue = 30;   // Base Set: -30 résistance
  }

  canPayCost(pokemon, cost, playerState) {
    if (!cost || !cost.length) return true;
    const attached = { ...(pokemon.energies || {}) };
    // Check specific energy types first
    for (const c of cost) {
      if (c !== 'Colorless') {
        if ((attached[c] || 0) <= 0) return false;
        attached[c]--;
      }
    }
    // Check Colorless with remaining energies
    const colorlessNeeded = cost.filter(x => x === 'Colorless').length;
    const remainingTotal = Object.values(attached).reduce((a, b) => a + Math.max(0, b), 0);
    return remainingTotal >= colorlessNeeded;
  }

  payCost(pokemon, cost, playerState) {
    // En JCC Pokémon 1999, attaquer ne défausse pas les énergies attachées (sauf effet explicite ou retraite)
  }

  discardEnergyCost(pokemon, cost) {
    const attached = pokemon.energies || {};
    for (const c of cost) {
      if (c === 'Colorless') {
        const types = Object.keys(attached).filter(t => attached[t] > 0);
        if (types.length) attached[types[0]]--;
      } else if (attached[c] > 0) {
        attached[c]--;
      }
    }
    pokemon.energies = attached;
  }

  resolveAttack(attacker, defender, attack, gameState) {
    if (!defender) return;
    let damage = attack.damage || 0;
    
    // Bonus Force Plus (PlusPower)
    if (attacker.plusPower) {
      damage += attacker.plusPower * 10;
      attacker.plusPower = 0;
    }

    // Faiblesse (utilise energyType du Pokémon attaquant)
    const atkType = attacker.energyType || attacker.type;
    if (damage > 0 && defender.weakness && defender.weakness === atkType) {
      damage *= this.weaknessMultiplier;
    }
    // Résistance
    if (damage > 0 && defender.resistance && defender.resistance === atkType) {
      damage -= this.resistanceValue;
    }
    // Protecteur (Defender)
    if (defender.defender) {
      damage -= defender.defender * 20;
    }
    damage = Math.max(0, damage);
    
    defender.hp = Math.max(0, defender.hp - damage);
    this.logDamage(attacker, defender, damage, gameState);
    
    // Effets d'attaque
    if (attack.effect) this.resolveEffect(attack.effect, attacker, defender, gameState);
    
    // KO ?
    if (defender.hp <= 0) this.knockOut(defender, gameState);
  }

  logDamage(attacker, defender, damage, gameState) {
    gameState.log({ type: 'system', text: `${defender.name} subit ${damage} dégâts (${defender.hp}/${defender.maxHp} PV)` });
  }

  knockOut(pokemon, gameState) {
    gameState.log({ type: 'system', text: `${pokemon.name} est K.O. !` });
    const isPlayerPokemon = pokemon.owner === 'player';
    const victimState = isPlayerPokemon ? gameState.player : gameState.opponent;
    const victorState = isPlayerPokemon ? gameState.opponent : gameState.player;

    victimState.discard.push(pokemon, ...(pokemon.attachedEnergies || []), ...(pokemon.attachedTools || []));
    pokemon.owner = null;
    
    // Le vainqueur pioche une de SES cartes Prix
    if (victorState.prizes.length > 0) {
      const prize = victorState.prizes.pop();
      victorState.hand.push(prize);
      gameState.log({ type: 'system', text: `${victorState.side === 'player' ? 'Vous piochez' : 'L\'adversaire pioche'} une carte Prix ! (${victorState.prizes.length} restante(s))` });
    }
    
    // Remplacer l'actif si KO
    if (victimState.active === pokemon) {
      victimState.active = null;
      if (victimState.bench.length > 0) {
        victimState.active = victimState.bench.shift();
        victimState.active.zone = 'active';
        gameState.log({ type: 'system', text: `${victimState.active.name} monte au poste Actif !` });
      }
    } else {
      victimState.bench = victimState.bench.filter(c => c !== pokemon);
    }
  }

  resolveEffect(effectText, attacker, defender, gameState) {
    const text = effectText.toLowerCase();
    const atkOwner = attacker.owner === 'player' ? gameState.player : gameState.opponent;

    if (text.includes('paraly')) {
      defender.status = 'paralyzed';
      gameState.log({ type: 'system', text: `${defender.name} est paralysé !` });
    }
    if (text.includes('poison') || text.includes('empoison')) {
      defender.status = 'poisoned';
      gameState.log({ type: 'system', text: `${defender.name} est empoisonné !` });
    }
    if (text.includes('sleep') || text.includes('endormi') || text.includes('sommeil')) {
      defender.status = 'asleep';
      gameState.log({ type: 'system', text: `${defender.name} est endormi !` });
    }
    if (text.includes('confus')) {
      defender.status = 'confused';
      gameState.log({ type: 'system', text: `${defender.name} est confus !` });
    }
    if (text.includes('draw 2') || text.includes('piochez 2')) {
      atkOwner.drawCard();
      atkOwner.drawCard();
    }
    if (text.includes('heal') || text.includes('retirez') || text.includes('soign')) {
      attacker.hp = Math.min(attacker.maxHp, attacker.hp + 20);
      gameState.log({ type: 'system', text: `${attacker.name} récupère des PV (${attacker.hp}/${attacker.maxHp}) !` });
    }
    if (text.includes('discard 1 fire') || text.includes('défaussez 1 carte énergie')) {
      this.discardEnergyCost(attacker, [attacker.energyType || 'Colorless']);
    }
  }

  // Validation actions
  canPlayBasic(pokemon, playerState) {
    return pokemon.type === 'Pokemon' && pokemon.stage === 'Basic' && (!playerState.active || playerState.bench.length < 5);
  }

  canPlayEvolution(pokemon, playerState, currentTurn = 1) {
    if (pokemon.type !== 'Pokemon' || pokemon.stage === 'Basic') return false;
    const target = pokemon.evolvesFrom;
    const candidates = [playerState.active, ...playerState.bench].filter(Boolean).filter(c => c.name === target && (c.turnPlayed ?? -1) < currentTurn);
    return candidates.length > 0;
  }

  canAttachEnergy(playerState, gameState) {
    return !gameState.energyAttachedThisTurn[playerState.side];
  }

  canRetreat(pokemon, playerState) {
    if (!pokemon || !pokemon.retreatCost) return false;
    return this.canPayCost(pokemon, pokemon.retreatCost, playerState);
  }
}
