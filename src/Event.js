/**
 * Youxi.Event
 * Author: Hank Hsiao
 * Reference: https://github.com/component/emitter/blob/master/index.js
 */
export default class Event {
  constructor(obj) {
    if (obj) {
      return Youxi.Event.copy(obj);
    }
  }

  static copy(obj) {
    for (let key in Youxi.Event.prototype) {
      obj[key] = Youxi.Event.prototype[key];
    }
    return obj;
  }

  /**
   * Listen on the given `event` with `fn`.
   *
   * @param {String} event - event name
   * @param {Function} fn
   * @return {Youxi.Event}
   * @api public
   */
  on(event, fn) {
    this.subscribers = this.subscribers || {};
    if (typeof this.subscribers[event] === 'undefined') {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(fn);

    return this;
  }

  /**
   * Trigger `event` with given args.
   * @param  {String} event - event name
   * @param  {Any} optional args
   * @return {Youxi.Event}
   */
  once(event, fn) {
    function on() {
      this.off(event, on);
      fn.apply(this, arguments);
    }

    on.fn = fn;
    this.on(event, on);
    return this;
  }

  /**
   * Trigger `event` with given args.
   * @param  {String} event - event name
   * @param  {Any} optional args
   * @return {Youxi.Event}
   */
  off(event, fn) {
    this.subscribers = this.subscribers || {};

    // condition 1: no arguments
    // remove all event
    if (arguments.length === 0) {
      this.subscribers = {};
      return this;
    }

    // find specific event
    let callbacks = this.subscribers[event];
    if (!callbacks) return this;

    // condition 2: 1 arguments
    // remove specific event and  handler
    if (arguments.length === 1) {
      delete this.subscribers[event];
      return this;
    }

    // condition 3: 2 arguments
    // remove 1 specific handler of event
    for (let i = callbacks.length - 1; i >= 0; i--) {
      let cb = callbacks[i];
      if (cb === fn) {
        callbacks.splice(i, 1);
        break;
      }
    }

    return this;
  }

  /**
   * Trigger `event` with given args.
   * @param  {String} event - event name
   * @param  {Any} optional args
   * @return {Youxi.Event}
   */
  trigger(event) {
    this.subscribers = this.subscribers || {};
    let args = [].slice.call(arguments, 1);
    let callbacks = this.subscribers[event];
    if (callbacks) {
      callbacks.forEach(function(func) {
        func.apply(this, args);
      }, this);
    }
    return this;
  }

  /**
   * Return array of callbacks for `event`.
   * @param {String} event - event name
   * @return {Array}
   */
  listeners(event) {
    this.subscribers = this.subscribers || {};
    return this.subscribers[event] || [];
  }

  /**
   * Check if this emitter has `event` handlers.
   * @param {String} event - event name
   * @return {Boolean}
   */
  hasListeners(event) {
    return !!this.listeners(event).length;
  }
};
