class FireworkGame extends Observer {
    constructor(UserSetting) {
        super();
        let defaultSetting = {
            el: 'body',
            width: 400,
            height: 300
        }
        this.setting = Object.assign(defaultSetting, UserSetting)
    }

    init() {
        let self = this;
        this.ballPool = new Group();

        this.el = document.querySelector(this.setting.el);
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width = this.setting.width;
        this.height = this.canvas.height = this.setting.height;
        this.el.appendChild(this.canvas);

        // 大炮
        this.cannon = {
            x: this.width / 2,
            y: this.height
        };

        // 滑鼠
        this.mouse = {};
        this.canvas.addEventListener('click', function(e) {
            self.trigger('click', e);
            self.mouse.x = e.pageX;
            self.mouse.y = e.pageY;
            // console.log(self.mouse);
        });

        this.canvas.addEventListener('mousemove', function(e) {
            self.mouse.x = e.pageX;
            self.mouse.y = e.pageY;
            // console.log(self.mouse);
        });

        this._loop();

        return this;
    }

    fire() {
        console.log('fire');
        // console.log(this.ballPool.size)
        let ball = this.ballPool.getFirstDead();
        if (ball) {
            ball.reset(this.cannon.x, this.cannon.y);
            ball.speed = 10;
            ball.heading = Math.atan2(this.mouse.y - this.cannon.y, this.mouse.x - this.cannon.x);
            ball.target = Object.assign({}, this.mouse);
        } else {
            ball = new Ball(this.ctx);
            ball.x = this.cannon.x;
            ball.y = this.cannon.y;
            ball.radius = 5;
            ball.color = '#fff';
            ball.speed = 10; // 先設定 speed 再設定 heading
            ball.heading = Math.atan2(this.mouse.y - this.cannon.y, this.mouse.x - this.cannon.x);
            ball.target = Object.assign({}, this.mouse); // 設定要爆炸的目標
            
            this.ballPool.add(ball);
        }
    }

    _update() {
        // update all ball
        this.ballPool.forEachAlive((ball, index) => {
            // console.log(ball)
            ball.update();
            // 若 ball 到 cannon 的距離 >= target 到 cannon 的距離就爆炸
            if (utils.distance(ball, this.cannon) >= utils.distance(ball.target, this.cannon)) {
                console.log('explosion');
                ball.kill();
            }
        });
        

    };

    _draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.ctx.beginPath();
        this.ctx.fillStyle = 'yellow';
        this.ctx.arc(this.mouse.x, this.mouse.y, 5, 0, Math.PI * 2, false);
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.fillStyle = 'blue';
        this.ctx.arc(this.cannon.x, this.cannon.y, 5, 0, Math.PI * 2, false);
        this.ctx.fill();
        this.ctx.closePath();
        
        // draw all ball
        this.ballPool.forEachAlive(function(ball, index) {
            ball.draw();
        });
    };

    _loop() {
        // console.log('loop');    
        this._update();
        this._draw();
        this._raf = requestAnimationFrame(this._loop.bind(this));
        // this._raf = setTimeout(this._loop.bind(this), 33);
    }

    _createBall() {

    }

}