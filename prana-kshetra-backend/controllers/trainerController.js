const Trainer = require('../models/trainerModel');

// Get all trainers
exports.getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json(trainers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get a single trainer by ID
exports.getTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }
    res.status(200).json(trainer);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Create a new trainer
exports.createTrainer = async (req, res) => {
  try {
    const newTrainer = new Trainer(req.body);
    const savedTrainer = await newTrainer.save();
    res.status(201).json(savedTrainer);
  } catch (error) {
    res.status(400).json({ message: 'Bad Request', error });
  }
};

// Update a trainer
exports.updateTrainer = async (req, res) => {
  try {
    const updatedTrainer = await Trainer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTrainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }
    res.status(200).json(updatedTrainer);
  } catch (error) {
    res.status(400).json({ message: 'Bad Request', error });
  }
};

// Delete a trainer
exports.deleteTrainer = async (req, res) => {
  try {
    const deletedTrainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!deletedTrainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }
    res.status(200).json({ message: 'Trainer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
