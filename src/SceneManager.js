/**
 * Youxi.SceneManager
 * Author: Hank Hsiao
 */
export default class SceneManager {
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
