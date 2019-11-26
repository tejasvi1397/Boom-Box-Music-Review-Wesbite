const mongoose = require('mongoose');
const song_model = require('../models/songs.model');
const Schema = mongoose.Schema;

let ReviewSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Song:{type: mongoose.Schema.Types.ObjectId, ref: 'Song'}, //confirm ref
    Ratings: [
        {
            Review_Comment: {type: String, required: true, max: 100},
            Number_Of_Stars: {type: Number, max: 5},
            created :{type: Date, default: Date.now}
        }
    ]
});

var  Review = mongoose.model('Review' , ReviewSchema)
// Export the model
module.exports = Review;