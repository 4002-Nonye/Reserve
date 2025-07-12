const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const setAuthCookie = require('../utils/setAuthCookie');
const sanitizeUser = require('../utils/sanitizeUser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = mongoose.model('User');

exports.signup = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    if (!fullName || !email || !password || !role) {
      return res.status(404).json({
        error: 'All fields are required',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format',
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: 'User already exist',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await new User({
      fullName,
      password: hashedPassword,
      email,
      role,
    }).save();

    // Create a JWT token for the newly registered user
    // Send the JWT token as an HTTP-only cookie
    setAuthCookie(res, newUser._id);

    // Destructure the user object to remove sensitive or unnecessary fields before sending to the client
    const safeToSendUser = sanitizeUser(newUser._doc);
    return res.status(201).json({
      message: 'User successfully registered',
      user: safeToSendUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  //Basic validation
  if (!email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const existingUser = await User.findOne({ email });
    // If there is no existing user, do not log in
    if (!existingUser) {
      return res
        .status(401)
        .json({ error: 'User does not exist! Create an account to continue' });
    }
    if (existingUser && existingUser.googleID) {
      return res.status(409).json({
        error:
          'This email is registered with Google. Please sign in with Google.',
      });
    }

    if (existingUser) {
      // compare password to allow login if there is a user
      const comparePassword = bcrypt.compareSync(
        password,
        existingUser.password
      );

      // if passwords do not match, send error ,msg
      if (!comparePassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      setAuthCookie(res, existingUser._id);

      // Destructure the user object to remove sensitive or unnecessary fields before sending to the client
      const safeToSendUser = sanitizeUser(existingUser._doc);

      return res.status(200).json({
        message: 'User successfully logged in',
        user: safeToSendUser,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.logout = async (_, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
    });
    return res.status(200).json({ message: 'Logged out successful' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.linkAccount = async (req, res) => {
  const { token } = req.body;
  console.log(token);

  // retrieve the user object from the token
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const { userEmail, googleID } = payload;
  console.log(payload);
  const existingUser = await User.findOne({ email: userEmail });
  if (!existingUser) {
    return res.status(404).json({ error: 'User does not exist' });
  }
  existingUser.googleID = googleID;
  await existingUser.save();

  setAuthCookie(res, googleID);
  return res.status(200).json({ message: 'Account linked successfully' });
};
