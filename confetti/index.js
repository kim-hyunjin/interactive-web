import { Canvas } from "./js/canvas.js";
import Particle from "./js/particle.js";

let canvas;
const particles = [];

function init() {
  const canvasEl = document.querySelector("canvas");
  canvas = new Canvas(canvasEl);
  canvas.init();

  confetti({
    x: 0,
    y: canvas.height / 2,
    count: 10,
    deg: -50,
  });
}

function confetti({ x, y, count, deg }) {
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(canvas, x, y, deg));
  }
}

function draw() {
  canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();
  }
}

function render() {
  canvas.render(draw);
}

window.addEventListener("load", () => {
  init();
  render();
});
window.addEventListener("resize", init);
window.addEventListener("click", (e) => {
  init();
  render();
});
