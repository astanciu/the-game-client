import { HitBox } from './gamelib/hitbox';
import { Polygon } from './gamelib/util2d';

export class GameObject {
  constructor(loc) {
    this.location = loc;
  }
}

export class Rock {
  constructor(...points) {
    this.shape = new Polygon(points);
    this.hitbox = new HitBox();
    // this.hitbox.setCircle(new Vector2(100,100), 100);
    this.hitbox.setPolygon(this.shape);
  }

  getSegments() {
    return this.shape.getSegments();
  }
}
