export class TutorialOverlay {
  constructor(app) {
    this.app = app;
    this.step = 0;
    this.steps = TUTORIAL;
  }

  start() {
    this.step = this.app.saveData.tutorialStep || 0;
    this.showStep();
  }

  showStep() {
    const step = this.steps[this.step];
    if (!step) return this.complete();
    
    // Supprimer ancien
    document.querySelectorAll('.tutorial-bubble, .tutorial-arrow').forEach(el => el.remove());
    
    const bubble = document.createElement('div');
    bubble.className = `tutorial-bubble ${step.position}`;
    bubble.innerHTML = `
      <strong>Professeur Chen</strong><br>
      ${step.text}
      <div style="margin-top:8px;display:flex;gap:8px;justify-content:flex-end">
        <button class="btn btn-secondary" onclick="app.tutorial.prev()">Précédent</button>
        <button class="btn btn-primary" onclick="app.tutorial.next()">Suivant</button>
      </div>
    `;
    document.body.appendChild(bubble);
    
    // Positionner près de l'élément cible
    const target = document.querySelector(step.target);
    if (target) {
      const rect = target.getBoundingClientRect();
      if (step.position === 'bottom') {
        bubble.style.left = `${rect.left + rect.width/2 - 140}px`;
        bubble.style.top = `${rect.bottom + 12}px`;
      } else {
        bubble.style.left = `${rect.left + rect.width/2 - 140}px`;
        bubble.style.bottom = `${window.innerHeight - rect.top + 12}px`;
      }
    }
    
    // Flèche
    const arrow = document.createElement('div');
    arrow.className = `tutorial-arrow ${step.position === 'bottom' ? 'down' : 'up'}`;
    if (target) {
      const rect = target.getBoundingClientRect();
      arrow.style.left = `${rect.left + rect.width/2}px`;
      arrow.style.top = step.position === 'bottom' ? `${rect.bottom}px` : `${rect.top}px`;
    }
    document.body.appendChild(arrow);
    
    // Highlight cible
    target?.classList.add('highlight');
  }

  next() {
    document.querySelectorAll('.highlight').forEach(el => el.classList.remove('highlight'));
    this.step++;
    this.app.saveData.tutorialStep = this.step;
    this.app.save();
    this.showStep();
  }

  prev() {
    document.querySelectorAll('.highlight').forEach(el => el.classList.remove('highlight'));
    this.step = Math.max(0, this.step - 1);
    this.showStep();
  }

  complete() {
    document.querySelectorAll('.tutorial-bubble, .tutorial-arrow, .highlight').forEach(el => el.remove());
    this.app.log.add({ type: 'system', text: 'Tutoriel terminé ! Vous pouvez maintenant jouer librement.' });
  }
}
