export class AIPlayer {
  constructor(gameState, rules, deckId) {
    this.state = gameState;
    this.rules = rules;
    this.deckId = deckId;
    this.difficulty = 'normal';
  }

  async takeTurn() {
    if (this.state.currentPlayer !== 'opponent') return;
    this.state.phase = 'main';
    
    await this.sleep(350);
    this.playBasicsAndEvolutions();
    this.state.renderAll?.();

    await this.sleep(300);
    this.attachEnergy();
    this.state.renderAll?.();

    await this.sleep(300);
    this.playTrainers();
    this.state.renderAll?.();

    await this.sleep(350);
    this.attackOrEnd();
  }

  playBasicsAndEvolutions() {
    const me = this.state.opponent;
    // Jouer basiques sur actif puis banc si place
    const basics = [...me.hand].filter(c => c && c.type === 'Pokemon' && c.stage === 'Basic');
    for (const card of basics) {
      if (!me.active) {
        this.playPokemon(card, 'active');
      } else if (me.bench.length < 5) {
        this.playPokemon(card, 'bench');
      }
    }
    // Évolutions
    const evos = [...me.hand].filter(c => c && c.type === 'Pokemon' && c.stage !== 'Basic');
    for (const card of evos) {
      const targets = [me.active, ...me.bench].filter(c => c && c.name === card.evolvesFrom && (c.turnPlayed ?? -1) < this.state.turn);
      if (targets.length) {
        this.evolvePokemon(targets[0], card);
      }
    }
  }

  attachEnergy() {
    const me = this.state.opponent;
    if (this.state.energyAttachedThisTurn.opponent) return;
    const energies = me.hand.filter(c => c && c.type === 'Energy');
    if (!energies.length) return;
    
    let target = me.active;
    if (!target || this.energySatisfied(target)) {
      target = me.bench.find(p => p && !this.energySatisfied(p)) || me.active;
    }
    if (target) {
      const energy = energies[0];
      me.hand.splice(me.hand.indexOf(energy), 1);
      target.energies = target.energies || {};
      const amount = energy.id === 'colorless-energy' ? 2 : 1;
      target.energies[energy.energyType] = (target.energies[energy.energyType] || 0) + amount;
      this.state.energyAttachedThisTurn.opponent = true;
      this.state.log({ type: 'opponent', text: `L'adversaire attache ${energy.name} à ${target.name}` });
    }
  }

  energySatisfied(pokemon) {
    if (!pokemon || !pokemon.attacks?.length) return true;
    return pokemon.attacks.every(atk => this.rules.canPayCost(pokemon, atk.cost, this.state.opponent));
  }

  playTrainers() {
    const me = this.state.opponent;
    if (!this.state.supporterPlayedThisTurn.opponent) {
      const supporters = me.hand.filter(c => c && c.type === 'Trainer' && c.trainerType === 'Supporter');
      for (const card of supporters) {
        if (card.id === 'professor-oak' && me.hand.length > 4) continue;
        this.playTrainer(card);
        this.state.supporterPlayedThisTurn.opponent = true;
        break;
      }
    }
    const items = [...me.hand].filter(c => c && c.type === 'Trainer' && c.trainerType === 'Item');
    for (const card of items) {
      if (card.id === 'potion' && (!me.active || me.active.hp >= me.active.maxHp)) continue;
      if (card.id === 'full-heal' && (!me.active || !me.active.status)) continue;
      if (card.id === 'switch' && (!me.active || me.active.hp > 20 || !me.bench.length)) continue;
      this.playTrainer(card);
    }
  }

  playTrainer(card) {
    const me = this.state.opponent;
    const idx = me.hand.indexOf(card);
    if (idx === -1) return;
    me.hand.splice(idx, 1);
    me.discard.push(card);
    this.state.log({ type: 'opponent', text: `L'adversaire joue ${card.name}` });
    if (card.id === 'professor-oak') {
      me.discard.push(...me.hand);
      me.hand = [];
      for (let i = 0; i < 7; i++) me.drawCard();
    } else if (card.id === 'bill') {
      me.drawCard();
      me.drawCard();
    } else if (card.id === 'potion' || card.id === 'super-potion') {
      if (me.active) me.active.hp = Math.min(me.active.maxHp, me.active.hp + (card.id === 'super-potion' ? 40 : 30));
    } else if (card.id === 'full-heal') {
      if (me.active) me.active.status = null;
    } else if (card.id === 'pluspower') {
      if (me.active) me.active.plusPower = (me.active.plusPower || 0) + 1;
    } else if (card.id === 'defender') {
      if (me.active) me.active.defender = (me.active.defender || 0) + 1;
    } else if (card.id === 'switch') {
      if (me.bench.length) {
        [me.active, me.bench[0]] = [me.bench[0], me.active];
      }
    }
  }

  attackOrEnd() {
    const me = this.state.opponent;
    if (!me.active || !me.active.attacks?.length || me.active.status === 'paralyzed' || me.active.status === 'asleep') {
      if (me.active?.status === 'paralyzed') me.active.status = null;
      return this.endTurn();
    }
    
    const viableAttacks = me.active.attacks.filter(atk => this.rules.canPayCost(me.active, atk.cost, me));
    if (!viableAttacks.length) return this.endTurn();
    
    const attack = viableAttacks.reduce((best, a) => (a.damage || 0) >= (best.damage || 0) ? a : best);
    const defender = this.state.player.active;
    if (!defender) return this.endTurn();
    
    this.state.log({ type: 'opponent', text: `${me.active.name} adverse utilise ${attack.name} !` });
    this.rules.resolveAttack(me.active, defender, attack, this.state);
    this.state.checkWinConditions?.();
    this.endTurn();
  }

  endTurn() {
    if (this.state.currentPlayer !== 'opponent') return;
    this.state.endTurn();
    this.state.renderAll?.();
  }

  playPokemon(card, zone) {
    const me = this.state.opponent;
    const idx = me.hand.indexOf(card);
    if (idx !== -1) me.hand.splice(idx, 1);
    card.owner = 'opponent';
    card.turnPlayed = this.state.turn;
    card.energies = card.energies || {};
    card.hp = card.maxHp;
    if (zone === 'active') me.active = card;
    else me.bench.push(card);
    this.state.log({ type: 'opponent', text: `L'adversaire place ${card.name} sur ${zone === 'active' ? 'le poste Actif' : 'son Banc'}` });
  }

  evolvePokemon(target, evoCard) {
    const me = this.state.opponent;
    const idx = me.hand.indexOf(evoCard);
    if (idx !== -1) me.hand.splice(idx, 1);
    const damageTaken = Math.max(0, (target.maxHp || target.hp) - target.hp);
    evoCard.owner = 'opponent';
    evoCard.turnPlayed = this.state.turn;
    evoCard.energies = { ...(target.energies || {}) };
    evoCard.attachedTools = [...(target.attachedTools || [])];
    evoCard.hp = Math.max(10, evoCard.maxHp - damageTaken);
    evoCard.status = null;
    me.discard.push(target);
    if (me.active === target) me.active = evoCard;
    else {
      const bIdx = me.bench.indexOf(target);
      if (bIdx !== -1) me.bench[bIdx] = evoCard;
    }
    this.state.log({ type: 'opponent', text: `L'adversaire fait évoluer ${target.name} en ${evoCard.name} !` });
  }

  sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
}
