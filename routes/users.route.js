const express = require('express');
const user_router = express.Router();
const user_controller = require('../controllers/users.controller');

user_router.post('/register' , user_controller.user_create);

module.exports = user_router;