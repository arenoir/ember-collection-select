import Ember from 'ember';

const IS_MAC        = /Mac/.test(navigator.userAgent);
const KEY_A         = 65;
const KEY_COMMA     = 188;
const KEY_RETURN    = 13;
const KEY_ESC       = 27;
const KEY_LEFT      = 37;
const KEY_UP        = 38;
const KEY_P         = 80;
const KEY_RIGHT     = 39;
const KEY_DOWN      = 40;
const KEY_N         = 78;
const KEY_BACKSPACE = 8;
const KEY_DELETE    = 46;
const KEY_SHIFT     = 16;
const KEY_CMD       = IS_MAC ? 91 : 17;
const KEY_CTRL      = IS_MAC ? 18 : 17;
const KEY_TAB       = 9;
const TAG_SELECT    = 1;
const TAG_INPUT     = 2;

// for now, android support in general is too spotty to support validity
const SUPPORTS_VALIDITY_API = !/android/i.test(window.navigator.userAgent) && !!document.createElement('form').validity;


export default Ember.TextField.extend({

  keyPress: function(e) {
    var digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return false;
    }
    
    var el = this.$();
    if (hasTextSelected(el)) {
      return true;
    }
    
    var value = el.val() + digit;
    return inputValid(value);
  }

});
