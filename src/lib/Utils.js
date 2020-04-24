export class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }

  distanceTo(v2) {
    return new Vector(v2.x - this.x, v2.y - this.y);
  }

  add(v2) {
    this.x += v2.x;
    this.y += v2.y;
    return this;
  }

  sub(v2) {
    this.x -= v2.x;
    this.y -= v2.y;
  }

  mult(val) {
    this.x *= val;
    this.y *= val;
    return this;
  }

  div(val) {
    this.x /= val;
    this.y /= val;
    return this;
  }

  getAngle() {
    return Math.atan2(this.y, this.x);
  }

  setAngle(angle) {
    var magnitude = this.mag();
    this.x = Math.cos(angle) * magnitude;
    this.y = Math.sin(angle) * magnitude;

    return this;
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  angleTo(v2) {
    const d = this.distanceTo(v2);
    return d.getAngle();
  }

  magnitudeSq() {
    return this.x * this.x + this.y * this.y;
  }

  norm() {
    const len = this.mag();
    if (len !== 0) this.mult(1 / len);
    return this;
  }

  limit(max) {
    const mSq = this.magnitudeSq();
    if (mSq > max * max) {
      this.div(Math.sqrt(mSq)).mult(max);
    }
    return this;
  }

  cutoff(val) {
    this.x = Math.abs(this.x) < val ? 0 : this.x;
    this.y = Math.abs(this.y) < val ? 0 : this.y;
  }
  copy() {
    return new Vector(this.x, this.y);
  }
}
