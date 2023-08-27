import {randomNumBetween} from "./utils.js";

export default class Wall {
    constructor({ctx, type, appWidth, appHeight}) {
        this.ctx = ctx;
        this.img = document.querySelector('#wall-img')
        this.type = type;

        switch (this.type) {
            case 'SMALL':
                this.sx = 0
                this.sizeX = 9 / 30
                break
            case 'BIG':
                this.sx = this.img.width * (9 / 30)
                this.sizeX = 18 / 30
                break
        }

        this.width = appHeight * this.sizeX
        this.height = appHeight

        this.gapY = randomNumBetween(appHeight * 0.15, appHeight * 0.35)
        this.x = appWidth
        this.upperWallY = -this.height + randomNumBetween(30, appHeight - this.gapY - 30)
        this.lowerWallY = this.upperWallY + this.height + this.gapY

        this.generatedNext = false
        this.gapNextX = appWidth * randomNumBetween(0.3, 0.75)


        this.vx = -6
    }

    get isOutside() {
        return this.x + this.width < 0
    }

    get canGenerateNext() {
        return (
            !this.generatedNext &&
            this.x + this.width < this.gapNextX
        )
    }

    update() {
        this.x += this.vx
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.sx, 0, this.sizeX * this.img.width, this.img.height,
            this.x, this.upperWallY, this.width, this.height
        )
        this.ctx.drawImage(
            this.img,
            this.sx, 0, this.sizeX * this.img.width, this.img.height,
            this.x, this.lowerWallY, this.width, this.height
        )
    }
}
