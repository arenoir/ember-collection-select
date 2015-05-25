import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.dictionary.get('alphabetical');
  },

  actions: {
    search: function(term) {
      this.dictionary.search(term);
    }
  }
});