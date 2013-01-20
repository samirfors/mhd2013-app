var SPPlayList = function (name, tracks) {
    var playlist = new models.Playlist(name);

    playlist.data.collaborative = true;

    return {
        uri: playlist.uri,
        tracks: playlist.tracks,
        name: name,
        addTracks: function (tracks) {
            this.tracks.forEach(function (track) {
                this.addTrack(track);
            });
        },
        addTrack: function (track) {
            playlist.add(models.Track.fromURI(track.data.uri));
        }
    };
};
