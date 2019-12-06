const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SongSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Song_Title: {type: String, required: true, max: 30},
    Artist: {type: String, required: true,  max: 30},
    Album: {type: String,  max: 30},
    Year: {type: Number},
    Comment: {type: String,  max: 30},
    Genre: {type: String},
    Submitted_On: {type: Date, default: Date.now},
    Submitted_By: {type: String},
    Number_Of_Ratings: {type: Number, default: 0},
    Average_Ratings: {type: Number, max: 5, default: 0},
    Status: {type: String, default: 'visible'}
});

var  Song = mongoose.model('Song' , SongSchema)
// Export the model
module.exports = Song;