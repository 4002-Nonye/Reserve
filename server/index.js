const express = require('express');
const connectDB = require('./src/lib/db');
require('./src/models/user');
const localAuthRoute = require('./src/routes/localAuthRoute');
const googleAuthRoute = require('./src/routes/googleAuthRoute');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('./src/lib/passport');
require('dotenv').config();
const cors = require('cors');


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
app.use('/auth/google', googleAuthRoute);

app.listen(process.env.PORT, () => {
  // Connect to the database after server starts
  console.log(process.env.PORT);
  connectDB();
});
