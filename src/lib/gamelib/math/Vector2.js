/**
 * @author mrdoob / http://mrdoob.com/
 * @author philogb / http://blog.thejit.org/
 * @author egraether / http://egraether.com/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 */

function Vector2(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

Object.defineProperties(Vector2.prototype, {
  width: {
    get: function () {
      return this.x;
    },

    set: function (value) {
      this.x = value;
    },
  },

  height: {
    get: function () {
      return this.y;
    },

    set: function (value) {
      this.y = value;
    },
  },
});

Vector2.prototype.isVector2 = true;

Vector2.prototype.set = function (x, y) {
  this.x = x;
  this.y = y;

  return this;
};

Vector2.prototype.setScalar = function (scalar) {
  this.x = scalar;
  this.y = scalar;

  return this;
};

Vector2.prototype.setX = function (x) {
  this.x = x;

  return this;
};

Vector2.prototype.setY = function (y) {
  this.y = y;

  return this;
};

Vector2.prototype.setComponent = function (index, value) {
  switch (index) {
    case 0:
      this.x = value;
      break;
    case 1:
      this.y = value;
      break;
    default:
      throw new Error('index is out of range: ' + index);
  }

  return this;
};

Vector2.prototype.getComponent = function (index) {
  switch (index) {
    case 0:
      return this.x;
    case 1:
      return this.y;
    default:
      throw new Error('index is out of range: ' + index);
  }
};

Vector2.prototype.clone = function () {
  return new this.constructor(this.x, this.y);
};

Vector2.prototype.copy = function (v) {
  this.x = v.x;
  this.y = v.y;

  return this;
};

Vector2.prototype.add = function (v, w) {
  if (w !== undefined) {
    console.warn(
      'THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.'
    );
    return this.addVectors(v, w);
  }

  this.x += v.x;
  this.y += v.y;

  return this;
};

Vector2.prototype.addScalar = function (s) {
  this.x += s;
  this.y += s;

  return this;
};

Vector2.prototype.addVectors = function (a, b) {
  this.x = a.x + b.x;
  this.y = a.y + b.y;

  return this;
};

Vector2.prototype.addScaledVector = function (v, s) {
  this.x += v.x * s;
  this.y += v.y * s;

  return this;
};

Vector2.prototype.sub = function (v, w) {
  if (w !== undefined) {
    console.warn(
      'THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.'
    );
    return this.subVectors(v, w);
  }

  this.x -= v.x;
  this.y -= v.y;

  return this;
};

Vector2.prototype.subScalar = function (s) {
  this.x -= s;
  this.y -= s;

  return this;
};

Vector2.prototype.subVectors = function (a, b) {
  this.x = a.x - b.x;
  this.y = a.y - b.y;

  return this;
};

Vector2.prototype.multiply = function (v) {
  this.x *= v.x;
  this.y *= v.y;

  return this;
};

Vector2.prototype.multiplyScalar = function (scalar) {
  this.x *= scalar;
  this.y *= scalar;

  return this;
};

Vector2.prototype.divide = function (v) {
  this.x /= v.x;
  this.y /= v.y;

  return this;
};

Vector2.prototype.divideScalar = function (scalar) {
  return this.multiplyScalar(1 / scalar);
};

Vector2.prototype.applyMatrix3 = function (m) {
  var x = this.x,
    y = this.y;
  var e = m.elements;

  this.x = e[0] * x + e[3] * y + e[6];
  this.y = e[1] * x + e[4] * y + e[7];

  return this;
};

Vector2.prototype.min = function (v) {
  this.x = Math.min(this.x, v.x);
  this.y = Math.min(this.y, v.y);

  return this;
};

Vector2.prototype.max = function (v) {
  this.x = Math.max(this.x, v.x);
  this.y = Math.max(this.y, v.y);

  return this;
};

Vector2.prototype.clamp = function (min, max) {
  // assumes min < max, componentwise

  this.x = Math.max(min.x, Math.min(max.x, this.x));
  this.y = Math.max(min.y, Math.min(max.y, this.y));

  return this;
};

Vector2.prototype.clampScalar = function (minVal, maxVal) {
  this.x = Math.max(minVal, Math.min(maxVal, this.x));
  this.y = Math.max(minVal, Math.min(maxVal, this.y));

  return this;
};

Vector2.prototype.clampLength = function (min, max) {
  var length = this.length();

  return this.divideScalar(length || 1).multiplyScalar(
    Math.max(min, Math.min(max, length))
  );
};

Vector2.prototype.floor = function () {
  this.x = Math.floor(this.x);
  this.y = Math.floor(this.y);

  return this;
};

Vector2.prototype.ceil = function () {
  this.x = Math.ceil(this.x);
  this.y = Math.ceil(this.y);

  return this;
};

Vector2.prototype.round = function () {
  this.x = Math.round(this.x);
  this.y = Math.round(this.y);

  return this;
};

Vector2.prototype.roundToZero = function () {
  this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
  this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);

  return this;
};

