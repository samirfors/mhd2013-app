window.Render = {};

window.Render.eventsList = function(events) {

  $('#fb-login').hide();
  var fbBaseUrl = 'http://graph.facebook.com/';

  makeNiceDate = function(start_time) {
    return start_time;
  }

  _.each(events, function(event) {
    console.log(event);
    var source = $('#events-list-tpl').html();
    var template = Handlebars.compile(source);
    var date = makeNiceDate(event.start_time);

    var data = {
      name: event.name,
      id: event.id,
      picture: event.picture.data.url,
      date: date
    };

    $(".events-list ul").append(template(data));
  });

}