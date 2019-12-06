const mongoose = require('mongoose');
const song_model = require('../models/songs.model');
const Schema = mongoose.Schema;

let ReviewSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Song:{type: mongoose.Schema.Types.ObjectId, ref: 'Song'}, //confirm ref
    User: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    User_Name: {type: String},
    Review_Comment: {type: String, required: true, max: 100},
    Rating: {type: Number, max: 5},
    Created :{type: Date, default: Date.now}
});

var  Review = mongoose.model('Review' , ReviewSchema)
// Export the model
module.exports = Review;