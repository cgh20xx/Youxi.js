/**
 * Youxi.SceneManager
 * Author: Hank Hsiao
 */
let Youxi = {};
Youxi.SceneManager = class SceneManager {
    constructor(key, scene) {
        this.scenes = {};
    }

    add(key, scene) {
        this.scene[key] = scene;
        return this;
    }

}


