const express = require('express');
const user_router = express.Router();
const user_controller = require('../controllers/users.controller');

//route to create new user
user_router.post('/register' , user_controller.user_create);

//route to login user
user_router.post('/login' , user_controller.user_login);

module.exports = user_router;