const express = require('express');
const requireLogin = require('../middlewares/requireLogin');
const {
  signup,
  login,
  logout,
  linkAccount,
  forgotPassword,
  resetPassword,
} = require('../controllers/localAuthController');

const localAuthRoute = express.Router();

localAuthRoute.post('/signup', signup);
localAuthRoute.post('/login', login);
localAuthRoute.get('/logout', logout);
localAuthRoute.post('/link-account', linkAccount);
localAuthRoute.post('/forgot-password', requireLogin, forgotPassword);
localAuthRoute.post('/reset-password', requireLogin, resetPassword);

module.exports = localAuthRoute;
