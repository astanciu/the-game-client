import { PlayerView } from './PlayerView';
import { Vector } from './Utils';

export class Player {
  constructor(game) {
    this.game = game;
    this.ctx = game.ctx;
    this.loc = new Vector(300, 150);
    this.angle = 0;
    this.velocity = 5;
    this.view = new PlayerView(this);
    this.moving = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
    this.setup();
  }

  setup() {
    window.addEventListener('keydown', this.keydown.bind(this), false);
    window.addEventListener('keyup', this.keyup.bind(this), false);
  }
  setdown() {
    this.ctx.canvas.removeEventListener('keydown', this.keydown.bind(this));
    this.ctx.canvas.removeEventListener('keyup', this.keyup.bind(this));
  }

  keydown(e) {
    const { key } = e;
    if (key === 'w') this.moving.up = true;
    if (key === 'a') this.moving.left = true;
    if (key === 's') this.moving.down = true;
    if (key === 'd') this.moving.right = true;
  }

  keyup(e) {
    const { key } = e;
    if (key === 'w') this.moving.up = false;
    if (key === 'a') this.moving.left = false;
    if (key === 's') this.moving.down = false;
    if (key === 'd') this.moving.right = false;
  }

  updatePosition() {
    // if (this.moving.up) this.loc.y -= this.velocity;
    // if (this.moving.down) this.loc.y += this.velocity;
    // if (this.moving.left) this.loc.x -= this.velocity;
    // if (this.moving.right) this.loc.x += this.velocity;

    if (this.moving.up) this.loc.y -= this.velocity;
    if (this.moving.down) this.loc.y += this.velocity;aw
    if (this.moving.left) this.loc.x -= this.velocity;
    if (this.moving.right) this.loc.x += this.velocity;
  }

  checkBounds() {
    if (this.loc.x <= 0) this.loc.x = 0;
    if (this.loc.x >= this.game.width) this.loc.x = this.game.width;
    if (this.loc.y <= 0) this.loc.y = 0;
    if (this.loc.y >= this.game.height) this.loc.y = this.game.height;
  }

  mouseMoved(mouseVector) {
    this.angle = this.loc.angleTo(mouseVector)
  }

  tick() {
    this.updatePosition();
    this.checkBounds();
  }

  draw() {
    this.view.draw();
  }
}
