import dictionary from "../services/dictionary";

export default {
  name: 'dictionary',

  initialize: function(registry, application) {
    application.register('store:dictionary', dictionary);
    application.inject('route', 'dictionary', 'store:dictionary');
  }

};