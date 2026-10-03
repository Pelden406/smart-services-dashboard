const Notification = require('../models/Notification');
 
const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    next(err);
  }
};
 
const markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { read: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.json(notification);
  } catch (err) {
    next(err);
  }
};
 
const createNotification = async (req, res, next) => {
  try {
    const { type, message } = req.body;
    const notification = await Notification.create({ userId: req.userId, type, message });
    res.status(201).json(notification);
  } catch (err) {
    next(err);
  }
};
 
module.exports = { getNotifications, markAsRead, createNotification };
 
