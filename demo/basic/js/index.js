//;(function(window, document, Youxi) {
//})(window, document, Youxi);

let game = new Youxi.Game();
// console.log(game.scene);
game.scene.add('homeScene', new HomeScene(game));
game.scene.start('homeScene');