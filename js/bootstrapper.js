define([
  'backbone',
  'underscore',
  'views/view'
],
function(Backbone, _, View) {
  'use strict';

  var console = window.console,

  Bootstrapper = Backbone.View.extend({

    initialize: function(){
      _.bindAll(this);
      this.eventHub = {};
      _.extend(this.eventHub, Backbone.Events);

      this.view = new View({
        eventHub    : this.eventHub
      });
    }

  }),

  initialize = function(){
    var bootstrapper = new Bootstrapper();
    return bootstrapper;
  };

  return {
    initialize: initialize
  };
});