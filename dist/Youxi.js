var Youxi =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Event.js":
/*!**********************!*\
  !*** ./src/Event.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Event; });\n/**\n * Youxi.Event\n * Author: Hank Hsiao\n * Reference: https://github.com/component/emitter/blob/master/index.js\n */\nclass Event {\n  constructor(obj) {\n    if (obj) {\n      return Youxi.Event.copy(obj);\n    }\n  }\n\n  static copy(obj) {\n    for (let key in Youxi.Event.prototype) {\n      obj[key] = Youxi.Event.prototype[key];\n    }\n    return obj;\n  }\n\n  /**\n   * Listen on the given `event` with `fn`.\n   *\n   * @param {String} event - event name\n   * @param {Function} fn\n   * @return {Youxi.Event}\n   * @api public\n   */\n  on(event, fn) {\n    this.subscribers = this.subscribers || {};\n    if (typeof this.subscribers[event] === 'undefined') {\n      this.subscribers[event] = [];\n    }\n    this.subscribers[event].push(fn);\n\n    return this;\n  }\n\n  /**\n   * Trigger `event` with given args.\n   * @param  {String} event - event name\n   * @param  {Any} optional args\n   * @return {Youxi.Event}\n   */\n  once(event, fn) {\n    function on() {\n      this.off(event, on);\n      fn.apply(this, arguments);\n    }\n\n    on.fn = fn;\n    this.on(event, on);\n    return this;\n  }\n\n  /**\n   * Trigger `event` with given args.\n   * @param  {String} event - event name\n   * @param  {Any} optional args\n   * @return {Youxi.Event}\n   */\n  off(event, fn) {\n    this.subscribers = this.subscribers || {};\n\n    // condition 1: no arguments\n    // remove all event\n    if (arguments.length === 0) {\n      this.subscribers = {};\n      return this;\n    }\n\n    // find specific event\n    let callbacks = this.subscribers[event];\n    if (!callbacks) return this;\n\n    // condition 2: 1 arguments\n    // remove specific event and  handler\n    if (arguments.length === 1) {\n      delete this.subscribers[event];\n      return this;\n    }\n\n    // condition 3: 2 arguments\n    // remove 1 specific handler of event\n    for (let i = callbacks.length - 1; i >= 0; i--) {\n      let cb = callbacks[i];\n      if (cb === fn) {\n        callbacks.splice(i, 1);\n        break;\n      }\n    }\n\n    return this;\n  }\n\n  /**\n   * Trigger `event` with given args.\n   * @param  {String} event - event name\n   * @param  {Any} optional args\n   * @return {Youxi.Event}\n   */\n  trigger() {\n    this.subscribers = this.subscribers || {};\n    let args = [].slice.call(arguments, 1);\n    let callbacks = this.subscribers[event];\n    if (callbacks) {\n      callbacks.forEach(function(func) {\n        func.apply(this, args);\n      }, this);\n    }\n    return this;\n  }\n\n  /**\n   * Return array of callbacks for `event`.\n   * @param {String} event - event name\n   * @return {Array}\n   */\n  listeners(event) {\n    this.subscribers = this.subscribers || {};\n    return this.subscribers[event] || [];\n  }\n\n  /**\n   * Check if this emitter has `event` handlers.\n   * @param {String} event - event name\n   * @return {Boolean}\n   */\n  hasListeners(event) {\n    return !!this.listeners(event).length;\n  }\n};\n\n\n//# sourceURL=webpack://Youxi/./src/Event.js?");

/***/ }),

/***/ "./src/Game.js":
/*!*********************!*\
  !*** ./src/Game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Game; });\n/* harmony import */ var _Event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Event */ \"./src/Event.js\");\n\n/**\n * Youxi.Game\n * Author: Hank Hsiao\n */\nclass Game extends _Event__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(userSetting) {\n    super();\n    let defaultSetting = {\n      el: 'body',\n      width: 400,\n      height: 300\n    };\n    this.setting = Object.assign(defaultSetting, userSetting);\n    // console.log(this.setting);\n  }\n\n  init() {\n    this.el = document.querySelector(this.setting.el);\n    this.canvas = document.createElement('canvas');\n    this.ctx = this.canvas.getContext('2d');\n    this.width = this.canvas.width = this.setting.width;\n    this.height = this.canvas.height = this.setting.height;\n    this.el.appendChild(this.canvas);\n\n    this._boot();\n    return this;\n  }\n\n  _boot() {\n    this.scene = new Youxi.SceneManager(this);\n    this.add = new Youxi.GameObjectFactory(this);\n    this.cache = {};\n    this.load = new Youxi.Loader(this);\n\n    this.raf = window.requestAnimationFrame(timestamp => this._loop(timestamp));\n  }\n\n  _loop(timestamp) {\n    if (this.scene.currentScene) {\n      this.scene.currentScene.update.call(this);\n    }\n    this.update();\n    this.render();\n    this.raf = window.requestAnimationFrame(timestamp => this._loop(timestamp));\n  }\n\n  update() {}\n\n  render() {}\n};\n\n\n//# sourceURL=webpack://Youxi/./src/Game.js?");

/***/ }),

/***/ "./src/GameObject.js":
/*!***************************!*\
  !*** ./src/GameObject.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return GameObject; });\n/* harmony import */ var _Particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Particle */ \"./src/Particle.js\");\n\n/**\n * 這是一個給所有要顯示於畫面上的物件的基礎遊戲物件\n * 這是抽像類別不應被直接使用而需被繼承\n *\n * GameObject\n * Author: Hank Hsiao\n * extents Particle\n *\n */\nclass GameObject extends _Particle__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(ctx, x, y) {\n    super(x, y); // super(x, y, speed, direction, gravity)\n    this.ctx = ctx;\n    this.angle = 0;\n    this.scale = {\n      x: 1,\n      y: 1\n    };\n  }\n\n  reset(x, y) {\n    this.x = x;\n    this.y = y;\n    this.vx = 0;\n    this.vy = 0;\n    this.angle = 0;\n  }\n\n  update() {\n    super.update();\n    this.left = this.x - this.width * this.anchor.x;\n    this.top = this.y - this.height * this.anchor.y;\n    this.right = this.left + this.width;\n    this.bottom = this.top + this.height;\n  }\n\n  draw() {\n    this.ctx.save();\n    this.ctx.translate(this.x, this.y);\n    this.ctx.rotate(this.angle);\n    this.ctx.scale(this.scale.x, this.scale.y); // scale 功能尚未完善\n    this.ctx.restore();\n  }\n}\n\n\n//# sourceURL=webpack://Youxi/./src/GameObject.js?");

