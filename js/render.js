window.Render = {};

window.Render.eventsList = function (events) {
    $('body').removeClass('start');
    $('.login-screen').hide();
    $('.app').show();
    var fbBaseUrl = 'http://graph.facebook.com/';

    makeNiceDate = function (start_time) {
        var date = Date.create(start_time).relative(function (value, unit, ms, loc) {
            return '{mon} {dd}|{12hr}:{mm}{tt}';
        });

        date = date.split('|');
        return date;
    };

    _.each(events, function (event, index) {
        console.log(event);
        var source = $('#events-list-tpl').html(),
            template = Handlebars.compile(source),
            date = makeNiceDate(event.start_time),
            data;

        console.log(date[1]);

        data = {
            name: event.name,
            id: event.id,
            index: index,
            picture: event.picture.data.url,
            date: date[0],
            time: date[1]
        };

        $(".events-list").append(template(data));
    });
};

window.Render.startCreating = function () {
    $('.main').css({
        '-webkit-filter': 'blur(5px)',
        'transition-duration': '0.5s'
    });
    $('.disc').css({
        'transform': 'rotate(10000deg)',
        'transition-duration': '25s'
    });
    $('.create-playlist').click(false);
};

window.Render.doneCreating = function (success) {
    if (success) {
        $(".arrow").fadeIn();
        $(".arrow").delay(5000).fadeOut();

        $('.main').css({
            '-webkit-filter': 'blur(0px)',
            'transition-duration': '0.5s'
        });
        $('.disc').css({
            'transform': 'rotate(0deg)',
            'transition-duration': '0.2s'
        });
        $('.create-playlist').css('cursor', 'pointer');
        $('.create-playlist').click(function () {
            window.Fucker.createPlaylist(window.Fucker.model.events[$(this).closest('.event').data('index')]);
        });
    }
};

window.Render.addTrack = function (track) {
    console.log('addTrack', track);

    var source = $('#tracks-list-tpl').html(),
        template = Handlebars.compile(source),
        data;

    data = {
        picture: 'https://graph.facebook.com/' + track.facebook + '/picture',
        title: track.data.artists[0].name + ' - ' + track.data.name,
        link: track.data.uri
    };

    $('.tracks-list ul').append(template(data));
};

$('.tracks-list').on('click', '.track a', function (event) {
    event.preventDefault();
    models.player.playTrack($(this).attr('href'));
});
