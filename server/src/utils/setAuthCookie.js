const jwt = require('jsonwebtoken');
require('dotenv').config();

const setAuthCookie = (res, userId) => {
  // create a jwt for a newly created user
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  // send the token to the browser as a HTTP-only token
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    maxAge: 24 * 60 * 60 * 1000,
  });
};

module.exports = setAuthCookie;
