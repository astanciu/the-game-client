parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"YXpK":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.GameView=void 0;class t{constructor(t){this.game=t,this.ctx=t.ctx,this.width=this.ctx.canvas.width/t.ratio,this.height=this.ctx.canvas.height/t.ratio,this.styles={backgroundColor:"#d4d4d4"}}draw(){this.drawBackground()}drawBackground(){this.ctx.clearRect(0,0,this.width,this.height),this.ctx.fillStyle=this.styles.backgroundColor,this.ctx.fillRect(0,0,this.width,this.height)}setCanvasSize(t,i){}}exports.GameView=t;
},{}],"rGRi":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.PlayerView=void 0;class t{constructor(t){this.player=t,this.ctx=t.ctx,this.style={color:"#616a74",highlight:"#d16a74"}}drawRay(t,s){this.ctx.save(),this.ctx.lineWidth=1,this.ctx.strokeStyle=this.style.highlight,this.ctx.beginPath(),this.ctx.moveTo(t.x,t.y);const i=t.distanceTo(s);i.mag()>=100&&i.limit(100),i.add(t),this.ctx.lineTo(i.x,i.y),this.ctx.stroke(),this.ctx.restore()}drawReticle(t,s){s&&(this.drawRay(t,s),this.ctx.save(),this.ctx.translate(s.x,s.y),this.ctx.beginPath(),this.ctx.moveTo(-10,0),this.ctx.lineTo(-3,0),this.ctx.moveTo(3,0),this.ctx.lineTo(10,0),this.ctx.moveTo(0,-10),this.ctx.lineTo(0,-3),this.ctx.moveTo(0,3),this.ctx.lineTo(0,10),this.ctx.lineWidth=1,this.ctx.strokeStyle=this.style.color,this.ctx.stroke(),this.ctx.closePath(),this.ctx.restore())}draw(t){this.ctx.save(),this.ctx.translate(this.player.loc.x,this.player.loc.y),this.ctx.rotate(this.player.angle),this.ctx.fillStyle=this.style.color,this.ctx.arc(0,0,10,0,2*Math.PI,!1),this.ctx.fill(),this.ctx.restore(),this.drawReticle(this.player.loc,t.mouse)}}exports.PlayerView=t;
},{}],"SLes":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Vector=void 0;class t{constructor(t=0,s=0){this.x=t,this.y=s}set(t,s){this.x=t,this.y=s}distanceTo(s){return new t(s.x-this.x,s.y-this.y)}add(t){return this.x+=t.x,this.y+=t.y,this}sub(t){this.x-=t.x,this.y-=t.y}mult(t){return this.x*=t,this.y*=t,this}div(t){return this.x/=t,this.y/=t,this}getAngle(){return Math.atan2(this.y,this.x)}setAngle(t){var s=this.mag();return this.x=Math.cos(t)*s,this.y=Math.sin(t)*s,this}mag(){return Math.sqrt(this.x*this.x+this.y*this.y)}angleTo(t){return this.distanceTo(t).getAngle()}magnitudeSq(){return this.x*this.x+this.y*this.y}norm(){const t=this.mag();return 0!==t&&this.mult(1/t),this}limit(t){const s=this.magnitudeSq();return s>t*t&&this.div(Math.sqrt(s)).mult(t),this}cutoff(t){this.x=Math.abs(this.x)<t?0:this.x,this.y=Math.abs(this.y)<t?0:this.y}copy(){return new t(this.x,this.y)}}exports.Vector=t;
},{}],"TIAU":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Player=void 0;var t=require("./PlayerView"),i=require("./Utils");class e{constructor(e){this.game=e,this.ctx=e.ctx,this.loc=new i.Vector(300,150),this.velocity=new i.Vector(0,0),this.acc=new i.Vector(.5,.5),this.topSpeed=10,this.angle=0,this.view=new t.PlayerView(this),this.moving={up:!1,down:!1,left:!1,right:!1},this.setup()}setup(){window.addEventListener("keydown",this.keydown.bind(this),!1),window.addEventListener("keyup",this.keyup.bind(this),!1)}setdown(){this.ctx.canvas.removeEventListener("keydown",this.keydown.bind(this)),this.ctx.canvas.removeEventListener("keyup",this.keyup.bind(this))}keydown(t){const{key:i}=t;"w"===i&&(this.moving.up=!0),"a"===i&&(this.moving.left=!0),"s"===i&&(this.moving.down=!0),"d"===i&&(this.moving.right=!0)}keyup(t){const{key:i}=t;"w"===i&&(this.moving.up=!1),"a"===i&&(this.moving.left=!1),"s"===i&&(this.moving.down=!1),"d"===i&&(this.moving.right=!1)}update(){if(!this.mouse)return;this.angle=this.loc.angleTo(this.mouse);const t=new i.Vector(0,0),e=new i.Vector(0,0);this.moving.up&&(t.y=-1),this.moving.down&&(t.y=1),this.moving.left&&(t.x=-1),this.moving.right&&(t.x=1),0===t.x&&0===t.y&&(this.velocity.x>=.5&&(e.x=-1),this.velocity.x<=-.5&&(e.x=1),this.velocity.y>=.5&&(e.y=-1),this.velocity.y<=-.5&&(e.y=1),this.velocity.add(e)),this.velocity.cutoff(.5),this.velocity.add(t),this.velocity.limit(this.topSpeed),this.loc.add(this.velocity)}checkBounds(){this.loc.x<=0&&(this.loc.x=0),this.loc.x>=this.game.width&&(this.loc.x=this.game.width),this.loc.y<=0&&(this.loc.y=0),this.loc.y>=this.game.height&&(this.loc.y=this.game.height)}mouseMoved(t){this.mouse=t,this.angle=this.loc.angleTo(t)}tick(){this.update(),this.checkBounds()}draw(){this.view.draw(this.game)}}exports.Player=e;
},{"./PlayerView":"rGRi","./Utils":"SLes"}],"wM9Q":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Game=void 0;var t=require("./GameView"),i=require("./Player"),e=require("./Utils");class s{constructor(s){this.canvas=s,this.width=window.innerWidth,this.height=window.innerHeight,this.ctx=this.getCtx(),this.view=new t.GameView(this),this.player=new i.Player(this),this.mouse=new e.Vector(0,0)}run(){this.listen(),this.drawLoop()}listen(){this.ctx.canvas.addEventListener("mousemove",this.mouseMove.bind(this))}mouseMove(t){this.mouse.set(t.clientX,t.clientY),this.player.mouseMoved(this.mouse)}drawLoop(){this.view.draw(),this.player.tick(),this.player.draw(),requestAnimationFrame(()=>{this.drawLoop()})}drawBackground(){this.ctx.clearRect(0,0,this.width,this.height),this.ctx.fillStyle=this.styles.backgroundColor,this.ctx.fillRect(0,0,this.width,this.height)}resize(t,i){this.setSize(t,i),this.view.width=t,this.view.height=i}setSize(t,i){this.width=t,this.height=i,this.canvas.width=t,this.canvas.height=i;let e=this.ctx.webkitBackingStorePixelRatio||this.ctx.mozBackingStorePixelRatio||this.ctx.msBackingStorePixelRatio||this.ctx.oBackingStorePixelRatio||this.ctx.backingStorePixelRatio||1,s=window.devicePixelRatio||1;if(this.ratio=s/e,s!==e){let t=this.canvas.width,i=this.canvas.height;this.canvas.width=t*this.ratio,this.canvas.height=i*this.ratio,this.canvas.style.width=t+"px",this.canvas.style.height=i+"px",this.ctx.scale(this.ratio,this.ratio)}}getCtx(){return this.ctx=this.canvas.getContext("2d"),this.ctx.imageSmoothingEnabled=!0,this.setSize(this.width,this.height),this.ctx}}exports.Game=s;
},{"./GameView":"YXpK","./Player":"TIAU","./Utils":"SLes"}],"FLHj":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.App=void 0;var e=require("./lib/Game");class i{constructor(e,i,t){this.canvasId=e,this.width=i,this.height=t}init(){const i=document.getElementById("canvas");this.game=new e.Game(i),this.game.run(),window.onresize=(e=>{this.game.resize(window.innerWidth,window.innerHeight)})}}exports.App=i;
},{"./lib/Game":"wM9Q"}],"BOdC":[function(require,module,exports) {

},{}],"H99C":[function(require,module,exports) {
"use strict";var o=require("./App");let n;async function e(){n=new o.App("canvas",600,400),await n.init()}require("./styles/style.css"),window.onload=function(){console.log("window loaded. Booting app"),e(),console.log("booted.")};
},{"./App":"FLHj","./styles/style.css":"BOdC"}]},{},["H99C"], null)
//# sourceMappingURL=/src.49214758.js.map