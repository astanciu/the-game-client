
export class PlayerView {
  constructor(player) {
    this.player = player;
    this.ctx = player.ctx;
    this.style = {
      color: 'red',
    };
  }


  draw() {
    let radius = 50;
    this.ctx.save();
    // console.log(this.player.loc);
    this.ctx.translate(this.player.loc.x, this.player.loc.y); // Translate to the ship center

    this.ctx.rotate(this.player.angle); // Rotate to ship orientation
    this.ctx.fillStyle = this.style.color;
    this.ctx.arc(0, 0, radius, 0, 2 * Math.PI, false);
    this.ctx.fill();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#003300';
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(90, 0);
    this.ctx.closePath();
    this.ctx.stroke();

    // this.ctx.rotate(this.angle); // Rotate to ship orientation
    // this.ctx.beginPath();
    // this.ctx.moveTo(-radius * 0.6, -radius);
    // this.ctx.lineTo(0, radius);
    // this.ctx.lineTo(radius * 0.6, -radius);
    // this.ctx.moveTo(-radius * 0.5, -radius * 0.5);
    // this.ctx.lineTo(radius * 0.5, -radius * 0.5);
    // this.ctx.closePath();
    // this.ctx.stroke();
    this.ctx.restore();
  }
}
