require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
 
const run = async () => {
  const email = process.argv[2];
  const role = process.argv[3] === '--remove' ? 'user' : 'admin';
 
  if (!email) {
    console.error('Usage: node scripts/makeAdmin.js <user-email> [--remove]');
    process.exit(1);
  }
 
  await connectDB();
 
  const user = await User.findOneAndUpdate({ email }, { role }, { new: true });
  if (!user) {
    console.error(`No user found with email ${email}`);
    await mongoose.disconnect();
    process.exit(1);
  }
 
  console.log(`${user.email} is now role "${user.role}". Log out and back in to see the change in the app.`);
  await mongoose.disconnect();
  process.exit(0);
};
 
run().catch((err) => {
  console.error('makeAdmin script failed:', err);
  process.exit(1);
});
