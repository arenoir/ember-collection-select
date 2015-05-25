import Ember from 'ember';

export default Ember.Controller.extend({
  model: Ember.A([]),

  getLetter: function(letter) {
    console.log(letter);
    var model = this.get('model');



    $.getJSON('/dictionary/' + letter + '.json').then(
      function(response) {
        model.pushObjects(response);
      }
    );
  }

});