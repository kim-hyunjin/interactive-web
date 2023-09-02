import Vector from './Vector.js'

export default class Dot {
    constructor(x, y) {
        this.pos = new Vector(x, y)
        this.oldPos = new Vector(x, y)

        this.gravity = new Vector(0, 1)
        this.friction = 0.97

        this.pinned = false
        this.mass = 1
    }

    update(mouse) {
        if (this.pinned) return

        let velocity = Vector.sub(this.pos, this.oldPos)

        this.oldPos.setXY(this.pos.x, this.pos.y)

        velocity.mul(this.friction)
        velocity.add(this.gravity)
        this.pos.add(velocity)

        this.attractToMouse(mouse)
    }

    // 마우스 위치로 빨려들어가는 효과
    attractToMouse(mouse) {
        let { x: dx, y: dy } = Vector.sub(this.pos, mouse.pos)

        this.distMouse = Math.sqrt(dx * dx + dy * dy)
        if (this.distMouse > mouse.radius + this.radius) return

        const direction = new Vector(dx / this.distMouse, dy / this.distMouse)
        let force = (mouse.radius - this.distMouse) / mouse.radius

        if (force < 0) force = 0
        if (force < 0.6) {
            this.pos.sub(direction.mul(force).mul(0.0001))
        } else {
            this.pos.setXY(mouse.pos.x, mouse.pos.y)
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#000'
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
    }
}
