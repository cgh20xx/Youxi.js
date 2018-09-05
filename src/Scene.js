/**
 * Youxi.Scene
 * Author: Hank Hsiao
 */
Youxi.Scene = class Scene {
    constructor(game) {
        /**
        * @property {Youxi.Game} game - 參考到當前正在執行的遊戲
        */
        this.game = game;

        /**
        * @property {Youxi.GameObjectFactory} game - 參考到 GameObjectFactory 用於產生新遊戲物件到世界中
        */
        this.add = null;

        /**
        * @property {Youxi.Loader} load - 參考到 Loader 用於場景中預載遊戲資源
        */
        this.load = null;

    }

    /**
    * init 為空方法，在 SceneManager start() 後 init 是第一個被呼叫的方法，接著會呼叫 reload 方法。
    *
    * @method Youxi.Scene#init
    */
    init() {}

    /**
    * preload 為空方法，用於加載遊戲資源，接著會呼叫 create 方法。
    *
    * @method Youxi.Scene#preload
    */
    preload() {}

    /**
    * create 為空方法，用於建立已 preoload 過的遊戲物件，接著會呼叫 update 方法。
    *
    * @method Youxi.Scene#create
    */
    create() {}

    /**
    * update 為空方法，遊戲每一偵都會呼叫此方法更新
    *
    * @method Youxi.Scene#update
    */
    update() {}

}
