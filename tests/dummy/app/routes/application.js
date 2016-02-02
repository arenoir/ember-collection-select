import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.dictionary;
  },

  actions: {
    search: function(term) {
      var ctlr = this.get('controller');
      var searching = this.dictionary.search(term);
      ctlr.set('loading', true);

      searching.then(function() {
        ctlr.set('loading', false);
      });
    }
  }
});