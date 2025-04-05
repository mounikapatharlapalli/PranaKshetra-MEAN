const User = require('../models/user');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

// ✅ User Registration
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    const savedUser = await newUser.save();

    const token = generateToken(savedUser);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
      },
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// ✅ Login (Admin + User)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hardcoded admin login (Optional - for now)
    if (email === 'admin@pranakshetra.com' && password === 'admin123') {
      const token = generateToken({ _id: 'admin-id', role: 'admin' });

      return res.json({
        message: 'Admin login successful',
        token,
        user: {
          id: 'admin-id',
          name: 'Admin',
          email,
          role: 'admin',
        },
      });
    }

    // Normal user login
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

// ✅ Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Profile Error:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
};
