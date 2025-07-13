const passport = require('passport');

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
      return res.redirect(`http://localhost:5173/link-account/?token=${token}`);
    }

    if (!user) {
      res.send('User does not exist');
    }

    return res.redirect('/');
  })(req, res, next);
