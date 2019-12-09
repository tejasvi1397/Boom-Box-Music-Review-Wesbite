require('dotenv/config');
const playlist_model = require('../models/playlists.model');
const song_model = require('../models/songs.model');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', true);

exports.playlist_create = function (req, res, next) {
    var playlist = new playlist_model(
        {
            _id: new mongoose.Types.ObjectId(),
            Playlist_Title: req.body.Playlist_Title,
            Description: req.body.Description,
            Created_By: req.user_verified.username
        }
    );
    
    console.log(req.body);
    var playlist_songs = {"Song_Title": req.body.Song_Title};
    playlist.Songs.push(playlist_songs);

    playlist.save(function (err, playlist) {
        if (err) {
            return next(err);
        }
        res.send(playlist);
        // console.log('without songs')
        console.log(playlist);
    });

    // var playlist_songs = {"song_id": req.body.song_id};
    // playlist_model.findOneAndUpdate({Playlist_Title: req.body.Playlist_Title}, {$push: {Songs: playlist_songs}}, {new: true}, function(err, updated_playlist, next) {
    //     if (err) {
    //         return next(err);
    //     }
    //     console.log('with songs')
    //     console.log(updated_playlist);
    // });
};