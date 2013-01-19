window.Fucker =  {}

window.Fucker.data = {};
window.Fucker.users = {};

window.Fucker.model = {events:{},spotifyNames:[],tracks:[]};

var models;

window.Fucker.init = function() {
    var sp = getSpotifyApi();
    var auth = sp.require('$api/auth');
    models = sp.require('$api/models');

    console.log("Here!")
    var app_id = '465881243471710';
    var permissions = ['user_actions.music','user_events','friends_actions.music'];
    var request_url = 'https://graph.facebook.com/events';

    auth.authenticateWithFacebook(app_id, permissions, {
        onSuccess: function(accessToken, ttl) {
            window.bridge = new Bridge(accessToken);

            var url = 'https://graph.facebook.com/me/events?fields=attending,name,picture&access_token=' + accessToken;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onreadystatechange = function () {
                if (xhr.readyState != 4) return;
                var response = JSON.parse(xhr.responseText);
                window.Fucker.data = response.data;
                console.log(response.data)

                window.Fucker.model.events = response.data;
                window.Render.eventsList(window.Fucker.model.events)
                window.Fucker.createPlaylist(window.Fucker.model.events[0]);
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
    window.Fucker.model.spotifyNames = [];
   //console.log(event);
              window.Fucker.model.event = event;

    loadUserName(null);
    function loadUserName(user)
    {
        if(user)
         window.Fucker.model.spotifyNames.push(user);
         var count = window.Fucker.model.spotifyNames.length;
        if(window.Fucker.model.spotifyNames.length != window.Fucker.model.event.attending.data.length)
        {

            window.bridge.fbToSpotify(window.Fucker.model.event.attending.data[count].id,loadUserName)
        } else
      {
            // SHOW PLAYLIST
            console.log("FINISHED GETTiNG NAMES")
            for(var i = 0; i < window.Fucker.model.spotifyNames.length; i++)
            {
               console.log( window.Fucker.model.spotifyNames[i]);
                //$('.events-list ul').append('<li>' + window.Fucker.model.spotifyNames[i]  +  '</li>')  

            }
             window.Fucker.getTopTracks(window.Fucker.model.spotifyNames)
    }   
    }
}

window.Fucker.getTopTracks = function(names)
{

    for(var i = 0; i < names.length; i++)
    {
        console.log(names[i])
        loadTopTracks(names[i]);
    }
    function loadTopTracks(name)
    {
        console.log("NAME:" + name);
        window.bridge.getTopTracks(name,window.Fucker.trackLoaded);

    }

   setTimeout(window.Fucker.finalizePlaylist,5000)

}


window.Fucker.trackLoaded = function(track)
{
    console.log(track)
    window.Fucker.model.tracks.push(track);
}

window.Fucker.finalizePlaylist = function()
{
    for(var i=0; i < window.Fucker.model.tracks.length; i++)
       console.log(window.Fucker.model.tracks[i].name);
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
            window.Fucker.users = eventData.attending.data;
            return window.Fucker.users;
        }
    })
    return {};
}