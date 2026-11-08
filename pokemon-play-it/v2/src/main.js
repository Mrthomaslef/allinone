import { GameState } from './engine/GameState.js';
import { RulesEngine } from './engine/RulesEngine.js';
import { AIPlayer } from './engine/AIPlayer.js';
import { Playmat } from './ui/Playmat.js';
import { Hand } from './ui/Hand.js';
import { LogPanel } from './ui/LogPanel.js';
import { TutorialOverlay } from './ui/TutorialOverlay.js';
import { DeckBuilder } from './ui/DeckBuilder.js';
import { CoinFlip } from './engine/CoinFlip.js';
import { CARDS } from './data/cards.js';
import { DECKS } from './data/decks.js';
import { TUTORIAL } from './data/tutorial.js';
import { openDB } from 'idb';

class App {
  constructor() {
    window.app = this;
    this.state = null;
    this.rules = new RulesEngine();
    this.ai = null;
    this.playmat = null;
    this.hand = null;
    this.log = null;
    this.tutorial = null;
    this.deckBuilder = null;
    this.coinFlip = new CoinFlip();
    this.currentScreen = 'menu';
    this.saveData = null;
    this.bgm = new Audio('./src/assets/bgm.m4a');
    this.bgm.loop = true;
    this.bgm.volume = 0.28;
    this.init();
  }

  async init() {
    this.saveData = await this.loadSave();
    const tryPlayBgm = () => {
      if (this.saveData?.settings?.sound !== false && this.bgm.paused) {
        this.bgm.play().catch(() => {});
      }
    };
    ['pointerdown', 'keydown', 'touchstart', 'click'].forEach(ev =>
      document.addEventListener(ev, tryPlayBgm, { passive: true })
    );
    this.renderMenu();
  }

  async loadSave() {
    try {
      const db = await openDB('ppi-mobile', 1, {
        upgrade(db) {
          db.createObjectStore('save');
        }
      });
      return (await db.get('save', 'main')) || this.defaultSave();
    } catch {
      return this.defaultSave();
    }
  }

  defaultSave() {
    return {
      tutorialStep: 0,
      collection: Object.fromEntries(Object.keys(CARDS).map(id => [id, 4])),
      decks: { player: DECKS.player[0].id },
      settings: { animations: true, sound: true, haptics: true }
    };
  }

  async save() {
    try {
      const db = await openDB('ppi-mobile', 1);
      await db.put('save', this.saveData, 'main');
    } catch {}
  }

