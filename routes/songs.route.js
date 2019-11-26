const express = require('express');
const song_router = express.Router();
const song_controller = require('../controllers/songs.controller');

song_router.post('/create' , song_controller.song_create);

module.exports = song_router;