/***/ }),

/***/ "./src/GameObjectFactory.js":
/*!**********************************!*\
  !*** ./src/GameObjectFactory.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return GameObjectFactory; });\n/**\n * Youxi.GameObjectFactory\n * Author: Hank Hsiao\n */\nclass GameObjectFactory {\n  constructor(game) {\n    this.game = game;\n    this.scene = {};\n  }\n\n  add(key, scene) {\n    this.scene[key] = scene;\n    return this;\n  }\n};\n\n\n//# sourceURL=webpack://Youxi/./src/GameObjectFactory.js?");

/***/ }),

/***/ "./src/Group.js":
/*!**********************!*\
  !*** ./src/Group.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Group; });\n/**\n * Group\n * Author: Hank Hsiao\n */\nclass Group {\n  constructor() {\n    this.pool = [];\n  }\n\n  add(gameObject) {\n    this.pool.push(gameObject); // gameObject has alive property\n  }\n\n  getFirstAlive(gameObject) {\n    return this.pool.filter(function(obj) {\n      return obj.alive === true;\n    })[0];\n  }\n\n  getFirstDead(gameObject) {\n    return this.pool.filter(function(obj) {\n      return obj.alive === false;\n    })[0];\n  }\n\n  forEach(callback, thisArg) {\n    for (var i = 0, len = this.pool.length; i < len; i++) {\n      if (callback.call(thisArg, this.pool[i], i, this.pool) === false) break;\n    }\n  }\n\n  forEachAlive(callback, thisArg) {\n    for (var i = 0, len = this.pool.length; i < len; i++) {\n      if (this.pool[i].alive === true) {\n        if (callback.call(thisArg, this.pool[i], i, this.pool) === false) break;\n      }\n    }\n  }\n\n  forEachDead(callback, thisArg) {\n    for (var i = 0, len = this.pool.length; i < len; i++) {\n      if (this.pool[i].alive === false) {\n        if (callback.call(thisArg, this.pool[i], i, this.pool) === false) break;\n      }\n    }\n  }\n\n  get size() {\n    return this.pool.length;\n  }\n\n  clear() {\n    this.pool.length = 0;\n  }\n}\n\n// run test function\nGroup.test = function() {\n  console.log('===== test Group start ======');\n  objs = [\n    { id: 'a', alive: false },\n    { id: 'b', alive: true },\n    { id: 'c', alive: true },\n    { id: 'd', alive: true },\n    { id: 'e', alive: false }\n  ];\n  var pool = new Group();\n  objs.forEach(function(obj) {\n    pool.add(obj);\n  });\n  console.log(pool);\n\n  console.log('first alive:');\n  var aliveObj = pool.getFirstAlive();\n  console.log(aliveObj);\n\n  console.log('first dead:');\n  var deadObj = pool.getFirstDead();\n  console.log(deadObj);\n\n  console.log('each alive:');\n  pool.forEachAlive(function(obj, index, arr) {\n    console.log(obj.id, index, arr);\n  });\n\n  console.log('each dead:');\n  pool.forEachDead(function(obj, index, arr) {\n    console.log(obj.id, index, arr);\n  });\n\n  console.log('size:', pool.size);\n\n  console.log('clear pool');\n  pool.clear();\n\n  console.log('size:', pool.size);\n  console.log(pool.pool);\n\n  console.log('===== test Group end ======');\n};\n\n\n//# sourceURL=webpack://Youxi/./src/Group.js?");

/***/ }),

