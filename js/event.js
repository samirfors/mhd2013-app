window.Fucker =  {}

window.Fucker.data = {};
window.Fucker.users = {};

window.Fucker.model = {events:{},spotifyNames:[],tracks:{}};

var sp = getSpotifyApi();
var models = sp.require('$api/models');

models.application.observe(models.EVENT.ARGUMENTSCHANGED, function () {
    var args = models.application.arguments;
    switch (args[0]) {
        case 'index':
            $('.events-list').show();
            $('.tracks-list').hide();
        break;

        case 'playlist':
            $('.events-list').hide();
            $('.tracks-list').show();
        break;
    }
});

var Sort = {}

Sort.results = {};
Sort.input = {};

Sort.init = function(data) {
    console.log("Sort: Started", data);

    var result = []
    var total = 0;
    var users = 0;
    var trackLimit = 0;

    // Calculate total amount of tracks
    for (var key in data) {
        var tracks = data[key];
        if (data[key].length > 0) {
            users++;
            total += tracks.length
        }
    }

    // Calculate total amount of song per person
    trackLimit = Math.floor(total/users);

    // Arranging array
    for (var i = 0; i < trackLimit; i++) {
        for (var key in data) {
            if (data[key].length > i) {
                result.push(data[key][i]);
            }
        };
    }
    console.log("Sort: Ended");

    return result;

};

window.Fucker.init = function() {
    var auth = sp.require('$api/auth');

    console.log("Here!")
    var app_id = '465881243471710';
    var permissions = ['user_actions.music','user_events','friends_actions.music','friends_actions:music','user_actions:music'];
    var request_url = 'https://graph.facebook.com/events';

    auth.authenticateWithFacebook(app_id, permissions, {
        onSuccess: function(accessToken, ttl) {
            window.bridge = new Bridge(accessToken);

            var url = 'https://graph.facebook.com/me/events?fields=invited,name,picture&access_token=' + accessToken;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onreadystatechange = function () {
                if (xhr.readyState != 4) return;
                var response = JSON.parse(xhr.responseText);
                window.Fucker.data = response.data;

                window.Fucker.model.events = response.data;
                window.Render.eventsList(window.Fucker.model.events);
                $('.events-list').on('click', '.event .create-playlist', function () {
                    window.location = 'spotify:app:mhd2013-app:playlist';
                    window.Fucker.createPlaylist(window.Fucker.model.events[$(this).closest('.event').data('index')]);
                });
            }
            xhr.send(null);
        },
        onFailure : function(error) {
            console.log('Authentication failed with error: ' + error);
        },
        onComplete : function() { }
    });
}

window.Fucker.createPlaylist = function(event)
{    
    window.Render.startCreating();

    $('.tracks-list h2').text(event.name);
    $('.tracks-list ul li').remove();
    window.party = {};
    event.invited.data.forEach(function (attendee) {
        window.bridge.fbToSpotify(attendee.id, function (user) {
            window.party[user] = [];
            window.bridge.getTopTracks(user, function (track) {
                window.party[user].push({
                    facebook: attendee.id,
                    spotify: user,
                    data: track.data
                });
            });
        });
    });

    // Fix so it is async "shuffled"
    setTimeout(function () {
        var partylist = Sort.init(window.party);
        console.log('sorted', partylist);
        partylist.forEach(function (track) {
            console.log('add track', track);
            window.Render.addTrack(track);
        });
        SPPlayList.init(event.name, partylist);
        window.Render.doneCreating(true);
    }, 5000);

    window.location = 'spotify:app:mhd2013-app:playlist';
}
