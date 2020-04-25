export class GameView {
  constructor(game) {
    this.game = game;
    this.world = game.world;
    this.ctx = game.ctx;
    this.width = this.ctx.canvas.width / game.ratio;
    this.height = this.ctx.canvas.height / game.ratio;

    this.styles = {
      backgroundColor:  '#222 ', //'#d4d4d4',
      light: 'yellow',
    };
  }

  draw() {
    this.drawBackground();

    // Method 2
    this.drawSegments();
  }

  drawSegments() {
    // Draw the boxes
    // this.ctx.strokeStyle =  '#999';
    // for (var i = 0; i < this.world.segments.length; i++) {
    //   var seg = this.world.segments[i];
    //   this.ctx.beginPath();
    //   this.ctx.moveTo(seg.a.x, seg.a.y);
    //   this.ctx.lineTo(seg.b.x, seg.b.y);
    //   this.ctx.stroke();
    // }

    
    // Draw light shadows
    // for (var i = 1; i < this.world.visibility.length; i++) {
    //   this.drawPolygon(this.world.visibility[i], 'rgba(255,255,255,0.2)');
    // }

    //  Draw the light
    this.drawPolygon(this.world.visibility[0], '#aaa');
  }

  drawPolygon(polygon, fillStyle) {
    //this.ctx.fillStyle = fillStyle;
    this.ctx.beginPath();
    this.ctx.moveTo(polygon[0].x, polygon[0].y);
    for (var i = 1; i < polygon.length; i++) {
      var intersect = polygon[i];
      this.ctx.lineTo(intersect.x, intersect.y);
    }
    this.ctx.closePath();
    this.ctx.fillStyle = fillStyle; //this.styles.light;
    this.ctx.fill();
  }

  drawBackground() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = this.styles.backgroundColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  setCanvasSize(width, height) {}
}
