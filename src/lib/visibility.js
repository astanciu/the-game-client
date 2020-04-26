// Code here was inspired by https://www.redblobgames.com/articles/visibility/
// and parts were originally written by https://ncase.me/sight-and-light/

function getIntersection(ray, segment) {
  var r_px = ray.a.x;
  var r_py = ray.a.y;
  var r_dx = ray.b.x - ray.a.x;
  var r_dy = ray.b.y - ray.a.y;

  var s_px = segment.a.x;
  var s_py = segment.a.y;
  var s_dx = segment.b.x - segment.a.x;
  var s_dy = segment.b.y - segment.a.y;

  // Are they parallel? If so, no intersect
  var r_mag = Math.sqrt(r_dx * r_dx + r_dy * r_dy);
  var s_mag = Math.sqrt(s_dx * s_dx + s_dy * s_dy);
  if (r_dx / r_mag == s_dx / s_mag && r_dy / r_mag == s_dy / s_mag) {
    // Unit vectors are the same.
    return null;
  }

  // SOLVE FOR T1 & T2
  var T2 =
    (r_dx * (s_py - r_py) + r_dy * (r_px - s_px)) / (s_dx * r_dy - s_dy * r_dx);
  var T1 = (s_px + s_dx * T2 - r_px) / r_dx;

  // Must be within parametic whatevers for RAY/SEGMENT
  if (T1 < 0) return null;
  if (T2 < 0 || T2 > 1) return null;

  // Return the POINT OF INTERSECTION
  return {
    x: r_px + r_dx * T1,
    y: r_py + r_dy * T1,
    param: T1,
  };
}

function getClosesIntersection(angle, { x, y }, segs) {
  // Calculate dx & dy from angle
  var dx = Math.cos(angle);
  var dy = Math.sin(angle);

  // Ray from center of screen to mouse
  var ray = {
    a: { x, y },
    b: { x: x + dx, y: y + dy },
  };

  // Find CLOSEST intersection
  var closestIntersect = null;
  for (var i = 0; i < segs.length; i++) {
    var intersect = getIntersection(ray, segs[i]);
    if (!intersect) continue;
    if (!closestIntersect || intersect.param < closestIntersect.param) {
      closestIntersect = intersect;
    }
  }

  return closestIntersect;
}

function getSightPolygon(playerX, playerY, segs, playerAngle) {
  let a1 = playerAngle - 0.5;
  let a2 = playerAngle + 0.5;

  const p1 = new Vector(playerX * Math.cos(a1), playerY * Math.sin(a1));
  const p2 = new Vector(playerX * Math.cos(a2), playerY * Math.sin(a2));
  // Get all unique points
  var points = (function (segments) {
    var a = [];
    segments.forEach(function (seg) {
      a.push(seg.a, seg.b);
    });
    return a;
  })(segs);

  points.push(p1, p2);

  var uniquePoints = (function (points) {
    var set = {};
    return points.filter(function (p) {
      var key = p.x + ',' + p.y;
      if (key in set) {
        return false;
      } else {
        set[key] = true;
        return true;
      }
    });
  })(points);

  // Get all angles
  var uniqueAngles = [];
  for (var j = 0; j < uniquePoints.length; j++) {
    var uniquePoint = uniquePoints[j];
    var angle = Math.atan2(uniquePoint.y - playerY, uniquePoint.x - playerX);
    if (angle < 0) {
      angle += 2 * Math.PI;
    }

    uniquePoint.angle = angle;
    uniqueAngles.push(angle - 0.00001, angle, angle + 0.00001);
  }

  var intersects = [];
  for (var j = 0; j < uniqueAngles.length; j++) {
    const angle = uniqueAngles[j];
    const closestIntersect = getClosesIntersection(
      angle,
      { x: playerX, y: playerY },
      segs
    );

    // Intersect angle
    if (!closestIntersect) continue;
    closestIntersect.angle = angle;

    // Add to list of intersects
    intersects.push(closestIntersect);
  }

  intersects = intersects.filter((p) => {
    if (a2 > a1) {
      return p.angle >= a1 && p.angle <= a2;
    } else {
      return p.angle >= a1 || p.angle <= a2;
    }
  });

  // Sort intersects by angle
  intersects = intersects.sort(function (a, b) {
    return a.angle - b.angle;
  });

  // if (a2 < a1) {
  //   const h1 = intersects.filter((p) => p.angle <= a1);
  //   const h2 = intersects.filter((p) => p.angle > a1);
  //   intersects = [...h2, ...h1];
  // }

  const left = getClosesIntersection(a1, { x: playerX, y: playerY }, segs);
  const right = getClosesIntersection(a2, { x: playerX, y: playerY }, segs);
  const center = { x: playerX, y: playerY };
  intersects = [center, left, ...intersects, right];

  return intersects;
}

export const getVisibility = (world) => {
  const { loc } = world.player;
  const segments = world.segments;
  var fuzzyRadius = 10;

  var angle = world.player.angle;
  var polygons = [
    // getSightPolygon(loc.x + dx, loc.y + dy, segments),
    getSightPolygon(loc.x, loc.y, segments, angle),
  ];

  return polygons;
};
