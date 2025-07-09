const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const setAuthCookie = require('../utils/setAuthCookie');

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

    const { password: userPassword, ...sanitizeUser } = newUser._doc;
    return res.status(201).json({
      message: 'User successfully registered',
      user: sanitizeUser,
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

      const { password: userPassword, ...sanitizeUser } = existingUser._doc;

      return res.status(200).json({
        message: 'User successfully logged in',
        user: sanitizeUser,
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
