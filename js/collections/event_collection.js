define([
  'models/event_model'
],
function(Event) {
  var EventCollection = Backbone.Collection.extend({
    model: Event
  });

  return EventCollection;
});