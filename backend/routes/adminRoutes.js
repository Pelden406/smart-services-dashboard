const express = require('express');
const requireAuth = require('../middleware/auth');
const requireAdmin = require('../middleware/requireAdmin');
const { getUsers, createUser, deleteUser } = require('../controllers/adminController');
 
const router = express.Router();
 
router.use(requireAuth, requireAdmin);
 
router.get('/users', getUsers);
router.post('/users', createUser);
router.delete('/users/:id', deleteUser);
 
module.exports = router;
