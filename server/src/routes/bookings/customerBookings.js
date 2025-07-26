const express = require('express');
const {
  getAllBookings,
  createNewBooking,
  editBooking,
  deleteBooking,
  getBookingById,
} = require('../../controllers/customerBookingsController');
const requireLogin = require('../../middlewares/requireLogin');

const customerBookings = express.Router();

customerBookings.get('/all-bookings/:customerID', requireLogin, getAllBookings);

customerBookings.get('/bookings/:id', requireLogin, getBookingById);

customerBookings.post('/new-booking', requireLogin, createNewBooking);

customerBookings.patch('/edit-booking/:id', requireLogin, editBooking);

customerBookings.delete('/delete-booking/:id', requireLogin, deleteBooking);

module.exports = customerBookings;
