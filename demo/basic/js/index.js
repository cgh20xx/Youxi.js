;(function(window, document, Youxi) {

    // let game = new Youxi.Game();
    // console.log(Object.getPrototypeOf(game).constructor);
    // game.scene.add('home', {});
    // game.start('home');
    
    // fireworkGame.on('click', function(e) {
    //     e.preventDefault();
    //     fireworkGame.fire();
    // });

})(window, document, Youxi);

let game = new Youxi.Game().init();
console.log(game);
let homeScene = new Youxi.Scene({
    // todo
});
game.scene.add('homeScene', homeScene);