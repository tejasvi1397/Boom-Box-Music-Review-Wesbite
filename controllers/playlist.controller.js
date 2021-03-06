require('dotenv/config');
const playlist_model = require('../models/playlists.model');
const song_model = require('../models/songs.model');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', true);

//logic to create playlists
exports.playlist_create = function (req, res, next) {
    var playlist = new playlist_model(
        {
            _id: new mongoose.Types.ObjectId(),
            Playlist_Title: req.body.Playlist_Title,
            Description: req.body.Description,
            Status: req.body.Status,
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
};

//logic to display playlists
exports.playlist_get = function(req, res, next) {
    playlist_model.find({$or:[{Status: 'public'},{Created_By: req.user_verified.username}]}, function (err, playlist) {
        if (err) return next(err);
        res.send(playlist);
        console.log(playlist);
    })
}

//logic to display playlists for logged in user
exports.playlist_get_user = function(req, res, next) {
    playlist_model.find({Created_By: req.user_verified.username}, function (err, playlist) {
        if (err) return next(err);
        res.send(playlist);
        console.log(playlist);
    })
}

//logic to edit playlist
exports.playlist_edit = function (req, res, next) {
    playlist_model.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true}, function (err, playlist, next) {
        if (err) return next(err);
        res.send(playlist);
        console.log(playlist);
    });
};

//logic to add songs to playlist
exports.playlist_add_songs = function(req, res, next) {
    // var playlist_songs = {"Song_Title": req.body.Song_Title};
    playlist_model.findOneAndUpdate( {_id: req.params.id}, {$push: {'Songs.0.Song_Title': req.body.Song_Title}}, {new: true}, function(err, playlist, next) {
        // if (err) return next(err);
        res.send(playlist);
        console.log(playlist);
    })
}

//logic to remove songs from playlist
exports.playlist_remove_songs = function(req, res, next) {
    playlist_model.findOneAndUpdate( {_id: req.params.id}, {$pullAll: {'Songs.0.Song_Title': req.body.Song_Title}}, {new: true}, function(err, playlist, next) {
         if (err) return next(err);
         res.send(playlist);
         console.log(playlist);
    })
}

//logic to delete playlist by admin
exports.playlist_delete = function(req, res, next) {
    playlist_model.findOneAndDelete({_id: req.params.id}, function(err, playlist_deleted, next) {
        if (err) return next(err);
         res.send(playlist_deleted);
         console.log(playlist_deleted);
    })
}

//logic to display all playlists public and private only to admin
exports.playlist_get_all = function(req, res, next) {
    playlist_model.find(function (err, playlist) {
        if (err) return next(err);
        res.send(playlist);
        console.log(playlist);
    })
}