export class GameView {
  constructor(game) {
    this.game = game;
    this.ctx = game.ctx;
    this.width = this.ctx.canvas.width / game.ratio;
    this.height = this.ctx.canvas.height / game.ratio;

    this.styles = {
      backgroundColor: '#eebb2c',
    };
  }

  draw() {
    this.drawBackground();
  }

  drawBackground() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = this.styles.backgroundColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  setCanvasSize(width, height) {}
}
