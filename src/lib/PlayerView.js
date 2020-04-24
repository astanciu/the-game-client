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
    this.ctx.save();
    // this.ctx.translatse(player.x, player.y);
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = this.style.highlight;
    
    this.ctx.beginPath();
    this.ctx.moveTo(player.x, player.y);
    this.ctx.lineTo(mouse.x, mouse.y);
    // this.ctx.closePath()
    this.ctx.stroke();
    this.ctx.restore()
  }

  drawReticle(player, mouse){
    if (!mouse) return;
    this.drawRay(player, mouse);
    
    const radius = 2;
    this.ctx.save();
    this.ctx.translate(mouse.x, mouse.y);
    this.ctx.beginPath()
    // this.ctx.translate(200,100)
    this.ctx.fillStyle = this.style.color;
    this.ctx.arc(0, 0, radius, 0, 2 * Math.PI, false);
    this.ctx.fill();
    this.ctx.restore()
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
