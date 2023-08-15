export class Particle {
    constructor(canvas, x, y) {
        this.canvas = canvas;
        this.ctx = this.canvas.ctx;
        this.x = x;
        this.y = y;
    }

    update() {

    }

    draw() {
        console.log('draw', this.ctx, this.x, this.y)
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, 50, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.closePath()
    }

}
