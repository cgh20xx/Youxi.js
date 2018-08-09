/**
 * Ball
 * Author: Hank Hsiao
 * extents Particle
 */

class Ball extends Particle {
    constructor(ctx, x, y, radius = 0, color = 'red') {
        super(x, y)
        this.ctx = ctx;
        this.radius = radius;
        this.alive = true;
        this.life = 100;
        this.color = color;
    }

    reset(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.alive = true;
        this.life = 100;
    }

    draw() {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(this.x, this.y);
        this.ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
    }

    kill() {
        this.alive = false;
    }
}