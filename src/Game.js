/**
 * Youxi.Game
 * Author: Hank Hsiao
 */
let Youxi = {};
Youxi.Game = class Game extends Observer {
    constructor(userSetting) {
        super();
        let defaultSetting = {
            el: 'body',
            width: 400,
            height: 300
        }
        this.setting = Object.assign(defaultSetting, userSetting)
        // console.log(this.setting);
    }

    init() {
        this.el = document.querySelector(this.setting.el);
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width = this.setting.width;
        this.height = this.canvas.height = this.setting.height;
        this.el.appendChild(this.canvas);

        return this;
    }

}


