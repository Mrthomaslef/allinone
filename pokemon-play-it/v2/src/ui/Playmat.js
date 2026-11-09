const ENERGY_COLORS = {
  Grass: '#2ecc71', Fire: '#e74c3c', Water: '#3498db', Lightning: '#f1c40f',
  Psychic: '#9b59b6', Fighting: '#d35400', Darkness: '#34495e', Metal: '#95a5a6',
  Fairy: '#fd79a8', Colorless: '#ecf0f1'
};

export class Playmat {
  constructor(container, gameState, app) {
    this.container = container;
    this.state = gameState;
    this.app = app;
    this.draggedCard = null;
    this.touchGhost = null;
    this.bindEvents();
  }

  bindEvents() {
    this.container.addEventListener('dragstart', e => this.onDragStart(e));
    this.container.addEventListener('dragover', e => this.onDragOver(e));
    this.container.addEventListener('dragleave', e => this.onDragLeave(e));
    this.container.addEventListener('drop', e => this.onDrop(e));
    this.container.addEventListener('dragend', e => this.onDragEnd(e));

    // Clic sur une zone (pour poser la carte sélectionnée en main ou inspecter une carte du tapis)
    this.container.addEventListener('click', e => this.onZoneClick(e));

    // Touch drag-and-drop complet (main + tapis)
    document.addEventListener('touchmove', e => this.onTouchMove(e), { passive: false });
    document.addEventListener('touchend', e => this.onTouchEnd(e));
    document.addEventListener('touchstart', e => this.onTouchStart(e), { passive: true });
  }

  findCardByInstance(instanceId) {
    if (!instanceId) return null;
    const p = this.state.player;
    const o = this.state.opponent;
    const all = [
      ...p.hand, p.active, ...p.bench, ...p.discard,
      o.active, ...o.bench, ...o.discard
    ].filter(Boolean);
    return all.find(c => c.instanceId === instanceId) || null;
  }

  onDragStart(e) {
    const cardEl = e.target.closest('.zone-card');
    if (!cardEl) return;
    const card = this.findCardByInstance(cardEl.dataset.instanceId);
    if (!card) return;
    this.draggedCard = {
      element: cardEl,
      card,
      fromZone: cardEl.closest('[data-zone]')?.dataset.zone || 'playmat'
    };
    cardEl.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', card.instanceId);
  }

  onDragOver(e) {
    e.preventDefault();
    const slot = e.target.closest('.zone-slot');
    if (slot) slot.classList.add('highlight');
  }

  onDragLeave(e) {
    const slot = e.target.closest('.zone-slot');
    if (slot) slot.classList.remove('highlight');
  }

  onDrop(e) {
    e.preventDefault();
    const slot = e.target.closest('.zone-slot');
    if (!slot || !this.draggedCard) return;
    const zone = slot.closest('[data-zone]')?.dataset.zone;
    const slotIndex = [...slot.parentElement.querySelectorAll('.zone-slot')].indexOf(slot);
    this.handleDrop(this.draggedCard, zone, slot, slotIndex);
    this.clearHighlights();
  }

  onDragEnd() {
    if (this.draggedCard?.element) this.draggedCard.element.classList.remove('dragging');
    this.clearHighlights();
    this.draggedCard = null;
  }

  // ========== TOUCH DRAG & DROP ==========
  onTouchStart(e) {
    if (this.app.currentScreen !== 'game') return;
    const cardEl = e.target.closest('.hand-card');
    if (!cardEl) return;
    const card = this.findCardByInstance(cardEl.dataset.instanceId);
    if (!card) return;
    const touch = e.touches[0];
    this.touchStartPos = { x: touch.clientX, y: touch.clientY };
    this.touchCandidate = { element: cardEl, card, fromZone: 'hand' };
  }

