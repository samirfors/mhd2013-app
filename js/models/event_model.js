define([],
function() {

  var Event = Backbone.Model.extend({
    defaults: {
      id: null,
      name: null,
      users:[]
    }
  });

  return Event;
});