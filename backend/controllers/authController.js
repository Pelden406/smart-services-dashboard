const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Notification = require('../models/Notification');
 
const signToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};
 
const createWelcomeNotifications = (userId) => {
  return Notification.insertMany([
    {
      userId,
      type: 'System',
      message: 'Welcome to SmartServices! Add your first subscription, utility or booking to get started.',
    },
    {
      userId,
      type: 'System',
      message: 'Tip: enable a reminder on a service to get notified before it renews.',
    },
    {
      userId,
      type: 'Renewal',
      message: 'No renewals tracked yet — add a service with a renewal date to see it here.',
    },
  ]);
};
 
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }
 
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    await createWelcomeNotifications(user._id);
 
    const token = signToken(user._id);
    res.status(201).json({
      token,
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
};
 
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
 
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
 
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
 
    const token = signToken(user._id);
    res.json({
      token,
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
};
 
module.exports = { register, login };
