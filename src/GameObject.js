/**
 * 這是一個給所有要顯示於畫面上的物件的基礎遊戲物件
 * 這是抽像類別不應被直接使用而需被繼承
 * 
 * GameObject
 * Author: Hank Hsiao
 * extents Particle
 * 
 */
class GameObject extends Particle {
    constructor(ctx, x, y) {
        super(x, y) // super(x, y, speed, direction, gravity)
        this.ctx = ctx;
        this.angle = 0;
        this.scale = {
            x: 1,
            y: 1
        };
    }
    
    reset(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.angle = 0;
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
        this.ctx.rotate(this.angle);
        this.ctx.scale(this.scale.x, this.scale.y); // scale 功能尚未完善   
        this.ctx.restore();
    }
}