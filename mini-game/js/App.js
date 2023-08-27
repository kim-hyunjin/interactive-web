import Background from "./Background.js";

export default class App {
    static canvas = document.querySelector('canvas');
    static ctx = App.canvas.getContext('2d');
    static dpr = window.devicePixelRatio || 1;
    static fps = 60;
    static interval = 1000 / App.fps;
    static width = 1024;
    static height = 768;

    constructor() {
        window.addEventListener('resize', this.resize.bind(this));
        this.backgrounds = [
            new Background({ctx: App.ctx, height: App.height, img: document.querySelector('#bg3-img'), speed: -1}),
            new Background({ctx: App.ctx, height: App.height, img: document.querySelector('#bg2-img'), speed: -2}),
            new Background({ctx: App.ctx, height: App.height, img: document.querySelector('#bg1-img'), speed: -4}),
        ]
    }

    resize() {
        App.canvas.width = App.width * App.dpr;
        App.canvas.height = App.height * App.dpr;
        App.ctx.scale(App.dpr, App.dpr);

        const isPortrait = window.innerHeight > window.innerWidth;
        const width = isPortrait ? window.innerWidth * 0.9 : window.innerHeight * 0.9;
        App.canvas.style.width = `${width}px`;
        App.canvas.style.height = `${width * (3 / 4)}px`;
    }

    render() {
        let now, delta;
        let then = Date.now();
        const frame = () => {
            requestAnimationFrame(frame);
            now = Date.now();
            delta = now - then;
            if (delta < App.interval) {
                return;
            }
            then = now - (delta % App.interval);
            App.ctx.clearRect(0, 0, App.width, App.height);

            // 배경 관리
            this.backgrounds.forEach(background => {
                background.update()
                background.draw()
            });

            App.ctx.fillRect(50, 50, 100, 100)
        }
        frame();
    }
}
