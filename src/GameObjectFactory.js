/**
 * Youxi.GameObjectFactory
 * Author: Hank Hsiao
 */
Youxi.GameObjectFactory = class GameObjectFactory {
  constructor(game) {
    this.game = game;
    this.scene = {};
  }

  add(key, scene) {
    this.scene[key] = scene;
    return this;
  }
};
