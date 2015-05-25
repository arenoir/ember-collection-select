import Ember from 'ember';
import ListView from 'ember-list-view';
import ListItemView from 'ember-list-view/list-item-view';

const {ViewTargetActionSupport, computed} = Ember;

export default ListView.extend( {
  classNames: ['ember-select-dropdown'],
  height: 400,
  width: null,
  rowHeight: 60,
  highlighted: null,

  itemViewClass: ListItemView.extend( ViewTargetActionSupport,{
    templateName: 'ember-select-option',
    classNames: ['ember-select-option'],
    classNameBindings: ['isHighlighted', 'isSelected'],

    isHighlighted: computed('context', 'controller.highlighted', function() {
      return this.get('context') === this.get('controller.highlighted');
    }),
    
    isSelected: computed('context', 'controller.selection', function() {
      return this.get('context') === this.get('controller.selection');
    }),

    value: computed('context', function() {
      var fmt     = this.get('controller.optionFunction');
      var context = this.get('context');
      
      return fmt(context);
    }),

    mouseEnter: function() {
      var ctlr = this.get('controller');
      var item = this.get('context');

      //ctlr.triggerAction('highlight', item);
      ctlr.set('highlighted', item);
    },

    click: function() {
      this.triggerAction({action: 'select-item'});
    }

  }),


});