require('dotenv').config(); // MUST be the first line
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookingRoutes = require('./routes/bookingRoutes.js');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/user.js');

const app = express();

// --- 1. MIDDLEWARE (Must be before Routes) ---
// This allows your Vercel frontend to talk to your Render backend
app.use(cors({
    origin: '*', // For production, you can replace this with your Vercel URL
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// This is required to read data sent in the body of POST requests
app.use(express.json());

// --- 2. DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🚀 MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// --- 3. ROUTES ---

// ROOT ROUTE: Fixes the "Cannot GET /" error
app.get('/', (req, res) => {
  res.send('Tea Leaves API is Live and Running');
});

// API Routes
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);

// User Management APIs
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/users', async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// --- 4. START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✨ Server active on port ${PORT}`));