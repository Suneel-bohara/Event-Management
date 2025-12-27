const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // Added name so the Navbar can show "Welcome, [Name]"
  name: { 
    type: String, 
    required: [true, "Please provide a name"] 
  },
  email: { 
    type: String, 
    required: [true, "Please provide an email"], 
    unique: true 
  },
  password: { 
    type: String, 
    required: [true, "Please provide a password"] 
  },
  // We'll use role for more flexibility (user vs admin)
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  },
  // Keeping your existing field for backward compatibility
  isAdmin: { 
    type: Boolean, 
    default: false 
  }
});

module.exports = mongoose.model('User', UserSchema);