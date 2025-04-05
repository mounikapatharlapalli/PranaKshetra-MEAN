const express = require('express');
const router = express.Router();

const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getUserProfile,
  getAllUsers,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// ✅ Get user profile (authenticated users)
router.get('/profile', protect, getUserProfile);

// ✅ User dashboard (authenticated users)
router.get('/dashboard', protect, (req, res) => {
  res.json({
    message: 'Welcome to your dashboard',
    user: req.user
  });
});

// ✅ Admin-only route
router.get('/admin', protect, authorize('admin'), (req, res) => {
  res.json({
    message: 'Welcome Admin',
    user: req.user
  });
});

// ✅ Instructor-only route
router.get('/instructor', protect, authorize('instructor'), (req, res) => {
  res.json({
    message: 'Welcome Instructor',
    user: req.user
  });
});

//
// ✅ Admin: Get all users
router.get('/all', protect, authorize('admin'), getAllUsers);

// ✅ Admin: Update user by ID
router.put('/:id', protect, authorize('admin'), updateUser);

// ✅ Admin: Delete user by ID
router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router;
