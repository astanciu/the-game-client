export class GameView {
  constructor(game) {
    this.game = game;
    this.world = game.world;
    this.ctx = game.ctx;
    this.width = this.ctx.canvas.width / game.ratio;
    this.height = this.ctx.canvas.height / game.ratio;

    this.styles = {
      backgroundColor: '#32373d ',
      light: '#d4d4d4',
      fuzz: 'rgba(255,255,255,0.2)',
    };
  }

  draw() {
    this.drawBackground();
    this.drawLight(false);
    this.drawLightFuzz(false);
    this.game.drawRocks && this.drawRocks();
    // this.drawLightPoints();
  }

  drawRocks() {
    this.world.shapes.forEach((rock) => {
      // rock.hitbox.render(this.ctx)
      this.drawPolygon(rock);
    });
  }

  drawPolygon(rock) {
    rock.shape.renderStroke(this.ctx, '#ffffff33');
  }

  drawLight(stroke = false) {
    const polygon = this.world.visibility[0];

    this.ctx.beginPath();
    this.ctx.moveTo(polygon[0].x, polygon[0].y);
    for (var i = 1; i < polygon.length; i++) {
      var intersect = polygon[i];
      this.ctx.lineTo(intersect.x, intersect.y);
    }
    this.ctx.closePath();
    if (stroke) {
      this.ctx.strokeStyle = this.styles.light;
      this.ctx.stroke();
    } else {
      this.ctx.fillStyle = this.styles.light;
      this.ctx.fill();
    }
    this.ctx.closePath();
  }

  drawLightFuzz(stroke = false) {
    // console.log(this.world.visibility.length);
    for (var i = 1; i < this.world.visibility.length; i++) {
      this.drawPoly(this.world.visibility[i]);
    }
  }

  drawPoly(polygon) {
    this.ctx.fillStyle = this.styles.fuzz;
    this.ctx.beginPath();
    this.ctx.moveTo(polygon[0].x, polygon[0].y);
    for (var i = 1; i < polygon.length; i++) {
      var intersect = polygon[i];
      this.ctx.lineTo(intersect.x, intersect.y);
    }
    this.ctx.fill();
  }

  drawLightPoints() {
    const r = 2;
    const polygon = this.world.visibility[0];
    this.ctx.beginPath();
    for (var i = 0; i < polygon.length; i++) {
      const point = polygon[i];
      this.ctx.moveTo(point.x + r, point.y);
      this.ctx.arc(point.x, point.y, r, 0, 2 * Math.PI, false);
    }
    this.ctx.strokeStyle = 'red';
    this.ctx.stroke();
  }

  drawBackground() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = this.styles.backgroundColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  setCanvasSize(width, height) {}
}
