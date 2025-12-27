const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true }, // e.g., "Toronto, ON"
  venue: { type: String, required: true },    // e.g., "The Opera House"
  category: { 
    type: String, 
    enum: ['Music', 'Movie', 'Festival', 'Other'], 
    default: 'Music' 
  },
  price: { type: Number, required: true },
  image: { type: String }, // URL for the poster image
  totalTickets: { type: Number, required: true },
  soldTickets: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', EventSchema);