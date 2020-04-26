import { PlayerView } from './PlayerView';
import { Vector } from './Utils';

export class Player {
  constructor(game) {
    this.game = game;
    this.ctx = game.ctx;
    this.radius = 12;
    this.loc = new Vector(400, 150);
    this.velocity = new Vector(0, 0);
    this.acc = new Vector(0.5, 0.5);
    this.topSpeed = 10;
    this.angle = 0;
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
    window.addEventListener('keydown', (ev) => this.onKey(ev, ev.key, true));
    window.addEventListener('keyup', (ev) => this.onKey(ev, ev.key, false));
  }

  onKey(ev, key, pressed) {
    if (key === 'w') this.moving.up = pressed;
    if (key === 'a') this.moving.left = pressed;
    if (key === 's') this.moving.down = pressed;
    if (key === 'd') this.moving.right = pressed;
  }

  update() {
    if (!this.mouse) return;
    this.angle = this.loc.angleTo(this.mouse);
    const acc = new Vector(0, 0);
    const decell = new Vector(0, 0);
    const accAmt = 1;
    if (this.moving.up) acc.y = -accAmt;
    if (this.moving.down) acc.y = accAmt;
    if (this.moving.left) acc.x = -accAmt;
    if (this.moving.right) acc.x = accAmt;

    if (acc.x === 0 && acc.y === 0) {
      if (this.velocity.x >= 0.5) {
        decell.x = -1;
      }
      if (this.velocity.x <= -0.5) {
        decell.x = 1;
      }
      if (this.velocity.y >= 0.5) {
        decell.y = -1;
      }
      if (this.velocity.y <= -0.5) {
        decell.y = 1;
      }
      this.velocity.add(decell);
    }
    this.velocity.cutoff(0.5);
    this.velocity.add(acc);
    this.velocity.limit(this.topSpeed);
    this.loc.add(this.velocity);
  }

  checkBounds() {
    const offset = this.radius;
    if (this.loc.x <= 0 + offset) this.loc.x = 0 + offset;
    if (this.loc.x >= this.game.width - offset)
      this.loc.x = this.game.width - offset;
    if (this.loc.y <= offset) this.loc.y = offset;
    if (this.loc.y >= this.game.height - offset)
      this.loc.y = this.game.height - offset;
  }

  mouseMoved(mouseVector) {
    this.mouse = mouseVector;
    this.angle = this.loc.angleTo(mouseVector);
  }

  tick() {
    this.update();
    this.checkBounds();
  }

  draw() {
    this.view.draw(this.game);
  }
}
