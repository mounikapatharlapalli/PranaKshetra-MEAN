const express = require('express');
const router = express.Router();

const { register, login, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// ✅ Register Route
router.post('/register', register);

// ✅ Login Route
router.post('/login', login);

// ✅ Get Profile (Protected)
router.get('/profile', protect, getUserProfile);

module.exports = router;
