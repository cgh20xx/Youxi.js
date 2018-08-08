/**
 * Block
 * Author: Hank Hsiao
 * extents GameObject
 */
class Block extends GameObject {  
    constructor(ctx, x, y) {
        let rnd = utils.randomInt(0, 0);
        super(ctx, x, y, preloadImages[Block.data[rnd].type].img); // super(ctx, x, y, img)
        this.type = Block.data[rnd].type;
        this.score = Block.data[rnd].score;
    }

    reset(x, y) {
        var rnd = utils.randomInt(0, 0);
        super.reset(x, y, preloadImages[Block.data[rnd].type].img);
        this.type = Block.data[rnd].type;
        this.score = Block.data[rnd].score;
    }
}

Block.data = [
    {
        type: 'block0',
        score: 1,
    },
    {
        type: 'block1',
        score: 2,
    },
];