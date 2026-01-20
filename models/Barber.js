const mongoose = require('mongoose');

const barberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  shopName: { type: String, required: true },
  services: [{ name: String, price: Number, duration: Number }],
  rating: { type: Number, default: 0 },
  images: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Barber', barberSchema);