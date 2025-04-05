const jwt = require('jsonwebtoken');
const User = require('../models/user');

// ✅ Protect routes (authentication)
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Hardcoded admin check
      if (decoded.id === 'admin-id') {
        req.user = { id: 'admin-id', role: 'admin', name: 'Admin' };
      } else {
        req.user = await User.findById(decoded.id).select('-password');
      }

      next();
    } catch (error) {
      console.error('JWT Error:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// ✅ Role-based authorization
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role '${req.user?.role}' is not authorized`,
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
