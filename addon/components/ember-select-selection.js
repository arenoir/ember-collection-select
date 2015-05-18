import Ember from 'ember';
import layout from '../templates/components/ember-select-selection';

const {Component, computed, isBlank} = Ember;

export default Component.extend({
  layout: layout,
  selection: null,
  labelPath: null,
  
  label: computed('selection', function() {
    var labelPath = this.get('labelPath');
    var selection = this.get('selection');

    if (isBlank(selection)) {
      return;
    }

    if (isBlank(labelPath)) {
      return selection;
    }

    return selection.get(labelPath);
  })

});
