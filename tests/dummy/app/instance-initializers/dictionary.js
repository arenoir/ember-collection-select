export default {
  name: 'dictionary',

  initialize: function(instance) {
    var dictionary = instance.container.lookup('store:dictionary');

    dictionary.search('a');
  }
}