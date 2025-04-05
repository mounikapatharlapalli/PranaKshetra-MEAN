const Course = require('../models/course');

// Create a new course
const createCourse = async (req, res) => {
  const {
    title,
    category,
    description,
    price,
    status,
    imageUrl,
    instructor,
    duration
  } = req.body;

  if (!title || !category || !description || !price || !instructor || !duration) {
    return res.status(400).json({ message: 'All required fields must be provided' });
  }

  try {
    const existingCourse = await Course.findOne({ title });
    if (existingCourse) {
      return res.status(400).json({ message: 'Course with this title already exists' });
    }

    const course = new Course({
      title,
      category,
      description,
      price,
      status,
      imageUrl,
      instructor,
      duration
    });

    const newCourse = await course.save();
    res.status(201).json({
      message: '✅ Course created successfully!',
      course: newCourse
    });
  } catch (err) {
    console.error('❌ Error creating course:', err);
    res.status(500).json({ message: 'Server error while creating course' });
  }
};

// Get all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    console.error('❌ Error fetching courses:', err);
    res.status(500).json({ message: 'Server error while fetching courses' });
  }
};

// Get a course by ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (err) {
    console.error('❌ Error fetching course by ID:', err);
    res.status(500).json({ message: 'Server error while fetching course' });
  }
};

// Update a course by ID
const updateCourse = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      price,
      status,
      imageUrl,
      instructor,
      duration
    } = req.body;

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Update fields
    if (title) course.title = title;
    if (category) course.category = category;
    if (description) course.description = description;
    if (price !== undefined) course.price = price;
    if (status) course.status = status;
    if (imageUrl) course.imageUrl = imageUrl;
    if (instructor) course.instructor = instructor;
    if (duration) course.duration = duration;

    const updatedCourse = await course.save();

    res.json({
      message: '✅ Course updated successfully!',
      course: updatedCourse
    });
  } catch (err) {
    console.error('❌ Error updating course:', err);
    res.status(500).json({ message: 'Server error while updating course' });
  }
};

// Delete a course by ID
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await course.deleteOne();

    res.json({ message: '✅ Course deleted successfully!' });
  } catch (err) {
    console.error('❌ Error deleting course:', err);
    res.status(500).json({ message: 'Server error while deleting course' });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
};
