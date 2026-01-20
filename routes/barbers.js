const express = require('express');
const router = express.Router();
const Barber = require('../models/Barber');

// 1. Get All Barbers (Frontend isse list dikhayega)
router.get('/', async (req, res) => {
  try {
    const barbers = await Barber.find();
    res.json(barbers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. Add a New Barber (Testing ke liye)
router.post('/', async (req, res) => {
  const barber = new Barber({
    name: req.body.name,
    location: req.body.location,
    shopName: req.body.shopName,
    services: req.body.services
  });

  try {
    const newBarber = await barber.save();
    res.status(201).json(newBarber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;