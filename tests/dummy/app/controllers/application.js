import Ember from 'ember';
import ENV from '../config/environment';

const {computed, get} = Ember;

export default Ember.Controller.extend({
  
  optionFunction: computed(function() {
    return function(item) {
      return "<div>" + get(item, 'word') + "</div><div><small>" + get(item, 'definition') + "</small></div>";
    };
  })

});