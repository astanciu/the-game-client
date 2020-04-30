import { HitBox } from './gamelib/hitbox';
import { Vector2 } from './gamelib/math/Vector2';
import { PlayerView } from './PlayerView';

export class Player {
  constructor(game) {
    this.game = game;
    this.ctx = game.ctx;
    this.radius = 12;
    this.loc = new Vector2(400, 150);
    this.velocity = new Vector2(0, 0);
    this.acc = new Vector2(0.5, 0.5);
    this.topSpeed = 10;
    this.angle = 0;
    this.coneAngle = 0.5;
    this.view = new PlayerView(this);
    this.moving = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
    this.hitbox = new HitBox();
    this.setup();
    this.itemsToDebug = [];
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
    const acc = new Vector2(0, 0);
    const decell = new Vector2(0, 0);
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
    this.velocity.clampLength(-this.topSpeed, this.topSpeed);
    this.loc.add(this.velocity);

    this.hitbox.setCircle(this.loc, this.radius);
    const rocks = this.game.world.shapes;

    rocks.forEach((rock) => {
      const int = this.hitbox.intersects(rock.hitbox);
      if (int) {
        if (typeof int === 'boolean') {
          console.log(`fuck. we're inside`);
          return;
        }
        // we are intersecting an edge. need to backout
        const { p1, p2, v: nearestPoint } = int;
        let d2n = this.loc.distanceTo(nearestPoint);
        if (this.radius - d2n <= 0.5) return;
        let overlapDist = this.radius - d2n;
        if (d2n <= this.radius) {
          this.velocity.setLength(overlapDist * -1.2);
          this.loc.add(this.velocity);
        }
      }
    });
  }

  debug(item) {
    this.itemsToDebug.push(item);
  }

  checkBounds() {
    const offset = this.radius;
    if (this.loc.x <= 0 + offset) {
      this.loc.x = 0 + offset;
      this.velocity.x = 0;
    }
    if (this.loc.x >= this.game.width - offset) {
      this.loc.x = this.game.width - offset;
      this.velocity.x = 0;
    }
    if (this.loc.y <= offset) {
      this.loc.y = offset;
      this.velocity.y = 0;
    }
    if (this.loc.y >= this.game.height - offset) {
      this.loc.y = this.game.height - offset;
      this.velocity.y = 0;
    }
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
    // this.hitbox.render(this.ctx);
    this.drawDebug();
  }
  drawDebug() {
    this.itemsToDebug.forEach((item) => {
      if (item instanceof Vector2) {
        item.debug(this.ctx);
      }
    });
    this.itemsToDebug = [];
  }
}
