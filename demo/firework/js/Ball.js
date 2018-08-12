/**
 * Ball
 * Author: Hank Hsiao
 * extents Particle
 */

class Ball extends Particle {
    constructor(ctx, sparkPool, x, y, radius = 0, color = 'red') {
        super(x, y, 0, 0)
        this.ctx = ctx;
        this.sparkPool = sparkPool;
        this.radius = radius;
        this.alive = true;
        this.color = color;
        this.opacity = 1;
    }

    // override
    reset(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.opacity = 1;
        this.alive = true;
    }
    
    // override
    kill() {
        this.alive = false;
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

    explosion(type) {
        Explosion[type].call(this);
    }
}

const Explosion = {
    BALL: function() {
        let color = `hsl(${utils.randomInt(0, 255)}, 100%, 50%)`;
        for (let i = 0; i < 100; i++) {
            let spark = this.sparkPool.getFirstDead();
            if (spark) {
                spark.reset(this.x, this.y);
                spark.speed = utils.randomRange(.2, 6);
                spark.heading = Math.random() * Math.PI * 2;
                spark.friction = utils.randomRange(.95, .98);
                spark.gravity = .05;
                spark.color = color;
                spark.life = spark.maxLife = utils.randomInt(80, 160);
            } else {
                spark = new Ball(this.ctx, this.sparkPool, this.x, this.y, 2, color);
                spark.speed = utils.randomRange(.2, 6);
                spark.heading = Math.random() * Math.PI * 2;
                spark.friction = utils.randomRange(.95, .98);
                spark.gravity = .05;
                spark.life = spark.maxLife = utils.randomInt(80, 160);            
                this.sparkPool.add(spark);
            }
        }
    },
    HEART: function() {
        let color = `hsl(${utils.randomInt(0, 255)}, 100%, 50%)`;
        let num = 15;
        let size = utils.randomRange(3, 5);
        function speed(x) {
            return Math.sin(x) * size;
        }
        function heading(x) {
            if (x % 2 === 0) {
                return utils.map(x, 0, num, 0, Math.PI) - Math.PI / 2;
            } else {
                return -utils.map(x, 0, num, 0, Math.PI) - Math.PI / 2;
            }
        }
        for (let i = 0; i <= num; i++) {
            let spark = this.sparkPool.getFirstDead();
            let normX = utils.norm(i, 0, num);
            if (spark) {
                spark.reset(this.x, this.y);
                spark.speed = speed(normX);
                spark.heading = heading(i);
                spark.friction = .98;
                spark.gravity = .01;
                spark.color = color;
                spark.life = spark.maxLife = utils.randomInt(80, 160);
            } else {
                spark = new Ball(this.ctx, this.sparkPool, this.x, this.y, 2, color);
                spark.speed = speed(normX);
                spark.heading = heading(i);
                spark.friction = .98;
                spark.gravity = .01;
                spark.life = spark.maxLife = utils.randomInt(80, 160);            
                this.sparkPool.add(spark);
            }
        }
    },
    MICKY: function() {
        let color = `hsl(${utils.randomInt(0, 255)}, 100%, 50%)`;
        let size = utils.randomRange(1, 3);
        function heading(x, num) {
            return utils.map(x, 0, num, 0, Math.PI * 2);
        }
        // face
        let faceNum = 20;
        for (let i = 0; i < faceNum; i++) {
            let spark = this.sparkPool.getFirstDead();
            if (spark) {
                spark.reset(this.x, this.y);
                spark.speed = size;
                spark.heading = heading(i, faceNum);
                spark.friction = .97;
                spark.gravity = .01;
                spark.color = color;
                spark.life = spark.maxLife = utils.randomInt(80, 160);
            } else {
                spark = new Ball(this.ctx, this.sparkPool, this.x, this.y, 2, color);
                spark.speed = size;
                spark.heading = heading(i, faceNum);
                spark.friction = .97;
                spark.gravity = .01;
                spark.life = spark.maxLife = utils.randomInt(80, 160);            
                this.sparkPool.add(spark);
            }
        }
        // left ear
        let leftEarNum = 10;
        for (let i = 0; i < leftEarNum; i++) {
            let spark = this.sparkPool.getFirstDead();
            if (spark) {
                spark.reset(this.x - size * 25, this.y - size * 25);
                spark.speed = size / 2;
                spark.heading = heading(i, leftEarNum);
                spark.friction = .97;
                spark.gravity = .01;
                spark.color = color;
                spark.life = spark.maxLife = utils.randomInt(80, 160);
            } else {
                spark = new Ball(this.ctx, this.sparkPool, this.x - size * 25, this.y - size * 25, 2, color);
                spark.speed = size / 2;
                spark.heading = heading(i, leftEarNum);
                spark.friction = .97;
                spark.gravity = .01;
                spark.life = spark.maxLife = utils.randomInt(80, 160);            
                this.sparkPool.add(spark);
            }
        }
        // right ear
        let rightEarNum = 10;
        for (let i = 0; i < rightEarNum; i++) {
            let spark = this.sparkPool.getFirstDead();
            if (spark) {
                spark.reset(this.x + size * 25, this.y - size * 25);
                spark.speed = size / 2;
                spark.heading = heading(i, rightEarNum);
                spark.friction = .97;
                spark.gravity = .01;
                spark.color = color;
                spark.life = spark.maxLife = utils.randomInt(80, 160);
            } else {
                spark = new Ball(this.ctx, this.sparkPool, this.x + size * 25, this.y - size * 25, 2, color);
                spark.speed = size / 2;
                spark.heading = heading(i, rightEarNum);
                spark.friction = .97;
                spark.gravity = .01;
                spark.life = spark.maxLife = utils.randomInt(80, 160);            
                this.sparkPool.add(spark);
            }
        }
    },
}