  // ========== SCREENS ==========
  renderMenu() {
    this.currentScreen = 'menu';
    const currentDeck = DECKS.player.find(d => d.id === this.saveData.decks.player) || DECKS.player[0];
    const app = document.getElementById('app');
    app.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100dvh;gap:16px;padding:20px;text-align:center;overflow-y:auto">
        <div style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#ffcb05;background:rgba(255,203,5,0.12);padding:4px 12px;border-radius:99px;border:1px solid rgba(255,203,5,0.3)">Édition 1999 • v2 Complète</div>
        <h1 style="font-size:clamp(26px,7vw,44px);font-weight:900;background:linear-gradient(135deg,#ffcb05,#ff6b00);-webkit-background-clip:text;-webkit-text-fill-color:transparent">Pokémon Play It! v2</h1>
        <p style="color:#9ab;font-size:13px;max-width:340px">Set de Base + Jungle + Fossile (${Object.keys(CARDS).length} cartes FR HD) — Règles 1999 — IA Thématique</p>

        <div style="width:100%;max-width:320px;background:rgba(255,255,255,0.04);padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,0.1);text-align:left">
          <label style="font-size:11px;color:#ffcb05;font-weight:700;display:block;margin-bottom:4px">Votre Deck Actif :</label>
          <select id="select-player-deck" style="width:100%;padding:8px;border-radius:6px;background:#131829;color:#fff;border:1px solid #3b4cca;font-size:13px;font-weight:600">
            ${DECKS.player.map(d => `<option value="${d.id}" ${d.id === currentDeck.id ? 'selected' : ''}>${d.name}</option>`).join('')}
          </select>
          <div style="font-size:11px;color:#89a;margin-top:4px" id="deck-desc">${currentDeck.description || ''}</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:10px;width:100%;max-width:320px;margin-top:4px">
          <button class="btn btn-primary" id="btn-quick" style="font-size:15px;padding:12px">⚔️ Partie rapide contre l'IA</button>
          <button class="btn btn-secondary" id="btn-play">🎓 Jouer (Tutoriel Prof. Chen)</button>
          <button class="btn btn-secondary" id="btn-deck">🃏 Constructeur de deck</button>
          <button class="btn btn-secondary" id="btn-collection">📖 Collection (${Object.keys(CARDS).length} cartes FR)</button>
          <button class="btn" id="btn-settings" style="background:#283048;color:#cbd5e1">⚙️ Paramètres</button>
        </div>
      </div>
    `;
    const deckSelect = document.getElementById('select-player-deck');
    deckSelect.onchange = () => {
      this.saveData.decks.player = deckSelect.value;
      const d = DECKS.player.find(x => x.id === deckSelect.value);
      document.getElementById('deck-desc').textContent = d?.description || '';
      this.save();
    };
    document.getElementById('btn-play').onclick = () => this.startTutorial();
    document.getElementById('btn-quick').onclick = () => this.startGame('quick');
    document.getElementById('btn-deck').onclick = () => this.openDeckBuilder();
    document.getElementById('btn-collection').onclick = () => this.openCollection();
    document.getElementById('btn-settings').onclick = () => this.openSettings();
  }

  startTutorial() {
    this.saveData.tutorialStep = 0;
    this.save();
    this.startGame('tutorial');
  }

  startGame(mode) {
    this.currentScreen = 'game';
    const playerDeckId = this.saveData.decks.player || DECKS.player[0].id;
    const aiPool = DECKS.ai.filter(d => d.id !== 'tutorial-1');
    const opponentDeckId = mode === 'tutorial' ? 'tutorial-1' : aiPool[Math.floor(Math.random() * aiPool.length)].id;

    this.state = new GameState(
      this.buildDeck(playerDeckId),
      this.buildDeck(opponentDeckId),
      mode === 'tutorial'
    );
    this.state.renderAll = () => this.renderAll();
    this.state.checkWinConditions = () => this.checkWinConditions();
    this.ai = new AIPlayer(this.state, this.rules, opponentDeckId);
    this.renderGame(opponentDeckId);
  }

  buildDeck(deckId) {
    const deckDef = [...DECKS.player, ...DECKS.ai].find(d => d.id === deckId) || DECKS.player[0];
    const cards = [];
    for (const [cardId, count] of Object.entries(deckDef.list)) {
      const template = CARDS[cardId];
      if (!template) continue;
      for (let i = 0; i < count; i++) {
        cards.push({
          ...template,
          attacks: template.attacks ? template.attacks.map(a => ({ ...a, cost: [...(a.cost || [])] })) : [],
          energies: {},
          instanceId: `${cardId}-${i}-${Math.random().toString(36).slice(2, 8)}`
        });
      }
    }
    return this.shuffle(cards);
  }

  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  renderGame(opponentDeckId) {
    const oppDeckName = DECKS.ai.find(d => d.id === opponentDeckId)?.name || 'IA Adversaire';
    const app = document.getElementById('app');
    app.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 12px;background:#0f172a;border-bottom:1px solid #28324e;font-size:12px">
        <button class="btn" id="btn-quit" style="padding:4px 10px;font-size:11px;background:#334155;color:#fff">← Menu</button>
        <span style="color:#ffcb05;font-weight:700" id="turn-indicator">Tour 1 — Votre tour</span>
        <span style="color:#94a3b8;font-size:11px">${oppDeckName}</span>
      </div>
      <div class="playmat" id="playmat">
        <!-- Opponent zones -->
        <div class="zone-row" data-zone="opponent-prizes" aria-label="Prix adversaire">
          ${[...Array(6)].map(() => `<div class="zone-slot"><div class="zone-label">Prix</div></div>`).join('')}
        </div>
        <div class="zone-row" data-zone="opponent-bench" aria-label="Banc adversaire">
          ${[...Array(5)].map(() => `<div class="zone-slot"><div class="zone-label">Banc Adv.</div></div>`).join('')}
        </div>
        <div style="display:flex;justify-content:center;gap:16px;align-items:center">
          <div class="zone-row" data-zone="opponent-discard" aria-label="Défausse adversaire">
            <div class="zone-slot"><div class="zone-label">Défausse</div></div>
          </div>
          <div class="zone-row" data-zone="opponent-active" aria-label="Pokémon actif adversaire">
            <div class="zone-slot" style="border-color:rgba(231,76,60,0.5)"><div class="zone-label">Actif Adv.</div></div>
          </div>
        </div>

        <div style="border-top:1px dashed rgba(255,203,5,0.25);margin:2px 0"></div>

        <!-- Player zones -->
        <div style="display:flex;justify-content:center;gap:16px;align-items:center">
          <div class="zone-row" data-zone="player-deck" aria-label="Votre deck">
            <div class="zone-slot" id="player-deck-slot" style="background:url(./src/assets/card-back.svg) center/cover no-repeat"><div class="zone-label" style="background:rgba(0,0,0,0.8);color:#ffcb05;border-radius:4px;padding:2px 4px">Deck (${this.state.player.deck.length})</div></div>
          </div>
          <div class="zone-row" data-zone="player-active" aria-label="Votre Pokémon actif">
            <div class="zone-slot" style="border-color:rgba(46,204,113,0.6)"><div class="zone-label">Votre Actif</div></div>
          </div>
          <div class="zone-row" data-zone="player-discard" aria-label="Votre défausse">
            <div class="zone-slot"><div class="zone-label">Défausse</div></div>
          </div>
        </div>
        <div class="zone-row" data-zone="player-bench" aria-label="Votre banc">
          ${[...Array(5)].map(() => `<div class="zone-slot"><div class="zone-label">Banc</div></div>`).join('')}
        </div>
        <div class="zone-row" data-zone="player-prizes" aria-label="Vos prix">
          ${[...Array(6)].map(() => `<div class="zone-slot"><div class="zone-label">Prix</div></div>`).join('')}
        </div>
      </div>
      <div class="hand" id="hand" role="list" aria-label="Votre main" data-zone="player-hand"></div>
      <div class="log-panel" id="log" role="log" aria-live="polite"></div>
      <div style="display:flex;justify-content:space-between;gap:8px;padding:8px 12px;background:#0f172a;border-top:1px solid #28324e">
        <button class="btn btn-secondary" id="btn-coin" style="font-size:12px;padding:8px 12px">🪙 Pièce</button>
        <button class="btn btn-primary" id="btn-attack" style="flex:1;font-size:13px;padding:8px 16px">⚔️ Attaquer</button>
        <button class="btn btn-secondary" id="btn-end-turn" style="font-size:12px;padding:8px 14px">Fin de tour →</button>
      </div>
    `;
    this.playmat = new Playmat(document.getElementById('playmat'), this.state, this);
    this.hand = new Hand(document.getElementById('hand'), this.state, this);
    this.log = new LogPanel(document.getElementById('log'));
    this.tutorial = new TutorialOverlay(this);

    document.getElementById('btn-quit').onclick = () => this.renderMenu();
    document.getElementById('btn-coin').onclick = () => this.coinFlip.flip(heads => {
      this.log.add({ type: 'system', text: `🪙 Lancer de pièce : ${heads ? 'FACE (Pikachu) !' : 'PILE (Pokéball) !'}` });
    });
    document.getElementById('btn-end-turn').onclick = () => this.endTurn();
    document.getElementById('btn-attack').onclick = () => this.showAttackChooser();

    this.state.log = (entry) => this.log.add(entry);
    this.setupInitialDraw();
    if (this.state.isTutorial) this.tutorial.start();
  }

