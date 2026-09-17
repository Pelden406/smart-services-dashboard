/**
 * Owner: Zubair
 * Purpose: Sign-in screen. No real backend; a valid submission simulates
 * login and continues into the dashboard.
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignInPage.css';

function validate(values) {
  const errors = {};
  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!values.password) {
    errors.password = 'Password is required.';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }
  return errors;
}

export default function SignInPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: '', password: '', remember: false });
  const [touched, setTouched] = useState({});

  const errors = validate(values);
  const setField = (field, value) => setValues((prev) => ({ ...prev, [field]: value }));
  const markTouched = (field) => setTouched((prev) => ({ ...prev, [field]: true }));
  const showError = (field) => touched[field] && errors[field];

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched({ email: true, password: true });
    if (Object.keys(errors).length > 0) return;
    navigate('/dashboard');
  };

  return (
    <div className="signin-page">
      <div className="signin-page__brand">
        <span className="signin-page__brand-name">SmartServices</span>
        <p className="signin-page__brand-copy">
          Track every subscription, utility and booking in one dashboard — see what renews next and what it's
          costing you.
        </p>
      </div>

      <div className="signin-page__form-panel">
        <form className="signin-page__form" onSubmit={handleSubmit} noValidate>
          <h1>Sign in</h1>

          <div className="field">
            <label htmlFor="signin-email">Email</label>
            <input
              id="signin-email"
              type="email"
              className={`input${showError('email') ? ' is-invalid' : ''}`}
              value={values.email}
              onChange={(e) => setField('email', e.target.value)}
              onBlur={() => markTouched('email')}
              placeholder="you@domain.com"
              aria-invalid={Boolean(showError('email'))}
              aria-describedby={showError('email') ? 'signin-email-error' : undefined}
              required
            />
            {showError('email') && (
              <span id="signin-email-error" className="error" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          <div className="field">
            <label htmlFor="signin-password">Password</label>
            <input
              id="signin-password"
              type="password"
              className={`input${showError('password') ? ' is-invalid' : ''}`}
              value={values.password}
              onChange={(e) => setField('password', e.target.value)}
              onBlur={() => markTouched('password')}
              placeholder="••••••••"
              aria-invalid={Boolean(showError('password'))}
              aria-describedby={showError('password') ? 'signin-password-error' : undefined}
              required
            />
            {showError('password') && (
              <span id="signin-password-error" className="error" role="alert">
                {errors.password}
              </span>
            )}
          </div>

          <div className="signin-page__row">
            <label className="signin-page__remember">
              <input
                type="checkbox"
                checked={values.remember}
                onChange={(e) => setField('remember', e.target.checked)}
              />
              Remember me
            </label>
            <span className="signin-page__link" aria-disabled="true">
              Forgot?
            </span>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Sign in
          </button>
          <button type="button" className="btn btn-secondary btn-block" disabled>
            Continue with SSO
          </button>

          <p className="signin-page__signup">
            No account? <span className="signin-page__link">Create one</span>
          </p>
        </form>
      </div>
    </div>
  );
}
