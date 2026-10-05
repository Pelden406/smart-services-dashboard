const User = require('../models/User');
 
// Runs after requireAuth. Looks the role up in the database on every request
// (rather than trusting the token) so removing someone's admin role takes
// effect immediately.
const requireAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('role');
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    next();
  } catch (err) {
    next(err);
  }
};
 
module.exports = requireAdmin;
