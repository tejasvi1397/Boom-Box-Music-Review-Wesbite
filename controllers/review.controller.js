const song_model = require('../models/songs.model');
const review_model = require('../models/reviews.model');
const song_controller = require('../controllers/songs.controller');
const mongoose = require('mongoose');

exports.review_songID = function (req, res, next) {
    var exclude_fields = {
        "_id" : 0,
        Song: 0 
    }
    review_model.find(req.params.Song, exclude_fields, function (err, reviews) {
        if (err) return next(err);
        res.send(reviews);
        console.log(reviews);
    })
};

exports.review_create = function(req, res, next) {
    console.log(req.user_verified.id);
    var review = new review_model(
        {
            _id: new mongoose.Types.ObjectId(),
            Song: req.params.id,
            User: req.user_verified.id,
            User_Name: req.user_verified.username,
            Review_Comment: req.body.Review_Comment,
            Number_Of_Stars: req.body.Number_Of_Stars
        }
    );
    review.save(function (err , review) {
        if (err) {
            return next(err);
        }
        res.send(review)
        // res.send('Review2 Added successfully')
        console.log('Review Using Song ID Added successfully');
    });
}