/**
 * Ball
 * Author: Hank Hsiao
 * extents Particle
 */

class Ball extends Particle {
    constructor(ctx, x, y, radius = 0, color = 'red') {
        super(x, y, 0, 0)
        this.ctx = ctx;
        this.radius = radius;
        this.alive = true;
        this.color = color;
        this.opacity = 1;
    }

    reset(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.opacity = 1;
        this.alive = true;
    }

    draw() {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(this.x, this.y);
        this.ctx.fillStyle = this.color;
        this.ctx.globalAlpha = this.opacity;
        this.ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
    }

    kill() {
        this.alive = false;
    }
}