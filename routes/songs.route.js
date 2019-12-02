const express = require('express');
const song_router = express.Router();
const song_controller = require('../controllers/songs.controller');
const user_controller = require('../controllers/users.controller');

//route to create a new song
song_router.post('/create' , user_controller.jwt_verify, song_controller.song_create);

//route to update record for a given song id
song_router.put('/update/:id' ,user_controller.jwt_verify, song_controller.song_update);

//route to get list of songs
song_router.get('/', song_controller.song_get_open);

module.exports = song_router;