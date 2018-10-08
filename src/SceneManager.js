/**
 * Youxi.SceneManager
 * Author: Hank Hsiao
 */
export default class SceneManager {
  constructor(game) {
    this.game = game;
    this.scenes = {};
    this.currentScene = null;
  }

  add(key, scene) {
    this.scenes[key] = scene;
    return this;
  }

  start(key) {
    this.currentScene = this.scenes[key];
    this.currentScene.init.call(game);
    this.currentScene.preload.call(game);
    this.game.load.start();
    return this.currentScene;
  }
};
