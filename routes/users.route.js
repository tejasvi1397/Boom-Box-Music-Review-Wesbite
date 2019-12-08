const express = require('express');
const user_router = express.Router();
const user_controller = require('../controllers/users.controller');

//route to create new user
user_router.post('/secure/register' , user_controller.user_create);

//route to login user
user_router.post('/secure/login' , user_controller.user_login);

//route to modify user - admin
user_router.put('/admin/update/:id', user_controller.jwt_verify, user_controller.user_modify);

//routr to get all users
user_router.get('/users', user_controller.user_get)
module.exports = user_router;