const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/user'); // Update path as per your project

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  });

const createAdminUser = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@pranakshetra.com' });

    if (existingAdmin) {
      console.log('⚠️ Admin user already exists.');
      process.exit(0);
    }

    // Hash the password
    const plainPassword = 'admin123'; // You can choose a stronger password!
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Create the admin user
    const adminUser = new User({
      name: 'Admin',
      email: 'admin@pranakshetra.com',
      password: hashedPassword,
      role: 'admin'
    });

    await adminUser.save();

    console.log('✅ Admin user created successfully!');
    console.log(`🔑 Email: admin@pranakshetra.com`);
    console.log(`🔐 Password: ${plainPassword}`);
    process.exit(0);

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
};

createAdminUser();
