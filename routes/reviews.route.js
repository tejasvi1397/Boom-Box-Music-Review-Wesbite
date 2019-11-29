const express = require('express');
const review_router = express.Router();
const review_controller = require('../controllers/review.controller');
const song_controller = require('../controllers/songs.controller');

// review_router.post('/create' , review_controller.review_create);
//route to get reviews for given song id
review_router.get('/:id',review_controller.review_songID);

//route to create a new review for a given song id
review_router.put('/:id',review_controller.review_create);

module.exports = review_router;