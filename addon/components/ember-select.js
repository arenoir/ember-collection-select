import Ember from 'ember';
import score from 'ember-select/utils/score';
import layout from '../templates/components/ember-select';

const {Component, computed, isBlank} = Ember;

export default Component.extend({
  classNames: ['ember-select'],
  classNameBindings: ['isOpen'],
  layout: layout,

  searchTerm: null,
  content: null,
  multiple: false,
  isOpen: false,
  hasSelection: computed.notEmpty('selection'),

  scoreFunction: computed(function() {
    return function(term, item) {
      var word = item.word;

      return score(word, term);
    };
  }),

  _content: computed('searchTerm', 'content.@each', function() {
    var searchTerm    = this.get('searchTerm');
    var content       = this.get('content');
    var scoreFunction = this.get('scoreFunction');
    var scored; 

    if (isBlank(searchTerm)) {
      return content;
    }

    scored = content.reduce(function(_scored, item, index) { 
      var score = scoreFunction(searchTerm, item);
      if (score > 0) {
        _scored.push({
          score: score,
          index: index
        });
      }
      return _scored;
    },[]);

    scored.sort(function(a, b) {
      return b.score - a.score;
    });

    var indexes = scored.map(function(i) {
      return i.index;
    });

    return Ember.A(content.objectsAt(indexes));
  }),

  didInsertElement: function () {
    var width = this.$().width() - 2; //border
    this.set('_width', width);
  },

  addSelection: function(item) {
    var multiple  = this.get('multiple');
    var selection = this.get('selection');

    if (multiple) {
      selection = selection || Ember.A([]);
      selection.push(item);
    } else {
      selection = item;
    }

    this.set('selection', selection);
  },



  /**
  * Closes the dropdown when focus changes to another element outside
  * or if focus lost by clicking outside. Bound to focusOut.
  *
  * @method lostFocus
  */
  // lostFocus: Ember.on('focusOut', function() {
  //   if(this.get('isOpen')) {
  //     Ember.run.later(this, function() {
  //       var focussedElement = document.activeElement;
  //       var target = this.$();
  //       if (target) {
  //         var isFocussedOut = target.has(focussedElement).length === 0 && !target.is(focussedElement);

  //         if(isFocussedOut) {
  //           this.set('isOpen', false);
  //         }
  //       }
  //     }, 0);
  //   }
  // }),

  /**
  * Handles the keydown event once the component gains focus.
  * Bound to keydown.
  *
  * @method navigateOnKeyDown
  */
  navigateOnKeyDown: Ember.on('keyDown', function(event) {
    var handled = false;

    switch(event.keyCode) {
      //esc
      case 27:
        this.send('closeDropdown');
        handled = true;
        break;

      //up-arrow
      case 38:
        if(this.get('isOpen')) {
          this.send('highlightPreviousItem');
        }
        handled = true;
        break;

      //down-arrow
      case 40:
        if(this.get('isOpen')) {
          this.send('highlightNextItem');
        } else {
          this.send('openDropdown');
        }
        handled = true;
        break;

      //enter
      case 13:
        if(this.get('isOpen')) {
          this.send('selectHiglightedItem');
        } else {
          this.send('openDropdown');
        }
        handled = true;
        break;
    }    

    if(handled) {
      event.preventDefault();
    }
  }),

  click: function() {
    this.toggleProperty('isOpen');
  },

  // highlightedIndex: computed('highlighted', function() {
  //   var content = this.get('_content');
  //   var highlighted = this.get('highlighted');

  //   if (!isEmpty(content)) {
  //     return content.indexOf(highlighted);
  //   }

  // }),



  actions: {
    highlightNextItem: function() {
      var content = this.get('_content');
      var highlighted = this.get('highlighted') || content.objectAt(0);
      var index = content.indexOf(highlighted) + 1;
      var next = content.objectAt(index);

      this.set('highlighted', next);
    },

    highlightPreviousItem: function() {
      var content = this.get('_content');
      var highlighted = this.get('highlighted') || content.objectAt(0);
      var index = content.indexOf(highlighted) - 1;
      var prev = content.objectAt(index);

      this.set('highlighted', prev);
    },

    highlight: function(item) {
      this.set('highlighted', item);
    },

    selectHiglightedItem: function() {
      var item = this.get('highlighted');

      if (item) {
        this.addSelection(item);
        this.send('closeDropdown');
      }
    },

    openDropdown: function() {
      this.set('isOpen', true);
    },

    closeDropdown: function() {
      this.set('isOpen', false);
    },

    toggleDropdown: function() {
      this.toggleProperty('isOpen');
    }
  }

});
