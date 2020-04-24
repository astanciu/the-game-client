import { App } from './App';
import './styles/style.css';

let app;
async function startup() {
  app = new App('canvas', 600, 400);
  await app.init();

}

window.onload = function () {
  console.log(`window loaded. Booting app`);
  startup();
  console.log(`booted.`);
};
