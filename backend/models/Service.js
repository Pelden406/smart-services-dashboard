const mongoose = require('mongoose');
 
const activitySchema = new mongoose.Schema(
  {
    date: Date,
    label: String,
  },
  { _id: false }
);
 
const costHistorySchema = new mongoose.Schema(
  {
    month: String,
    amount: Number,
  },
  { _id: false }
);
 
const serviceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
    },
    category: {
      type: String,
      enum: ['Subscription', 'Utility', 'Booking'],
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    billingCycle: {
      type: String,
      enum: ['Monthly', 'Quarterly', 'Yearly'],
      required: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Paused', 'Cancelled'],
      default: 'Active',
    },
    renewalDate: {
      type: Date,
      default: null,
    },
    reminder: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      default: '',
    },
    usageHistory: {
      type: [Number],
      default: [],
    },
    activity: {
      type: [activitySchema],
      default: [],
    },
    costHistory: {
      type: [costHistorySchema],
      default: [],
    },
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('Service', serviceSchema);
