const express = require('express');
const router = express.Router();

const {
  getWorkshops,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop
} = require('../controllers/workshopController');

// Optional middleware, comment out if you haven't implemented
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Secure routes (if you have middleware)
router.get('/', getWorkshops);
router.post('/', createWorkshop); // ✅ No 'protect' for testing
router.put('/:id', updateWorkshop);
router.delete('/:id', deleteWorkshop);

module.exports = router;
