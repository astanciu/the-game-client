export class PlayerView {
  constructor(player) {
    this.player = player;
    this.ctx = player.ctx;
    this.style = {
      color: '#616a74',
      highlight: '#d16a74',
    };
  }

  drawRay(player, mouse) {
    const maxDist = 100;
    this.ctx.save();
    // this.ctx.translatse(player.x, player.y);
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = this.style.highlight;

    this.ctx.beginPath();
    this.ctx.moveTo(player.x, player.y);

    // const mid = player.copy().add(player.distanceTo(mouse).div(2))
    // this.ctx.lineTo(mouse.x, mouse.y);

    const target = player.distanceTo(mouse);
    if (target.mag() >= maxDist) {
      target.limit(maxDist);
    }

    target.add(player);
    this.ctx.lineTo(target.x, target.y);
    this.ctx.stroke();
    this.ctx.restore();
  }

  drawReticle(player, mouse) {
    const radius = 20;
    if (!mouse) return;
    this.drawRay(player, mouse);

    this.ctx.save();

    this.ctx.translate(mouse.x, mouse.y);

    this.ctx.beginPath();

    // this.ctx.arc(0, 0, 2, 0, 2 * Math.PI, false);
    // this.ctx.fillStyle = this.style.color;
    // this.ctx.fill();

    // this.ctx.fillStyle = this.style.color;

    this.ctx.moveTo(-10,0)
    this.ctx.lineTo(-3,0)
    
    this.ctx.moveTo(3,0)
    this.ctx.lineTo(10,0)

    this.ctx.moveTo(0,-10)
    this.ctx.lineTo(0,-3)
    this.ctx.moveTo(0,3)
    this.ctx.lineTo(0,10)
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = this.style.color;
    this.ctx.stroke()
    this.ctx.closePath()

    this.ctx.restore();
  }

  draw(game) {
    let radius = 10;
    this.ctx.save();
    this.ctx.translate(this.player.loc.x, this.player.loc.y);
    this.ctx.rotate(this.player.angle);

    // Circle
    this.ctx.fillStyle = this.style.color;
    this.ctx.arc(0, 0, radius, 0, 2 * Math.PI, false);
    this.ctx.fill();

    // // Line
    // this.ctx.lineWidth = 10;
    // this.ctx.strokeStyle = this.style.highlight;
    // this.ctx.beginPath();
    // this.ctx.moveTo(0, 0);
    // this.ctx.lineTo(30, 0);
    // this.ctx.stroke();

    this.ctx.restore();
    this.drawReticle(this.player.loc, game.mouse);
  }
}
