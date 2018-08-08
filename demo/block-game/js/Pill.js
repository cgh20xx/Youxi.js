/**
 * Block
 * Author: Hank Hsiao
 * extents GameObject
 */

class Pill extends GameObject {
    constructor(ctx, x, y, type) {
        let rnd = utils.randomInt(0, 0);
        super(ctx, x, y, preloadImages[type].img); // super(ctx, x, y, img)
        this.type = type;
    }

    reset(x, y) {
        var rnd = utils.randomInt(0, 0);
        super.reset(x, y, preloadImages[Block.data[rnd].type].img);
        this.type = Block.data[rnd].type;
    }

    static get data() {
        return [
            {
                type: 'pill0',
            }
        ];
    }
}
