define([
  'backbone',
  'underscore',
  'views/app-view',
  'collections/event_collection'
],
function(Backbone, _, AppView, EventCollection) {
  'use strict';

  var console = window.console,

  Bootstrapper = Backbone.View.extend({

    initialize: function(){
      _.bindAll(this);
      this.eventHub = {};
      _.extend(this.eventHub, Backbone.Events);

      console.log(this.eventHub);

      this.events = new EventCollection();

      console.log("yeayea" + this.events);

      this.view = new AppView({
        eventHub: this.eventHub
      })

    }

  }),

  initialize = function() {
    var bootstrapper = new Bootstrapper();
    return bootstrapper;
  };

  return {
    initialize: initialize
  };
});