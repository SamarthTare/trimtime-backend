const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const barberRoutes = require('./routes/barbers');
const bookingRoutes = require('./routes/bookings');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('💈 TrimTime Server is LIVE!');
});

// Routes
app.use('/api/barbers', barberRoutes);
app.use('/api/bookings', bookingRoutes);

const MONGO_URI = "mongodb+srv://admin:trimtime123@cluster0.btcrybo.mongodb.net/trimtime?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Cloud MongoDB Connected Successfully!'))
  .catch((err) => console.log('❌ DB Connection Error:', err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});