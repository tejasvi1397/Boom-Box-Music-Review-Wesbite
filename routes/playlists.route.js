const express = require('express');
const playlist_router = express.Router();
const playlist_controller = require('../controllers/playlist.controller');
const song_controller = require('../controllers/songs.controller');
const user_controller = require('../controllers/users.controller');

playlist_router.post('/secure/create' , user_controller.jwt_verify, playlist_controller.playlist_create);

module.exports = playlist_router;