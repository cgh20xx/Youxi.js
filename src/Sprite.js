/**
 * GameObject
 * Author: Hank Hsiao
 * extents Particle
 */
class GameObject extends Particle {
    constructor(ctx, x, y, img) {
        super(x, y) // super(x, y, speed, direction, gravity)
        this.ctx = ctx;
        this.img = img;
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
            x: .5,
            y: .5
        };
        this.width = this.img.width;
        this.height = this.img.height;
        this.aabb = false;
    }

    reset(x, y, img) {
        this.x = x;
        this.y = y;
        this.img = img;
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
            this.anchor.y = y
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
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        if (this.isRotate) this.ctx.rotate(this.angle);
        this.ctx.scale(this.scale.x, this.scale.y); // scale 功能尚未完善
        this.ctx.drawImage(
            this.img,
            -this.width * this.anchor.x,
            -this.height * this.anchor.y,
            this.width,
            this.height);
        // show aabb box outline
        if (this.aabb) {
            // this.ctx.strokeStyle = 'red';
            this.ctx.beginPath();
            this.ctx.rect(
                -this.width * this.anchor.x,
                -this.height * this.anchor.y,
                this.width,
                this.height);
            this.ctx.closePath();
            this.ctx.stroke();
        }     
        this.ctx.restore();
    }

    kill() {
        this.alive = false;
    }
}