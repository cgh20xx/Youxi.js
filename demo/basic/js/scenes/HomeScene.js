class HomeScene extends Youxi.Scene {
    
    // override
    init() {
        console.log('my init');
    }
    
    // override
    preload() {
        console.log('my preload');
        this.load.image('dog', 'images/dog.png');
        this.load.image('ball', 'images/ball.png');
    }
    
    // override
    create() {
        console.log('my create');
        this.dog = this.add.sprite('dog', 0, 0);
        this.ball = this.add.sprite('ball', 100, 100);
        console.log('==============');
        console.log(this.dog);
        // todo 在 add.sprite 時建立將 sprite 加到 world(group) 中
    }
    
    // override
    update() {
        console.log('my update');
    }
}