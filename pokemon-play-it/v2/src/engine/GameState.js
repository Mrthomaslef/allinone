export class GameState {
  constructor(playerDeck, opponentDeck, isTutorial = false) {
    this.isTutorial = isTutorial;
    this.turn = 0;
    this.currentPlayer = 'player';
    this.phase = 'draw'; // draw, main, attack, end
    this.log = () => {};
    
    this.player = new PlayerState(playerDeck, 'player');
    this.opponent = new PlayerState(opponentDeck, 'opponent');
    
    this.coinFlipResult = null;
    this.lastAttack = null;
    this.energyAttachedThisTurn = { player: false, opponent: false };
    this.supporterPlayedThisTurn = { player: false, opponent: false };
    this.stadiumInPlay = null;
  }

  endTurn() {
    this.energyAttachedThisTurn[this.currentPlayer] = false;
    this.supporterPlayedThisTurn[this.currentPlayer] = false;
    this.currentPlayer = this.currentPlayer === 'player' ? 'opponent' : 'player';
    this.turn++;
    this.phase = 'draw';
    this.getCurrent().drawCard();
    this.phase = 'main';
  }

  getCurrent() { return this.currentPlayer === 'player' ? this.player : this.opponent; }
  getOpponent() { return this.currentPlayer === 'player' ? this.opponent : this.player; }
}

export class PlayerState {
  constructor(deck, side) {
    this.side = side;
    this.deck = [...deck];
    this.hand = [];
    this.prizes = [];
    this.active = null;
    this.bench = []; // max 5
    this.discard = [];
    this.lostZone = []; // pour cartes futures
  }

  drawCard() {
    if (this.deck.length === 0) return null;
    const card = this.deck.pop();
    this.hand.push(card);
    return card;
  }

  setupPrizes(count) {
    for (let i = 0; i < count && this.deck.length; i++) {
      this.prizes.push(this.deck.pop());
    }
  }

  mulligan() {
    // Remettre main dans deck, mélanger, repiocher -1 carte par mulligan
    this.deck.push(...this.hand);
    this.hand = [];
    // shuffle deck...
    this.drawCard(); // simplifié
  }
}
