const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');

const app = express();
const workshopRoutes = require('./routes/workshopRoutes');

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/user', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/workshops', workshopRoutes);

app.get('/', (req, res) => {
  res.json({ message: '🚀 Server is up and running' });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');

    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });

    process.on('SIGINT', async () => {
      console.log('🛑 Shutting down server...');
      await mongoose.connection.close();
      server.close(() => {
        console.log('✅ Server closed.');
        process.exit(0);
      });
    });

  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1);
  });
