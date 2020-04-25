export class Rectangle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

export class Block extends Rectangle {
  constructor(x, y, width, height) {
    super(x, y, width, height);
  }
}

export class Room extends Rectangle {
  constructor(x, y, width, height) {
    super(x, y, width, height);
  }
}

export class EndPoint {
  constructor(x, y, beginsSegment, segment, angle) {
    this.x = x;
    this.y = y;
    this.beginsSegment = beginsSegment;
    this.segment = segment;
    this.angle = angle;
  }
}

export class Segment {
  constructor(x1, y1, x2, y2) {
    this.p1 = new EndPoint(x1, y1);
    this.p2 = new EndPoint(x2, y2);
    this.segment = { p1: this.p1, p2: this.p2, d: 0 };
    this.p1.segment = this.segment;
    this.p2.segment = this.segment;
  }
}
