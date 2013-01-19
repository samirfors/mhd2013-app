define([
  'models/event_model'
],
function(Event) {
  var EventCollection = Backbone.Collection.extend({
    model: Event,

    initialize: function(options) {
      _.bindAll(this);
      this.eventHub = options.eventHub;

      this.eventHub.on('initLogin', this.makeLogin);
    },

    makeLogin: function() {
      console.log('try login');
      window.Fucker.init();
    }
  });

  return EventCollection;
});