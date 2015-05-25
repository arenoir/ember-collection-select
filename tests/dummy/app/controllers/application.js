import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Controller.extend({
  model: Ember.A([]),

  _letters: Ember.A([]),

  getLetter: function(letter) {
    var letters = this.get('_letters');
      
    if (letters.contains(letter)) {
      return;
    }

    var model = this.get('model');

    $.getJSON( ENV.baseURL + 'dictionary/' + letter + '.json').then(
      function(response) {
        letters.push(letter);
        model.pushObjects(response);
      }
    );
  }

});