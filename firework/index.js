import {Canvas} from "./js/canvas.js";


let canvas;

window.addEventListener('load', () => {
    const canvasEl = document.getElementById('canvas');
    canvas = new Canvas(canvasEl);
    canvas.init();
    canvas.render();
})

window.addEventListener('resize', () => {
    canvas.init(innerWidth, innerHeight);
})
