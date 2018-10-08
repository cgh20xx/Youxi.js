class HomeScene extends Youxi.Scene {
    
    // override
    init() {
        console.log('my init');
    }
    
    // override
    preload() {
        console.log('my preload');
        this.load.image('dog', 'images/dog.png');
        console.log(this.load);

    }
    
    // override
    create() {
        console.log('my create');
        // 
    }
    
    // override
    update() {
        console.log('my update');
    }
}