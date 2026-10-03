const express = require('express');
const requireAuth = require('../middleware/auth');
const { getNotifications, markAsRead, createNotification } = require('../controllers/notificationController');
 
const router = express.Router();
 
router.use(requireAuth);
 
router.get('/', getNotifications);
router.post('/', createNotification);
router.patch('/:id/read', markAsRead);
 
module.exports = router;
 
