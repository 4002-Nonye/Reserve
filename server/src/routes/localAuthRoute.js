const express = require('express');
const { signup, login, logout } = require('../controllers/localAuthController');

const localAuthRoute = express.Router();

localAuthRoute.post('/signup', signup);
localAuthRoute.post('/login', login);
localAuthRoute.post('/logout', logout);

module.exports = localAuthRoute;