/***/ "./src/Loader.js":
/*!***********************!*\
  !*** ./src/Loader.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Loader; });\n/**\n * Youxi.Loader\n * Author: Hank Hsiao\n */\nclass Loader {\n  constructor(game) {\n    /**\n     * @property {Youxi.Game} game - 參考到當前正在執行的遊戲\n     */\n    this.game = game;\n\n    /**\n     * @property {Youxi.GameObjectFactory} game - 參考到 GameObjectFactory 用於產生新遊戲物件到世界中\n     */\n    this.add = null;\n\n    /**\n     * @property {Youxi.Loader} load - 參考到 Loader 用於場景中預載遊戲資源\n     */\n    this.load = null;\n\n    /**\n     * 暫存所有 load 的資源，直到所有資源載入完成後會被清空。\n     *\n     * @property {file[]} _fileList\n     * @private\n     */\n    this._fileList = [];\n\n    /**\n     * 全部 file 的數量\n     * @property {Number} _totalFileCount\n     * @private\n     */\n    this._totalFileCount = 0;\n\n    /**\n     * 如果 Loader 已經在處理 queue 則為 true\n     * @property {boolean} isLoading\n     * @default\n     */\n    this.isLoading = false;\n\n    /**\n     * 如果 Loader 已經處理完所有的 queue 則為 true\n     * @property {boolean} hasLoaded\n     * @default\n     */\n    this.hasLoaded = false;\n  }\n\n  /**\n   * 增加 file 到 _fileList 內部方法勿直接呼叫\n   *\n   * @method Youxi.Loader#_addToFileList\n   * @protected\n   * @param {string} type - 預載的資源類型 (image, audio)\n   * @param {string} key - 資源唯一的名稱\n   * @param {string} url - 資源的路徑\n   * @return {Youxi.Loader} Youxi.Loader 實例.\n   */\n  _addToFileList(type, key, url) {\n    var file = {\n      type: type,\n      key: key,\n      url: url,\n      data: null,\n      loading: false,\n      loaded: false,\n      error: false\n    };\n    this._fileList.push(file);\n    this._totalFileCount++;\n    return this;\n  }\n\n  /**\n   * 增加圖片資源到 load queue\n   *\n   * @method Youxi.Loader#image\n   * @param {string} key - 圖片唯一的名稱\n   * @param {string} url - 圖片的路徑\n   * @return {Youxi.Loader} Youxi.Loader 實例\n   */\n  image(key, url) {\n    this._addToFileList('image', key, url);\n    return this;\n  }\n\n  /**\n   * 增加聲音資源到 load queue\n   *\n   * @method Youxi.Loader#audio\n   * @param {string} key - 聲音唯一的名稱\n   * @param {string} url - 聲音的路徑\n   * @return {Youxi.Loader} Youxi.Loader 實例\n   */\n  audio(key, url) {\n    this._addToFileList('audio', key, url);\n    return this;\n  }\n\n  /**\n   * 處理加載資源序列\n   *\n   * @method Youxi.Loader#_processLoadQueue\n   */\n  _processLoadQueue() {\n    // todo 改 fetch\n    let getBlob = function(src) {\n      return new Promise((resolve, reject) => {\n        let xhr = new XMLHttpRequest();\n        xhr.open('GET', file.src, true);\n        xhr.responseType = 'blob';\n        xhr.addEventListener('load', function(e) {\n          if (e.target.status === 200) {\n              resolve(e);\n          } else {\n            reject(e);\n          }\n        }, false);\n        xhr.addEventListener('error', function(e) {\n          reject(e);\n        }, false);\n        xhr.send();\n      });\n    };\n\n    let rule = {\n      image: function(response) {\n        var img = document.createElement('img');\n        img.src = URL.createObjectURL(response);;\n      },\n      audio: function() {\n        var audio = document.createElement('audio');\n        var xhr = new XMLHttpRequest();\n        xhr.open('GET', file.src, true);\n        xhr.responseType = 'blob';\n        xhr.addEventListener('load', handler.audio.bind(audio, file.id), false);\n        xhr.addEventListener('error', onError.bind(audio, file.id), false);\n        xhr.send();\n      },\n      video: function() {\n        var video = document.createElement('video');\n        var xhr = new XMLHttpRequest();\n        xhr.open('GET', file.src, true);\n        xhr.responseType = 'blob';\n        xhr.addEventListener('load', handler.video.bind(video, file.id), false);\n        xhr.addEventListener('error', onError.bind(video, file.id), false);\n        xhr.send();\n      }\n    };\n\n    this._fileList.forEach(file => {\n      getBlob(file.src).then(function(e) {\n        rule[file.type](e.target.response);\n      });\n    });\n  }\n\n  /**\n   * 開始加載資源 通常不需自行呼叫此方法 SceneManager 會自行呼叫\n   *\n   * @method Youxi.Loader#start\n   */\n  start() {\n    if (this.isLoading) {\n      return;\n    }\n\n    this.hasLoaded = false;\n    this.isLoading = true;\n\n    // this.updateProgress();\n\n    this.processLoadQueue();\n  }\n};\n\n\n//# sourceURL=webpack://Youxi/./src/Loader.js?");

/***/ }),

