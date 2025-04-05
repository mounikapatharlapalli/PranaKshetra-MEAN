const express = require('express');
const router = express.Router();
const {
  getAllTrainers,
  getTrainerById,
  createTrainer,
  updateTrainer,
  deleteTrainer
} = require('../controllers/trainerController');

// CRUD Endpoints
router.get('/', getAllTrainers);
router.get('/:id', getTrainerById);
router.post('/', createTrainer);
router.put('/:id', updateTrainer);
router.delete('/:id', deleteTrainer);

module.exports = router;