  drawGuaranteedHand(playerState) {
    // Garantir au moins 1 Pokémon de base dans la main de départ de 7 cartes
    const basicIdx = playerState.deck.findIndex(c => c && c.type === 'Pokemon' && c.stage === 'Basic');
    if (basicIdx !== -1) {
      const [basicCard] = playerState.deck.splice(basicIdx, 1);
      playerState.hand.push(basicCard);
    }
    while (playerState.hand.length < 7 && playerState.deck.length > 0) {
      playerState.drawCard();
    }
  }

  setupInitialDraw() {
    this.drawGuaranteedHand(this.state.player);
    this.drawGuaranteedHand(this.state.opponent);
    this.state.player.setupPrizes(6);
    this.state.opponent.setupPrizes(6);

    // L'IA place automatiquement son premier Pokémon Actif et son Banc au départ
    const oppBasics = [...this.state.opponent.hand].filter(c => c && c.type === 'Pokemon' && c.stage === 'Basic');
    if (oppBasics.length > 0) {
      this.ai.playPokemon(oppBasics[0], 'active');
      for (const b of oppBasics.slice(1, 3)) {
        this.ai.playPokemon(b, 'bench');
      }
    }

    // Si le joueur n'a pas encore posé d'actif, lui indiquer comment jouer
    this.log.add({ type: 'system', text: 'Touchez une carte de votre main (ou glissez-la) pour la jouer sur le tapis !' });
    this.renderAll();
  }

