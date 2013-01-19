define([
  'bootstrapper',
  'backbone',
  'jquery'
], function(Bootstrapper,Backbone,$){

  var initialize = function(){
    Backbone.setDomLibrary($);
    return Bootstrapper.initialize();
  };

  return {
    initialize: initialize
  };
});