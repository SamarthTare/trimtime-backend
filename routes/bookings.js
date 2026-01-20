const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Book Appointment
router.post('/', async (req, res) => {
  const { userId, barberId, service, date, timeSlot } = req.body;

  try {
    // 1. Check agar slot already booked hai
    const existingBooking = await Appointment.findOne({ 
      barberId, 
      date, 
      timeSlot, 
      status: { $ne: 'Cancelled' } 
    });

    if (existingBooking) {
      return res.status(400).json({ message: "Sorry! Ye slot abhi book ho gaya. 😢" });
    }

    // 2. Booking Create Karo
    const newBooking = new Appointment({
      userId,
      barberId,
      service,
      date,
      timeSlot,
      status: 'Confirmed'
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// ... Upar POST wala code hoga, uske niche ye paste karo ...

// 2. GET All Bookings (Dashboard ke liye)
router.get('/', async (req, res) => {
  try {
    // Saari bookings laao aur nayi wali sabse upar rakho
    const bookings = await Appointment.find().sort({ _id: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ... module.exports = router; (Ye last line honi chahiye)
module.exports = router;

