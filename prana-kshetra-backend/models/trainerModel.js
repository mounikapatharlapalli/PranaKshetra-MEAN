const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  expertise: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  experience: {
    type: Number, // years of experience
    required: true,
  },
  image: {
    type: String, // URL or filename for the trainer's profile image
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Trainer = mongoose.model('Trainer', trainerSchema);

module.exports = Trainer;
