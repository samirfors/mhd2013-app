define([
  'models/event_model'
],
function(event_model) {

  var console = window.console,
      alert   = window.alert,

  Events = Backbone.Collection.extend({
    model: event_model,

    initialize: function() {
      
      // Call facebook   

    },  

    getAllEvents: function() {
      var self = this,
        /*  Player = Parse.Object.extend("Player"),
          query = new Parse.Query(Player),
          i, id;

      query.find({
        success: function(results) {
          for(i=0; i < results.length; i++)
          {
            self.add(new player_model({ name:results[i].get("name")}));
            self.last(id);
          }


        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }'event_collection'
      });
    */

    }

  });

  return Events;
});