/***/ "./src/Particle.js":
/*!*************************!*\
  !*** ./src/Particle.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Particle; });\n/* harmony import */ var _Event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Event */ \"./src/Event.js\");\n\n/**\n * Particle\n * Author: Hank Hsiao\n */\nclass Particle extends _Event__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(x = 0, y = 0, speed = 0, direction = 0, gravity = 0) {\n    super();\n    this.x = x; // x 座標\n    this.y = y; // y 座標\n    this.vx = Math.cos(direction) * speed; // x 方向的速度\n    this.vy = Math.sin(direction) * speed; // y 方向的速度\n    this.mass = 1; // 質量 (跟 gravitation 有關，不是 gravity)\n    // this.radius =  0; // 半徑\n    this.bounce = -1; // 回彈\n    this.friction = 1; // 摩擦力\n    this.gravity = gravity; // 地心引力 (y 方向的加速度)\n    this.springs = []; //儲存所有 spring (spring 是 paritcle 跟 particle 的彈簧)\n    this.gravitations = []; //儲存所有 gravitation (gravitation 是 paritcle 跟 particle 的引力，跟 gravity 不同)\n  }\n\n  addGravitation(point) {\n    this.removeGravitation(point); // remove 是因為要判斷刪除重覆的關連 (a -> b, b -> a)\n    this.gravitations.push(point);\n  }\n\n  removeGravitation(point) {\n    for (let i = this.gravitations.length - 1; i >= 0; i--) {\n      if (point === this.gravitations[i].point) {\n        this.gravitations.splice(i, 1);\n        return;\n      }\n    }\n  }\n\n  addSpring(point, k, length) {\n    this.removeSpring(point); // remove 是因為要判斷刪除重覆的關連 (a -> b, b -> a)\n    this.springs.push({\n      point: point,\n      k: k,\n      length: length || 0\n    });\n  }\n\n  removeSpring(point) {\n    for (let i = this.springs.length - 1; i >= 0; i--) {\n      if (point === this.springs[i].point) {\n        this.springs.splice(i, 1);\n        return;\n      }\n    }\n  }\n\n  get speed() {\n    return Math.sqrt(this.vx * this.vx + this.vy * this.vy);\n  }\n\n  set speed(speed) {\n    let heading = this.heading;\n    this.vx = Math.cos(heading) * speed;\n    this.vy = Math.sin(heading) * speed;\n  }\n\n  get heading() {\n    return Math.atan2(this.vy, this.vx);\n  }\n\n  // 設定 heading 前需設先設定 speed\n  set heading(heading) {\n    let speed = this.speed;\n    this.vx = Math.cos(heading) * speed;\n    this.vy = Math.sin(heading) * speed;\n  }\n\n  accelerate(ax, ay) {\n    this.vx += ax;\n    this.vy += ay;\n  }\n\n  update() {\n    this.handleSprings();\n    this.handleGravitation();\n    this.vy += this.gravity;\n    this.vx *= this.friction;\n    this.vy *= this.friction;\n    this.x += this.vx;\n    this.y += this.vy;\n  }\n\n  handleSprings() {\n    for (let i = this.springs.length - 1; i >= 0; i--) {\n      let spring = this.springs[i];\n      this.springTo(spring.point, spring.k, spring.length);\n    }\n  }\n\n  handleGravitation() {\n    for (let i = this.gravitations.length - 1; i >= 0; i--) {\n      this.gravitateTo(this.gravitations[i]);\n    }\n  }\n\n  angleTo(p2) {\n    return Math.atan2(p2.y - this.y, p2.x - this.x);\n  }\n\n  distanceTo(p2) {\n    let dx = p2.x - this.x;\n    let dy = p2.y - this.y;\n    return Math.sqrt(dx * dx + dy * dy);\n  }\n\n  gravitateTo(p2) {\n    // 重力加速度: F = (G * M) / (r * r)\n    let dx = p2.x - this.x;\n    let dy = p2.y - this.y;\n    let distSQ = dx * dx + dy * dy;\n    let dist = Math.sqrt(distSQ);\n    let force = p2.mass / distSQ;\n    // let angle = this.angleTo(p2);\n    // let ax =  Math.cos(angle) * force;\n    // let ay =  Math.sin(angle) * force;\n    // 上面這兩行等同於下面這兩行 (我覺得最重要的是要知道 Math.cos(θ) = dx / distance)\n    let ax = (dx / dist) * force;\n    let ay = (dy / dist) * force;\n    this.vx += ax;\n    this.vy += ay;\n  }\n\n  springTo(point, k, length) {\n    // 彈簧公式：F = -kx (這邊是用 F = kx)\n    let dx = point.x - this.x;\n    let dy = point.y - this.y;\n    let distance = Math.sqrt(dx * dx + dy * dy);\n    let springForce = (distance - (length || 0)) * k;\n    // 我覺得最重要的是要知道 Math.cos(θ) = dx / distance\n    this.vx += (dx / distance) * springForce;\n    this.vy += (dy / distance) * springForce;\n  }\n}\n\n\n//# sourceURL=webpack://Youxi/./src/Particle.js?");

/***/ }),

/***/ "./src/Rectangle.js":
/*!**************************!*\
  !*** ./src/Rectangle.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Rectangle; });\n/**\n * Rectangle 定義了矩形的區域\n * 這個類別參考了 PIXI.Rectangle 並修改\n *\n * @class\n * @memberof Youxi\n */\nclass Rectangle {\n  /**\n   * @param {number} [x=0] - The X coordinate of the upper-left corner of the rectangle\n   * @param {number} [y=0] - The Y coordinate of the upper-left corner of the rectangle\n   * @param {number} [width=0] - The overall width of this rectangle\n   * @param {number} [height=0] - The overall height of this rectangle\n   */\n  constructor(x = 0, y = 0, width = 0, height = 0) {\n    this.x = x;\n    this.y = y;\n    this.width = width;\n    this.height = height;\n    this.type = Youxi.SHAPES.RECT;\n  }\n  /**\n   * returns the left edge of the rectangle\n   *\n   * @member {number}\n   */\n  get left() {\n    return this.x;\n  }\n  /**\n   * returns the right edge of the rectangle\n   *\n   * @member {number}\n   */\n  get right() {\n    return this.x + this.width;\n  }\n  /**\n   * returns the top edge of the rectangle\n   *\n   * @member {number}\n   */\n  get top() {\n    return this.y;\n  }\n  /**\n   * returns the bottom edge of the rectangle\n   *\n   * @member {number}\n   */\n  get bottom() {\n    return this.y + this.height;\n  }\n  /**\n   * A constant empty rectangle.\n   *\n   * @static\n   * @constant\n   */\n  static get EMPTY() {\n    return new Rectangle(0, 0, 0, 0);\n  }\n  /**\n   * Creates a clone of this Rectangle\n   *\n   * @return {Youxi.Rectangle} a copy of the rectangle\n   */\n  clone() {\n    return new Rectangle(this.x, this.y, this.width, this.height);\n  }\n  /**\n   * Copies another rectangle to this one.\n   *\n   * @param {Youxi.Rectangle} rectangle - The rectangle to copy.\n   * @return {Youxi.Rectangle} Returns itself.\n   */\n  copy(rectangle) {\n    this.x = rectangle.x;\n    this.y = rectangle.y;\n    this.width = rectangle.width;\n    this.height = rectangle.height;\n    return this;\n  }\n  /**\n   * Checks whether the x and y coordinates given are contained within this Rectangle\n   *\n   * @param {number} x - The X coordinate of the point to test\n   * @param {number} y - The Y coordinate of the point to test\n   * @return {boolean} Whether the x/y coordinates are within this Rectangle\n   */\n  contains(x, y) {\n    if (this.width <= 0 || this.height <= 0) {\n      return false;\n    }\n    if (x >= this.x && x < this.x + this.width) {\n      if (y >= this.y && y < this.y + this.height) {\n        return true;\n      }\n    }\n    return false;\n  }\n  /**\n   * Pads the rectangle making it grow in all directions.\n   *\n   * @param {number} paddingX - The horizontal padding amount.\n   * @param {number} [paddingY] - The vertical padding amount.\n   */\n  pad(paddingX, paddingY) {\n    paddingX = paddingX || 0;\n    paddingY = paddingY || (paddingY !== 0 ? paddingX : 0);\n    this.x -= paddingX;\n    this.y -= paddingY;\n    this.width += paddingX * 2;\n    this.height += paddingY * 2;\n  }\n  /**\n   * Fits this rectangle around the passed one.\n   *\n   * @param {Youxi.Rectangle} rectangle - The rectangle to fit.\n   */\n  fit(rectangle) {\n    if (this.x < rectangle.x) {\n      this.width += this.x;\n      if (this.width < 0) {\n        this.width = 0;\n      }\n      this.x = rectangle.x;\n    }\n    if (this.y < rectangle.y) {\n      this.height += this.y;\n      if (this.height < 0) {\n        this.height = 0;\n      }\n      this.y = rectangle.y;\n    }\n    if (this.x + this.width > rectangle.x + rectangle.width) {\n      this.width = rectangle.width - this.x;\n      if (this.width < 0) {\n        this.width = 0;\n      }\n    }\n    if (this.y + this.height > rectangle.y + rectangle.height) {\n      this.height = rectangle.height - this.y;\n      if (this.height < 0) {\n        this.height = 0;\n      }\n    }\n  }\n  /**\n   * Enlarges this rectangle to include the passed rectangle.\n   *\n   * @param {Youxi.Rectangle} rectangle - The rectangle to include.\n   */\n  enlarge(rectangle) {\n    const x1 = Math.min(this.x, rectangle.x);\n    const x2 = Math.max(this.x + this.width, rectangle.x + rectangle.width);\n    const y1 = Math.min(this.y, rectangle.y);\n    const y2 = Math.max(this.y + this.height, rectangle.y + rectangle.height);\n    this.x = x1;\n    this.width = x2 - x1;\n    this.y = y1;\n    this.height = y2 - y1;\n  }\n};\n\n\n//# sourceURL=webpack://Youxi/./src/Rectangle.js?");

