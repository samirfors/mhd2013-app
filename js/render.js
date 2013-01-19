window.Render = {};

window.Render.eventsList = function(events) {

  $('#fb-login').hide();
  var fbBaseUrl = 'http://graph.facebook.com/';

  makeNiceDate = function(start_time) {
    var date = Date.create(start_time).relative(function(value, unit, ms, loc) {
      // if(ms.abs() > (1).day()) {
        // Returns an absolute date, but only if the offset is greater than a day.
        // return '{Weekday} {12hr}:{mm}{tt}';
        return '{mon} {dd}|{12hr}:{mm}{tt}';

      // }
    });
    date = date.split('|');
    return date;
  }

  _.each(events, function(event, index) {
    console.log(event);
    var source = $('#events-list-tpl').html();
    var template = Handlebars.compile(source);
    var date = makeNiceDate(event.start_time);

    console.log(date[1])

    var data = {
      name: event.name,
      id: event.id,
      index: index,
      picture: event.picture.data.url,
      date: date[0],
      time: date[1]
    };

    $(".events-list").append(template(data));
  });

}
