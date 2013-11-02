# cheet.js

## easy easter eggs in the browser

### Examples

```javascript
cheet('i d d q d', function () {
  alert('god mode enabled');
});
```

```javascript
cheet('up up down down left right left right b a', {
  next: function (str, key, num, seq) {
    console.log('key pressed: ' + key);
    console.log('progress: ' + num / seq.length);
    console.log('seq: ' + seq.join(' '));
  },

  fail: function () {
    console.log('sequence failed');
  },

  done: function () {
    console.log('+30 lives ;)');
  }
});
```

### Demo

[My personal site](http://namuol.github.io) uses cheet.js (Try the [Konami Code](http://en.wikipedia.org/wiki/Konami_Code))

### Install

#### bower

    bower install cheet.js

&nbsp;

    <script src="bower_components/cheet.js/cheet.min.js" type="text/javascript"></script>

### API

<a name='api_cheet'></a>
#### [`cheet(sequence, done | {next,fail,done})`](#api_cheet)

> `sequence` (String)
> > A string representation of a sequence of [key names](#available-key-names).
> > 
> > Each keyname must be separated by a single space.
> 
> `done(str, seq)` (callback)
> > A callback to execute each time the sequence is correctly pressed.
> > 
> > Arguments:
> > * `str` - The string representation of the sequence that completed.
> > * `seq` - An array of [key names](#available-key-names) representing the sequence that completed.
> 
> `fail(str, seq)` (callback)
> > A callback to execute each time a sequence's progress is broken.
> > 
> > Arguments:
> > * `str` - The string representation of the sequence that completed.
> > * `seq` - An array of [key names](#available-key-names) representing the sequence that was pressed.
> 
> `next(str, key, num, seq)` (callback)
> > A callback to execute each time a correct key in the sequence is pressed.
> > 
> > Arguments:
> > * `str` - The string representation of the sequence that completed.
> > * `key` - The [name of the key](#available-key-names) that was just pressed.
> > * `num` - A number representing the current progress of the sequence. (starts at 0)
> > * `seq` - An array of [key names](#available-key-names) representing the sequence that is in progress.

### Available Key Names

**NOTE**: Key names are case-sensitive

#### Directionals
* `left`
* `L` (alias for `left`)
* `up`
* `U` (alias for `up`)
* `right`
* `R` (alias for `right`)
* `down`
* `D` (alias for `down`)

#### Alphanumeric
* `0`-`9` (main number keys)
* `a`-`z`

#### Misc 
* `backspace`
* `tab`
* `enter`
* `return` (alias for `enter`)
* `shift`
* `ctrl`
* `alt`
* `pause`
* `capslock`
* `esc`
* `space`
* `pageup`
* `pagedown`
* `end`
* `home`
* `insert`
* `delete`
* `equal`
* `=` (alias for `equal`)
* `comma`
* `,` (alias for `comma`)
* `minus`
* `-` (alias for `minus`)
* `period`
* `.` (alias for `period`)

#### Keypad
* `kp_0`-`kp_9`
* `kp_multiply`
* `kp_plus`
* `kp_minus`
* `kp_decimal`
* `kp_divide`

#### Function keys
* `f1`-`f12`

### TODO

Automated tests and travis-ci integration.
