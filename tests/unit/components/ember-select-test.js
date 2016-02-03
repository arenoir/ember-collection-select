import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('ember-collection-select', 'Unit | Component | ember select', {
  needs: ['component:ember-collection-select-selection', 'component:ember-collection-select-option','component:ember-collection-select-input', 'component:one-way-input', 'component:ember-collection', 'component:ember-native-scrollable', 'helper:fixed-grid-layout']
});

test('it renders', function(assert) {
  assert.expect(2);

  // Creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});
