const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// --- REGISTER ---
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Identity already exists in vault" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin: false, // Default to regular user
      role: 'user'
    });

    await user.save();

    // Token now includes isAdmin status
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin }, 
      process.env.JWT_SECRET || 'secret', 
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error during registration" });
  }
});

// --- LOGIN ---
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) return res.status(400).json({ message: "Invalid Identity" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Identity" });

    // Token now includes isAdmin status
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin }, 
      process.env.JWT_SECRET || 'secret', 
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Login Server Error" });
  }
});

module.exports = router;