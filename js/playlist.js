var SPPlayList = {}

SPPlayList.uri = "";
SPPlayList.tracks = {};
SPPlayList.name = "";

SPPlayList.init = function(name, tracks) {
    var sp = getSpotifyApi();
	var models = sp.require('$api/models');
	var playlist = new models.Playlist(name);
	SPPlayList.name = name;
	playlist.data.collaborative = true;

	tracks.forEach(function(track){
		playlist.add(models.Track.fromURI(track.data.uri));
	});
	SPPlayList.tracks = playlist.tracks;
}
