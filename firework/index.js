import {Canvas} from "./js/canvas.js";
import {Particle} from "./js/particle.js";
import {randomIntBetween, randomNumBetween} from "./js/utils.js";
import {Tail} from "./js/tail.js";

let canvas;

const particles = [];
const tails = [];
const PARTICLE_COUNT = 400;

function createParticles(x, y, color) {
    // const x = randomNumBetween(0, canvas.width);
    // const y = randomNumBetween(0, canvas.height);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const r = randomNumBetween(2, 100) * 0.2;
        const angle = Math.PI / 180 * randomNumBetween(0, 360);
        const vx = r * Math.cos(angle);
        const vy = r * Math.sin(angle);
        const opacity = randomNumBetween(0.6, 0.9)

        particles.push(new Particle(canvas, x, y, vx, vy, opacity, color));
    }
}
function createTails() {
    const x = randomNumBetween(canvas.width * 0.2, canvas.width * 0.8);
    const vy = randomIntBetween(canvas.height / 30, canvas.height / 25) * -1
    const color = '255, 255, 255';
    tails.push(new Tail(canvas, x, vy, color));
}

function draw() {
    canvas.ctx.fillStyle = '#00000040'
    canvas.ctx.fillRect(0, 0, canvas.width, canvas.height)

    if (Math.random() < 0.03) {
        createTails();
    }
    tails.forEach((tail, index) => {
        tail.update();
        tail.draw();
        if (tail.opacity <= 0.05) {
            tails.splice(index, 1);
            createParticles(tail.x, tail.y, tail.color);
        }
    });

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
    createTails();
    createParticles();
    canvas.render(draw);
})

window.addEventListener('resize', () => {
    canvas.init(innerWidth, innerHeight);
})
