window.Fucker =  {};

window.Fucker.data = {};
window.Fucker.users = {};

window.Fucker.model = {events: {}, spotifyNames: [], tracks: {}};

var sp = getSpotifyApi();
var models = sp.require('$api/models');

models.application.observe(models.EVENT.ARGUMENTSCHANGED, function () {
    var args = models.application.arguments;
    /*switch (args[0]) {
        case 'index':
            $('.events-list').show();
            $('.tracks-list').hide();
        break;

        case 'playlist':
            $('.events-list').hide();
            $('.tracks-list').show();
        break;
    }*/
});

var Sort = {};

Sort.results = {};
Sort.input = {};

Sort.init = function (data) {
    console.log("Sort: Started", data);

    var result = [],
        total = 0,
        users = 0,
        trackLimit = 0,
        key,
        tracks,
        i;

    // Calculate total amount of tracks
    for (key in data) {
        tracks = data[key];
        if (data[key].length > 0) {
            users += 1;
            total += tracks.length;
        }
    }

    // Calculate total amount of song per person
    trackLimit = Math.floor(total / users);

    // Arranging array
    for (i = 0; i < trackLimit; i += 1) {
        for (key in data) {
            if (data[key].length > i) {
                result.push(data[key][i]);
            }
        }
    }
    console.log("Sort: Ended");

    return result;

};

window.parseEvents = function (response) {
    console.log('jsonp', arguments);
    window.Fucker.data = response.data;

    window.Fucker.model.events = response.data;
    window.Render.eventsList(window.Fucker.model.events);
    $('.events-list').on('click', '.event .create-playlist', function () {
        window.Fucker.createPlaylist(window.Fucker.model.events[$(this).closest('.event').data('index')]);
    });
};

window.Fucker.init = function () {
    console.log("Here!");
    var auth = sp.require('$api/auth'),
        app_id = '465881243471710',
        request_url = 'https://graph.facebook.com/events',
        permissions = [
            'user_actions.music', 'user_events', 'friends_actions.music',
            'friends_actions:music', 'user_actions:music'
        ];

    auth.authenticateWithFacebook(app_id, permissions, {
        onSuccess: function (accessToken, ttl) {
            window.bridge = new Bridge(accessToken);

            var url = 'https://graph.facebook.com/me/events?fields=invited,name,picture&access_token=' + accessToken + '&callback=parseEvents';
            window.Fucker.accessToken = accessToken;

            var node = document.createElement('script');
            node.src = url;
            document.body.appendChild(node);
        },
        onFailure : function (error) {
            console.log('Authentication failed with error: ' + error);
        },
        onComplete : function () { }
    });
};

window.Fucker.createPlaylist = function (event) {
    window.Render.startCreating();
    var splist = new SPPlayList(event.name);
    $('.tracks-list h2').text(event.name);
    $('.tracks-list ul li').remove();
    window.party = {};
    var count = event.invited.data.length;

    event.invited.data.forEach(function (attendee) {
        window.bridge.fbToSpotify(attendee.id, function (user) {
            window.party[user] = [];
            window.bridge.getTopTracks(user, function (tracks) {
                tracks.forEach(function (track) {
                    window.party[user].push({
                        facebook: attendee.id,
                        spotify: user,
                        data: track.data
                    });
                });
                count -= 1;
            });
        });
    });

    var poller = setInterval(function () {
        console.log(count);

        if (_.isNumber(count) && count <= 0) {
            console.log(window.party);

            var partylist = Sort.init(window.party);
            console.log('sorted', partylist);
            partylist.forEach(function (track) {
                console.log('add track', track);
                window.Render.addTrack(track);
                splist.addTrack(track);
            });

            window.Render.doneCreating(true);
            clearInterval(poller);
        }
    }, 500);
};
