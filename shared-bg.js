// Shared Canvas Background — for all APEX ARENA pages
(function(){
const canvas = document.getElementById('bg-canvas');
if (!canvas) return;
const ctx = canvas.getContext('2d');
let W, H;
const particles = [];
const MAX = 120;
const TRAIL = 18;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
  constructor() { this.reset(); this.y = Math.random() * H; }
  reset() {
    this.x = Math.random() * W; this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.8; this.vy = (Math.random() - 0.5) * 0.6 - 0.3;
    this.life = 1; this.decay = 0.0015 + Math.random() * 0.003;
    this.size = 0.6 + Math.random() * 1.8;
    this.hue = Math.random() < 0.6 ? (Math.random() < 0.5 ? 12 : 38) : (Math.random() < 0.5 ? 210 : 280);
    this.saturation = 70 + Math.random() * 30; this.lightness = 55 + Math.random() * 25;
    this.trail = [];
  }
  update() {
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > TRAIL) this.trail.shift();
    this.x += this.vx; this.y += this.vy; this.life -= this.decay;
    this.vx += (Math.random() - 0.5) * 0.02;
    if (this.x < -20 || this.x > W + 20 || this.y < -20 || this.y > H + 20 || this.life <= 0) { this.reset(); this.life = 1; }
  }
  draw(ctx) {
    if (this.trail.length > 1) {
      ctx.beginPath(); ctx.moveTo(this.trail[0].x, this.trail[0].y);
      for (let i = 1; i < this.trail.length; i++) ctx.lineTo(this.trail[i].x, this.trail[i].y);
      ctx.strokeStyle = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.life * 0.12})`;
      ctx.lineWidth = this.size * 0.5; ctx.lineCap = 'round'; ctx.stroke();
    }
    ctx.beginPath(); ctx.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.life * 0.7})`; ctx.fill();
    const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 4 * this.life);
    glow.addColorStop(0, `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.life * 0.35})`);
    glow.addColorStop(1, 'hsla(0, 0%, 0%, 0)');
    ctx.beginPath(); ctx.arc(this.x, this.y, this.size * 4 * this.life, 0, Math.PI * 2);
    ctx.fillStyle = glow; ctx.fill();
  }
}

for (let i = 0; i < MAX; i++) particles.push(new Particle());

function animate() {
  ctx.clearRect(0, 0, W, H);
  ctx.strokeStyle = 'rgba(255,255,255,0.015)'; ctx.lineWidth = 0.5;
  const gridSize = 80;
  for (let x = gridSize; x < W; x += gridSize) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = gridSize; y < H; y += gridSize) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  particles.forEach(p => { p.update(); p.draw(ctx); });
  requestAnimationFrame(animate);
}
animate();
})();
