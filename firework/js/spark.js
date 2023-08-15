export class Spark {
    constructor(canvas, x, y, vx, vy, opacity) {
        this.ctx = canvas.ctx;
        this.x = x;
        this.y = y;
        this.vx = vx
        this.vy = vy
        this.opacity = opacity
    }

    update() {
        this.opacity -= 0.015
        this.x += this.vx
        this.y += this.vy
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2)
        this.ctx.fillStyle = `rgba(250, 250, 210, ${this.opacity})`
        this.ctx.fill()
        this.ctx.closePath()
    }
}
