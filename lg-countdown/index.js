import {Canvas} from "./js/canvas.js";
import Particle from "./js/particle.js";

let canvas;
function init() {
    const canvasEl = document.querySelector('canvas');
    canvas = new Canvas(canvasEl)
    canvas.init()
}

const particles = [];
const PARTICLE_COUNT = 800;
function createRing() {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle(canvas));
    }
}

function draw() {
    canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].opacity <= 0) {
            particles.splice(i, 1);
        }
    }


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