Vector2.prototype.negate = function () {
  this.x = -this.x;
  this.y = -this.y;

  return this;
};

Vector2.prototype.dot = function (v) {
  return this.x * v.x + this.y * v.y;
};

Vector2.prototype.cross = function (v) {
  return this.x * v.y - this.y * v.x;
};

Vector2.prototype.lengthSq = function () {
  return this.x * this.x + this.y * this.y;
};

Vector2.prototype.length = function () {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector2.prototype.manhattanLength = function () {
  return Math.abs(this.x) + Math.abs(this.y);
};

Vector2.prototype.normalize = function () {
  return this.divideScalar(this.length() || 1);
};

Vector2.prototype.angle = function () {
  // computes the angle in radians with respect to the positive x-axis

  var angle = Math.atan2(this.y, this.x);

  if (angle < 0) angle += 2 * Math.PI;

  return angle;
};

Vector2.prototype.angleFrom = function (vec) {
  return this.angle() - vec.angle();
};

Vector2.prototype.angleTo = function (v2) {
  return v2.clone().sub(this).angle();
};

Vector2.prototype.distanceTo = function (v) {
  return Math.sqrt(this.distanceToSquared(v));
};

Vector2.prototype.distanceToSquared = function (v) {
  var dx = this.x - v.x,
    dy = this.y - v.y;
  return dx * dx + dy * dy;
};

Vector2.prototype.manhattanDistanceTo = function (v) {
  return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
};

Vector2.prototype.setLength = function (length) {
  return this.normalize().multiplyScalar(length);
};

Vector2.prototype.lerp = function (v, alpha) {
  this.x += (v.x - this.x) * alpha;
  this.y += (v.y - this.y) * alpha;

  return this;
};

Vector2.prototype.lerpVectors = function (v1, v2, alpha) {
  return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
};

Vector2.prototype.equals = function (v) {
  return v.x === this.x && v.y === this.y;
};

Vector2.prototype.fromArray = function (array, offset) {
  if (offset === undefined) offset = 0;

  this.x = array[offset];
  this.y = array[offset + 1];

  return this;
};

Vector2.prototype.toArray = function (array, offset) {
  if (array === undefined) array = [];
  if (offset === undefined) offset = 0;

  array[offset] = this.x;
  array[offset + 1] = this.y;

  return array;
};

Vector2.prototype.fromBufferAttribute = function (attribute, index, offset) {
  if (offset !== undefined) {
    console.warn(
      'THREE.Vector2: offset has been removed from .fromBufferAttribute().'
    );
  }

  this.x = attribute.getX(index);
  this.y = attribute.getY(index);

  return this;
};

Vector2.prototype.rotateAround = function (center, angle) {
  var c = Math.cos(angle),
    s = Math.sin(angle);

  var x = this.x - center.x;
  var y = this.y - center.y;

  this.x = x * c - y * s + center.x;
  this.y = x * s + y * c + center.y;

  return this;
};

Vector2.prototype.cutoff = function (val) {
  this.x = Math.abs(this.x) < val ? 0 : this.x;
  this.y = Math.abs(this.y) < val ? 0 : this.y;
};

/**
 * Calculate slope from this vector to another vector i.e. delta Y / delta X.
 * Does not check for division by zero.
 * @param {Vec2} vec The other vector.
 * @return {number} The slope.
 */
Vector2.prototype.slope = function (vec) {
  return (vec.y - this.y) / (vec.x - this.x);
};

/**
 * Projects this vector to the nearest point on the line defined by two points.
 * @param {Vec2} lineA One point on the line to project to.
 * @param {Vec2} lineB Another point on the line to project to.
 */
Vector2.prototype.projectToLine = function (lineA, lineB) {
  if (lineA.x === lineB.x) {
    this.x = lineA.x;
    return;
  } else if (lineA.y === lineB.y) {
    this.y = lineA.y;
    return;
  }

  // The line's equation: y = lineSlope * x + lineYAtZero
  var lineSlope = lineA.slope(lineB);
  var lineYAtZero = lineA.y - lineSlope * lineA.x;

  var perpVector = new Vector2(1.0, -1.0 / lineSlope);
  perpVector.normalize();
  // perpVector's dot product with a vector that goes from line to this Vec2
  var perpProjLength =
    perpVector.y * (this.y - (lineSlope * this.x + lineYAtZero));
  this.x -= perpVector.x * perpProjLength;
  this.y -= perpVector.y * perpProjLength;
};

/**
 * Projects this vector to the nearest point on the line segment defined by two points.
 * @param {Vec2} lineA One end point of the line segment to project to.
 * @param {Vec2} lineB Another end point of the line segment to project to.
 */
Vector2.prototype.projectToLineSegment = function (lineA, lineB) {
  var ax = this.x - lineA.x;
  var ay = this.y - lineA.y;
  var projectionTarget = new Vector2(lineB.x - lineA.x, lineB.y - lineA.y);
  projectionTarget.normalize();
  var projectionLength = ax * projectionTarget.x + ay * projectionTarget.y;
  if (projectionLength < 0) {
    this.copy(lineA);
  } else {
    var maxLength = lineB.distanceTo(lineA);
    if (projectionLength > maxLength) {
      this.copy(lineB);
    } else {
      this.x = lineA.x + projectionTarget.x * projectionLength;
      this.y = lineA.y + projectionTarget.y * projectionLength;
    }
  }
};

/**
 * Projects this vector to the nearest point on the given circle.
 * @param {number} x The x coordinate of the center of the circle.
 * @param {number} y The y coordinate of the center of the circle.
 * @param {number} radius The radius of the circle.
 */
Vector2.prototype.projectToCircle = function (x, y, radius) {
  var angle = Math.atan2(this.y - y, this.x - x);
  this.x = x + Math.cos(angle) * radius;
  this.y = y + Math.sin(angle) * radius;
};

/**
 * Calculate this vector's distance to the line defined by two points.
 * @param {Vec2} lineA One point on the line.
 * @param {Vec2} lineB Another point on the line.
 * @return {number} This vector's distance to the nearest point on the line.
 */
Vector2.prototype.distanceToLine = function (lineA, lineB) {
  var projection = new Vector2(this.x, this.y);
  projection.projectToLine(lineA, lineB);
  return this.distanceTo(projection);
};

/**
 * Rotate this vector with a given angle.
 * @param {number} angle Angle to rotate with.
 */
Vector2.prototype.rotate = function (angle) {
  this.rotateAround({ x: 0, y: 0 }, angle);
};

Vector2.prototype.debug = function (ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();
};

Vector2.prototype.setPositionAlongLine = function (v1, v2, percentage) {
  this.x = v1.x * (1.0 - percentage) + v2.x * percentage;
  this.y = v1.y * (1.0 - percentage) + v2.y * percentage;
};

window.Vector2 = Vector2
export { Vector2 };

