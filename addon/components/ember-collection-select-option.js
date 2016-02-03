import Ember from 'ember';

const {Component, computed} = Ember;

export default Component.extend({
  classNames: ['ember-collection-select-option'],
  classNameBindings: ['isHighlighted:ember-collection-select-option--highlighted', 'isSelected:ember-collection-select-option--selected'],
  highlighted: null,
  selection: null,

  isHighlighted: computed('model', 'highlighted', function() {
    return this.get('model') === this.get('highlighted');
  }),
  
  isSelected: computed('model', 'selection', function() {
    return this.get('model') === this.get('selection');
  }),

  mouseEnter() {
    const model = this.get('model');

    this.sendAction('highlight', model);
  },

  mouseDown(event) {
    event.preventDefault();
    return false;
  },

  click(event) {
    const model = this.get('model');

    this.sendAction('select', model);

    event.preventDefault();
    return false;
  }

});