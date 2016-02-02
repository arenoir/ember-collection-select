import Ember from 'ember';
import ENV from '../config/environment';

const { Service, RSVP, computed, isBlank } = Ember;

export default Service.extend({

  content: Ember.A([]),

  _letters: [],

  //sort: ['word:asc'],
  //alphabetical: computed.sort('content', 'sort'),  

  alphabetical: computed('content', function() {
    const content = this.get('content');
    return content.sort();
  }),

  search: function(term) {
    var letter;
    var letters = this.get('_letters');
    var content = this.get('content');

    return new RSVP.Promise(function(resolve, reject) {    
      if (isBlank(term)) {
        resolve();
        return;
      }

      letter = term.toLowerCase().trim().charAt(0);

      if (!/[a-z]/.test(letter) || letters.includes(letter)) {
        resolve();
        return;
      }
      
      $.getJSON( ENV.baseURL + 'dictionary/' + letter + '.json').then(
        function(response) {
          letters.push(letter);
          content.pushObjects(response);
          resolve(response);
        },
        reject
      );

    });
  }

});