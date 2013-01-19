define([
  'models/facbookuser_model'
],
function(facebookuser_model) {

  var console = window.console,
      alert   = window.alert,

  Events = Backbone.Collection.extend({
    model: facebookuser_model,

    initialize: function() {
      
     
    }
  });

  return Events;
});