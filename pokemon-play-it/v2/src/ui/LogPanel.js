export class LogPanel {
  constructor(container) {
    this.container = container;
    this.entries = [];
  }

  add(entry) {
    this.entries.push({ ...entry, time: Date.now() });
    if (this.entries.length > 50) this.entries.shift();
    this.render();
  }

  render() {
    this.container.innerHTML = this.entries.map(e => `
      <div class="log-entry ${e.type}">
        <span style="color:#889;font-size:9px;margin-right:6px">${new Date(e.time).toLocaleTimeString([], {minute:'2-digit',second:'2-digit'})}</span>
        ${e.text}
      </div>
    `).join('');
    this.container.scrollTop = this.container.scrollHeight;
  }
}
