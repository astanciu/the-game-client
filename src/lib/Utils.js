export class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  distanceTo(v2) {
    return new Vector(v2.x - this.x, v2.y - this.y);
  }

  add(v2) {
    return new Vector(this.x + v2.x, this.y + v2.y);
  }

  mult(val) {
    return new Vector(this.x * val, this.y * val);
  }

  getAngle() {
    return Math.atan2(this.y, this.x);
  }

  setAngle(angle) {
    var magnitude = this.getMagnitude();
    this.x = Math.cos(angle) * magnitude;
    this.y = Math.sin(angle) * magnitude;
  }

  getMagnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  angleTo(v2) {
    const d = this.distanceTo(v2);
    return d.getAngle();
  }
}
