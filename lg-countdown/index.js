import {Canvas} from "./js/canvas";

let canvas;
function init() {
    const canvasEl = document.querySelector('canvas');
    canvas = new Canvas(canvasEl)
    canvas.init()
}

window.addEventListener('load', () => {
    init();
})
