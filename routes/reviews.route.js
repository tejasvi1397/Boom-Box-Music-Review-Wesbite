const express = require('express');
const review_router = express.Router();
const review_controller = require('../controllers/review.controller');

review_router.post('/create' , review_controller.review_create);

module.exports = review_router;