const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ticketsPurchased: {
    type: Number,
    required: true,
    default: 1
  },
  totalAmount: {
    type: Number,
    required: true // This is what was causing your validation error
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Confirmed'], // Case-sensitive!
    default: 'Confirmed' 
  },
  bookingDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', BookingSchema);