  gameLoop() {
    this.updateTurnIndicator();
    if (this.state.currentPlayer === 'opponent') {
      setTimeout(() => this.ai.takeTurn(), 400);
    }
  }

  endTurn() {
    if (this.state.currentPlayer !== 'player') return;
    if (!this.state.player.active) {
      const basicInHand = this.state.player.hand.find(c => c && c.type === 'Pokemon' && c.stage === 'Basic');
      if (basicInHand) {
        return this.log.add({ type: 'system', text: 'Placez d\'abord un Pokémon de Base sur "Votre Actif" avant de finir votre tour !' });
      }
    }
    this.state.endTurn();
    this.renderAll();
    this.gameLoop();
  }

  updateTurnIndicator() {
    const el = document.getElementById('turn-indicator');
    if (!el) return;
    const isPlayer = this.state.currentPlayer === 'player';
    el.textContent = `Tour ${this.state.turn + 1} — ${isPlayer ? 'Votre tour' : 'Tour IA...'}`;
    el.style.color = isPlayer ? '#ffcb05' : '#e74c3c';
  }

  showAttackChooser() {
    if (this.state.currentPlayer !== 'player') return;
    const active = this.state.player.active;
    if (!active || !active.attacks?.length) {
      return this.log.add({ type: 'system', text: 'Placez d\'abord un Pokémon Actif pour attaquer !' });
    }
    if (active.status === 'paralyzed' || active.status === 'asleep') {
      return this.log.add({ type: 'system', text: `${active.name} est ${active.status === 'paralyzed' ? 'paralysé' : 'endormi'} et ne peut pas attaquer !` });
    }
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content" style="max-width:360px">
        <h3 style="color:#ffcb05;margin-bottom:8px">Attaques de ${active.name}</h3>
        ${active.attacks.map((atk, i) => {
          const canUse = this.rules.canPayCost(active, atk.cost, this.state.player);
          return `
            <button class="btn ${canUse ? 'btn-primary' : 'btn-secondary'}" style="width:100%;margin:6px 0;text-align:left;opacity:${canUse ? '1' : '0.55'}" data-atk="${i}">
              <div style="display:flex;justify-content:space-between;align-items:center">
                <span>${atk.name}</span>
                <span>${atk.damage || 0} dégâts</span>
              </div>
              <div style="margin-top:4px;display:flex;align-items:center;gap:4px">
                ${(atk.cost || []).map(c => `<span style="display:inline-block;width:14px;height:14px;background:url(./src/assets/energy-${c}.svg) center/contain no-repeat"></span>`).join('')}
                ${!canUse ? '<span style="font-size:10px;color:#fca5a5;margin-left:6px">(Énergie insuffisante)</span>' : ''}
              </div>
              ${atk.effect ? `<div style="font-size:10px;margin-top:4px;opacity:0.85;font-weight:normal">${atk.effect}</div>` : ''}
            </button>
          `;
        }).join('')}
        <button class="btn" style="width:100%;margin-top:8px;background:#334155;color:#fff" id="cancel-atk">Annuler</button>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelectorAll('[data-atk]').forEach(btn => btn.onclick = () => {
      this.executeAttack(active, parseInt(btn.dataset.atk, 10));
      modal.remove();
    });
    modal.querySelector('#cancel-atk').onclick = () => modal.remove();
    modal.onclick = e => { if (e.target === modal) modal.remove(); };
  }

  executeAttack(attacker, attackIndex) {
    const attack = attacker.attacks[attackIndex];
    if (!this.rules.canPayCost(attacker, attack.cost, this.state.player)) {
      return this.log.add({ type: 'system', text: `Énergies insuffisantes sur ${attacker.name} (${attack.cost.join(', ')} requis).` });
    }
    const defender = this.state.opponent.active;
    if (!defender) {
      return this.log.add({ type: 'system', text: 'L\'adversaire n\'a pas de Pokémon Actif !' });
    }
    this.log.add({ type: 'player', text: `⚔️ ${attacker.name} utilise ${attack.name} !` });
    this.rules.resolveAttack(attacker, defender, attack, this.state);
    if (this.checkWinConditions()) return;
    this.renderAll();
    // En JCC Pokémon, attaquer termine le tour
    setTimeout(() => this.endTurn(), 400);
  }

