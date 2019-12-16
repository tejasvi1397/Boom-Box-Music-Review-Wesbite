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
user_router.get('/admin/users', user_controller.jwt_verify, user_controller.user_get);

//route to verify email address
user_router.get('/secure/verify', user_controller.user_verify_email);

//route to resend email
user_router.get('/secure/resend',user_controller.user_resend_email);
module.exports = user_router;