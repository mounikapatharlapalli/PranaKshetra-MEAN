const express = require('express');
const router = express.Router();

// Import controller functions
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');

// @route   POST /api/courses
// @desc    Create a new course
// @access  Public (make private later)
router.post('/', createCourse);

// @route   GET /api/courses
// @desc    Get all courses
// @access  Public (make private later)
router.get('/', getCourses);

// @route   GET /api/courses/:id
// @desc    Get a single course by ID
// @access  Public (make private later)
router.get('/:id', getCourseById);

// @route   PUT /api/courses/:id
// @desc    Update a course by ID
// @access  Public (make private later)
router.put('/:id', updateCourse);

// @route   DELETE /api/courses/:id
// @desc    Delete a course by ID
// @access  Public (make private later)
router.delete('/:id', deleteCourse);

module.exports = router;
