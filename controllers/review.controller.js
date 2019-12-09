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
    review_model.find({Song: req.params.id}, exclude_fields, {sort: {Created: -1}},function (err, reviews) {
        if (err) return next(err);
        res.send(reviews);
    })
    // review_model.countDocuments({Song: req.params.id},function(err, count){
    //     // if (err) return next(err);
    //     console.log(count);
    // })
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
            Rating: req.body.Rating
        }
    );
    //to update avg rating in song model
    review_model.countDocuments({Song: req.params.id},function(err, count, next){
        if (err) return next(err);
        console.log(count);
        song_model.findOne({_id : req.params.id}, function(err, song, next){
            if (err) return next(err);
            console.log(song['Average_Ratings']);
            let new_avg_rating = (song['Average_Ratings'] + req.body.Rating)/(count+1);
            console.log(`new avg rating ${new_avg_rating}`);
            song_model.findOneAndUpdate({_id : req.params.id}, {$set: {Average_Ratings : new_avg_rating, Number_Of_Ratings : count+1}}, {new: true}, function(err, song_updated, next){
                if (err) return next(err);
                console.log(song_updated);
            })
            // song_model.findOneAndUpdate({_id : req.params.id}, {$set: {Number_Of_Ratings : count}}, {returnOriginal:false}, function(err, song_updated_count, next){
            //     if (err) return next(err);
            //     console.log(song_updated_count);
            // })
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