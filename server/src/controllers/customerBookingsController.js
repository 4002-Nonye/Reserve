const mongoose = require('mongoose');
const sendEmail = require('../lib/sendEmail');
const customerNewBookingConfirmation = require('../utils/emailTemplates/customerNewBookingConfirmation');
const providerNewBookingConfirmation = require('../utils/emailTemplates/providerNewBookingConfirmation');

const CustomerBooking = mongoose.model('CustomerBookingModel');

exports.getAllBookings = async (req, res) => {
  const customerId = req.user.id;
  try {
    // get all booking made by the currently logged in user(customer)
    const bookings = await CustomerBooking.find({ customer: customerId });

    // no bookings made yet
    if (!bookings) {
      return res.status(404).json({ error: 'No bookings yet' });
    }

    // bookings fetched successfully
    return res
      .status(200)
      .json({ message: 'Bookings fetched successfully', data: bookings });
  } catch (err) {
    return res.status(500).json({
      error: 'Failed to fetch bookings',
    });
  }
};

exports.getBookingById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await CustomerBooking.findById(id);
    console.log(data);

    if (!data) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    return res
      .status(200)
      .json({ message: 'Booking fetched successfully', data });
  } catch (err) {
    return res.status(500).json({
      error: 'Failed to fetch booking',
    });
  }
};

exports.createNewBooking = async (req, res) => {
  try {
    const {
      serviceProvider,
      appointmentDate,
      fullName,
      service,
      serviceProviderId,
    } = req.body.booking;

    if (
      !serviceProvider ||
      !appointmentDate ||
      !fullName ||
      !service ||
      !serviceProviderId
    ) {
      return res.status(400).json({ error: 'Booking data is required' });
    }

    const data = {
      fullName,
      service,
      serviceProvider,
      serviceProviderId,
      customer: req.user.id,
      appointmentDate: new Date(appointmentDate),
      dateBooked: new Date(),
      paid: false,
      status: 'pending',
    };

    // todo: include proper service
    const customerBooking = await new CustomerBooking(data);
    await customerBooking.save();

    // send email to customer that booking placed and awaiting confirmation from business owner
    await sendEmail(
      req.user.email,
      'Booking confirmation',
      customerNewBookingConfirmation(customerBooking)
    );

    // send email to service provide to confirm booking or cancel

    await sendEmail(
      serviceProviderId,
      'Booking confirmation',
      providerNewBookingConfirmation(customerBooking)
    );

    return res.status(201).json({
      message: 'New Booking created. Check your email for details',
      data: customerBooking,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Failed to create booking',
    });
  }
};

exports.editBooking = async (req, res) => {
  // payment status can be edited for now

  // todo: after business owner receives booking and confirms it, notify the customer that they can proceed to pay

  // after payment process is completed, proceed to change payment status
  const { id } = req.params;

  try {
    const booking = await CustomerBooking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    booking.status = 'confirmed';
    booking.paid = true;
    await booking.save();
    return res
      .status(200)
      .json({ message: 'Payment status updated', data: booking });
  } catch (err) {
    return res.status(500).json({
      error: 'Failed to update status',
    });
  }
};

exports.deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBooking = await CustomerBooking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res
        .status(404)
        .json({ error: 'Booking not found or unauthorized' });
    }
    return res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (err) {
    return res.status(500).json({
      error: 'Failed to delete booking',
    });
  }
};
// todo: 'Please confirm you want to book this service? Once booked, some data can not be edited. If you wish to edit, you can create a new booking and delete the old one.'
