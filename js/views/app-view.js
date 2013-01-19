define([
  'backbone',
  'jquery',
  'underscore',
  'text!templates/_list.html'
],
function(Backbone,$,_,listTpl) {
  'use strict';
  var AppView = Backbone.View.extend({

    elems: {
      body : $('body')
    },

    events: {},

    initialize: function(options) {
      _.bindAll(this);
      this.eventHub = options.eventHub;
      console.log('started');

      var tpl = _.template(listTpl);

      $(tpl({
        list: 'hej'
      })).appendTo(this.elems.body);
    }

  });
  return AppView;
});