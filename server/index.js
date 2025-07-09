const express = require('express');
const connectDB = require('./src/lib/db');
require('./src/models/user');
const localAuthRoute = require('./src/routes/localAuthRoute');
const cookieParser = require('cookie-parser');



require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', localAuthRoute);

app.get('/', (req, res) => {
  res.send('This is my home page ');
});

app.listen(process.env.PORT, () => {
  // Connect to the database after server starts
  connectDB();
});
