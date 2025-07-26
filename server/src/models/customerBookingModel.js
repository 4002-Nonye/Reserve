const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerBookingSchema = new Schema(
  {
    // serviceProvider: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Business',
    // },
    serviceProvider: String,
    email: String,
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    service:String,
    fullName: String,
    appointmentDate: Date,
    dateBooked: Date,
    paid: Boolean,
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

mongoose.model('CustomerBookingModel', customerBookingSchema);
