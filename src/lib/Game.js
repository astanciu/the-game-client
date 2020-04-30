import { Vector2 } from './gamelib/math/Vector2';
import { Polygon } from './gamelib/util2d';
import { Rock } from './GameObject';
import { GameView } from './GameView';
import { Player } from './Player';
// import { loadMap } from './vis/loadmap';
// import { calculateVisibility } from './vis/visibility';
import { getVisibility } from './visibility';

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.ctx = this.getCtx();
    this.world = {
      player: new Player(this),
      mouse: new Vector2(0, 0),
      room: new Polygon([
        new Vector2(0, 0),
        new Vector2(this.width, 0),
        new Vector2(this.width, this.height),
        new Vector2(0, this.height),
      ]),

      shapes: [
        new Rock(
          new Vector2(460, 260),
          new Vector2(610, 200),
          new Vector2(740, 300),
          new Vector2(580, 420),
          new Vector2(390, 400)
        ),
        new Rock(
          new Vector2(190, 60),
          new Vector2(290, 80),
          new Vector2(310, 170),
          new Vector2(190, 250),
          new Vector2(120, 190)
        ),
        new Rock(
          new Vector2(170, 440),
          new Vector2(230, 470),
          new Vector2(290, 530),
          new Vector2(180, 560)
        ),
        new Rock(
          new Vector2(940, 60),
          new Vector2(1040, 60),
          new Vector2(1040, 160),
          new Vector2(940, 160)
        ),
        new Rock(
          new Vector2(960, 350),
          new Vector2(960, 530),
          new Vector2(760, 530)
        ),
      ],
      visibility: null,
    };
    this.view = new GameView(this);
    this.drawRocks = true;
  }

  run() {
    this.listen();
    this.drawLoop();
  }

  listen() {
    this.ctx.canvas.addEventListener('mousemove', this.mouseMove.bind(this));
  }

  mouseMove(e) {
    this.world.mouse.set(e.clientX, e.clientY);
    this.world.player.mouseMoved(this.world.mouse);
  }

  drawLoop() {
    requestAnimationFrame(() => {
      this.drawLoop();
    });

    // Update
    this.world.player.tick();
    this.updateVisibility();

    // Draw
    this.view.draw(this.world);
    this.world.player.draw();
  }

  updateVisibility() {
    this.world.visibility = getVisibility(this.world);
  }

  resize(width, height) {
    this.setSize(width, height);
    this.view.width = width;
    this.view.height = height;
    this.world.room.width = width;
    this.world.room.height = height;
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
