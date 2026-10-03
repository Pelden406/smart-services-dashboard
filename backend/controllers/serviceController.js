const Service = require('../models/Service');
 
const getCurrentMonthKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};
 
const SORT_OPTIONS = {
  'name-asc': { name: 1 },
  'name-desc': { name: -1 },
  'cost-asc': { cost: 1 },
  'cost-desc': { cost: -1 },
};
 
const getServices = async (req, res, next) => {
  try {
    const { search, category, status, sortBy } = req.query;
 
    const query = { userId: req.userId };
 
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
 
    if (category && category !== 'All') {
      query.category = category;
    }
 
    if (status && status !== 'All') {
      query.status = status;
    }
 
    let cursor = Service.find(query);
 
    if (sortBy && SORT_OPTIONS[sortBy]) {
      cursor = cursor.sort(SORT_OPTIONS[sortBy]);
    }
 
    const services = await cursor;
    res.json(services);
  } catch (err) {
    next(err);
  }
};
 
const getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findOne({ _id: req.params.id, userId: req.userId });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (err) {
    next(err);
  }
};
 
const createService = async (req, res, next) => {
  try {
    const service = await Service.create({
      ...req.body,
      userId: req.userId,
      costHistory: [{ month: getCurrentMonthKey(), amount: req.body.cost }],
    });
    res.status(201).json(service);
  } catch (err) {
    next(err);
  }
};
 
const updateService = async (req, res, next) => {
  try {
    const service = await Service.findOne({ _id: req.params.id, userId: req.userId });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
 
    Object.assign(service, req.body);
 
    if (req.body.cost !== undefined) {
      const currentMonth = getCurrentMonthKey();
      const existingEntry = service.costHistory.find((entry) => entry.month === currentMonth);
      if (existingEntry) {
        existingEntry.amount = req.body.cost;
      } else {
        service.costHistory.push({ month: currentMonth, amount: req.body.cost });
      }
    }
 
    await service.save();
    res.json(service);
  } catch (err) {
    next(err);
  }
};
 
const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted' });
  } catch (err) {
    next(err);
  }
};
 
module.exports = { getServices, getServiceById, createService, updateService, deleteService };
 
