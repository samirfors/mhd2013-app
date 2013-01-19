define([
  'backbone',
  'jquery',
  'underscore'
],
function(Backbone,$,_) {
  'use strict';
  var View = Backbone.View.extend({

    events: {},

    initialize: function(options) {
      _.bindAll(this);
      this.eventHub = options.eventHub;
      console.log('started');
    }

  });
  return View;
});