const express = require('express');
const {
  signup,
  login,
  logout,
  linkAccount,
} = require('../controllers/localAuthController');

const localAuthRoute = express.Router();

localAuthRoute.post('/signup', signup);
localAuthRoute.post('/login', login);
localAuthRoute.post('/logout', logout);
localAuthRoute.post('/link-account', linkAccount);

module.exports = localAuthRoute;
