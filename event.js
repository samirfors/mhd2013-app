function event() {
    var sp = getSpotifyApi();
    var auth = sp.require('$api/auth');

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
                return response;
            }
            xhr.send(null);
        },
        onFailure : function(error) {
            console.log('Authentication failed with error: ' + error);
            return {};
        },
        onComplete : function() { }
    });
} 