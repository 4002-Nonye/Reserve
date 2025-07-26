const express = require('express');
const {
  authGoogle,
  authGoogleCallback,
} = require('../../controllers/oAuthController');
const googleAuthRoute = express.Router();

googleAuthRoute.get('/', authGoogle);

googleAuthRoute.get('/callback', authGoogleCallback);

module.exports = googleAuthRoute;
