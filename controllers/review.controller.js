const song_model = require('../models/songs.model');
const review_model = require('../models/reviews.model');
const song_controller = require('../controllers/songs.controller');
const mongoose = require('mongoose');

exports.review_create = function (req,res) {
    let review = new review_model(
        {
            _id: new mongoose.Types.ObjectId(),
            Song: song_controller._id,
            Ratings: [
                {
                    Review_Comment: 'Very Good',
                    Number_Of_Stars: 4,
                    created: '2019-01-13'
                }
            ]
        }
    );

    review.save(function (err) {
        if (err) {
            throw err;
        }
        res.send('Review Added successfully')
    })
};