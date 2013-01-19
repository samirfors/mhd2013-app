var Event =  {}

Event.data = {};
Event.users = {};

Event.init = function() {
    var sp = getSpotifyApi();
    var auth = sp.require('$api/auth');
    console.log("Here!")
    var app_id = '465881243471710';
    var permissions = ['user_actions.music'];
    var request_url = 'https://graph.facebook.com/events';

    auth.authenticateWithFacebook(app_id, permissions, {
        onSuccess: function(accessToken, ttl) {
            var url = 'https://graph.facebook.com/me/events?fields=attending&access_token=' + accessToken;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onreadystatechange = function () {
                if (xhr.readyState != 4) return;
                var response = JSON.parse(xhr.responseText);
                Event.data = response.data;
            }
            xhr.send(null);
        },
        onFailure : function(error) {
            console.log('Authentication failed with error: ' + error);
        },
        onComplete : function() { }
    });
}

Event.getUsers = function(eventID){
    var users  = [];
    var eventData = {};
    if (Event.data == {})
        return {};
    console.log(Event.data)
    Event.data.forEach(function(fbEvent){
        if (fbEvent.id ==  eventID) {
            eventData = fbEvent;
            Event.users = eventData.attending.data;
            return Event.users;
        }
    })
    return {};
}