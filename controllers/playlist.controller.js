require('dotenv/config');
const playlist_model = require('../models/playlists.model');
const song_model = require('../models/songs.model');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', true);

exports.playlist_create = function (req, res, next) {
    var playlist = new playlist_model(
        {
            _id: new mongoose.Types.ObjectId(),
            Playlist_Title: 'playlist1',
            Description: 'description1',
            Songs:[
                {song_id: "5dea965edcc8567c8f958650"},{song_id: "5dea96ccdcc8567c8f958651"}
            ]
        }
    );

    playlist.save(function (err, playlist, next) {
        if (err) {
            return next(err);
        }
        res.send(playlist);
        console.log(playlist);

    });
};