/**
 * Youxi.Loader
 * Author: Hank Hsiao
 */
Youxi.Loader = class Loader {
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

        /**
        * 暫存所有 load 的資源，直到所有資源載入完成後會被清空。
        *
        * @property {file[]} _fileList
        * @private
        */
        this._fileList = [];

        /**
        * 全部 file 的數量
        * @property {Number} _totalFileCount
        * @private
        */
        this._totalFileCount = 0;

        /**
        * 如果 Loader 已經在處理 queue 則為 true
        * @property {boolean} isLoading
        * @default
        */
        this.isLoading = false;

        /**
        * 如果 Loader 已經處理完所有的 queue 則為 true
        * @property {boolean} hasLoaded
        * @default
        */
        this.hasLoaded = false;

    }

    /**
    * 增加 file 到 _fileList 內部方法勿直接呼叫
    *
    * @method Youxi.Loader#_addToFileList
    * @protected
    * @param {string} type - 預載的資源類型 (image, audio)
    * @param {string} key - 資源唯一的名稱
    * @param {string} url - 資源的路徑
    * @return {Youxi.Loader} Youxi.Loader 實例.
    */
   _addToFileList (type, key, url) {
        var file = {
            type: type,
            key: key,
            url: url,
            data: null,
            loading: false,
            loaded: false,
            error: false
        };
        this._fileList.push(file);
        this._totalFileCount++;
        return this;
    }

    /**
    * 增加圖片資源到 load queue
    *
    * @method Youxi.Loader#image
    * @param {string} key - 圖片唯一的名稱
    * @param {string} url - 圖片的路徑
    * @return {Youxi.Loader} Youxi.Loader 實例
    */
    image(key, url) {
        this._addToFileList('image', key, url);
        return this;
    }

    /**
    * 增加聲音資源到 load queue
    *
    * @method Youxi.Loader#audio
    * @param {string} key - 聲音唯一的名稱
    * @param {string} url - 聲音的路徑
    * @return {Youxi.Loader} Youxi.Loader 實例
    */
    audio(key, url) {
        this._addToFileList('audio', key, url);
        return this;
    }

    /**
    * 開始加載資源 通常不需自行呼叫此方法 SceneManager 會自行呼叫
    *
    * @method Phaser.Loader#start
    */
    start() {
        if (this.isLoading) {
            return;
        }

        this.hasLoaded = false;
        this.isLoading = true;

        this.updateProgress();

        this.processLoadQueue();

    }

}