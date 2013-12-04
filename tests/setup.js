mocha.ui('bdd');

var assert = chai.assert;

var press = (function () {
  var kb = keyvent.on(window);
  return function (keys) {
    var downUp = function (key) { kb.down(key); kb.up(key); };
    if (isNaN(keys)) keys.split(' ').forEach(downUp);
    else downUp(keys);
  };
})();

var noop = function () {};