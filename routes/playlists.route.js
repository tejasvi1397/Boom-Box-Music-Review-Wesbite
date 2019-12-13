const express = require('express');
const playlist_router = express.Router();
const playlist_controller = require('../controllers/playlist.controller');
const song_controller = require('../controllers/songs.controller');
const user_controller = require('../controllers/users.controller');

//route to create playlists
playlist_router.post('/secure/create' , user_controller.jwt_verify, playlist_controller.playlist_create);

//route to display playlists all public and user private
playlist_router.get('/secure', user_controller.jwt_verify, playlist_controller.playlist_get);

//route to display playlists for logged in user
playlist_router.get('/secure/user', user_controller.jwt_verify, playlist_controller.playlist_get_user);

//route to edit playlist
playlist_router.put('/secure/update/:id', user_controller.jwt_verify, playlist_controller.playlist_edit);

//route to add songs to playlist
playlist_router.put('/secure/add/songs/:id', user_controller.jwt_verify, playlist_controller.playlist_add_songs);

module.exports = playlist_router;