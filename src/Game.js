import Emitter from './Emitter';
/**
 * Youxi.Game
 * Author: Hank Hsiao
 */
export default class Game extends Emitter {
  constructor(userSetting) {
    super();
    let defaultSetting = {
      el: 'body',
      width: 400,
      height: 300
    };
    this.setting = Object.assign(defaultSetting, userSetting);
    
    this.el = document.querySelector(this.setting.el);
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width = this.setting.width;
    this.height = this.canvas.height = this.setting.height;
    this.el.appendChild(this.canvas);

    this._boot();
  }

  _boot() {
    this.scene = new Youxi.SceneManager(this);
    this.add = new Youxi.GameObjectFactory(this);
    this.cache = {};
    this.load = new Youxi.Loader(this);

    this.raf = window.requestAnimationFrame(timestamp => this._loop(timestamp));
  }

  _loop(timestamp) {
    if (this.scene.currentScene) {
      this.scene.currentScene.update.call(this);
    }
    this.update();
    this.render();
    this.raf = window.requestAnimationFrame(timestamp => this._loop(timestamp));
  }

  update() {}

  render() {}
};
