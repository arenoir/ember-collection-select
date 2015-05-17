import Ember from 'ember';
import ListView from 'ember-list-view';
import ListItemView from 'ember-list-view/list-item-view';

import layout from '../templates/components/ember-select-options';

export default Ember.Component.extend({
  layout: layout,
  height: 400,
  optionHeight: 60
});
