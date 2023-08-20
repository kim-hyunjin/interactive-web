import {Canvas} from "./js/canvas.js";
import Particle from "./js/particle.js";

let canvas;
function init() {
    const canvasEl = document.querySelector('canvas');
    canvas = new Canvas(canvasEl)
    canvas.init()
}

const particles = [];
const PARTICLE_COUNT = 20;
function createRing() {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle(canvas));
    }
}

function draw() {
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    })
}

function render() {
    canvas.render(draw)
}

window.addEventListener('load', () => {
    init();
    render();
})

window.addEventListener('resize', init);

window.addEventListener('click', () => {
    createRing();
})
