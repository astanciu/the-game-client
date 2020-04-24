import { Game } from './lib/Game';
export class App {
  constructor(id, width, height) {
    this.canvasId = id;
    this.width = width;
    this.height = height;
  }

  init() {
    const canvas = document.getElementById('canvas');
    this.game = new Game(canvas);
    this.game.run();

    window.onresize = (e) => {
      this.game.resize(window.innerWidth, window.innerHeight);
    };
  }
}
