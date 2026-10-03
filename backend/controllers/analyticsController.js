/**Owner Charity the controller with two dashboard 
 * endpoints for a user's tracked services. getStats returns quick totals: active count, monthly spend, 
 * services renewing within 7 days, and bookings. getSpendTrend returns spending per category for each of the last 3, 6, or 12 months, formatted for a chart.
**/  
const Service = require('../models/Service');
 
const CATEGORIES = ['Subscription', 'Utility', 'Booking'];
const ALLOWED_MONTHS = [3, 6, 12];
 
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
 
const getStats = async (req, res, next) => {
  try {
    const services = await Service.find({ userId: req.userId });
 
    const activeServices = services.filter((s) => s.status === 'Active');
    const activeCount = activeServices.length;
    const monthlySpend = activeServices.reduce((sum, s) => sum + s.cost, 0);
 
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
    const dueSoonCount = activeServices.filter(
      (s) => s.renewalDate && s.renewalDate <= sevenDaysFromNow && s.renewalDate >= new Date()
    ).length;
 
    const bookingsCount = services.filter((s) => s.category === 'Booking').length;
 
    res.json({ activeCount, monthlySpend, dueSoonCount, bookingsCount });
  } catch (err) {
    next(err);
  }
};
 
const getSpendTrend = async (req, res, next) => {
  try {
    const requestedMonths = parseInt(req.query.months, 10);
    const months = ALLOWED_MONTHS.includes(requestedMonths) ? requestedMonths : 6;
 
    const monthKeys = getMonthKeys(months);
    const services = await Service.find({ userId: req.userId });
 
    const seriesByMonth = monthKeys.reduce((acc, month) => {
      acc[month] = CATEGORIES.reduce((catAcc, category) => {
        catAcc[category] = 0;
        return catAcc;
      }, { month });
      return acc;
    }, {});
 
    services.forEach((service) => {
      service.costHistory.forEach((entry) => {
        if (seriesByMonth[entry.month]) {
          seriesByMonth[entry.month][service.category] += entry.amount;
        }
      });
    });
 
    const series = monthKeys.map((month) => seriesByMonth[month]);
 
    res.json({ months, series });
  } catch (err) {
    next(err);
  }
};
 
module.exports = { getStats, getSpendTrend };
