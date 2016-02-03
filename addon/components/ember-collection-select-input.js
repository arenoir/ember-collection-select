import Ember from 'ember';
import OneWayInput from 'ember-one-way-controls/components/one-way-input';
//import layout from '../templates/components/ember-collection-select-input';

const {computed} = Ember;

export default OneWayInput.extend({

  KEY_EVENTS: {
    '13': 'onenter',
    '27': 'onescape',
    '8': 'onbackspace'
  },

  classNameBindings: [
    'inactiveFocus:ember-collection-select-input--inactive'
  ],

  inactiveFocus: computed('hasSelection', 'optionsOpen', function() {
    const optionsOpen = this.get('optionsOpen');
    const hasSelection = this.get('hasSelection');

    return !optionsOpen && hasSelection;
  }),

  hasSelection: computed.notEmpty('selection'),

  placeholder: computed('_placeholder', 'hasSelection', function() {
    if (this.get('hasSelection')) {
      return '';
    }

    return this.get('_placeholder');
  }),


  inputStyle: computed('inactiveFocus', function() {
    const inactive = this.get('inactiveFocus');
    
    if (inactive) {
      return `width: 4px; opacity: 0; position: absolute; left: -10000px;`;
    }
     
  }),


});
