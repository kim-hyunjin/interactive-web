import { randomNumBetween } from './utils.js';

export default class Particle {
    constructor(canvas) {
        this.ctx = canvas.ctx;
        this.r = innerHeight / 4;
        this.angle = randomNumBetween(0, 360)

        this.x = innerWidth / 2 + this.r * Math.cos(Math.PI / 180 * this.angle);
        this.y = innerHeight / 2 + + this.r * Math.sin(Math.PI / 180 * this.angle);
    }

    update() {}

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        this.ctx.fillStyle = '#fff';
        this.ctx.fill();
        this.ctx.closePath();
    }
}
