const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Unique email zaroori hai
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['customer', 'admin', 'barber'], // Teen tarah ke log
    default: 'customer' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);