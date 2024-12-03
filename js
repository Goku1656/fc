const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Mostrar pantalla de cumpleaños al presionar el botón
document.getElementById('start-button').addEventListener('click', () => {
  document.getElementById('welcome-screen').classList.add('hidden');
  document.getElementById('birthday-screen').classList.remove('hidden');
  animateFireworks();
});

// Clase para los fuegos artificiales
class Firework {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.particles = [];
    for (let i = 0; i < 100; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1;
      const dx = Math.cos(angle) * speed;
      const dy = Math.sin(angle) * speed;
      this.particles.push({ x: this.x, y: this.y, dx, dy, alpha: 1 });
    }
  }

  update() {
    this.particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      p.alpha -= 0.02;
    });
    this.particles = this.particles.filter(p => p.alpha > 0);
  }

  draw() {
    this.particles.forEach(p => {
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }
}

const fireworks = [];

function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (Math.random() < 0.1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    const color = `hsl(${Math.random() * 360}, 100%, 70%)`;
    fireworks.push(new Firework(x, y, color));
  }
  fireworks.forEach(f => {
    f.update();
    f.draw();
  });
  requestAnimationFrame(animateFireworks);
}
