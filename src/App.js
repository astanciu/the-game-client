import * as dat from 'dat.gui';
import { Game } from './lib/Game';

export class App {
  constructor(id, width, height) {
    this.canvasId = id;
    this.width = width;
    this.height = height;
    this.gui = new dat.GUI();
    
  }

  init() {
    const canvas = document.getElementById('canvas');
    this.game = new Game(canvas);
    this.gui.add(this.game, 'drawRocks')
    
    this.gui.add(this.game.world.player, 'topSpeed', 0, 30)
    this.gui.add(this.game.world.player, 'coneAngle', 0.001, Math.PI/2)
    this.game.run();


    window.onresize = (e) => {
      this.game.resize(window.innerWidth, window.innerHeight);
    };
  }
}
