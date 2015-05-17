import Ember from 'ember';
import score from 'ember-select/utils/score';
import layout from '../templates/components/ember-select';

const {Component, computed, observer, isEmpty, isBlank} = Ember;

export default Component.extend({
  className: 'ember-select',
  layout: layout,

  searchTerm: null,
  content: null,

  scoreFunction: computed(function() {
    return function(term, item) {
      var word = item.word;

      return score(word, term);
    }
  }),

  _content: computed('searchTerm', 'content.@each', function() {
    var searchTerm    = this.get('searchTerm');
    var content       = this.get('content');
    var scoreFunction = this.get('scoreFunction');
    var scored; 

    if (isBlank(searchTerm)) {
      return content;
    }

    scored = content.reduce(function(_scored, item, index) { 
      var score = scoreFunction(searchTerm, item);
      if (score > 0) {
        _scored.push({
          score: score,
          index: index
        });
      }
      return _scored;
    },[]);

    scored.sort(function(a, b) {
      return b.score - a.score;
    });

    var indexes = scored.map(function(i) {
      return i.index;
    })

    return Ember.A(content.objectsAt(indexes));
  }),

});
