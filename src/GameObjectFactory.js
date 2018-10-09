import Sprite from './Sprite';
/**
 * Youxi.GameObjectFactory
 * Author: Hank Hsiao
 */
export default class GameObjectFactory {
  constructor(game) {
    this.game = game;
  }

  sprite(key, x = 0, y = 0) {
    let sprite = new Sprite(this.game, key, x, y);
    return sprite;
  }
};
