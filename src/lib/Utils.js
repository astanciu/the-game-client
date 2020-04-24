export class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  distanceTo(point) {
    return new Point(point.x - this.x, point.y - this.y);
  }
}
