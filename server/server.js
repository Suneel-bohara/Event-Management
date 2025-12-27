const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bookingRoutes = require('./routes/bookingRoutes.js');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const eventRoutes = require('./routes/eventRoutes');
app.use('/api/events', eventRoutes); // All event APIs will start with /api/events
app.use('/api/bookings', bookingRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

const User = require('./models/user.js');

// API endpoint to get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// API endpoint to add a user (for testing)
app.post('/api/users', async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



