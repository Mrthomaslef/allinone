export class DeckBuilder {
  constructor(container, cards, playerDecks, currentDeckId, onSave) {
    this.container = container;
    this.cards = cards;
    this.playerDecks = playerDecks;
    this.currentDeckId = currentDeckId;
    this.onSave = onSave;
    this.deck = { ...playerDecks.find(d => d.id === currentDeckId) };
    this.filter = { type: '', search: '', set: '' };
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="deck-builder">
        <div>
          <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">
            <input type="text" id="search" placeholder="Rechercher..." style="flex:1;min-width:150px;padding:8px;border-radius:6px;border:1px solid #334;background:#1a1a2e;color:#fff">
            <select id="filter-type" style="padding:8px;border-radius:6px;border:1px solid #334;background:#1a1a2e;color:#fff">
              <option value="">Tous types</option>
              <option value="Pokemon">Pokémon</option>
              <option value="Trainer">Dresseur</option>
              <option value="Energy">Énergie</option>
            </select>
            <select id="filter-set" style="padding:8px;border-radius:6px;border:1px solid #334;background:#1a1a2e;color:#fff">
              <option value="">Tous sets</option>
              <option value="base">Set de Base</option>
              <option value="jungle">Jungle</option>
              <option value="fossil">Fossile</option>
            </select>
          </div>
          <div class="card-list" id="card-list"></div>
        </div>
        <div>
          <h3>Deck : ${this.deck.name} (${this.getTotalCards()}/60)</h3>
          <div class="mana-curve" id="mana-curve"></div>
          <div class="deck-list" id="deck-list"></div>
          <div style="display:flex;gap:8px;margin-top:16px">
            <button class="btn btn-primary" style="flex:1" id="btn-save">Sauvegarder</button>
            <button class="btn btn-secondary" style="flex:1" id="btn-cancel">Annuler</button>
          </div>
        </div>
      </div>
    `;
    this.bindEvents();
    this.renderCardList();
    this.renderDeckList();
    this.renderManaCurve();
  }

  bindEvents() {
    this.container.querySelector('#search').addEventListener('input', e => { this.filter.search = e.target.value.toLowerCase(); this.renderCardList(); });
    this.container.querySelector('#filter-type').addEventListener('change', e => { this.filter.type = e.target.value; this.renderCardList(); });
    this.container.querySelector('#filter-set').addEventListener('change', e => { this.filter.set = e.target.value; this.renderCardList(); });
    this.container.querySelector('#btn-save').onclick = () => this.save();
    this.container.querySelector('#btn-cancel').onclick = () => this.onSave(this.currentDeckId);
  }

  getFilteredCards() {
    return Object.values(this.cards).filter(card => {
      if (this.filter.type && card.type !== this.filter.type) return false;
      if (this.filter.set && card.set !== this.filter.set) return false;
      if (this.filter.search && !card.name.toLowerCase().includes(this.filter.search)) return false;
      return true;
    });
  }

  renderCardList() {
    const list = this.container.querySelector('#card-list');
    const cards = this.getFilteredCards();
    const inDeck = this.deck.list || {};
    list.innerHTML = cards.map(card => {
      const count = inDeck[card.id] || 0;
      return `
        <div style="position:relative;aspect-ratio:72/100;border-radius:6px;background:url(${card.image}) center/cover no-repeat;border:2px solid ${count ? '#ffcb05' : 'transparent'};overflow:hidden">
          <div style="position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,0.8);display:flex;justify-content:space-between;padding:4px;font-size:9px;color:#fff">
            <span>${card.name}</span>
            <span>${count}/4</span>
          </div>
          <button class="btn-add" data-id="${card.id}" style="position:absolute;inset:0;background:transparent;border:none;color:#ffcb05;font-size:24px;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .2s">+</button>
        </div>
      `;
    }).join('');
    list.querySelectorAll('.btn-add').forEach(btn => {
      btn.onclick = () => this.addCard(btn.dataset.id);
      btn.parentElement.onmouseenter = () => btn.style.opacity = '1';
      btn.parentElement.onmouseleave = () => btn.style.opacity = '0';
    });
  }

  renderDeckList() {
    const list = this.container.querySelector('#deck-list');
    const inDeck = this.deck.list || {};
    list.innerHTML = Object.entries(inDeck).map(([cardId, count]) => {
      const card = this.cards[cardId];
      return `
        <div style="display:flex;align-items:center;gap:8px;padding:4px;background:rgba(255,255,255,0.03);border-radius:4px;margin:2px 0">
          <img src="${card.image}" style="width:32px;height:44px;border-radius:3px">
          <span style="flex:1;font-size:12px">${card.name}</span>
          <button class="btn-remove" data-id="${cardId}" style="background:none;border:none;color:#e74c3c;font-size:18px;line-height:1">−</button>
          <span style="width:24px;text-align:center;color:#ffcb05">${count}</span>
          <button class="btn-add" data-id="${cardId}" style="background:none;border:none;color:#ffcb05;font-size:18px;line-height:1">+</button>
        </div>
      `;
    }).join('');
    list.querySelectorAll('.btn-add').forEach(btn => btn.onclick = () => this.addCard(btn.dataset.id));
    list.querySelectorAll('.btn-remove').forEach(btn => btn.onclick = () => this.removeCard(btn.dataset.id));
  }

  renderManaCurve() {
    const container = this.container.querySelector('#mana-curve');
    const inDeck = this.deck.list || {};
    const curve = Array(8).fill(0); // 0-7+
    Object.entries(inDeck).forEach(([id, count]) => {
      const card = this.cards[id];
      if (card && card.type === 'Pokemon') {
        const atkCosts = (card.attacks || []).map(a => (a.cost || []).length);
        const cost = Math.min(7, atkCosts.length ? Math.max(...atkCosts) : 1);
        curve[cost] += count;
      }
    });
    const max = Math.max(...curve, 1);
    container.innerHTML = curve.map((val, i) => `
      <div class="mana-bar" style="height:${(val/max)*100}%" title="${i === 7 ? '7+' : i} énergie: ${val} cartes"></div>
    `).join('');
  }

  addCard(cardId) {
    const inDeck = this.deck.list || {};
    const current = inDeck[cardId] || 0;
    if (current >= 4) return;
    if (this.getTotalCards() >= 60) return;
    inDeck[cardId] = current + 1;
    this.deck.list = inDeck;
    this.renderDeckList();
    this.renderCardList();
    this.renderManaCurve();
  }

  removeCard(cardId) {
    const inDeck = this.deck.list || {};
    if (!inDeck[cardId]) return;
    inDeck[cardId]--;
    if (inDeck[cardId] === 0) delete inDeck[cardId];
    this.deck.list = inDeck;
    this.renderDeckList();
    this.renderCardList();
    this.renderManaCurve();
  }

  getTotalCards() {
    return Object.values(this.deck.list || {}).reduce((a,b)=>a+b,0);
  }

  save() {
    // Valider: 60 cartes, au moins 1 basique
    if (this.getTotalCards() !== 60) return alert('Le deck doit contenir exactement 60 cartes');
    const hasBasic = Object.keys(this.deck.list).some(id => this.cards[id].stage === 'Basic');
    if (!hasBasic) return alert('Le deck doit contenir au moins un Pokémon de base');
    this.playerDecks.find(d => d.id === this.currentDeckId).list = { ...this.deck.list };
    this.onSave(this.currentDeckId);
  }
}
