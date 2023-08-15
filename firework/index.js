import {Canvas} from "./js/canvas.js";
import {Particle} from "./js/particle.js";

let canvas;

const particles = [];
const PARTICLE_COUNT = 10;

function createParticles() {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(canvas, x, y));
    }
}

function drawParticles() {
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
}

window.addEventListener('load', () => {
    const canvasEl = document.getElementById('canvas');
    canvas = new Canvas(canvasEl);
    canvas.init();
    createParticles();
    canvas.render(drawParticles);
})

window.addEventListener('resize', () => {
    canvas.init(innerWidth, innerHeight);
})
