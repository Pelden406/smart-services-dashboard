require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Service = require('../models/Service');
 
const MONTHS_BACK = 6;
const VARIATION = 0.1;
 
const getMonthKeys = (count) => {
  const keys = [];
  const cursor = new Date();
  cursor.setDate(1);
  for (let i = count - 1; i >= 0; i -= 1) {
    const d = new Date(cursor.getFullYear(), cursor.getMonth() - i, 1);
    keys.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  }
  return keys;
};
 
const randomizedAmount = (baseCost) => {
  const factor = 1 + (Math.random() * 2 - 1) * VARIATION;
  return Math.round(baseCost * factor * 100) / 100;
};
 
const run = async () => {
  const email = process.argv[2];
 
  if (!email) {
    console.error('Usage: node scripts/seedHistory.js <user-email>');
    process.exit(1);
  }
 
  await connectDB();
 
  const user = await User.findOne({ email });
  if (!user) {
    console.error(`No user found with email ${email}`);
    await mongoose.disconnect();
    process.exit(1);
  }
 
  const services = await Service.find({ userId: user._id });
  if (services.length === 0) {
    console.log(`No services found for ${email} — nothing to seed.`);
    await mongoose.disconnect();
    process.exit(0);
  }
 
  const monthKeys = getMonthKeys(MONTHS_BACK);
 
  for (const service of services) {
    service.costHistory = monthKeys.map((month) => ({
      month,
      amount: randomizedAmount(service.cost),
    }));
    await service.save();
    console.log(`Seeded ${MONTHS_BACK} months of costHistory for "${service.name}" (${service._id})`);
  }
 
  console.log(`Done. Backfilled costHistory for ${services.length} service(s) belonging to ${email}.`);
  await mongoose.disconnect();
  process.exit(0);
};
 
run().catch((err) => {
  console.error('Seed script failed:', err);
  process.exit(1);
});
