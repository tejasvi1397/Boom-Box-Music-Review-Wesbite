const song_model = require('../models/songs.model');
const review_model = require('../models/reviews.model');
const song_controller = require('../controllers/songs.controller');
const mongoose = require('mongoose');

exports.review_songID = function (req, res, next) {
    var exclude_fields = {
        "_id" : 0,
        Song: 0,
        User: 0 
    }
    review_model.find({Song: req.params.id}, exclude_fields, function (err, reviews) {
        if (err) return next(err);
        res.send(reviews);
        console.log(reviews[0]['User_Name']);
        console.log(`Count ${reviews.length}`)
    })
    review_model.countDocuments({Song: req.params.id},function(err, count){
        // if (err) return next(err);
        console.log(count);
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
    //to update avg rating in song model
    review_model.countDocuments({Song: req.params.id},function(err, count, next){
        if (err) return next(err);
        console.log(count);
        song_model.findOne({_id : req.params.id}, function(err, song, next){
            if (err) return next(err);
            console.log(song['Average_Ratings']);
            let new_avg_rating = (song['Average_Ratings'] + req.body.Number_Of_Stars)/(count+1);
            console.log(`new avg rating ${new_avg_rating}`);
            song_model.findOneAndUpdate({_id : req.params.id}, {$set: {Average_Ratings : new_avg_rating}}, function(err, song_updated, next){
                if (err) return next(err);
                console.log(song_updated);
            })
        })
    })
    review.save(function (err , review) {
        if (err) {
            return next(err);
        }
        res.send(review)
        // res.send('Review2 Added successfully')
        console.log('Review Using Song ID Added successfully');
    });
}