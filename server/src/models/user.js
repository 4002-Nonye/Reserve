const mongoose = require('mongoose');

const { Schema } = mongoose;

// properties we want our users to have
const userSchema = new Schema(
  {
    avatar: String,
    googleID: String,

    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: String,
    role: {
      type: String,
      enum: ['customer', 'business_owner'],
      default: 'customer',
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  }
);

// To create a collection of users (Table of users)
mongoose.model('User', userSchema); // two arguments means we are trying to create a collection
