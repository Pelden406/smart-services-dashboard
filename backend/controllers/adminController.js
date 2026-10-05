const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User');
const Service = require('../models/Service');
const Notification = require('../models/Notification');
const { createWelcomeNotifications } = require('./authController');
 
const ROLES = ['user', 'admin'];
 
const toPublicUser = (user, serviceCount = 0) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role || 'user',
  createdAt: user.createdAt,
  serviceCount,
});
 
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 }).lean();
 
    const counts = await Service.aggregate([{ $group: { _id: '$userId', count: { $sum: 1 } } }]);
    const countByUser = new Map(counts.map((c) => [String(c._id), c.count]));
 
    res.json(users.map((user) => toPublicUser(user, countByUser.get(String(user._id)) || 0)));
  } catch (err) {
    next(err);
  }
};
 
const createUser = async (req, res, next) => {
  try {
    const name = (req.body.name || '').trim();
    const email = (req.body.email || '').trim().toLowerCase();
    const { password } = req.body;
    const role = req.body.role || 'user';
 
    if (!name) return res.status(400).json({ message: 'Name is required.' });
    if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ message: 'Enter a valid email address.' });
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }
    if (!ROLES.includes(role)) return res.status(400).json({ message: 'Role must be user or admin.' });
 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }
 
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });
    await createWelcomeNotifications(user._id);
 
    res.status(201).json(toPublicUser(user));
  } catch (err) {
    next(err);
  }
};
 
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
 
    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (id === String(req.userId)) {
      return res.status(400).json({ message: "You can't delete your own account." });
    }
 
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
 
    if (user.role === 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin' });
      if (adminCount <= 1) {
        return res.status(400).json({ message: "You can't delete the last admin." });
      }
    }
 
    // Remove everything the user owns so nothing is left orphaned.
    await Service.deleteMany({ userId: user._id });
    await Notification.deleteMany({ userId: user._id });
    await user.deleteOne();
 
    res.json({ message: 'User deleted', id: user._id });
  } catch (err) {
    next(err);
  }
};
 
module.exports = { getUsers, createUser, deleteUser };
