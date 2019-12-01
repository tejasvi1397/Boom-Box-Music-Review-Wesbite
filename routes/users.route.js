const express = require('express');
const user_router = express.Router();
const user_controller = require('../controllers/users.controller');

user_router.post('/register' , user_controller.user_create);
user_router.post('/login' , user_controller.user_login);

module.exports = user_router;