/***/ }),

/***/ "./src/Scene.js":
/*!**********************!*\
  !*** ./src/Scene.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Scene; });\n/**\n * Youxi.Scene\n * Author: Hank Hsiao\n */\nclass Scene {\n  constructor(game) {\n    /**\n     * @property {Youxi.Game} game - 參考到當前正在執行的遊戲\n     */\n    this.game = game;\n\n    /**\n     * @property {Youxi.GameObjectFactory} game - 參考到 GameObjectFactory 用於產生新遊戲物件到世界中\n     */\n    this.add = null;\n\n    /**\n     * @property {Youxi.Loader} load - 參考到 Loader 用於場景中預載遊戲資源\n     */\n    this.load = null;\n  }\n\n  /**\n   * init 為空方法，在 SceneManager start() 後 init 是第一個被呼叫的方法，接著會呼叫 reload 方法。\n   *\n   * @method Youxi.Scene#init\n   */\n  init() {}\n\n  /**\n   * preload 為空方法，用於加載遊戲資源，接著會呼叫 create 方法。\n   *\n   * @method Youxi.Scene#preload\n   */\n  preload() {}\n\n  /**\n   * create 為空方法，用於建立已 preoload 過的遊戲物件，接著會呼叫 update 方法。\n   *\n   * @method Youxi.Scene#create\n   */\n  create() {}\n\n  /**\n   * update 為空方法，遊戲每一偵都會呼叫此方法更新\n   *\n   * @method Youxi.Scene#update\n   */\n  update() {}\n};\n\n\n//# sourceURL=webpack://Youxi/./src/Scene.js?");

/***/ }),

/***/ "./src/SceneManager.js":
/*!*****************************!*\
  !*** ./src/SceneManager.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SceneManager; });\n/**\n * Youxi.SceneManager\n * Author: Hank Hsiao\n */\nclass SceneManager {\n  constructor(game) {\n    this.game = game;\n    this.scenes = {};\n    this.currentScene = null;\n  }\n\n  add(key, scene) {\n    this.scenes[key] = scene;\n    return this;\n  }\n\n  start(key) {\n    this.currentScene = this.scenes[key];\n    this.currentScene.init.call(game);\n    this.currentScene.preload.call(game);\n    this.game.load.start();\n    return this.currentScene;\n  }\n};\n\n\n//# sourceURL=webpack://Youxi/./src/SceneManager.js?");

/***/ }),

/***/ "./src/Sprite.js":
/*!***********************!*\
  !*** ./src/Sprite.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Sprite; });\n/* harmony import */ var _Particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Particle */ \"./src/Particle.js\");\n\n/**\n * GameObject\n * Author: Hank Hsiao\n * extents Particle\n */\nclass Sprite extends _Particle__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(game, x, y, img) {\n    super(x, y); // super(x, y, speed, direction, gravity)\n    this.game = game;\n    this.game.ctx = ctx;\n    this.img = img;\n    this._init();\n  }\n\n  _init() {\n    this.isRotate = true;\n    this.alive = true;\n    this.angle = 0;\n    this.scale = {\n      x: 1,\n      y: 1\n    };\n    this.anchor = {\n      x: 0.5,\n      y: 0.5\n    };\n    this.width = this.img.width;\n    this.height = this.img.height;\n    this.aabb = false;\n  }\n\n  reset(x, y, img) {\n    this.x = x;\n    this.y = y;\n    this.img = img;\n    this.vx = 0;\n    this.vy = 0;\n    this.isRotate = true;\n    this.alive = true;\n    this.angle = 0;\n    this.width = this.img.width;\n    this.height = this.img.height;\n  }\n\n  setRotation(bool) {\n    this.isRotate = bool || true;\n  }\n\n  setAnchor(x, y) {\n    if (arguments.length === 1) {\n      this.anchor.x = this.anchor.y = x;\n    } else {\n      this.anchor.x = x;\n      this.anchor.y = y;\n    }\n  }\n\n  update() {\n    super.update();\n    this.left = this.x - this.width * this.anchor.x;\n    this.top = this.y - this.height * this.anchor.y;\n    this.right = this.left + this.width;\n    this.bottom = this.top + this.height;\n  }\n\n  draw() {\n    this.game.ctx.save();\n    this.game.ctx.translate(this.x, this.y);\n    if (this.isRotate) this.game.ctx.rotate(this.angle);\n    this.game.ctx.scale(this.scale.x, this.scale.y); // scale 功能尚未完善\n    this.game.ctx.drawImage(\n      this.img,\n      -this.width * this.anchor.x,\n      -this.height * this.anchor.y,\n      this.width,\n      this.height\n    );\n    // show aabb box outline\n    if (this.aabb) {\n      // this.game.ctx.strokeStyle = 'red';\n      this.game.ctx.beginPath();\n      this.game.ctx.rect(\n        -this.width * this.anchor.x,\n        -this.height * this.anchor.y,\n        this.width,\n        this.height\n      );\n      this.game.ctx.closePath();\n      this.game.ctx.stroke();\n    }\n    this.game.ctx.restore();\n  }\n\n  kill() {\n    this.alive = false;\n  }\n}\n\n\n//# sourceURL=webpack://Youxi/./src/Sprite.js?");

