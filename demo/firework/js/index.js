;(function(window, document) {
    let setting = {
        el: 'body',
        width: window.innerWidth,
        height: window.innerHeight,
    };
    let fireworkGame = new FireworkGame(setting).init();
    
    fireworkGame.on('click', function(e) {
        e.preventDefault();
        fireworkGame.fire();
    });

})(window, document);