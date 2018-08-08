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
        
        this._createBlocks();

        // test circle rectangle overlap
        var self = this;
        // this.rect = new Block(this.ctx, 200, 100);
        // this.rect.setAnchor(0, 0);
        this.circle = new Particle();
        this.circle.radius = 10;
        this.canvas.addEventListener('mousemove', function(e) {
            self.circle.x = e.pageX;
            self.circle.y = e.pageY;
        });

        this._loop();
    }

    _update() {
        // update all blocks
        this.blockGrid.update();

        // test circle rectangle overlap
        // this.rect.update();
        // if (utils.circleRectOverlap(this.circle, this.rect)) {
        //     this.ctx.strokeStyle = 'yellow';
        // } else {
        //     this.ctx.strokeStyle = 'red';
        // }

        // console.log(this.blockGrid.blockPool);
        this.ctx.strokeStyle = 'red';
        this.blockGrid.blockPool.forEachAlive(function(block) {
            if (utils.circleRectOverlap(this.circle, block)) {
                this.ctx.strokeStyle = 'yellow';
                block.kill();
                return false;
            }
        }, this);
    };

    _draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // test circle rectangle overlap
        // this.rect.draw();
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(this.circle.x, this.circle.y);
        this.ctx.arc(0, 0, this.circle.radius, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();

        


        // draw all blocks
        this.blockGrid.draw();
    };

    _loop() {
        // console.log('loop');    
        this._update();
        this._draw();
        this._raf = requestAnimationFrame(this._loop.bind(this));
    }

    _createBlocks() {
        if (this.isCanvasBlur) return;
        
        // console.log(block.type, block.score);  
        // setTimeout(this._createBlocks.bind(this), 700);
    };
}