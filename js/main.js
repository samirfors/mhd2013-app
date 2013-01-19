require.config({
  paths: {
    'underscore': 'libs/underscore/underscore-min',
    'backbone'  : 'libs/backbone/backbone-min',
    'bootstrap' : 'libs/bootstrap/bootstrap',
    'jquery'    : 'libs/jquery/jquery-min',
    'templates' : '../templates'
  },
  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: "Backbone"
    },
    'underscore': {
      exports: '_'
    },
    'bootstrap': ['jquery']
  }
});

require([
  'app'
  // 'js/libs/css3-mediaqueries/css3-mediaqueries.js',
  // 'js/libs/google-analytics/googleanalytics.js'
], function(App){
  return App.initialize();
});