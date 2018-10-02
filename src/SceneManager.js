/**
 * Youxi.SceneManager
 * Author: Hank Hsiao
 */
Youxi.SceneManager = class SceneManager {
  constructor(game) {
    this.game = game;
    this.scene = {};
  }

  add(key, scene) {
    this.scene[key] = scene;
    return this;
  }

  start(key) {
    // this.scene[key]
  }
};
