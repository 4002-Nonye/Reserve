const passport = require('passport');
const setAuthCookie = require('../utils/setAuthCookie');
require('dotenv').config();

exports.authGoogle = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

exports.authGoogleCallback = (req, res, next) =>
  passport.authenticate('google', { session: false }, (err, user, info) => {
    // We receive the info to link account

    if (info?.message === 'LINK_ACCOUNT') {
      // retrieve the info stored in the token and attach to client URL
      const token = info.token;
      // redirect user to ask for consent
      return res.redirect(
        `${process.env.CLIENT_URL}/link-account/?token=${token}`
      );
    }

    if (!user) {
      res.send('User does not exist');
    }

    setAuthCookie(res, user._id);

    return res.redirect('/');
  })(req, res, next);
