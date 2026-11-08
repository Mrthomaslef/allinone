export class Hand {
  constructor(container, gameState, app) {
    this.container = container;
    this.state = gameState;
    this.app = app;
    this.selected = new Set();
    this.bindEvents();
  }

  bindEvents() {
    this.container.addEventListener('click', e => this.onClick(e));
    this.container.addEventListener('dragstart', e => {
      const cardEl = e.target.closest('.hand-card');
      if (!cardEl) return;
      const card = this.state.player.hand.find(c => c.instanceId === cardEl.dataset.instanceId);
      if (!card) return;
      this.app.playmat.draggedCard = {
        element: cardEl,
        card,
        fromZone: 'hand'
      };
      cardEl.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', card.instanceId);
    });
    this.container.addEventListener('dragend', e => {
      const cardEl = e.target.closest('.hand-card');
      if (cardEl) cardEl.classList.remove('dragging');
      this.app.playmat?.clearHighlights();
    });
  }

  onClick(e) {
    const cardEl = e.target.closest('.hand-card');
    if (!cardEl) return this.clearSelection();
    const instanceId = cardEl.dataset.instanceId;
    const card = this.state.player.hand.find(c => c.instanceId === instanceId);
    if (!card) return;

    // Si déjà sélectionnée -> ouvrir le menu d'action rapide (ou jouer direct)
    if (this.selected.has(instanceId)) {
      this.app.playmat.openCardActionModal(card, 'hand');
      return;
    }

    this.clearSelection();
    this.selectCard(instanceId, cardEl);
    this.app.playmat.highlightValidTargets(card);
  }

  selectCard(instanceId, el) {
    this.selected.add(instanceId);
    el.classList.add('selected');
  }

  clearSelection() {
    this.selected.clear();
    this.container.querySelectorAll('.hand-card.selected').forEach(el => el.classList.remove('selected'));
    this.app.playmat?.clearHighlights();
  }

  getSelectedCard() {
    if (!this.selected.size) return null;
    const id = [...this.selected][0];
    return this.state.player.hand.find(c => c.instanceId === id) || null;
  }

  render() {
    const me = this.state.player;
    this.container.innerHTML = me.hand.filter(Boolean).map(card => {
      const isSelected = this.selected.has(card.instanceId);
      const borderColor = card.type === 'Pokemon' ? '#2ecc71' : (card.type === 'Energy' ? '#ffcb05' : '#3498db');
      return `
        <div class="hand-card ${isSelected ? 'selected' : ''}"
             data-instance-id="${card.instanceId}"
             draggable="true"
             style="background:url('${card.image}') center/cover no-repeat;border:2px solid ${borderColor};position:relative"
             aria-label="${card.name} - ${card.type}${card.hp ? ` ${card.hp}/${card.maxHp} PV` : ''}">
          ${card.type === 'Energy' ? `<span style="position:absolute;top:2px;right:2px;background:rgba(0,0,0,0.85);color:#ffcb05;padding:1px 4px;border-radius:3px;font-size:8px;font-weight:bold">${card.energyType}</span>` : ''}
          ${card.type === 'Pokemon' ? `<span style="position:absolute;top:2px;left:2px;background:rgba(0,0,0,0.85);color:#fff;padding:1px 4px;border-radius:3px;font-size:8px;font-weight:bold">${card.stage === 'Basic' ? 'Base' : card.stage}</span>` : ''}
          <div style="position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,0.82);font-size:8px;color:#ffcb05;padding:2px;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border-radius:0 0 4px 4px">${card.name}</div>
        </div>
      `;
    }).join('');
  }
}
