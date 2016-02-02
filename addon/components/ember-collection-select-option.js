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

  mouseEnter: function() {
    const model = this.get('model');

    //ctlr.triggerAction('highlight', item);
    //ctlr.set('highlighted', model);
    this.sendAction('highlight', model);
  },

  click: function() {
    this.triggerAction({action: 'select-item'});
  }

});