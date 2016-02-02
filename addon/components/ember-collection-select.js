import Ember from 'ember';
import score from 'ember-collection-select/utils/score';
import layout from '../templates/components/ember-collection-select';

const {Component, computed, isBlank, isEmpty, get} = Ember;

export default Component.extend({
  classNames: ['ember-collection-select'],
  classNameBindings: ['isOpen'],
  layout: layout,
  optionComponent: 'ember-collection-select-option', 
  searchTerm: null,
  multiple: false,
  isOpen: false,
  hasSelection: computed.notEmpty('selection'),
  height: 400,
  rowHeight: 75,
  width: 0,
  scrollLeft: 0,
  scrollTop: 0,
  highlighted: null,
  selected: null,
  collectionBuffer: 5,

  scoreFunction: computed(function() {
    return function(term, item) {
      let word = item.word;

      return score(word, term);
    };
  }),

  optionFunction: computed('optionLabelPath', function() {
    var optionLabelPath = this.get('optionLabelPath');

    if (isBlank(optionLabelPath)) {
      return function(item) {
        return item;
      };
    }

    return function(item) {
      return get(item, optionLabelPath);
    };
  }),

  _content: computed('searchTerm', 'content.[]', function() {
    const searchTerm    = this.get('searchTerm');
    const content       = this.get('content');
    const scoreFunction = this.get('scoreFunction');

    if (isBlank(searchTerm) || isEmpty(content)) {
      return content;
    }

    let scored = content.reduce(function(_scored, item, index) { 
      let score = scoreFunction(searchTerm, item);
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

    let indexes = scored.map(function(i) {
      return i.index;
    });

    return content.objectsAt(indexes);
  }),


  didInsertElement: function () {
    var width = this.$().width() - 2; //border
    this.set('width', width);
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
    this.$('input').focus();
  },

  actions: {
    inputFocus() {
      this.send('openDropdown');
    },

    inputFocusOut() {
      this.send('closeDropdown');
    },

    search(searchTerm) {
      this.set('searchTerm', searchTerm);
      this.sendAction('search', searchTerm);
    },

    scrollChange(left, top) {
      this.set('scrollTop', top);
    },

    'select-item': function(item) {
      this.addSelection(item);
    },



    highlightNextItem: function() {
      const content = this.get('_content');
      const highlighted = this.get('highlighted');
      const scrollTop = this.get('scrollTop');
      const height = this.get('height');

      let index = highlighted ? content.indexOf(highlighted) + 1 : 0;
      let next = content.objectAt(index);

      let offset = (index + 1) * this.get('rowHeight');

      if (scrollTop + height < offset) {
        this.set('scrollTop', (offset - height));
      }

      this.set('highlighted', next);
    },

    highlightPreviousItem: function() {
      const content = this.get('_content');
      const scrollTop = this.get('scrollTop');
      
      let highlighted = this.get('highlighted') || content.objectAt(0);
      let index = content.indexOf(highlighted) - 1;
      let prev = content.objectAt(index);

      let offset = index * this.get('rowHeight');

      if (scrollTop > offset) {
        this.set('scrollTop', (offset));
      }

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
