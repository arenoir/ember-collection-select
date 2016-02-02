import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { numbers } from '../constants';

import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('ember-collection-select', 'Unit | Component | ember select', {
  integration: true
  //needs: ['component:ember-collection-select-selection', 'component:ember-collection-select-option', 'component:one-way-input', 'component:ember-collection', 'component:ember-native-scrollable', 'helper:fixed-grid-layout']
});

function triggerKeydown(domElement, k) {
  var oEvent = document.createEvent("Events");
  oEvent.initEvent('keydown', true, true);
  $.extend(oEvent, {
    view: window,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    keyCode: k,
    charCode: k
  });
  Ember.run(() => {
    domElement.dispatchEvent(oEvent);
  });
}



test('Pressing keydown highlights the next option', function(assert) {
  assert.expect(6);

  this.numbers = numbers;
  this.render(hbs`
    {{#ember-collection-select content=numbers width=400 rowHeight=20 height=200 collectionBuffer=4 as |option searchTerm|}}
      {{option}}
    {{/ember-collection-select}}
  `);

  assert.equal($('.ember-collection-select-dropdown').length, 0, 'Dropdown should not be visible on render.');

  Ember.run(() => Ember.$(".ember-collection-select input").focus());

  assert.equal($('.ember-collection-select-dropdown').length, 1, 'Dropdown should be visible on focus.');
  assert.equal($('.ember-collection-select-option').length, 15, '10 options should be rendered.');
  assert.equal(this.numbers.length, 20);

  triggerKeydown($('.ember-collection-select input')[0], 40);

  assert.equal($('.ember-collection-select-option--highlighted').text().trim(), 'one', 'The next option is highlighted now');

  triggerKeydown($('.ember-collection-select input')[0], 40);

  assert.equal($('.ember-collection-select-option--highlighted').text().trim(), 'two', 'The next option is highlighted now');
});