/***/ }),

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/*! exports provided: SHAPES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SHAPES\", function() { return SHAPES; });\nconst SHAPES = {\n  RECT: 1,\n  CIRC: 2\n};\n\n\n//# sourceURL=webpack://Youxi/./src/const.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: utils, preloader, Event, Game, GameObject, GameObjectFactory, Group, Loader, Particle, Rectangle, Scene, SceneManager, Sprite, SHAPES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const */ \"./src/const.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"SHAPES\", function() { return _const__WEBPACK_IMPORTED_MODULE_0__[\"SHAPES\"]; });\n\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"utils\", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__[\"utils\"]; });\n\n/* harmony import */ var _preloader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./preloader */ \"./src/preloader.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"preloader\", function() { return _preloader__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n/* harmony import */ var _Event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Event */ \"./src/Event.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Event\", function() { return _Event__WEBPACK_IMPORTED_MODULE_3__[\"default\"]; });\n\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Game */ \"./src/Game.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Game\", function() { return _Game__WEBPACK_IMPORTED_MODULE_4__[\"default\"]; });\n\n/* harmony import */ var _GameObject__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./GameObject */ \"./src/GameObject.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"GameObject\", function() { return _GameObject__WEBPACK_IMPORTED_MODULE_5__[\"default\"]; });\n\n/* harmony import */ var _GameObjectFactory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./GameObjectFactory */ \"./src/GameObjectFactory.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"GameObjectFactory\", function() { return _GameObjectFactory__WEBPACK_IMPORTED_MODULE_6__[\"default\"]; });\n\n/* harmony import */ var _Group__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Group */ \"./src/Group.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Group\", function() { return _Group__WEBPACK_IMPORTED_MODULE_7__[\"default\"]; });\n\n/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Loader */ \"./src/Loader.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Loader\", function() { return _Loader__WEBPACK_IMPORTED_MODULE_8__[\"default\"]; });\n\n/* harmony import */ var _Particle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Particle */ \"./src/Particle.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Particle\", function() { return _Particle__WEBPACK_IMPORTED_MODULE_9__[\"default\"]; });\n\n/* harmony import */ var _Rectangle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Rectangle */ \"./src/Rectangle.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Rectangle\", function() { return _Rectangle__WEBPACK_IMPORTED_MODULE_10__[\"default\"]; });\n\n/* harmony import */ var _Scene__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Scene */ \"./src/Scene.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Scene\", function() { return _Scene__WEBPACK_IMPORTED_MODULE_11__[\"default\"]; });\n\n/* harmony import */ var _SceneManager__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./SceneManager */ \"./src/SceneManager.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"SceneManager\", function() { return _SceneManager__WEBPACK_IMPORTED_MODULE_12__[\"default\"]; });\n\n/* harmony import */ var _Sprite__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Sprite */ \"./src/Sprite.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Sprite\", function() { return _Sprite__WEBPACK_IMPORTED_MODULE_13__[\"default\"]; });\n\n/**\n * @namespace Youxi\n */\n\n\n\n\n\n// console.log(utils.max(3, 5));\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://Youxi/./src/index.js?");

/***/ }),

