const express = require('express');
const router = express.Router();
const Booking = require('../models/booking.js');
const Event = require('../models/event.js');

// POST - Create a new booking
router.post('/', async (req, res) => {
  const { eventId, userId, ticketsPurchased } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // 1. Calculate the totalAmount on the server for security
    const calculatedAmount = event.price * ticketsPurchased;

    // 2. Create the booking with the EXACT casing for 'status'
    const newBooking = new Booking({
      event: eventId,
      user: userId,
      ticketsPurchased: ticketsPurchased,
      totalAmount: calculatedAmount, 
      status: 'Confirmed' // Changed from 'confirmed' to 'Confirmed' to match your Enum
    });

    const savedBooking = await newBooking.save();

    // 3. Update inventory
    event.soldTickets += ticketsPurchased;
    await event.save();

    res.status(201).json(savedBooking);

  } catch (err) {
    console.error("DEBUG:", err.message);
    res.status(400).json({ message: `Validation Error: ${err.message}` });
  }
});


// GET - Fetch all bookings for the Admin Report
router.get('/report', async (req, res) => {
  try {
    // .populate('event') pulls in the Event details (like title) instead of just the ID
    const bookings = await Booking.find()
      .populate('event', 'title price')
      .sort({ bookingDate: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET - Find bookings for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const userBookings = await Booking.find({ user: req.params.userId })
      .populate('event'); // Pull in the full event details (title, image, etc.)
    res.json(userBookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST - Verify a ticket via QR Code
router.post('/verify/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('event');
    if (!booking) {
      return res.status(404).json({ message: "Invalid Ticket" });
    }
    
    // You could add a 'status' field to the Booking model 
    // to prevent people from using the same ticket twice.
    res.json({ 
      message: "Ticket Valid", 
      eventTitle: booking.event.title 
    });
  } catch (err) {
    res.status(500).json({ message: "Verification error" });
  }
});

module.exports = router;