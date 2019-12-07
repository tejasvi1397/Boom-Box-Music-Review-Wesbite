require('dotenv/config');
const song_model = require('../models/songs.model');
const review_model = require('../models/reviews.model');
const user_controller = require('../controllers/users.controller');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', true);
const jwt = require('jsonwebtoken');

//create song and review
exports.song_create = function (req, res, next) {
    var song = new song_model(
        {
            _id: new mongoose.Types.ObjectId(),
            Song_Title: req.body.Song_Title,
            Artist: req.body.Artist,
            Album: req.body.Album,
            Year: req.body.Year,
            Comment: req.body.Comment,
            Genre: req.body.Genre,
            Submitted_By: req.user_verified.username
            // Submitted_On: req.body.Submitted_On
            // Number_Of_Ratings: req.body.Number_Of_Ratings,
            // Average_Ratings: req.body.Average_Ratings
        }
    );

    song.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Song Added successfully');
        //add review 1
        // var review1 = new review_model(
        //     {
        //         _id: new mongoose.Types.ObjectId(),
        //         Song: song._id,
        //         Ratings: [
        //             {
        //                 Review_Comment: 'Very Good',
        //                 Number_Of_Stars: 4,
        //                 created: '2019-01-13'
        //             }
        //         ]
        //     }
        // );
    
        // review1.save(function (err) {
        //     if (err) {
        //         throw err;
        //     }
        //     // res.send('Review1 Added successfully');
        //     console.log('Review1 Added successfully');
        // });

        // var review2 = new review_model(
        //     {
        //         _id: new mongoose.Types.ObjectId(),
        //         Song: song._id,
        //         Ratings: [
        //             {
        //                 Review_Comment: 'ok',
        //                 Number_Of_Stars: 3
        //                 // created: '2018-03-17'
        //             }
        //         ]
        //     }
        // );
        // review2.save(function (err) {
        //     if (err) {
        //         throw err;
        //     }
        //     // res.send('Review2 Added successfully')
        //     console.log('Review2 Added successfully');
        // });

    });
};

//logic to update record for a given song

exports.song_update = function (req, res, next) {
    song_model.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, songs) {
        if (err) return next(err);
        res.send(songs);
        console.log('Song udpated.');
        console.log(songs);
        console.log(req.user_verified.username);
    });
};

//logic to get list of songs
exports.song_get_open = function (req, res, next) {
    song_model.find(function (err, songs) {
        if (err) return next(err);
        res.send(songs);
        // console.log(songs[0]['Song_Title']);
    })
};

//logic to get songs based on search keyword
exports.song_search = function(req, res, next) {
    song_model.find({ $text: { $search : req.body.Search } },function (err, songs) {
        if (err) return next(err);
        res.send(songs);
        console.log(songs);
        // console.log(songs[0]['Song_Title']);
    })
}

//logic to delete songs
exports.song_delete = function(req, res, next) {
    song_model.findByIdAndDelete(req.params.id, function(err, song_deleted) {
        if (err) return next(err);
        res.send(song_deleted);
        console.log(`Song Deleted ${song_deleted}`);
        review_model.deleteMany({Song: req.params.id}, function(err, review_deleted) {
            if (err) return next(err);
            console.log(`Review Deleted ${review_deleted}`); 
        })
    })
}

//logic to change song status
exports.song_change_status = function(req, res, next) {
    song_model.findOneAndUpdate({_id : req.params.id}, {$set: {Status : req.body.Status}}, {new: true}, function(err, song_updated, next){
        if (err) return next(err);
        res.send(song_updated);
        console.log(song_updated);
    })
}



