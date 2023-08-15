import {Canvas} from "./js/canvas.js";
import {Particle} from "./js/particle.js";
import {randomNumBetween} from "./js/utils.js";

let canvas;

const particles = [];
const PARTICLE_COUNT = 400;

function createParticles() {
    const x = randomNumBetween(0, canvas.width);
    const y = randomNumBetween(0, canvas.height);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const r = randomNumBetween(2, 100) * 0.2;
        const angle = Math.PI / 180 * randomNumBetween(0, 360);
        const vx = r * Math.cos(angle);
        const vy = r * Math.sin(angle);
        const opacity = randomNumBetween(0.6, 0.9)

        particles.push(new Particle(canvas, x, y, vx, vy, opacity));
    }
}

function draw() {
    canvas.ctx.fillStyle = '#00000040'
    canvas.ctx.fillRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.opacity <= 0) {
            particles.splice(index, 1);
        }
    });
}

window.addEventListener('load', () => {
    const canvasEl = document.getElementById('canvas');
    canvas = new Canvas(canvasEl);
    canvas.init();
    createParticles();
    canvas.render(draw);
})

window.addEventListener('resize', () => {
    canvas.init(innerWidth, innerHeight);
})
