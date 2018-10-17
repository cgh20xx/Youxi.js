import GameObject from './GameObject';
/**
 * Group
 * Author: Hank Hsiao
 */
export default class Group extends GameObject {
  constructor(game, x, y) {
    super(game, x, y);
    this.pool = [];
  }

  add(gameObject) {
    this.pool.push(gameObject); // gameObject has alive property
  }

  getFirstAlive(gameObject) {
    return this.pool.filter(function(obj) {
      return obj.alive === true;
    })[0];
  }

  getFirstDead(gameObject) {
    return this.pool.filter(function(obj) {
      return obj.alive === false;
    })[0];
  }

  forEach(callback, thisArg) {
    for (var i = 0, len = this.pool.length; i < len; i++) {
      if (callback.call(thisArg, this.pool[i], i, this.pool) === false) break;
    }
  }

  forEachAlive(callback, thisArg) {
    for (var i = 0, len = this.pool.length; i < len; i++) {
      if (this.pool[i].alive === true) {
        if (callback.call(thisArg, this.pool[i], i, this.pool) === false) break;
      }
    }
  }

  forEachDead(callback, thisArg) {
    for (var i = 0, len = this.pool.length; i < len; i++) {
      if (this.pool[i].alive === false) {
        if (callback.call(thisArg, this.pool[i], i, this.pool) === false) break;
      }
    }
  }

  get size() {
    return this.pool.length;
  }

  clear() {
    this.pool.length = 0;
  }
}

// run test function
Group.test = function() {
  console.log('===== test Group start ======');
  objs = [
    { id: 'a', alive: false },
    { id: 'b', alive: true },
    { id: 'c', alive: true },
    { id: 'd', alive: true },
    { id: 'e', alive: false }
  ];
  var pool = new Group();
  objs.forEach(function(obj) {
    pool.add(obj);
  });
  console.log(pool);

  console.log('first alive:');
  var aliveObj = pool.getFirstAlive();
  console.log(aliveObj);

  console.log('first dead:');
  var deadObj = pool.getFirstDead();
  console.log(deadObj);

  console.log('each alive:');
  pool.forEachAlive(function(obj, index, arr) {
    console.log(obj.id, index, arr);
  });

  console.log('each dead:');
  pool.forEachDead(function(obj, index, arr) {
    console.log(obj.id, index, arr);
  });

  console.log('size:', pool.size);

  console.log('clear pool');
  pool.clear();

  console.log('size:', pool.size);
  console.log(pool.pool);

  console.log('===== test Group end ======');
};
