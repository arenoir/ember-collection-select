import Ember from 'ember';
import layout from '../templates/components/ember-select-option';

const {Component, computed} = Ember;

export default Component.extend({
  classNames: ['ember-select-option'],
  classNameBindings: ['isHighlighted', 'isSelected'],
  layout: layout,

  isHighlighted: computed('item', 'highlighted', function() {
    return this.get('item') === this.get('highlighted');
  }),
  
  isSelected: computed('item', 'selection', function() {
    return this.get('item') === this.get('selection');
  }),

  mouseEnter: function(){
    this.sendAction('highlight', this.get('item'));
  }

});
