/**
 * Owner: Zubair
 * Purpose: Sign-in / register screen — authenticates against the real
 * backend and stores the returned JWT for subsequent API calls.
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../api/client';
import { useServices } from '../../context/ServicesContext';
import { useTabKeyboardNav } from '../../shared/useTabKeyboardNav';
import './SignInPage.css';
 
const MODES = ['signin', 'register'];
const FIELD_IDS = { name: 'signin-name', email: 'signin-email', password: 'signin-password' };
 
function validate(values, mode) {
  const errors = {};
  if (mode === 'register' && !values.name.trim()) {
    errors.name = 'Name is required.';
  }
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
 
function fieldOrder(mode) {
  return mode === 'register' ? ['name', 'email', 'password'] : ['email', 'password'];
}
 
export default function SignInPage() {
  const navigate = useNavigate();
  const { refetch } = useServices();
  const [mode, setMode] = useState('signin'); // 'signin' | 'register'
  const [values, setValues] = useState({ name: '', email: '', password: '', remember: false });
  const [touched, setTouched] = useState({});
  const [attempted, setAttempted] = useState(false);
  const [apiError, setApiError] = useState('');
  const [submitting, setSubmitting] = useState(false);
 
  const errors = validate(values, mode);
  const setField = (field, value) => setValues((prev) => ({ ...prev, [field]: value }));
  const markTouched = (field) => setTouched((prev) => ({ ...prev, [field]: true }));
  const showError = (field) => touched[field] && errors[field];
 
  const switchMode = (nextMode) => {
    if (nextMode === mode) return;
    setMode(nextMode);
    setTouched({});
    setAttempted(false);
    setApiError('');
  };
 
  const { registerTab, handleKeyDown: handleTabKeyDown } = useTabKeyboardNav(MODES.length, (index) =>
    switchMode(MODES[index]),
  );
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    setTouched({ name: true, email: true, password: true });
    if (Object.keys(errors).length > 0) {
      setAttempted(true);
      const firstInvalidField = fieldOrder(mode).find((field) => errors[field]);
      if (firstInvalidField) document.getElementById(FIELD_IDS[firstInvalidField])?.focus();
      return;
    }
    setAttempted(false);
 
    setApiError('');
    setSubmitting(true);
    try {
      const endpoint = mode === 'register' ? '/auth/register' : '/auth/login';
      const body =
        mode === 'register'
          ? { name: values.name, email: values.email, password: values.password }
          : { email: values.email, password: values.password };
 
      const data = await apiFetch(endpoint, { method: 'POST', body: JSON.stringify(body) });
 
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ id: data.id, name: data.name, email: data.email }));
      refetch();
      navigate('/dashboard');
    } catch (err) {
      setApiError(err.message);
    } finally {
      setSubmitting(false);
    }
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
          <div className="signin-page__tabs" role="tablist" aria-label="Sign in or create account">
            <button
              type="button"
              role="tab"
              id="tab-signin"
              ref={registerTab(0)}
              aria-selected={mode === 'signin'}
              aria-controls="signin-panel"
              tabIndex={mode === 'signin' ? 0 : -1}
              className={`signin-page__tab${mode === 'signin' ? ' is-active' : ''}`}
              onClick={() => switchMode('signin')}
              onKeyDown={(event) => handleTabKeyDown(event, 0)}
            >
              Sign In
            </button>
            <button
              type="button"
              role="tab"
              id="tab-register"
              ref={registerTab(1)}
              aria-selected={mode === 'register'}
              aria-controls="signin-panel"
              tabIndex={mode === 'register' ? 0 : -1}
              className={`signin-page__tab${mode === 'register' ? ' is-active' : ''}`}
              onClick={() => switchMode('register')}
              onKeyDown={(event) => handleTabKeyDown(event, 1)}
            >
              Create Account
            </button>
          </div>
 
          <div id="signin-panel" role="tabpanel" aria-labelledby={mode === 'register' ? 'tab-register' : 'tab-signin'}>
            <h1>{mode === 'register' ? 'Create account' : 'Sign in'}</h1>
            <p className="signin-page__subhead">
              {mode === 'register'
                ? 'Create a new account to get started.'
                : 'Sign in to your existing account.'}
            </p>
          </div>
 
          {apiError && (
            <p className="signin-page__error" role="alert">
              {apiError}
            </p>
          )}
 
          {attempted && Object.keys(errors).length > 0 && (
            <div className="form-error-summary" role="alert">
              <p>Please fix the following:</p>
              <ul>
                {fieldOrder(mode)
                  .filter((field) => errors[field])
                  .map((field) => (
                    <li key={field}>{errors[field]}</li>
                  ))}
              </ul>
            </div>
          )}
 
          {mode === 'register' && (
            <div className="field">
              <label htmlFor="signin-name">Name</label>
              <input
                id="signin-name"
                type="text"
                className={`input${showError('name') ? ' is-invalid' : ''}`}
                value={values.name}
                onChange={(e) => setField('name', e.target.value)}
                onBlur={() => markTouched('name')}
                placeholder="Your name"
                aria-invalid={Boolean(showError('name'))}
                aria-describedby={showError('name') ? 'signin-name-error' : undefined}
                required
              />
              {showError('name') && (
                <span id="signin-name-error" className="error" role="alert">
                  {errors.name}
                </span>
              )}
            </div>
          )}
 
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
 
          {mode === 'signin' && (
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
          )}
 
          <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? 'Please wait…' : mode === 'register' ? 'Create account' : 'Sign in'}
          </button>
          {mode === 'signin' && (
            <button type="button" className="btn btn-secondary btn-block" disabled>
              Continue with SSO
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
