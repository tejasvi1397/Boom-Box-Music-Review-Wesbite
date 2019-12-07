const express = require('express');
const song_router = express.Router();
const song_controller = require('../controllers/songs.controller');
const user_controller = require('../controllers/users.controller');

//route to create a new song
song_router.post('/secure/create' , user_controller.jwt_verify, song_controller.song_create);

//route to update record for a given song id
song_router.put('/secure/update/:id' ,user_controller.jwt_verify, song_controller.song_update);

//route to get list of songs(secure)
song_router.get('/secure/', user_controller.jwt_verify, song_controller.song_get_open);

//route to get list of songs(open)
song_router.get('/open/', song_controller.song_get_open);

//route to get list of songs based on search criteria
song_router.post('/open/search', song_controller.song_search);
module.exports = song_router;