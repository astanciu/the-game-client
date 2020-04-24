import { GameView } from './GameView';
import { Player } from './Player';
import { Vector } from './Utils';
export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.ctx = this.getCtx();

    this.view = new GameView(this);
    this.player = new Player(this);
    this.mouse = new Vector(0, 0);
  }

  run() {
    this.listen();
    this.drawLoop();
  }

  listen() {
    this.ctx.canvas.addEventListener('mousemove', this.mouseMove.bind(this));
  }

  mouseMove(e) {
    this.mouse.set(e.clientX, e.clientY);
    this.player.mouseMoved(this.mouse);
  }

  drawLoop() {
    this.view.draw();
    this.player.tick();
    this.player.draw();

    requestAnimationFrame(() => {
      this.drawLoop();
    });
  }

  drawBackground() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = this.styles.backgroundColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  resize(width, height) {
    this.setSize(width, height);
    this.view.width = width;
    this.view.height = height;
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;

    let backingStoreRatio =
      this.ctx.webkitBackingStorePixelRatio ||
      this.ctx.mozBackingStorePixelRatio ||
      this.ctx.msBackingStorePixelRatio ||
      this.ctx.oBackingStorePixelRatio ||
      this.ctx.backingStorePixelRatio ||
      1;
    let devicePixelRatio = window.devicePixelRatio || 1;
    this.ratio = devicePixelRatio / backingStoreRatio;

    if (devicePixelRatio !== backingStoreRatio) {
      let oldWidth = this.canvas.width;
      let oldHeight = this.canvas.height;
      this.canvas.width = oldWidth * this.ratio;
      this.canvas.height = oldHeight * this.ratio;
      this.canvas.style.width = oldWidth + 'px';
      this.canvas.style.height = oldHeight + 'px';
      this.ctx.scale(this.ratio, this.ratio);
    }
  }

  getCtx() {
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = true;
    this.setSize(this.width, this.height);
    return this.ctx;
  }
}
