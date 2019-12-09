const express = require('express');
const playlist_router = express.Router();
const playlist_controller = require('../controllers/playlist.controller');
const song_controller = require('../controllers/songs.controller');
const user_controller = require('../controllers/users.controller');

//route to create playlists
playlist_router.post('/secure/create' , user_controller.jwt_verify, playlist_controller.playlist_create);

//route to display playlists
playlist_router.get('/secure', user_controller.jwt_verify, playlist_controller.playlist_get);

module.exports = playlist_router;