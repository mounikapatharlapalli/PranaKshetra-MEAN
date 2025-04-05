const Workshop = require('../models/workshopModel');

// Get all workshops
const getWorkshops = async (req, res) => {
  try {
    const workshops = await Workshop.find().populate('trainer', 'name');
    res.json(workshops);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workshops', error });
  }
};

// Create a new workshop
const createWorkshop = async (req, res) => {
  try {
    const workshop = new Workshop(req.body);
    await workshop.save();
    res.status(201).json({ message: 'Workshop created successfully', workshop });
  } catch (error) {
    res.status(400).json({ message: 'Error creating workshop', error });
  }
};

// Update a workshop
const updateWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Workshop updated successfully', workshop });
  } catch (error) {
    res.status(400).json({ message: 'Error updating workshop', error });
  }
};

// Delete a workshop
const deleteWorkshop = async (req, res) => {
  try {
    await Workshop.findByIdAndDelete(req.params.id);
    res.json({ message: 'Workshop deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting workshop', error });
  }
};

module.exports = {
  getWorkshops,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
};
