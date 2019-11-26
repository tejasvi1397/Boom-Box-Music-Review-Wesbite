const song_model = require('../models/songs.model');
const review_model = require('../models/reviews.model');
const mongoose = require('mongoose');

exports.song_create = function (req, res) {
    let song = new song_model(
        {
            _id: new mongoose.Types.ObjectId(),
            Song_Title: req.body.Song_Title,
            Artist: req.body.Artist,
            Album: req.body.Album,
            Year: req.body.Year,
            Comment: req.body.Comment,
            Genre: req.body.Genre,
            Submitted_By: req.body.Submitted_By,
            Submitted_On: req.body.Submitted_On,
            Number_Of_Ratings: req.body.Number_Of_Ratings,
            Average_Ratings: req.body.Average_Ratings
        }
    );

    song.save(function (err) {
        if (err) {
            throw err;
        }
        res.send('Song Added successfully')

        let review = new review_model(
            {
                _id: new mongoose.Types.ObjectId(),
                Song: song._id,
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
        });
    });
};