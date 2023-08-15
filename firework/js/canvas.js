export class Canvas {
    constructor(canvas, width = innerWidth, height = innerHeight, fps = 60) {
        if (!canvas) throw new Error('Canvas element is required');

        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.fps = fps;
        this.interval = 1000 / this.fps;
        this.width = width;
        this.height = height;
    }

    init(width, height) {
        const canvasWidth = width || this.width;
        const canvasHeight = height || this.height;

        this.dpr = window.devicePixelRatio;

        this.ctx.width = canvasWidth * this.dpr;
        this.ctx.height = canvasHeight * this.dpr;
        this.ctx.scale(this.dpr, this.dpr);

        this.canvas.style.width = canvasWidth + 'px';
        this.canvas.style.height = canvasHeight + 'px';
    }

    render() {
        let now, delta, then = Date.now();

        const frame = () => {
            requestAnimationFrame(frame);
            now = Date.now();
            delta = now - then;
            if (delta < this.interval) return;

            then = now - (delta % this.interval);
        }
        requestAnimationFrame(frame);
    }
}
