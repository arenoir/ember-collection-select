// import Ember from 'ember';
// import ListView from 'ember-list-view';
// import ListItemView from 'ember-list-view/list-item-view';

// import layout from '../templates/components/ember-select-options';

// export default Ember.Component.extend({
//   classNames: ['ember-select-dropdown'],
//   layout: layout,
//   height: 400,
//   width: null,
//   optionHeight: 60,
//   highlighted: null,

//   actions: {
//     highlight: function(item) {
//       this.set('highlighted', item);
//     },
//   }
// });

import Ember from 'ember';
import ListView from 'ember-list-view';
import ListItemView from 'ember-list-view/list-item-view';

const {TargetActionSupport, computed} = Ember;
//import layout from '../templates/components/ember-select-options';

export default ListView.extend( TargetActionSupport, {
  classNames: ['ember-select-dropdown'],
  //layout: layout,
  height: 400,
  width: null,
  rowHeight: 60,
  highlighted: null,

  itemViewClass: ListItemView.extend({
    templateName: 'ember-select-option',
    classNames: ['ember-select-option'],
    classNameBindings: ['isHighlighted', 'isSelected'],


    isHighlighted: computed('context', 'controller.highlighted', function() {
      return this.get('context') === this.get('controller.highlighted');
    }),
    
    isSelected: computed('context', 'controller.selection', function() {
      return this.get('context') === this.get('controller.selection');
    }),

    mouseEnter: function() {
      var ctlr = this.get('controller');
      var item = this.get('context');

      //ctlr.triggerAction('highlight', item);
      ctlr.set('highlighted', item);
    }
  }),

});