  onTouchMove(e) {
    if (!this.touchCandidate || this.app.currentScreen !== 'game') return;
    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - this.touchStartPos.x);
    const dy = Math.abs(touch.clientY - this.touchStartPos.y);
    if (!this.draggedCard && (dx > 10 || dy > 10)) {
      this.draggedCard = this.touchCandidate;
      this.createTouchGhost(this.draggedCard.card, touch.clientX, touch.clientY);
      this.highlightValidTargets(this.draggedCard.card);
    }
    if (this.draggedCard) {
      e.preventDefault();
      if (this.touchGhost) {
        this.touchGhost.style.left = `${touch.clientX - 36}px`;
        this.touchGhost.style.top = `${touch.clientY - 50}px`;
      }
    }
  }

  onTouchEnd(e) {
    if (this.draggedCard && this.touchGhost) {
      const touch = e.changedTouches[0];
      this.touchGhost.remove();
      this.touchGhost = null;
      const elUnder = document.elementFromPoint(touch.clientX, touch.clientY);
      const slot = elUnder?.closest('.zone-slot');
      if (slot) {
        const zone = slot.closest('[data-zone]')?.dataset.zone;
        const slotIndex = [...slot.parentElement.querySelectorAll('.zone-slot')].indexOf(slot);
        this.handleDrop(this.draggedCard, zone, slot, slotIndex);
      }
      this.clearHighlights();
      this.draggedCard = null;
    }
    this.touchCandidate = null;
  }

  createTouchGhost(card, x, y) {
    if (this.touchGhost) this.touchGhost.remove();
    const g = document.createElement('div');
    g.style.cssText = `position:fixed;left:${x - 36}px;top:${y - 50}px;width:72px;height:100px;border-radius:6px;background:url('${card.image}') center/cover no-repeat;box-shadow:0 8px 24px rgba(255,203,5,0.6);pointer-events:none;z-index:200;opacity:0.9;transform:scale(1.1)`;
    document.body.appendChild(g);
    this.touchGhost = g;
  }

  highlightValidTargets(card) {
    this.clearHighlights();
    if (!card) return;
    const me = this.state.player;
    if (card.type === 'Pokemon' && card.stage === 'Basic') {
      if (!me.active) this.container.querySelector('[data-zone="player-active"] .zone-slot')?.classList.add('highlight');
      if (me.bench.length < 5) {
        this.container.querySelectorAll('[data-zone="player-bench"] .zone-slot').forEach((s, i) => {
          if (!me.bench[i]) s.classList.add('highlight');
        });
      }
    } else if (card.type === 'Pokemon' && card.stage !== 'Basic') {
      if (me.active && me.active.name === card.evolvesFrom) {
        this.container.querySelector('[data-zone="player-active"] .zone-slot')?.classList.add('highlight');
      }
      me.bench.forEach((b, i) => {
        if (b && b.name === card.evolvesFrom) {
          this.container.querySelectorAll('[data-zone="player-bench"] .zone-slot')[i]?.classList.add('highlight');
        }
      });
    } else if (card.type === 'Energy') {
      if (me.active) this.container.querySelector('[data-zone="player-active"] .zone-slot')?.classList.add('highlight');
      me.bench.forEach((b, i) => {
        if (b) this.container.querySelectorAll('[data-zone="player-bench"] .zone-slot')[i]?.classList.add('highlight');
      });
    } else if (card.type === 'Trainer') {
      this.container.querySelector('[data-zone="player-active"] .zone-slot')?.classList.add('highlight');
      this.container.querySelector('[data-zone="player-discard"] .zone-slot')?.classList.add('highlight');
    }
  }

  clearHighlights() {
    this.container.querySelectorAll('.zone-slot.highlight').forEach(s => s.classList.remove('highlight'));
  }

  // Clic sur une zone du tapis
  onZoneClick(e) {
    const slot = e.target.closest('.zone-slot');
    if (!slot) return;
    const zone = slot.closest('[data-zone]')?.dataset.zone;
    const slotIndex = [...slot.parentElement.querySelectorAll('.zone-slot')].indexOf(slot);

    // Si une carte est sélectionnée dans la main, tenter de la jouer sur la zone cliquée
    const selectedHandCard = this.app.hand?.getSelectedCard();
    if (selectedHandCard) {
      this.handleDrop({ card: selectedHandCard, fromZone: 'hand' }, zone, slot, slotIndex);
      this.app.hand.clearSelection();
      return;
    }

    // Sinon, si on clique sur le deck joueur
    if (zone === 'player-deck') {
      this.state.log({ type: 'system', text: `Il reste ${this.state.player.deck.length} cartes dans votre deck.` });
      return;
    }

    // Consulter toute la pile de défausse (joueur ou adversaire) et lire chaque carte
    if (zone === 'player-discard' || zone === 'opponent-discard') {
      const isPlayer = zone === 'player-discard';
      const pile = [...(isPlayer ? this.state.player.discard : this.state.opponent.discard)].reverse();
      this.openDiscardModal(pile, isPlayer ? 'Votre pile de défausse' : 'Défausse de l\'adversaire');
      return;
    }

    // Sinon, inspecter la carte présente dans ce slot
    const cardEl = slot.querySelector('.zone-card');
    if (cardEl && cardEl.dataset.instanceId) {
      const card = this.findCardByInstance(cardEl.dataset.instanceId);
      if (card && !card.faceDown) {
        this.openCardActionModal(card, zone, slotIndex);
      }
    }
  }

  openDiscardModal(pile, title) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content" style="max-width:420px;max-height:85vh;display:flex;flex-direction:column;text-align:center">
        <h3 style="color:#ffcb05;margin-bottom:4px">${title}</h3>
        <p style="font-size:12px;color:#aab;margin-bottom:10px">
          ${pile.length ? `${pile.length} carte(s) — touchez une carte pour la lire en grand.` : 'Aucune carte défaussée pour le moment.'}
        </p>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:8px;overflow-y:auto;padding:4px">
          ${pile.map((c, idx) => `
            <div data-discard-idx="${idx}" style="cursor:pointer;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);border-radius:8px;padding:6px;display:flex;flex-direction:column;align-items:center">
              <img src="${c.image || c.img}" alt="${c.name}" style="width:100%;border-radius:6px;object-fit:contain">
              <span style="font-size:11px;font-weight:700;color:#fff;margin-top:4px">${c.name}</span>
            </div>
          `).join('')}
        </div>
        <button class="btn" style="width:100%;margin-top:12px;background:#334;color:#ccc" id="close-discard-modal">Fermer</button>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('#close-discard-modal').onclick = () => modal.remove();
    modal.onclick = e => { if (e.target === modal) modal.remove(); };
    modal.querySelectorAll('[data-discard-idx]').forEach(el => {
      el.onclick = () => {
        const card = pile[parseInt(el.dataset.discardIdx, 10)];
        if (card) this.openCardActionModal(card, 'discard', 0);
      };
    });
  }

  handleDrop(dragged, targetZone, slot, slotIndex = 0) {
    if (!dragged?.card || !targetZone) return;
    if (this.state.currentPlayer !== 'player') {
      return this.state.log({ type: 'system', text: 'Attendez votre tour !' });
    }
    const { card } = dragged;
    const me = this.state.player;

    // 1. Pokémon de Base -> Actif ou Banc
    if (card.type === 'Pokemon' && card.stage === 'Basic') {
      if (targetZone === 'player-active' && !me.active) {
        this.playPokemon(card, 'active');
      } else if ((targetZone === 'player-bench' || (targetZone === 'player-active' && me.active)) && me.bench.length < 5) {
        this.playPokemon(card, 'bench');
      } else if (!me.active) {
        this.playPokemon(card, 'active');
      }
    }
    // 2. Évolution -> Actif ou Banc
    else if (card.type === 'Pokemon' && card.stage !== 'Basic') {
      let targetPokemon = null;
      if (targetZone === 'player-active') targetPokemon = me.active;
      else if (targetZone === 'player-bench') targetPokemon = me.bench[slotIndex] || me.bench.find(b => b && b.name === card.evolvesFrom);

      if (!targetPokemon || targetPokemon.name !== card.evolvesFrom) {
        this.state.log({ type: 'system', text: `${card.name} évolue de ${card.evolvesFrom} !` });
      } else if ((targetPokemon.turnPlayed ?? -1) >= this.state.turn) {
        this.state.log({ type: 'system', text: `${targetPokemon.name} vient d'être joué ce tour et ne peut pas encore évoluer.` });
      } else {
        this.evolvePokemon(targetPokemon, card);
      }
    }
    // 3. Énergie -> attacher au Pokémon Actif ou Banc
    else if (card.type === 'Energy') {
      let targetPokemon = null;
      if (targetZone === 'player-active') targetPokemon = me.active;
      else if (targetZone === 'player-bench') targetPokemon = me.bench[slotIndex] || me.bench[0];
      else targetPokemon = me.active;

      if (!targetPokemon) {
        this.state.log({ type: 'system', text: 'Placez d\'abord un Pokémon avant d\'attacher une Énergie !' });
      } else if (this.state.energyAttachedThisTurn.player) {
        this.state.log({ type: 'system', text: 'Vous avez déjà attaché 1 carte Énergie ce tour-ci !' });
      } else {
        this.attachEnergyTo(card, targetPokemon);
      }
    }
    // 4. Dresseur -> jouer l'effet
    else if (card.type === 'Trainer') {
      this.playTrainer(card);
    }

    this.app.renderAll();
  }

  playPokemon(card, zone) {
    const me = this.state.player;
    const idx = me.hand.findIndex(c => c.instanceId === card.instanceId);
    if (idx !== -1) me.hand.splice(idx, 1);
    card.owner = 'player';
    card.turnPlayed = this.state.turn;
    card.energies = {};
    card.hp = card.maxHp;
    card.status = null;
    if (zone === 'active') me.active = card;
    else me.bench.push(card);
    this.state.log({ type: 'player', text: `Vous placez ${card.name} (${card.hp} PV) en ${zone === 'active' ? 'Pokémon Actif' : 'Banc'}` });
  }

  evolvePokemon(target, evoCard) {
    const me = this.state.player;
    const idx = me.hand.findIndex(c => c.instanceId === evoCard.instanceId);
    if (idx !== -1) me.hand.splice(idx, 1);
    const damageTaken = Math.max(0, (target.maxHp || target.hp) - target.hp);
    evoCard.owner = 'player';
    evoCard.turnPlayed = this.state.turn;
    evoCard.energies = { ...(target.energies || {}) };
    evoCard.hp = Math.max(10, evoCard.maxHp - damageTaken);
    evoCard.status = null;
    me.discard.push(target);
    if (me.active === target) me.active = evoCard;
    else {
      const bIdx = me.bench.indexOf(target);
      if (bIdx !== -1) me.bench[bIdx] = evoCard;
    }
    this.state.log({ type: 'player', text: `✨ ${target.name} évolue en ${evoCard.name} (${evoCard.hp}/${evoCard.maxHp} PV) !` });
  }

  attachEnergyTo(energyCard, targetPokemon) {
    const me = this.state.player;
    const idx = me.hand.findIndex(c => c.instanceId === energyCard.instanceId);
    if (idx !== -1) me.hand.splice(idx, 1);
    targetPokemon.energies = targetPokemon.energies || {};
    const amount = energyCard.id === 'colorless-energy' ? 2 : 1;
    targetPokemon.energies[energyCard.energyType] = (targetPokemon.energies[energyCard.energyType] || 0) + amount;
    this.state.energyAttachedThisTurn.player = true;
    this.state.log({ type: 'player', text: `⚡ Vous attachez ${energyCard.name} à ${targetPokemon.name}` });
  }

  playTrainer(card) {
    const me = this.state.player;
    const opp = this.state.opponent;
    if (card.trainerType === 'Supporter' && this.state.supporterPlayedThisTurn.player) {
      return this.state.log({ type: 'system', text: 'Vous avez déjà joué un Supporter ce tour-ci.' });
    }
    const idx = me.hand.findIndex(c => c.instanceId === card.instanceId);
    if (idx !== -1) me.hand.splice(idx, 1);
    if (card.trainerType === 'Supporter') this.state.supporterPlayedThisTurn.player = true;

    this.state.log({ type: 'player', text: `🃏 Vous jouez ${card.name} !` });

    if (card.id === 'professor-oak') {
      me.discard.push(...me.hand);
      me.hand = [];
      for (let i = 0; i < 7; i++) me.drawCard();
      this.state.log({ type: 'system', text: 'Professeur Chen : vous défaussez votre main et piochez 7 cartes !' });
    } else if (card.id === 'bill') {
      me.drawCard();
      me.drawCard();
      this.state.log({ type: 'system', text: 'Léo (Bill) : vous piochez 2 cartes !' });
    } else if (card.id === 'potion' || card.id === 'super-potion') {
      const heal = card.id === 'super-potion' ? 40 : 30;
      const target = me.active || me.bench[0];
      if (target) {
        target.hp = Math.min(target.maxHp, target.hp + heal);
        this.state.log({ type: 'system', text: `${target.name} récupère ${heal} PV (${target.hp}/${target.maxHp} PV) !` });
      }
    } else if (card.id === 'switch') {
      if (me.bench.length > 0 && me.active) {
        const promoted = me.bench.shift();
        me.bench.push(me.active);
        me.active = promoted;
        this.state.log({ type: 'system', text: `Échange : ${me.active.name} passe au poste Actif !` });
      }
    } else if (card.id === 'gust-of-wind') {
      if (opp.bench.length > 0 && opp.active) {
        const forced = opp.bench.shift();
        opp.bench.push(opp.active);
        opp.active = forced;
        this.state.log({ type: 'system', text: `Cyclone : ${opp.active.name} adverse est forcé au poste Actif !` });
      }
    } else if (card.id === 'energy-removal') {
      if (opp.active && opp.active.energies) {
        const types = Object.keys(opp.active.energies).filter(t => opp.active.energies[t] > 0);
        if (types.length) {
          opp.active.energies[types[0]]--;
          this.state.log({ type: 'system', text: `Suppression d'Énergie : 1 énergie ${types[0]} retirée de ${opp.active.name} adverse !` });
        }
      }
    } else if (card.id === 'energy-retrieval' || card.id === 'super-energy-retrieval') {
      const energiesInDiscard = me.discard.filter(c => c && c.type === 'Energy');
      const taken = energiesInDiscard.slice(0, 2);
      taken.forEach(e => {
        me.discard.splice(me.discard.indexOf(e), 1);
        me.hand.push(e);
      });
      this.state.log({ type: 'system', text: `${taken.length} carte(s) Énergie récupérée(s) de la défausse !` });
    } else if (card.id === 'pluspower') {
      if (me.active) {
        me.active.plusPower = (me.active.plusPower || 0) + 1;
        this.state.log({ type: 'system', text: `Force Plus : +10 dégâts pour ${me.active.name} ce tour !` });
      }
    } else if (card.id === 'defender') {
      if (me.active) {
        me.active.defender = (me.active.defender || 0) + 1;
        this.state.log({ type: 'system', text: `Protecteur : -20 dégâts subis par ${me.active.name} !` });
      }
    } else if (card.id === 'full-heal') {
      if (me.active) {
        me.active.status = null;
        this.state.log({ type: 'system', text: `Guérison Totale : ${me.active.name} n'a plus d'état spécial !` });
      }
    } else if (card.id === 'scoop-up') {
      if (me.active && me.bench.length > 0) {
        const returned = me.active;
        me.active = me.bench.shift();
        returned.hp = returned.maxHp;
        returned.energies = {};
        me.hand.push(returned);
        this.state.log({ type: 'system', text: `Rappel : ${returned.name} revient dans votre main !` });
      }
    } else {
      me.drawCard();
    }

    me.discard.push(card);
  }

  openCardActionModal(card, sourceZone = 'hand', slotIndex = 0) {
    const me = this.state.player;
    const modal = document.createElement('div');
    modal.className = 'modal';

    let actionsHtml = '';
    if (sourceZone === 'hand' && this.state.currentPlayer === 'player') {
      if (card.type === 'Pokemon' && card.stage === 'Basic') {
        if (!me.active) {
          actionsHtml += `<button class="btn btn-primary" style="width:100%;margin-top:8px" data-act="play-active">Mettre en Pokémon Actif</button>`;
        }
        if (me.bench.length < 5) {
          actionsHtml += `<button class="btn btn-secondary" style="width:100%;margin-top:8px" data-act="play-bench">Mettre sur le Banc (${me.bench.length}/5)</button>`;
        }
      } else if (card.type === 'Pokemon' && card.stage !== 'Basic') {
        const candidates = [me.active, ...me.bench].filter(Boolean).filter(c => c.name === card.evolvesFrom);
        if (candidates.length) {
          actionsHtml += `<button class="btn btn-primary" style="width:100%;margin-top:8px" data-act="evolve">Faire évoluer ${card.evolvesFrom} → ${card.name}</button>`;
        } else {
          actionsHtml += `<p style="color:#f39c12;font-size:12px;margin-top:8px">Nécessite ${card.evolvesFrom} en jeu pour évoluer.</p>`;
        }
      } else if (card.type === 'Energy') {
        if (!this.state.energyAttachedThisTurn.player) {
          if (me.active) {
            actionsHtml += `<button class="btn btn-primary" style="width:100%;margin-top:8px" data-act="energy-active">Attacher à ${me.active.name} (Actif)</button>`;
          }
          me.bench.forEach((b, i) => {
            if (b) {
              actionsHtml += `<button class="btn btn-secondary" style="width:100%;margin-top:6px" data-act="energy-bench" data-idx="${i}">Attacher à ${b.name} (Banc)</button>`;
            }
          });
        } else {
          actionsHtml += `<p style="color:#f39c12;font-size:12px;margin-top:8px">1 seule Énergie par tour déjà attachée.</p>`;
        }
      } else if (card.type === 'Trainer') {
        actionsHtml += `<button class="btn btn-primary" style="width:100%;margin-top:8px" data-act="play-trainer">Jouer la carte Dresseur</button>`;
      }
    } else if (sourceZone === 'player-active' && this.state.currentPlayer === 'player') {
      if (card.attacks?.length) {
        actionsHtml += `<button class="btn btn-primary" style="width:100%;margin-top:8px" data-act="open-attacks">⚔️ Attaquer avec ${card.name}</button>`;
      }
      if (me.bench.length > 0 && this.app.rules.canRetreat(card, me)) {
        actionsHtml += `<button class="btn btn-secondary" style="width:100%;margin-top:8px" data-act="retreat">🔄 Battre en retraite (${(card.retreatCost || []).length} Énergie)</button>`;
      }
    }

    modal.innerHTML = `
      <div class="modal-content" style="max-width:340px;text-align:center">
        <img src="${card.image}" alt="${card.name}" style="width:200px;max-width:75vw;border-radius:10px;box-shadow:0 8px 28px rgba(0,0,0,0.6);margin-bottom:10px">
        <h3 style="color:#ffcb05;margin-bottom:4px">${card.name}</h3>
        <p style="font-size:12px;color:#aab;margin-bottom:8px">
          ${card.type === 'Pokemon' ? `${card.stage} • ${card.hp}/${card.maxHp} PV • Type ${card.energyType}` : card.type}
        </p>
        ${card.effect ? `<p style="font-size:11px;color:#ddd;background:rgba(255,255,255,0.06);padding:8px;border-radius:6px;margin-bottom:8px">${card.effect}</p>` : ''}
        ${actionsHtml}
        <button class="btn" style="width:100%;margin-top:10px;background:#334;color:#ccc" id="close-card-modal">Fermer</button>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('#close-card-modal').onclick = () => modal.remove();
    modal.onclick = e => { if (e.target === modal) modal.remove(); };

    modal.querySelectorAll('[data-act]').forEach(btn => {
      btn.onclick = () => {
        const act = btn.dataset.act;
        modal.remove();
        this.app.hand?.clearSelection();
        if (act === 'play-active') this.playPokemon(card, 'active');
        else if (act === 'play-bench') this.playPokemon(card, 'bench');
        else if (act === 'evolve') {
          const target = [me.active, ...me.bench].filter(Boolean).find(c => c.name === card.evolvesFrom);
          if (target) this.handleDrop({ card, fromZone: 'hand' }, target === me.active ? 'player-active' : 'player-bench', null, me.bench.indexOf(target));
        }
        else if (act === 'energy-active') this.attachEnergyTo(card, me.active);
        else if (act === 'energy-bench') this.attachEnergyTo(card, me.bench[parseInt(btn.dataset.idx, 10)]);
        else if (act === 'play-trainer') this.playTrainer(card);
        else if (act === 'open-attacks') this.app.showAttackChooser();
        else if (act === 'retreat') {
          this.app.rules.discardEnergyCost(card, card.retreatCost || []);
          const nextActive = me.bench.shift();
          me.bench.push(card);
          me.active = nextActive;
          this.state.log({ type: 'player', text: `${card.name} bat en retraite ! ${nextActive.name} passe Actif.` });
        }
        this.app.renderAll();
      };
    });
  }

  render() {
    this.renderZone('player-active', this.state.player.active, 'Actif');
    this.renderZone('player-bench', this.state.player.bench, 'Banc', false);
    this.renderZone('player-prizes', this.state.player.prizes, 'Prix', true);
    this.renderZone('player-discard', [this.state.player.discard[this.state.player.discard.length - 1]], 'Défausse');

    // Adversaire : son Pokémon actif ET son banc sont visibles (règles officielles TCG), ses Prix sont face cachée
    this.renderZone('opponent-active', this.state.opponent.active, 'Actif Adv.');
    this.renderZone('opponent-bench', this.state.opponent.bench, 'Banc Adv.', false);
    this.renderZone('opponent-prizes', this.state.opponent.prizes, 'Prix', true);
    this.renderZone('opponent-discard', [this.state.opponent.discard[this.state.opponent.discard.length - 1]], 'Défausse');
  }

  renderZone(zoneId, cards, defaultLabel = 'Vide', faceDown = false) {
    const row = this.container.querySelector(`[data-zone="${zoneId}"]`);
    if (!row) return;
    const slots = row.querySelectorAll('.zone-slot');
    cards = Array.isArray(cards) ? cards : [cards];

    slots.forEach((slot, i) => {
      const card = cards[i];
      if (card) {
        slot.innerHTML = '';
        slot.classList.add('occupied');
        const cardEl = this.createCardElement(card, faceDown || card.faceDown);
        slot.appendChild(cardEl);
      } else {
        slot.innerHTML = `<div class="zone-label">${defaultLabel}</div>`;
        slot.classList.remove('occupied');
      }
    });
  }

  createCardElement(card, faceDown = false) {
    const el = document.createElement('div');
    el.className = 'zone-card';
    el.draggable = !faceDown;
    if (card.instanceId) el.dataset.instanceId = card.instanceId;
    el.style.width = '100%';
    el.style.height = '100%';
    el.style.borderRadius = '6px';
    el.style.position = 'relative';
    el.style.cursor = 'pointer';
    el.style.background = faceDown
      ? 'url(./src/assets/card-back.svg) center/cover no-repeat'
      : `url('${card.image}') center/cover no-repeat`;
    el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.5)';

    if (!faceDown) {
      // PV en bas à droite
      if (card.hp !== undefined) {
        const hp = document.createElement('div');
        hp.style.cssText = 'position:absolute;bottom:2px;right:2px;background:rgba(0,0,0,0.85);color:#ffcb05;padding:1px 4px;border-radius:3px;font-size:9px;font-weight:bold';
        hp.textContent = `${card.hp}/${card.maxHp}`;
        el.appendChild(hp);
      }
      // Énergies attachées en haut à droite
      if (card.energies) {
        const badgeRow = document.createElement('div');
        badgeRow.style.cssText = 'position:absolute;top:2px;right:2px;display:flex;gap:2px;flex-wrap:wrap;max-width:90%;justify-content:flex-end';
        for (const [eType, count] of Object.entries(card.energies)) {
          for (let k = 0; k < count; k++) {
            const dot = document.createElement('span');
            dot.style.cssText = `width:10px;height:10px;border-radius:50%;background:${ENERGY_COLORS[eType] || '#fff'};border:1px solid #000;display:inline-block;box-shadow:0 1px 2px rgba(0,0,0,0.8)`;
            dot.title = eType;
            badgeRow.appendChild(dot);
          }
        }
        el.appendChild(badgeRow);
      }
      // Marqueurs statut
      if (card.status) {
        const status = document.createElement('div');
        status.style.cssText = 'position:absolute;top:2px;left:2px;background:#e74c3c;color:#fff;padding:1px 4px;border-radius:3px;font-size:8px;font-weight:bold;text-transform:uppercase';
        status.textContent = card.status.slice(0, 3);
        el.appendChild(status);
      }
    }
    return el;
  }
}
