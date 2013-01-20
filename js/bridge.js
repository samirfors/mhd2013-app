/**
 * Permissions needed ['user_actions.music', 'friends_actions.music'];
 *
 * Usage:
 * bridge.fbToSpotify('me', function (user) {
 * 	   bridge.getTopTracks(user, function (track) {
 *         console.log(user, track.data.name, track.data.uri);
 *     });
 * });
 *
 * Replace me with facebook id.
 */
var Bridge = function (token) {
	"use strict";

	var accessToken = token;

	return {
		fbToSpotify: function (user, callback) {
			var url = 'https://graph.facebook.com/' + user + '/music.playlists?access_token=' + accessToken;
	        $.get(url, function (response) {
	        	if (response.data.length > 0) {
	            	user = response.data[0].data.playlist.url.split('/')[4];
	        	} else {
					console.log("DIDN'T FIND USER:" + user); console.log(response);
				}
	            callback(user);
	        }, 'json');
	    },

    	getTopTracks: function (user, callback) {
	        var toplist = new models.Toplist();
	        toplist.toplistType = models.TOPLISTTYPE.USER;
	        toplist.matchType = models.TOPLISTMATCHES.TRACKS;
	        toplist.userName = user;

	        toplist.observe(models.EVENT.CHANGE, function() {
				console.log("GOT: " + toplist.results.length + " from " + user )
	        	//callback(toplist.results[0]);
	       		var i = 0;
	        	toplist.results.forEach(function(track) {

	            	if (i < 6) {
	                	callback(track);
					}
	                i++;
	            });


	        });

	        toplist.run();
	    },

	    getStarredTracks: function (user, callback) {
	    	var uri ='spotify:user:' + user + ':starred';
	    	var playlist = models.Playlist.fromURI(uri, callback);
	    }



	};
};