  checkWinConditions() {
    if (this.state.opponent.prizes.length === 0 || (this.state.turn > 0 && !this.state.opponent.active && this.state.opponent.bench.length === 0)) {
      this.endGame('win');
      return true;
    }
    if (this.state.player.prizes.length === 0 || (this.state.turn > 1 && !this.state.player.active && this.state.player.bench.length === 0)) {
      this.endGame('lose');
      return true;
    }
    return false;
  }

  endGame(result) {
    const win = result === 'win';
    this.log.add({ type: 'system', text: win ? '🏆 VICTOIRE ! Vous avez remporté le duel !' : '💥 Défaite... Essayez un autre deck !' });
    setTimeout(() => this.renderMenu(), 3500);
  }

  renderAll() {
    this.playmat?.render();
    this.hand?.render();
    this.updateDeckCount();
    this.updateTurnIndicator();
  }

  updateDeckCount() {
    const el = document.getElementById('player-deck-slot');
    if (el) {
      const label = el.querySelector('.zone-label');
      if (label) label.textContent = `Deck (${this.state.player.deck.length})`;
    }
  }

  // ========== DECK BUILDER ==========
  openDeckBuilder() {
    this.currentScreen = 'deckbuilder';
    const app = document.getElementById('app');
    app.innerHTML = '<div id="deck-builder-root" style="height:100dvh;overflow:auto"></div>';
    this.deckBuilder = new DeckBuilder(document.getElementById('deck-builder-root'), CARDS, DECKS.player, this.saveData.decks.player, (deckId) => {
      this.saveData.decks.player = deckId;
      this.save();
      this.renderMenu();
    });
  }

  openCollection() {
    this.currentScreen = 'collection';
    const app = document.getElementById('app');
    const allCards = Object.values(CARDS);
    app.innerHTML = `
      <div style="padding:16px;height:100dvh;overflow-y:auto">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
          <h2>Collection (${allCards.length} cartes FR)</h2>
          <button class="btn btn-secondary" id="btn-back-col">← Retour</button>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(88px,1fr));gap:10px">
          ${allCards.map(card => `
            <div class="col-card" data-cid="${card.id}" style="cursor:pointer;position:relative;aspect-ratio:72/100;border-radius:6px;background:rgba(255,203,5,0.08);border:1.5px solid rgba(255,203,5,0.5);overflow:hidden">
              <img src="${card.image}" loading="lazy" style="width:100%;height:100%;object-fit:cover" alt="${card.name}">
              <div style="position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,0.82);font-size:9px;padding:2px;text-align:center;color:#ffcb05">${card.name}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    document.getElementById('btn-back-col').onclick = () => this.renderMenu();
    app.querySelectorAll('.col-card').forEach(el => {
      el.onclick = () => {
        const c = CARDS[el.dataset.cid];
        if (c) this.playmat ? this.playmat.openCardActionModal(c, 'collection') : null;
      };
    });
  }

  openSettings() {
    const s = this.saveData.settings;
    const app = document.getElementById('app');
    app.innerHTML = `
      <div style="padding:20px;max-width:400px;margin:auto;margin-top:10vh">
        <h2 style="margin-bottom:16px;color:#ffcb05">Paramètres</h2>
        <label style="display:flex;align-items:center;gap:12px;margin:16px 0"><input type="checkbox" id="chk-anim" ${s.animations?'checked':''}> Animations</label>
        <label style="display:flex;align-items:center;gap:12px;margin:16px 0"><input type="checkbox" id="chk-snd" ${s.sound?'checked':''}> Sons</label>
        <label style="display:flex;align-items:center;gap:12px;margin:16px 0"><input type="checkbox" id="chk-hap" ${s.haptics?'checked':''}> Vibrations</label>
        <button class="btn btn-secondary" style="width:100%;margin-top:12px" id="btn-back-set">Retour</button>
      </div>
    `;
    document.getElementById('chk-anim').onchange = e => { s.animations = e.target.checked; this.save(); };
    document.getElementById('chk-snd').onchange = e => {
      s.sound = e.target.checked;
      if (s.sound) this.bgm.play().catch(() => {}); else this.bgm.pause();
      this.save();
    };
    document.getElementById('chk-hap').onchange = e => { s.haptics = e.target.checked; this.save(); };
    document.getElementById('btn-back-set').onclick = () => this.renderMenu();
  }
}

new App();
