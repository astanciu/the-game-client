import { GameView } from './GameView';
import { Block, Room } from './Geometry';
import { Player } from './Player';
import { Vector } from './Utils';
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
      mouse: new Vector(0, 0),
      room: new Room(0, 0, this.width, this.height),
      blocks: [
        new Block(150, 150, 150, 150),
        new Block(500, 150, 150, 150),
        new Block(800, 150, 150, 150),
      ],
      segments: [
        // Border
        { a: { x: 0, y: 0 }, b: { x: this.width, y: 0 } },
        {
          a: { x: this.width, y: 0 },
          b: { x: this.width, y: this.height },
        },
        {
          a: { x: this.width, y: this.height },
          b: { x: 0, y: this.height },
        },
        { a: { x: 0, y: this.height }, b: { x: 0, y: 0 } },

        // Polygon #1
        { a: { x: 100, y: 150 }, b: { x: 120, y: 50 } },
        { a: { x: 120, y: 50 }, b: { x: 200, y: 80 } },
        { a: { x: 200, y: 80 }, b: { x: 140, y: 210 } },
        { a: { x: 140, y: 210 }, b: { x: 100, y: 150 } },

        // Polygon #3
        { a: { x: 200, y: 360 }, b: { x: 220, y: 250 } },
        { a: { x: 220, y: 250 }, b: { x: 300, y: 300 } },
        { a: { x: 300, y: 300 }, b: { x: 350, y: 420 } },
        { a: { x: 350, y: 420 }, b: { x: 200, y: 360 } },

        // // Polygon #5
        { a: { x: 750, y: 190 }, b: { x: 860, y: 70 } },
        { a: { x: 860, y: 70 }, b: { x: 1070, y: 144 } },
        { a: { x: 1070, y: 144 }, b: { x: 1000, y: 310 } },
        { a: { x: 1000, y: 310 }, b: { x: 840, y: 270 } },
        { a: { x: 840, y: 270 }, b: { x: 750, y: 190 } },

        // // Polygon #6
        { a: { x: 400, y: 95 }, b: { x: 580, y: 50 } },
        { a: { x: 580, y: 50 }, b: { x: 480, y: 150 } },
        { a: { x: 480, y: 150 }, b: { x: 400, y: 95 } },

        { a: { x: 570, y: 350 }, b: { x: 750, y: 420 } },
        { a: { x: 750, y: 420 }, b: { x: 640, y: 470 } },
        { a: { x: 640, y: 470 }, b: { x: 570, y: 350 } },
      ],
      visibility: null,
    };
    this.view = new GameView(this);
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
