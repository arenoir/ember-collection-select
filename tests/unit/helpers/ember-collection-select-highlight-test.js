import { emberCollectionSelectHighlight } from '../../../helpers/ember-collection-select-highlight';
import { module, test } from 'qunit';

module('Unit | Helper | ember-collection-select-highlight');

test('it highlights text', function(assert) {
  let text = "The quick brown fox jumps over the lazy dog.";
  let result = emberCollectionSelectHighlight([text, "quick brown"]);

  assert.equal(result, 'The <span class="highlight">quick brown</span> fox jumps over the lazy dog.');
});

test('it highlights partial words text', function(assert) {
  let text = "aaaa bbab aaaa bbbb aaa";
  let result = emberCollectionSelectHighlight([text, "bb"]);

  assert.equal(result, 'aaaa <span class="highlight">bb</span>ab aaaa <span class="highlight">bb</span><span class="highlight">bb</span> aaa' );
});