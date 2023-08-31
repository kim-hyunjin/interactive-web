export default class Stick {
    constructor(startPoint, endPoint) {
        this.startPoint = startPoint
        this.endPoint = endPoint
    }
    update() {}
    draw(ctx) {
        ctx.beginPath()
        ctx.strokeStyle = '#999'
        ctx.lineWidth = 10
        ctx.moveTo(this.startPoint.pos.x, this.startPoint.pos.y)
        ctx.lineTo(this.endPoint.pos.x, this.endPoint.pos.y)
        ctx.stroke()
        ctx.closePath()
    }
}
