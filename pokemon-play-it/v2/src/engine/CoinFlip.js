export class CoinFlip {
  constructor() {
    this.animating = false;
  }

  async flip(callback) {
    if (this.animating) return;
    this.animating = true;
    
    const overlay = document.createElement('div');
    overlay.className = 'coin-overlay';
    overlay.style.background = 'transparent';
    overlay.style.pointerEvents = 'none';
    overlay.innerHTML = `
      <div class="coin" id="coin">
        <img src="./src/assets/coin-heads.svg" alt="Face">
      </div>
    `;
    document.body.appendChild(overlay);
    
    // Provably fair : Web Crypto API
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    const result = array[0] % 2 === 0 ? 'heads' : 'tails';
    
    await this.sleep(1500);
    
    const coin = document.getElementById('coin');
    coin.innerHTML = `<img src="./src/assets/coin-${result}.svg" alt="${result}">`;
    coin.style.animation = 'none';
    coin.style.transform = `rotateY(${result === 'heads' ? 0 : 180}deg)`;
    
    await this.sleep(800);
    overlay.remove();
    this.animating = false;
    callback(result === 'heads');
  }

  sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
}
