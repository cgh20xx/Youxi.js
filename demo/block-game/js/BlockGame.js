class BlockGame {
    constructor(UserSetting) {
        let defaultSetting = {
            el: 'body',
            width: 500,
            height: 500
        }
        this.setting = Object.assign(defaultSetting, UserSetting)
    }

    init() {
        this.blockPool = new Group();
        this.pillPool = new Group();

        this.el = document.querySelector(this.setting.el);
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width = this.setting.width;
        this.height = this.canvas.height = this.setting.height;
        this.el.appendChild(this.canvas);
        return this;
    }

    gameStart() {
        console.log('game start');
        let gridSetting = {
            x: 30,
            y: 20,
            cols: 8,
            rows: 10,
            padding: 2
        }
        this.blockGrid = new BlockGrid(this.ctx, gridSetting);
        this.ball = this._createBall(200, 300, 5, 'white');
        this.paddle = this._createPaddle(this.width / 3, this.height -30, 100, 10, '#f33');
        
        const self = this;
        this.canvas.addEventListener('mousemove', function(e) {
            self.paddle.x = e.pageX;
            self.paddle.y = e.pageY;
        });

        this._loop();
    }

    _update() {
        // update all blocks
        this.blockGrid.update();

        this.ball.update();
        this.paddle.update();

         // test circle rectangle overlap
        this.blockGrid.blockPool.forEachAlive(function(block) {
            if (utils.circleRectOverlap(this.ball, block)) {
                this.ball.vy *= -1;
                this._createPill(block.x, block.y);
                block.kill();
                return false;
            }
        }, this);

        this.pillPool.forEachAlive(pill => {
            pill.update();
        });

        // detech ball & world collide
        if (!utils.inRange(this.ball.x, this.ball.radius, this.width - this.ball.radius)) {
            this.ball.vx *= -1;
        }
        if (this.ball.y + this.ball.radius < 0) {
            this.ball.y = 0;
            this.ball.vy *= -1;
        }
        if (this.ball.y > this.height) {
            this.ball.y = this.height;
            this.ball.vx = 0;
            this.ball.vy = 0;
            console.log('gameover');
        }
        // detech ball & paddle collide
        if (utils.circleRectOverlap(this.ball, this.paddle)) {
            console.log('ball paddle collide');
            this.ball.y = this.paddle.top - this.ball.radius;
            this.ball.vy *= -1;
        }

    };

    _draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // draw all blocks
        this.blockGrid.draw();

        this.ball.draw();

        this.paddle.draw();

        this.pillPool.forEachAlive(pill => {
            pill.draw();
        });
    };

    _loop() {
        // console.log('loop');    
        this._update();
        this._draw();
        this._raf = requestAnimationFrame(this._loop.bind(this));
    }

    _createBall(x, y, radius, color) {
        const self = this;
        let direction = utils.degreesToRads(utils.randomRange(-30, -150));
        const ball = new Particle(x, y, 5, direction);
        ball.radius = radius;
        ball.color = color;

        ball.draw = function() {
            self.ctx.save();
            self.ctx.beginPath();
            self.ctx.translate(this.x, this.y);
            self.ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
            self.ctx.fillStyle = this.color;
            self.ctx.fill();
            self.ctx.closePath();
            self.ctx.restore();
        };
        return ball;
    }

    _createPaddle(x, y, width, height, color) {
        const self = this;
        const paddle = new Particle(x, y);
        paddle.width = width;
        paddle.height = height;
        paddle.color = color
        paddle.anchor = {x: .5, y: .5};
        paddle._update = paddle.update;
        paddle.update = function() {
            GameObject.prototype.update.call(this);
        };
        paddle.draw = function() {
            self.ctx.save();
            self.ctx.beginPath();
            self.ctx.translate(this.x, this.y);
            self.ctx.rect(
                -this.width * this.anchor.x,
                -this.height * this.anchor.y,
                this.width,
                this.height);
            self.ctx.fillStyle = this.color;
            self.ctx.fill();
            self.ctx.closePath();
            self.ctx.restore();
        };
        return paddle;
    }

    _createPill(x, y) {
        let pill = this.pillPool.getFirstDead();
        let type = 'pill0';
        if (pill) {
            pill.reset(x, y);
        } else {
            pill = new Pill(this.ctx, x, y, type);
            pill.setAnchor(.5);
            pill.gravity = .1;
            this.pillPool.add(pill);
        }
    }
}