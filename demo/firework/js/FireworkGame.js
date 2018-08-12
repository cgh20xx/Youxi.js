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
        this.bulletPool = new Group(); // 子彈物件池
        this.sparkPool = new Group();  // 爆炸火花物件池

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
            self.mouse.x = e.pageX;
            self.mouse.y = e.pageY;
            self.trigger('click', e);
        });

        this._loop();

        return this;
    }

    _update() {
        // update all bullet
        this.bulletPool.forEachAlive((bullet) => {
            bullet.update();
            // 若 bullet 到 cannon 的距離 > target 到 cannon 的距離就爆炸
            if (utils.distance(bullet, this.cannon) > utils.distance(bullet.target, this.cannon)) {
                // console.log('explosion');
                bullet.kill();
                var expType = utils.randomInt(0, 2);
                switch (expType) {
                    case 0:
                        bullet.explosion('BALL');
                        break;
                    case 1:
                        bullet.explosion('HEART');
                        break;
                    case 2:
                        bullet.explosion('MICKY');
                        break;
                }            
               
            }
        });
        
        // update all spark
        this.sparkPool.forEachAlive((spark) => {
            spark.update();
            spark.life -= 1;

            let normalize = utils.norm(spark.life, 0, spark.maxLife);
            spark.opacity = Math.sqrt(normalize);

            // 生命用完 殺掉
            if (spark.life <= 0) {
                spark.kill();
            }
            // 超出邊界 殺掉
            if (!utils.inRange(spark.x, 0, this.width) || !utils.inRange(spark.y, 0, this.height)) {
                spark.kill();
            }
        });

    };

    _draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // draw all bullet
        this.bulletPool.forEachAlive(function(bullet, index) {
            bullet.draw();
        });

        // draw all spark
        this.sparkPool.forEachAlive((spark) => {
            // flash effect
            if (spark.opacity > .7 || spark.life % 10 > 3) {
                spark.draw();
            }
        });
    };

    _loop() {
        this._update();
        this._draw();
        this._raf = requestAnimationFrame(this._loop.bind(this));
    }

    fire() {
        let bullet = this.bulletPool.getFirstDead();
        if (bullet) {
            bullet.reset(this.cannon.x, this.cannon.y);
            bullet.speed = 10;
            bullet.heading = Math.atan2(this.mouse.y - this.cannon.y, this.mouse.x - this.cannon.x);
            bullet.target.x = this.mouse.x;
            bullet.target.y = this.mouse.y;
        } else {
            bullet = new Ball(this.ctx, this.sparkPool, this.cannon.x, this.cannon.y, 3, '#fff');
            bullet.speed = 10; // 先設定 speed 再設定 heading
            bullet.heading = Math.atan2(this.mouse.y - this.cannon.y, this.mouse.x - this.cannon.x);
            // 設定要爆炸的目標
            bullet.target = {
                x: this.mouse.x,
                y: this.mouse.y
            };
            
            this.bulletPool.add(bullet);
        }
    }

}