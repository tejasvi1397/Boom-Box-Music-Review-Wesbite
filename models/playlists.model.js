const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const song_model = require('../models/songs.model');

let PlaylistSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Playlist_Title: {type: String, required: true},
    Description: {type: String},
    Songs:[{
        Song_Title: [{type: String}]
    }],
    Status: {type: String, default: 'private'},
    Created_By: {type:String}
});

var  Playlist = mongoose.model('Playlist' , PlaylistSchema)
// Export the model
module.exports = Playlist;