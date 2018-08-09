;(function(window, document) {
    let setting = {
        el: 'body',
        width: 900,
        height: 600,
    };
    let fireworkGame = new FireworkGame(setting).init();
    
    fireworkGame.on('click', function(e) {
        fireworkGame.fire();
    });

})(window, document);