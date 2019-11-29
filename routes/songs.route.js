const express = require('express');
const song_router = express.Router();
const song_controller = require('../controllers/songs.controller');

//route to create a new song
song_router.post('/create' , song_controller.song_create);

//route to update record for a given song id
song_router.put('/update/:id' , song_controller.song_update);

module.exports = song_router;