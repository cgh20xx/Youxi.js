/**
 * Block
 * Author: Hank Hsiao
 */
class BlockGrid {  
    constructor(ctx, setting) {
        let def = {
            x: 0,
            y: 0,
            cols: 1,
            rows: 1,
            padding: 0
        };
        Object.assign(def, setting);
        Object.assign(this, def);
        this.ctx = ctx;
        this.blockPool = new Group();
        this._createGrid();
    }

    _createBlock(row, col) {
        let block = this.blockPool.getFirstDead();
        if (block) {
            block.reset(blockData.x, blockData.y);
        } else {
            block = new Block(this.ctx);
            block.x = (block.width + this.padding) * col + this.x;
            block.y = (block.height + this.padding) * row + this.y;

            block.setAnchor(0, 0);
            // block.aabb = true;
            this.blockPool.add(block);
        }
    }

    _createGrid() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this._createBlock(i, j);
            }   
        }
    }

    update() {
        this.blockPool.forEachAlive(function(block) {
            block.update();
        }, this);
    }

    draw() {
        this.blockPool.forEachAlive(function(block) {
            block.draw();
        });
    }
}
