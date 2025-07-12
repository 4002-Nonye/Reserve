const express = require('express');
const connectDB = require('./src/lib/db');
require('./src/models/user');
const localAuthRoute = require('./src/routes/localAuthRoute');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const setAuthCookie = require('./src/utils/setAuthCookie');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback', // when the user give us permission to access their profile, the user is thrown back to this URL with a code from google attached to the URL,
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const { id, displayName, emails, photos } = profile;

      const userEmail = emails[0].value;
      const existingUser = await User.findOne({ email: userEmail });
      if (existingUser) {
        if (existingUser && !existingUser.googleID) {
          const token = jwt.sign(
            { userEmail, googleID: id, displayName },
            process.env.JWT_SECRET,
            { expiresIn: '10m' }
          );
          return done(null, false, {
            message: 'LINK_ACCOUNT',
            token,
          });
        }

        return done(null, existingUser);
      } else {
        const newUser = await new User({
          googleID: id,
          email: userEmail,
          fullName: displayName,
        }).save();

        done(null, newUser);
      }
    }
  )
);

const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true, // allow cookies if you're using them
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use('/api/auth', localAuthRoute);
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback', (req, res, next) =>
  passport.authenticate('google', { session: false }, (err, user, info) => {
    console.log(err, user, info);
    if (info?.message === 'LINK_ACCOUNT') {
      const token = info.token;
      return res.redirect(`http://localhost:5173/link-account/?token=${token}`);
    }

    if (!user) {
      res.send('User does not exist');
    }

    return res.send('success');
  })(req, res, next)
);
app.get('/', (req, res) => {
  res.send('This is my home page ');
});

app.listen(process.env.PORT, () => {
  // Connect to the database after server starts
  console.log(process.env.PORT);
  connectDB();
});
