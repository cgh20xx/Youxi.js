//;(function(window, document, Youxi) {
//})(window, document, Youxi);

let game = new Youxi.Game().init();
// console.log(game.scene);
game.scene.add('homeScene', new HomeScene);
game.scene.start('homeScene');