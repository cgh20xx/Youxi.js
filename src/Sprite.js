import Group from './Group';
/**
 * Sprite
 * Author: Hank Hsiao
 * extents Particle
 */
export default class Sprite extends Group {
  constructor(game, key, x, y) {
    super(game, x, y);
    this.game = game;
    this.img = this.game.cache[key];
    this._init();
  }

  _init() {
    this.isRotate = true;
    this.alive = true;
    this.angle = 0;
    this.scale = {
      x: 1,
      y: 1
    };
    this.anchor = {
      x: 0.5,
      y: 0.5
    };
    this.width = this.img.width;
    this.height = this.img.height;
    this.aabb = false;
  }

  reset(key, x, y) {
    this.x = x;
    this.y = y;
    this.img = this.game.cache[key];
    this.vx = 0;
    this.vy = 0;
    this.isRotate = true;
    this.alive = true;
    this.angle = 0;
    this.width = this.img.width;
    this.height = this.img.height;
  }

  setRotation(bool) {
    this.isRotate = bool || true;
  }

  setAnchor(x, y) {
    if (arguments.length === 1) {
      this.anchor.x = this.anchor.y = x;
    } else {
      this.anchor.x = x;
      this.anchor.y = y;
    }
  }

  update() {
    super.update();
    this.left = this.x - this.width * this.anchor.x;
    this.top = this.y - this.height * this.anchor.y;
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;
  }

  draw() {
    this.game.ctx.save();
    this.game.ctx.translate(this.x, this.y);
    if (this.isRotate) this.game.ctx.rotate(this.angle);
    this.game.ctx.scale(this.scale.x, this.scale.y); // scale 功能尚未完善
    this.game.ctx.drawImage(
      this.img,
      -this.width * this.anchor.x,
      -this.height * this.anchor.y,
      this.width,
      this.height
    );
    // show aabb box outline
    if (this.aabb) {
      // this.game.ctx.strokeStyle = 'red';
      this.game.ctx.beginPath();
      this.game.ctx.rect(
        -this.width * this.anchor.x,
        -this.height * this.anchor.y,
        this.width,
        this.height
      );
      this.game.ctx.closePath();
      this.game.ctx.stroke();
    }
    this.game.ctx.restore();
  }

  kill() {
    this.alive = false;
  }
}
