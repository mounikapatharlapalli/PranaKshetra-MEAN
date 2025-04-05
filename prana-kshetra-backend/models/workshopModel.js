const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true },
  image: { type: String }, // optional workshop image
  createdAt: { type: Date, default: Date.now }
});

const Workshop = mongoose.model('Workshop', workshopSchema);

module.exports = Workshop;
