const FIELD_LABELS = {
  name: 'Name',
  provider: 'Provider',
  category: 'Category',
  cost: 'Cost',
  billingCycle: 'Billing cycle',
  status: 'Status',
  renewalDate: 'Renewal date',
  email: 'Email',
  password: 'Password',
};
 
const fieldLabel = (path) => FIELD_LABELS[path] || path.charAt(0).toUpperCase() + path.slice(1);
 
const friendlyFieldMessage = (path, subError) => {
  const label = fieldLabel(path);
  switch (subError.kind) {
    case 'required':
      return `${label} is required.`;
    case 'Number':
      return `${label} must be a number.`;
    case 'Date':
      return `${label} must be a valid date.`;
    case 'enum':
      return `${label} must be one of the allowed values.`;
    case 'minlength':
    case 'min':
      return `${label} is too small.`;
    case 'maxlength':
    case 'max':
      return `${label} is too large.`;
    default:
      return `${label} is invalid.`;
  }
};
 
const errorHandler = (err, req, res, _next) => {
  // Full detail stays in the server log only — the client never sees a raw
  // stack trace or driver-level message.
  console.error(err.stack);
 
  if (err.name === 'ValidationError') {
    const [firstPath, firstSubError] = Object.entries(err.errors)[0];
    return res.status(400).json({ message: friendlyFieldMessage(firstPath, firstSubError) });
  }
 
  if (err.name === 'CastError') {
    return res.status(404).json({ message: 'Service not found' });
  }
 
  if (err.code === 11000) {
    return res.status(400).json({ message: 'That value is already in use.' });
  }
 
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({ message: 'Something went wrong on our side. Please try again.' });
};
 
module.exports = errorHandler;
