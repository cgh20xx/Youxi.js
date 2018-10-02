var utils = {
  // 比較a和b 回傳小的值
  min: function(a, b) {
    return a < b ? a : b;
  },

  // 比較a和b 回傳大的值
  max: function(a, b) {
    return a > b ? a : b;
  },

  // 這個function是要得到value佔總長(max - min)的比例
  norm: function(value, min, max) {
    return (value - min) / (max - min);
  },

  // 給一個0~1的百分比(norm)，得到min~max之間的值。
  lerp: function(norm, min, max) {
    return (max - min) * norm + min;
  },

  // 整合上面兩個，取得value的比例，再將比例對應到新的區段。
  map: function(value, sourceMin, sourceMax, destMin, destMax) {
    return utils.lerp(
      utils.norm(value, sourceMin, sourceMax),
      destMin,
      destMax
    );
  },

  // 限制 value 在 min~max 間 (簡寫)
  clamp: function(value, min, max) {
    // 正常判斷版
    return utils.min(utils.max(value, min), max);

    // 強化判斷版 (因 min 或 max 有可能為負數或寫反，這個做法讓 min 和 max 一定為最低和最高)
    // return utils.min(utils.max(value, utils.min(min, max)), utils.max(min, max));
  },

  //取得兩點間的距離1
  distance: function(p0, p1) {
    var dx = p1.x - p0.x,
      dy = p1.y - p0.y;
    return Math.sqrt(dx * dx + dy * dy);
  },

  // 取得兩點間的距離2
  distanceXY: function(x0, y0, x1, y1) {
    var dx = x1 - x0,
      dy = y1 - y0;
    return Math.sqrt(dx * dx + dy * dy);
  },

  // 碰撞檢測: 圓和圓
  circleCollision: function(c0, c1) {
    return utils.distance(c0, c1) <= c0.radius + c1.radius;
  },

  // 碰撞檢測: 圓和點
  circlePointCollision: function(x, y, circle) {
    return utils.distanceXY(x, y, circle.x, circle.y) <= circle.radius;
  },

  // 碰撞檢測: 點是否在矩形裡
  pointInRect: function(x, y, rect) {
    // P.S. 因 rect.width 有可能輸入負數，所以在 inRange() 建議用強化版
    return (
      utils.inRange(x, rect.x, rect.x + rect.width) &&
      utils.inRange(y, rect.y, rect.y + rect.height)
    );
  },

  /**
   * [判斷 value 是否在最大及最小值之間]
   * @param  {Number} value [檢查的數值]
   * @param  {Number} min   [最小值]
   * @param  {Number} max   [最大值]
   * @return {Boolean}       [是否在最大及最小值之間?]
   */
  inRange: function(value, min, max) {
    // 正常判斷版
    // return value >= min && value <= max;

    // 強化判斷版 (因 min 或 max 有可能為負數，這個做法讓 min 和 max 一定為最低和最高)
    return value >= utils.min(min, max) && value <= utils.max(min, max);
  },

  /**
   * [範圍相交檢測: 判斷在直線上的兩線段是否相交]
   * @param  {Number} min0 [線段0的最小值]
   * @param  {Number} max0 [線段0的最大值]
   * @param  {Number} min1 [線段1的最小值]
   * @param  {Number} max1 [線段1的最大值]
   * @return {Boolean}      [是否相交?]
   */
  rangeIntersect: function(min0, max0, min1, max1) {
    // 正常判斷版
    return max0 >= min1 && min0 <= max1;

    // 強化判斷版
    // return utils.max(min0, max0) >= utils.min(min1, max1) &&
    //        utils.min(min0, max0) <= utils.max(min1, max1);
  },

  /**
   * [碰撞檢測: 矩形和矩形是否相交]
   * @param  {rect} r0 [矩形0]
   * @param  {rect} r1 [矩形1]
   * @return {Boolean}    [矩形和矩形是否相交?]
   */
  rectIntersect: function(r0, r1) {
    // P.S. 因 rect.width 有可能輸入負數，所以在 rangeIntersect() 建議用強化版
    return (
      utils.rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) &&
      utils.rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height)
    );
  },

  /**
   * [碰撞檢測: 矩形和矩形是否相交 for GameObject ]
   * @param  {rect} r0 [矩形0]
   * @param  {rect} r1 [矩形1]
   * @return {Boolean}    [矩形和矩形是否相交?]
   */
  rectOverlap: function(r0, r1) {
    // P.S. 因 rect.width 有可能輸入負數，所以在 rangeIntersect() 建議用強化版
    return (
      utils.rangeIntersect(
        r0.left,
        r0.left + r0.width,
        r1.left,
        r1.left + r1.width
      ) &&
      utils.rangeIntersect(
        r0.top,
        r0.top + r0.height,
        r1.top,
        r1.top + r1.height
      )
    );
  },

  /**
   * [碰撞檢測: 圓和矩形是否相交 for GameObject ]
   * @param  {rect} circle [圓形]
   * @param  {rect} rect [矩形]
   * @return {Boolean}    [相交?]
   */
  circleRectOverlap: function(circle, rect) {
    // 在矩形上找出與圓最近的點 closest
    var closest = {
      x: utils.clamp(circle.x, rect.left, rect.right),
      y: utils.clamp(circle.y, rect.top, rect.bottom)
    };
    var distanceX = circle.x - closest.x;
    var distanceY = circle.y - closest.y;
    var distanceSquared = distanceX * distanceX + distanceY * distanceY;
    return distanceSquared < circle.radius * circle.radius;
  },

  /**
   * [隨機取得 min ~ max 間的數值(含小數點)]
   * @param  {Number} min
   * @param  {Number} max
   * @return {Number}
   */
  randomRange: function(min, max) {
    return min + Math.random() * (max - min);
  },

  /**
   * [隨機取得 min ~ max 間的數值(整數)]
   * @param  {Number} min
   * @param  {Number} max
   * @return {Number}
   */
  randomInt: function(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
  },

  /**
   * [隨機取得 min ~ max 間的數值 (常態分布)]
   * @param  {Number} min
   * @param  {Number} max
   * @param  {Number} iterations [取樣次數 越多越接近常態分布，建議 < 10 ]
   * @return {Number}
   */
  randomDist: function(min, max, iterations) {
    var total = 0;
    for (var i = 0; i < iterations; i++) {
      total += utils.randomRange(min, max);
    }
    return total / iterations;
  },

  /**
   * [角度轉弧度]
   * @param  {Number} degrees [角度]
   * @return {Number}         [弧度]
   */
  degreesToRads: function(degrees) {
    return (degrees / 180) * Math.PI;
  },

  /**
   * [弧度轉角度]
   * @param  {Number} degrees [弧度]
   * @return {Number}         [角度]
   */
  radsToDegrees: function(radians) {
    return (radians * 180) / Math.PI;
  },

  /**
   * [四捨五入取到小數以下n位]
   * @param  {Number} value  [浮點數]
   * @param  {Number} places [取到小數第n位]
   * @return {Number}
   */
  roundToPlaces: function(value, places) {
    var mult = Math.pow(10, places);
    return Math.round(value * mult) / mult;
  },

  roundNearest: function(value, nearest) {
    return Math.round(value / nearest) * nearest;
  },

  /**
   * [二次貝茲曲線]
   * @param  {particle Object} p0      [起始點]
   * @param  {particle Object} p1      [控制點]
   * @param  {particle Object} p2      [結束點]
   * @param  {Number}          t       [步驟百分比 介於 0 ~ 1 的浮點數]
   * @param  {particle Object} pFinal  [(option)上一個 pFinal]
   * @return {Object}                  [返回一個帶有 x y 特性的物件]
   */
  quadraticBezier: function(p0, p1, p2, t, pFinal) {
    pFinal = pFinal || {};
    pFinal.x =
      Math.pow(1 - t, 2) * p0.x + 2 * t * (1 - t) * p1.x + t * t * p2.x;
    pFinal.y =
      Math.pow(1 - t, 2) * p0.y + 2 * t * (1 - t) * p1.y + t * t * p2.y;
    return pFinal;
  },

  /**
   * [三次貝茲曲線]
   * @param  {particle Object} p0      [起始點]
   * @param  {particle Object} p1      [控制點1]
   * @param  {particle Object} p2      [控制點2]
   * @param  {particle Object} p3      [結束點]
   * @param  {Number}          t       [步驟百分比 介於 0 ~ 1 的浮點數]
   * @param  {particle Object} pFinal  [(option)上一個 pFinal]
   * @return {Object}                  [返回一個帶有 x y 特性的物件]
   */
  cubicBezier: function(p0, p1, p2, p3, t, pFinal) {
    pFinal = pFinal || {};
    pFinal.x =
      Math.pow(1 - t, 3) * p0.x +
      Math.pow(1 - t, 2) * 3 * t * p1.x +
      (1 - t) * 3 * t * t * p2.x +
      t * t * t * p3.x;
    pFinal.y =
      Math.pow(1 - t, 3) * p0.y +
      Math.pow(1 - t, 2) * 3 * t * p1.y +
      (1 - t) * 3 * t * t * p2.y +
      t * t * t * p3.y;
    return pFinal;
  },

  /**
   * [多次貝茲曲線(用較簡單的方式模擬四次以上貝茲，跟實際的多次貝茲不太相同)]
   * @param  {[type]} points  [description]
   * @param  {[type]} context [description]
   * @return {[type]}         [description]
   */
  multicurve: function(points, context) {
    var p0, p1, midx, midy;
    var pLen = points.length;

    context.moveTo(points[0].x, points[0].y);

    for (var i = 1; i < pLen - 2; i++) {
      var p0 = points[i];
      var p1 = points[i + 1];
      midx = (p0.x + p1.x) / 2;
      midy = (p0.y + p1.y) / 2;
      context.quadraticCurveTo(p0.x, p0.y, midx, midy);
    }
    //將最後兩點連起來
    context.quadraticCurveTo(
      points[pLen - 2].x,
      points[pLen - 2].y,
      points[pLen - 1].x,
      points[pLen - 1].y
    );
  }
};
