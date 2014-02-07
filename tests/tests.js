describe('cheet.js', function () {

  afterEach(function reset() {
    // need a better way of resetting cheet.
    // maybe cheet.reset()?
    ['a b c', 'd e f']
    .forEach(cheet.disable);
    cheet.next(noop);
    cheet.done(noop);
    cheet.fail(noop);
  });

  describe('specific sequence', function () {

    it('calls "next" as the sequence progresses', function (done) {
      var count = 0;
      cheet('a b c', { next: function () { (++count === 3) && done(); }});
      press('a b c');
    });

    it('calls "done" when the sequence is completed successfully', function (done) {
      cheet('a b c', function () { done(); });
      press('a b c');
    });

    it('calls "fail" when the sequence\'s progress is broken', function (done) {
      cheet('a b c', { fail: function () { done(); } });
      press('a b 1');
    });

  });

  describe('global', function () {

    it('calls "next" as any sequence progresses', function (done) {
      var count = 0;
      cheet.next(function () { (++count === 6) && done(); });
      cheet('a b c');
      cheet('d e f');
      press('a b c');
      press('d e f');
    });

    it('calls "done" when any sequence is completed successfully', function (done) {
      cheet.done(function () { done(); });
      cheet('a b c');
      press('a b c');
    });

    it('calls "fail" any sequence\'s progress is broken', function (done) {
      cheet.fail(function () { done(); });
      cheet('a b c');
      press('a b 1');
    });

  });

  describe('#disable', function () {
    it('disables the given sequence', function () {
      var count = 0;
      cheet('o n c e', function () {
        count++;
        cheet.disable('o n c e');
      });
      press('o n c e');
      press('o n c e');
      assert.equal(1, count);
    });
  });

  describe('#reset', function () {
    it('resets the given sequence', function () {
      var count = 0;
      cheet('r e s e t', function () {
        count++;
      });
      press('r e s e t');
      assert.equal(1, count);
      press('r e s');
      cheet.reset('r e s e t');
      press('e t');
      assert.equal(1, count);
      press('r e s e t');
      assert.equal(2, count);
    });
  });

  describe('key aliases', function () {
    var keys = {
      backspace: 8,
      tab: 9,
      enter: 13, 'return': 13,
      shift: 16, '⇧': 16,
      control: 17, ctrl: 17, '⌃': 17,
      alt: 18, option: 18, '⌥': 18,
      pause: 19,
      capslock: 20,
      esc: 27,
      space: 32,
      pageup: 33,
      pagedown: 34,
      end: 35,
      home: 36,
      left: 37, L: 37, '←': 37,
      up: 38, U: 38, '↑': 38,
      right: 39, R: 39, '→': 39,
      down: 40, D: 40, '↓': 40,
      insert: 45,
      'delete': 46,
      '⌘': 91, command: 91,
      kp_0: 96,
      kp_1: 97,
      kp_2: 98,
      kp_3: 99,
      kp_4: 100,
      kp_5: 101,
      kp_6: 102,
      kp_7: 103,
      kp_8: 104,
      kp_9: 105,
      kp_multiply: 106,
      kp_plus: 107,
      kp_minus: 109,
      kp_decimal: 110,
      kp_divide: 111,
      f1: 112,
      f2: 113,
      f3: 114,
      f4: 115,
      f5: 116,
      f6: 117,
      f7: 118,
      f8: 119,
      f9: 120,
      f10: 121,
      f11: 122,
      f12: 123,
      equal: 187,
      '=': 187,
      comma: 188,
      ',': 188,
      minus: 189,
      '-': 189,
      period: 190,
      '.': 190
    };

    var test = function (key) { return function (done) {
      cheet(key, function () { done(); });
      press(keys[key]);
      cheet.disable(key);
    };};

    for (var key in keys) { it('reacts to '+key, test(key)); }
  });
});
