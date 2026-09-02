/**
 * Owner: Zubir — Forms & Service Detail
 * Purpose: Add/edit form for a service, with inline validation on blur.
 * Used by ServiceFormPage in both "add" and "edit" modes.
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, BILLING_CYCLES } from '../../data/services';
import './ServiceForm.css';

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Service name is required.';
  if (!values.category) errors.category = 'Choose a category.';

  if (values.cost === '' || values.cost === null) {
    errors.cost = 'Enter a monthly cost.';
  } else if (Number.isNaN(Number(values.cost)) || Number(values.cost) < 0) {
    errors.cost = 'Enter a number, e.g. 79.00';
  }

  if (!values.renewalDate) errors.renewalDate = 'Choose a renewal date.';

  return errors;
}

export default function ServiceForm({ initialValues, onSubmit, submitLabel = 'Save service' }) {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});

  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;

  const setField = (field, value) => setValues((prev) => ({ ...prev, [field]: value }));
  const markTouched = (field) => setTouched((prev) => ({ ...prev, [field]: true }));
  const showError = (field) => touched[field] && errors[field];

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched({ name: true, category: true, cost: true, renewalDate: true });
    if (!isValid) return;
    onSubmit({ ...values, cost: Number(values.cost) });
  };

  return (
    <form className="service-form" onSubmit={handleSubmit} noValidate>
      <div className="service-form__grid">
        <div className="field">
          <label htmlFor="service-name">Service name *</label>
          <input
            id="service-name"
            className={`input${showError('name') ? ' is-invalid' : ''}`}
            value={values.name}
            onChange={(e) => setField('name', e.target.value)}
            onBlur={() => markTouched('name')}
            aria-invalid={Boolean(showError('name'))}
            aria-describedby={showError('name') ? 'service-name-error' : undefined}
            required
          />
          {showError('name') && (
            <span id="service-name-error" className="error" role="alert">
              {errors.name}
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="service-category">Category *</label>
          <select
            id="service-category"
            className="input"
            value={values.category}
            onChange={(e) => setField('category', e.target.value)}
            onBlur={() => markTouched('category')}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="service-cost">Monthly cost *</label>
          <input
            id="service-cost"
            className={`input${showError('cost') ? ' is-invalid' : ''}`}
            inputMode="decimal"
            value={values.cost}
            onChange={(e) => setField('cost', e.target.value)}
            onBlur={() => markTouched('cost')}
            aria-invalid={Boolean(showError('cost'))}
            aria-describedby={showError('cost') ? 'service-cost-error' : undefined}
            placeholder="79.00"
            required
          />
          {showError('cost') && (
            <span id="service-cost-error" className="error" role="alert">
              {errors.cost}
            </span>
          )}
        </div>

        <div className="field">
          <span id="billing-cycle-label">Billing cycle</span>
          <div className="seg" role="radiogroup" aria-labelledby="billing-cycle-label">
            {BILLING_CYCLES.map((cycle) => (
              <label key={cycle} className={`seg__option${values.billingCycle === cycle ? ' is-selected' : ''}`}>
                <input
                  type="radio"
                  name="billingCycle"
                  value={cycle}
                  checked={values.billingCycle === cycle}
                  onChange={() => setField('billingCycle', cycle)}
                />
                {cycle}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="field">
        <label htmlFor="service-renewal">Renewal date *</label>
        <input
          id="service-renewal"
          type="date"
          className={`input${showError('renewalDate') ? ' is-invalid' : ''}`}
          value={values.renewalDate}
          onChange={(e) => setField('renewalDate', e.target.value)}
          onBlur={() => markTouched('renewalDate')}
          aria-invalid={Boolean(showError('renewalDate'))}
          aria-describedby={showError('renewalDate') ? 'service-renewal-error' : undefined}
          required
        />
        {showError('renewalDate') && (
          <span id="service-renewal-error" className="error" role="alert">
            {errors.renewalDate}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="service-notes">Notes</label>
        <textarea
          id="service-notes"
          className="input"
          value={values.notes}
          onChange={(e) => setField('notes', e.target.value)}
        />
      </div>

      <label className="service-form__checkbox">
        <input
          type="checkbox"
          checked={values.reminder}
          onChange={(e) => setField('reminder', e.target.checked)}
        />
        Remind me 7 days before renewal
      </label>

      <p className="service-form__hint">Inline validation runs on blur — save is disabled until every required field is valid.</p>

      <div className="service-form__actions">
        <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={!isValid}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
