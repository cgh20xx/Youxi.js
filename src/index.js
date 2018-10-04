/**
 * @namespace Youxi
 */
export * from './const';

import { utils } from './utils';
import preloader from './preloader';

// console.log(utils.max(3, 5));
export { utils, preloader};

export { default as Event } from './Event';
export { default as Game } from './Game';
export { default as GameObject } from './GameObject';
export { default as GameObjectFactory } from './GameObjectFactory';
export { default as Group } from './Group';
export { default as Loader } from './Loader';
export { default as Particle } from './Particle';
export { default as Rectangle } from './Rectangle';
export { default as Scene } from './Scene';
export { default as SceneManager } from './SceneManager';
export { default as Sprite } from './Sprite';