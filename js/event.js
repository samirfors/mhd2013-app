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
    $('.tracks-list h2').text(event.name);
    $('.tracks-list ul li').remove();
    event.invited.data.forEach(function (attendee) {
        window.bridge.fbToSpotify(attendee.id, function (user) {
            window.bridge.getTopTracks(user, function (track) {
                window.Render.addTrack({
                    facebook: attendee.id,
                    spotify: user,
                    data: track.data
                });
    window.Fucker.model.spotifyNames = [];
    window.Fucker.model.tracks = {};
   //console.log(event);
     window.Fucker.model.event = event;

            });
        });
    });

    window.location = 'spotify:app:mhd2013-app:playlist';
   setTimeout(window.Fucker.finalizePlaylist,4000)

    return;
}

window.Fucker.getTopTracks = function(names)
{

    for(var i = 0; i < names.length; i++)
    {
        console.log(names[i])
        loadTopTracks(names[i],i);
    }
    function loadTopTracks(name)
    {
       // console.log("NAME:" + name);
        window.bridge.getTopTracks(name,window.Fucker.trackLoaded);

    }
    console.log("FINALIZE???")
   setTimeout(window.Fucker.finalizePlaylist,5000)

}


window.Fucker.trackLoaded = function(track,user)
{
 //   console.log(track)
 console.log(track)
     if(window.Fucker.model.tracks[user] == null)
     {
        window.Fucker.model.tracks[user] = [];
     } 

    window.Fucker.model.tracks[user].push(track);

    
}

window.Fucker.finalizePlaylist = function()
{
    console.log("FINALIZE")
    console.log(window.Fucker.model.tracks);
 
    var finalArray = [];
   /* Fucker.model.tracks.forEach(function(tracks){
        for(var i=0; i < tracks.length; i++)
            finalArray.push(tracks[i])

    });*/
    

    for (var key in window.Fucker.model.tracks) {
     var obj = window.Fucker.model.tracks[key];
     for(var i=0; i < obj.length; i++)
            finalArray.push(obj[i])
    }

    console.log(finalArray)

    SPPlayList.init(window.Fucker.model.event.name,finalArray.shuffle());
    
}

Array.prototype.shuffle = function () {
    for (var i = this.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = this[i];
        this[i] = this[j];
        this[j] = tmp;
    }

    return this;
}

window.Fucker.getUsers = function(eventID){
    var users  = [];
    var eventData = {};
    if (window.Fucker.data == {})
        return {};
    console.log(Event.data)
    window.Fucker.data.forEach(function(fbEvent){
        if (fbEvent.id ==  eventID) {
            eventData = fbEvent;
            window.Fucker.users = eventData.invited.data;
            return window.Fucker.users;
        }
    })
    return {};
}
