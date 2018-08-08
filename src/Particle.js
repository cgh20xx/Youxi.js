/**
 * Particle
 * Author: Hank Hsiao
 */
class Particle {
    constructor(x = 0, y = 0, speed = 0, direction = 0, gravity = 0) {
        this.x = x  // x 座標
        this.y = y  // y 座標
        this.vx = Math.cos(direction) * speed, // x 方向的速度
        this.vy = Math.sin(direction) * speed, // y 方向的速度
        this.mass =  1, // 質量 (跟 gravitation 有關，不是 gravity)
        this.radius =  0, // 半徑
        this.bounce =  -1, // 回彈
        this.friction =  1, // 摩擦力
        this.gravity = gravity, // 地心引力 (y 方向的加速度)
        this.springs =  [], //儲存所有 spring (spring 是 paritcle 跟 particle 的彈簧)
        this.gravitations =  [] //儲存所有 gravitation (gravitation 是 paritcle 跟 particle 的引力，跟 gravity 不同)
    }

    addGravitation(point) {
        this.removeGravitation(point); // remove 是因為要判斷刪除重覆的關連 (a -> b, b -> a)
        this.gravitations.push(point);
    }

    removeGravitation(point) {
        for (var i = this.gravitations.length - 1; i >= 0; i--) {
            if (point === this.gravitations[i].point) {
                this.gravitations.splice(i, 1);
                return;
            }
        }
    }

    addSpring(point, k, length) {
        this.removeSpring(point); // remove 是因為要判斷刪除重覆的關連 (a -> b, b -> a)
        this.springs.push({
            point: point,
            k: k,
            length: length || 0
        });
    }

    removeSpring(point) {
        for (var i = this.springs.length - 1; i >= 0; i--) {
            if (point === this.springs[i].point) {
                this.springs.splice(i, 1);
                return;
            }
        }
    }

    get speed() {
        return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    }

    set speed(speed) {
        this.vx = Math.cos(this.heading) * speed;
        this.vy = Math.sin(this.heading) * speed;
    }

    get heading() {
        return Math.atan2(this.vy, this.vx);
    }

    set heading(heading) {
        this.vx = Math.cos(heading) * this.speed;
        this.vy = Math.sin(heading) * this.speed;
    }

    accelerate(ax, ay) {
        this.vx += ax;
        this.vy += ay;
    }

    update() {
        this.handleSprings();
        this.handleGravitation();
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
    }

    handleSprings() {
        for (var i = this.springs.length - 1; i >= 0; i--) {
            var spring = this.springs[i];
            this.springTo(spring.point, spring.k, spring.length);
        }
    }

    handleGravitation() {
        for (var i = this.gravitations.length - 1; i >= 0; i--) {
            this.gravitateTo(this.gravitations[i]);
        }
    }

    angleTo(p2) {
        return Math.atan2(p2.y - this.y, p2.x - this.x);
    }

    distanceTo(p2) {
        var dx = p2.x - this.x;
        var dy = p2.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    gravitateTo(p2) {
        // 重力加速度: F = (G * M) / (r * r)
        var dx = p2.x - this.x;
        var dy = p2.y - this.y;
        var distSQ = dx * dx + dy * dy;
        var dist = Math.sqrt(distSQ);
        var force = p2.mass / distSQ;
        var angle = this.angleTo(p2);
        // var ax =  Math.cos(angle) * force;
        // var ay =  Math.sin(angle) * force;
        // 上面這兩行等同於下面這兩行 (我覺得最重要的是要知道 Math.cos(θ) = dx / distance)
        var ax =  dx / dist * force;
        var ay =  dy / dist * force;
        this.vx += ax;
        this.vy += ay;
    }

    springTo(point, k, length) {
        // 彈簧公式：F = -kx (這邊是用 F = kx)            
        var dx = point.x - this.x;
        var dy = point.y - this.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        var springForce = (distance - (length || 0)) * k;
        // 我覺得最重要的是要知道 Math.cos(θ) = dx / distance
        this.vx += dx / distance * springForce;
        this.vy += dy / distance * springForce;
    }
}