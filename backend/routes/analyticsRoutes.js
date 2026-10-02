const express = require('express');
const requireAuth = require('../middleware/auth');
const { getStats, getSpendTrend } = require('../controllers/analyticsController');
 
const router = express.Router();
 
router.use(requireAuth);
 
router.get('/stats', getStats);
router.get('/spend-trend', getSpendTrend);
 
module.exports = router;
 
