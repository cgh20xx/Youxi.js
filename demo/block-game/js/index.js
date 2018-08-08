let preloadImages;

;(function(window, document) {
    function loaded() {
        let setting = {
            el: 'body',
            width: 400,
            height: 400,
        };
        let blockGame = new BlockGame(setting).init();
        blockGame.gameStart();
    }

    preloader({
        manifest : [
            {id: 'block0', src: 'images/block0.png'},
            {id: 'block1', src: 'images/block1.png'},
        ],
        onEachLoad: function(info) {
            // console.log('讀取中(' + info.index + '/' + info.total + ')');
        },
        onAllLoad: function(source) {
            console.log('img all loaded');
            preloadImages = source;
            loaded();
        }
    });
})(window, document);