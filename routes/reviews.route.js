const express = require('express');
const review_router = express.Router();
const review_controller = require('../controllers/review.controller');
const song_controller = require('../controllers/songs.controller');
const user_controller = require('../controllers/users.controller');

// review_router.post('/create' , review_controller.review_create);
//route to get reviews (authenticated user) for given song id
review_router.get('/secure/:id', user_controller.jwt_verify, review_controller.review_songID);

//route to get reviews (limited open user) for given song id
review_router.get('/open/:id',  review_controller.review_songID);

//route to create a new review for a given song id
review_router.put('/secure/create/:id', user_controller.jwt_verify, review_controller.review_create);

module.exports = review_router;