/***/ "./src/preloader.js":
/*!**************************!*\
  !*** ./src/preloader.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return preloader; });\n/**\n *  preloader.js\n *\n *  Author : Hank Hsiao\n *  Version: 1.0.1\n *  Create : 2015.8.18\n *  Update : 2017.06.01\n *  License: MIT\n */\n\nfunction preloader(option) {\n  var queue = {}; //儲存載完的檔案\n  var settings = {\n    manifest: [],\n    onEachLoad: function(info) {\n      console.log('[Preloader] image:' + info.index + ' loaded');\n    },\n    onAllLoad: function(queue) {\n      console.log('[Preloader] all images loaded:' + queue);\n    }\n  };\n\n  // 模擬 option extend settings (淺拷貝)\n  var k;\n  for (k in settings) {\n    if (option[k]) {\n      settings[k] = option[k];\n    }\n  }\n\n  var imgQty = settings.manifest.length; //圖片數量(未載入)\n  var loadedImgQty = 0; //已經載入完成的圖片數量\n  var img;\n  var i;\n\n  function onLoad(index, id, e) {\n    var image = this;\n    loadedImgQty++;\n    var imgInfo = {\n      id: id,\n      index: loadedImgQty,\n      img: image,\n      total: imgQty\n    };\n    settings.onEachLoad(imgInfo);\n    queue[id] = imgInfo;\n    //如果已載入的圖片數量等於圖片總數，表全部載入完成\n    if (loadedImgQty == imgQty) {\n      settings.onAllLoad(queue);\n    }\n  }\n\n  function onError(index, id, e) {\n    var image = this;\n    console.error('[Preloader] not found src = ' + this.src);\n  }\n\n  for (i = 0; i < imgQty; i += 1) {\n    img = new Image();\n    // console.log(img.complete);\n    img.addEventListener(\n      'load',\n      onLoad.bind(img, i, settings.manifest[i].id),\n      false\n    );\n    img.addEventListener(\n      'error',\n      onError.bind(img, i, settings.manifest[i].id),\n      false\n    );\n    img.src = settings.manifest[i].src;\n  }\n};\n\n\n//# sourceURL=webpack://Youxi/./src/preloader.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: utils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"utils\", function() { return utils; });\nconst utils = {\n  // 比較a和b 回傳小的值\n  min: function(a, b) {\n    return a < b ? a : b;\n  },\n\n  // 比較a和b 回傳大的值\n  max: function(a, b) {\n    return a > b ? a : b;\n  },\n\n  // 這個function是要得到value佔總長(max - min)的比例\n  norm: function(value, min, max) {\n    return (value - min) / (max - min);\n  },\n\n  // 給一個0~1的百分比(norm)，得到min~max之間的值。\n  lerp: function(norm, min, max) {\n    return (max - min) * norm + min;\n  },\n\n  // 整合上面兩個，取得value的比例，再將比例對應到新的區段。\n  map: function(value, sourceMin, sourceMax, destMin, destMax) {\n    return utils.lerp(\n      utils.norm(value, sourceMin, sourceMax),\n      destMin,\n      destMax\n    );\n  },\n\n  // 限制 value 在 min~max 間 (簡寫)\n  clamp: function(value, min, max) {\n    // 正常判斷版\n    return utils.min(utils.max(value, min), max);\n\n    // 強化判斷版 (因 min 或 max 有可能為負數或寫反，這個做法讓 min 和 max 一定為最低和最高)\n    // return utils.min(utils.max(value, utils.min(min, max)), utils.max(min, max));\n  },\n\n  //取得兩點間的距離1\n  distance: function(p0, p1) {\n    var dx = p1.x - p0.x,\n      dy = p1.y - p0.y;\n    return Math.sqrt(dx * dx + dy * dy);\n  },\n\n  // 取得兩點間的距離2\n  distanceXY: function(x0, y0, x1, y1) {\n    var dx = x1 - x0,\n      dy = y1 - y0;\n    return Math.sqrt(dx * dx + dy * dy);\n  },\n\n  // 碰撞檢測: 圓和圓\n  circleCollision: function(c0, c1) {\n    return utils.distance(c0, c1) <= c0.radius + c1.radius;\n  },\n\n  // 碰撞檢測: 圓和點\n  circlePointCollision: function(x, y, circle) {\n    return utils.distanceXY(x, y, circle.x, circle.y) <= circle.radius;\n  },\n\n  // 碰撞檢測: 點是否在矩形裡\n  pointInRect: function(x, y, rect) {\n    // P.S. 因 rect.width 有可能輸入負數，所以在 inRange() 建議用強化版\n    return (\n      utils.inRange(x, rect.x, rect.x + rect.width) &&\n      utils.inRange(y, rect.y, rect.y + rect.height)\n    );\n  },\n\n  /**\n   * [判斷 value 是否在最大及最小值之間]\n   * @param  {Number} value [檢查的數值]\n   * @param  {Number} min   [最小值]\n   * @param  {Number} max   [最大值]\n   * @return {Boolean}       [是否在最大及最小值之間?]\n   */\n  inRange: function(value, min, max) {\n    // 正常判斷版\n    // return value >= min && value <= max;\n\n    // 強化判斷版 (因 min 或 max 有可能為負數，這個做法讓 min 和 max 一定為最低和最高)\n    return value >= utils.min(min, max) && value <= utils.max(min, max);\n  },\n\n  /**\n   * [範圍相交檢測: 判斷在直線上的兩線段是否相交]\n   * @param  {Number} min0 [線段0的最小值]\n   * @param  {Number} max0 [線段0的最大值]\n   * @param  {Number} min1 [線段1的最小值]\n   * @param  {Number} max1 [線段1的最大值]\n   * @return {Boolean}      [是否相交?]\n   */\n  rangeIntersect: function(min0, max0, min1, max1) {\n    // 正常判斷版\n    return max0 >= min1 && min0 <= max1;\n\n    // 強化判斷版\n    // return utils.max(min0, max0) >= utils.min(min1, max1) &&\n    //        utils.min(min0, max0) <= utils.max(min1, max1);\n  },\n\n  /**\n   * [碰撞檢測: 矩形和矩形是否相交]\n   * @param  {rect} r0 [矩形0]\n   * @param  {rect} r1 [矩形1]\n   * @return {Boolean}    [矩形和矩形是否相交?]\n   */\n  rectIntersect: function(r0, r1) {\n    // P.S. 因 rect.width 有可能輸入負數，所以在 rangeIntersect() 建議用強化版\n    return (\n      utils.rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) &&\n      utils.rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height)\n    );\n  },\n\n  /**\n   * [碰撞檢測: 矩形和矩形是否相交 for GameObject ]\n   * @param  {rect} r0 [矩形0]\n   * @param  {rect} r1 [矩形1]\n   * @return {Boolean}    [矩形和矩形是否相交?]\n   */\n  rectOverlap: function(r0, r1) {\n    // P.S. 因 rect.width 有可能輸入負數，所以在 rangeIntersect() 建議用強化版\n    return (\n      utils.rangeIntersect(\n        r0.left,\n        r0.left + r0.width,\n        r1.left,\n        r1.left + r1.width\n      ) &&\n      utils.rangeIntersect(\n        r0.top,\n        r0.top + r0.height,\n        r1.top,\n        r1.top + r1.height\n      )\n    );\n  },\n\n  /**\n   * [碰撞檢測: 圓和矩形是否相交 for GameObject ]\n   * @param  {rect} circle [圓形]\n   * @param  {rect} rect [矩形]\n   * @return {Boolean}    [相交?]\n   */\n  circleRectOverlap: function(circle, rect) {\n    // 在矩形上找出與圓最近的點 closest\n    var closest = {\n      x: utils.clamp(circle.x, rect.left, rect.right),\n      y: utils.clamp(circle.y, rect.top, rect.bottom)\n    };\n    var distanceX = circle.x - closest.x;\n    var distanceY = circle.y - closest.y;\n    var distanceSquared = distanceX * distanceX + distanceY * distanceY;\n    return distanceSquared < circle.radius * circle.radius;\n  },\n\n  /**\n   * [隨機取得 min ~ max 間的數值(含小數點)]\n   * @param  {Number} min\n   * @param  {Number} max\n   * @return {Number}\n   */\n  randomRange: function(min, max) {\n    return min + Math.random() * (max - min);\n  },\n\n  /**\n   * [隨機取得 min ~ max 間的數值(整數)]\n   * @param  {Number} min\n   * @param  {Number} max\n   * @return {Number}\n   */\n  randomInt: function(min, max) {\n    return Math.floor(min + Math.random() * (max - min + 1));\n  },\n\n  /**\n   * [隨機取得 min ~ max 間的數值 (常態分布)]\n   * @param  {Number} min\n   * @param  {Number} max\n   * @param  {Number} iterations [取樣次數 越多越接近常態分布，建議 < 10 ]\n   * @return {Number}\n   */\n  randomDist: function(min, max, iterations) {\n    var total = 0;\n    for (var i = 0; i < iterations; i++) {\n      total += utils.randomRange(min, max);\n    }\n    return total / iterations;\n  },\n\n  /**\n   * [角度轉弧度]\n   * @param  {Number} degrees [角度]\n   * @return {Number}         [弧度]\n   */\n  degreesToRads: function(degrees) {\n    return (degrees / 180) * Math.PI;\n  },\n\n  /**\n   * [弧度轉角度]\n   * @param  {Number} degrees [弧度]\n   * @return {Number}         [角度]\n   */\n  radsToDegrees: function(radians) {\n    return (radians * 180) / Math.PI;\n  },\n\n  /**\n   * [四捨五入取到小數以下n位]\n   * @param  {Number} value  [浮點數]\n   * @param  {Number} places [取到小數第n位]\n   * @return {Number}\n   */\n  roundToPlaces: function(value, places) {\n    var mult = Math.pow(10, places);\n    return Math.round(value * mult) / mult;\n  },\n\n  roundNearest: function(value, nearest) {\n    return Math.round(value / nearest) * nearest;\n  },\n\n  /**\n   * [二次貝茲曲線]\n   * @param  {particle Object} p0      [起始點]\n   * @param  {particle Object} p1      [控制點]\n   * @param  {particle Object} p2      [結束點]\n   * @param  {Number}          t       [步驟百分比 介於 0 ~ 1 的浮點數]\n   * @param  {particle Object} pFinal  [(option)上一個 pFinal]\n   * @return {Object}                  [返回一個帶有 x y 特性的物件]\n   */\n  quadraticBezier: function(p0, p1, p2, t, pFinal) {\n    pFinal = pFinal || {};\n    pFinal.x =\n      Math.pow(1 - t, 2) * p0.x + 2 * t * (1 - t) * p1.x + t * t * p2.x;\n    pFinal.y =\n      Math.pow(1 - t, 2) * p0.y + 2 * t * (1 - t) * p1.y + t * t * p2.y;\n    return pFinal;\n  },\n\n  /**\n   * [三次貝茲曲線]\n   * @param  {particle Object} p0      [起始點]\n   * @param  {particle Object} p1      [控制點1]\n   * @param  {particle Object} p2      [控制點2]\n   * @param  {particle Object} p3      [結束點]\n   * @param  {Number}          t       [步驟百分比 介於 0 ~ 1 的浮點數]\n   * @param  {particle Object} pFinal  [(option)上一個 pFinal]\n   * @return {Object}                  [返回一個帶有 x y 特性的物件]\n   */\n  cubicBezier: function(p0, p1, p2, p3, t, pFinal) {\n    pFinal = pFinal || {};\n    pFinal.x =\n      Math.pow(1 - t, 3) * p0.x +\n      Math.pow(1 - t, 2) * 3 * t * p1.x +\n      (1 - t) * 3 * t * t * p2.x +\n      t * t * t * p3.x;\n    pFinal.y =\n      Math.pow(1 - t, 3) * p0.y +\n      Math.pow(1 - t, 2) * 3 * t * p1.y +\n      (1 - t) * 3 * t * t * p2.y +\n      t * t * t * p3.y;\n    return pFinal;\n  },\n\n  /**\n   * [多次貝茲曲線(用較簡單的方式模擬四次以上貝茲，跟實際的多次貝茲不太相同)]\n   * @param  {[type]} points  [description]\n   * @param  {[type]} context [description]\n   * @return {[type]}         [description]\n   */\n  multicurve: function(points, context) {\n    var p0, p1, midx, midy;\n    var pLen = points.length;\n\n    context.moveTo(points[0].x, points[0].y);\n\n    for (var i = 1; i < pLen - 2; i++) {\n      var p0 = points[i];\n      var p1 = points[i + 1];\n      midx = (p0.x + p1.x) / 2;\n      midy = (p0.y + p1.y) / 2;\n      context.quadraticCurveTo(p0.x, p0.y, midx, midy);\n    }\n    //將最後兩點連起來\n    context.quadraticCurveTo(\n      points[pLen - 2].x,\n      points[pLen - 2].y,\n      points[pLen - 1].x,\n      points[pLen - 1].y\n    );\n  }\n};\n\n\n\n//# sourceURL=webpack://Youxi/./src/utils.js?");

/***/ })

/******/ });