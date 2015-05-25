import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('ember-select', 'Unit | Component | ember select', {
  needs: ['component:ember-select-selection', 'component:ember-select-options']
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
