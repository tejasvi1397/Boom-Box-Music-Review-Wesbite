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

