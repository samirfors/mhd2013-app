define([
  'backbone',
  'underscore',
  'views/app-view'
],
function(Backbone, _, AppView) {
  'use strict';

  var console = window.console,

  Bootstrapper = Backbone.View.extend({

    initialize: function(){
      _.bindAll(this);
      this.eventHub = {};
      _.extend(this.eventHub, Backbone.Events);

      console.log(this.eventHub);

      this.view = new AppView({
        eventHub: this.eventHub
      });

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