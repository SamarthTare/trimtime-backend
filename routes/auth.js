const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = "trimtime_super_secret_key_123"; // Asli project mein ye .env mein hona chahiye

// 1. REGISTER (Naya Account)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check agar user pehle se hai
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    // Password ko Encrypt karo (Security)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // User save karo
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'customer'
    });
    
    await newUser.save();
    res.status(201).json({ message: "User created successfully! Please Login." });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// 2. LOGIN (Purana User)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // User dhundo
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Password match karo
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

    // Token banao (Isme user ki ID aur Role chupa hoga)
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      JWT_SECRET, 
      { expiresIn: '1d' }
    );

    res.json({ 
      token, 
      user: { id: user._id, name: user.name, role: user.role } 
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;