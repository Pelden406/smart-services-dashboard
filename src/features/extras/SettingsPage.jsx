/**
 * Owner: Sonam
 * Purpose: Profile fields and notification preferences, persisted to localStorage.
 */
import { useState } from 'react';
import './SettingsPage.css';

const STORAGE_KEY = 'smart-services-dashboard:profile';
const CURRENCIES = ['AUD', 'USD', 'EUR', 'GBP'];
const TIME_ZONES = ['AEST', 'AEDT', 'UTC', 'PST', 'EST'];

const DEFAULT_PROFILE = {
  fullName: 'A. Student',
  email: 'a.student@domain.com',
  currency: 'AUD',
  timeZone: 'AEST',
  emailReminders: true,
  weeklyDigest: false,
};

function loadProfile() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...DEFAULT_PROFILE, ...JSON.parse(stored) } : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function SettingsPage() {
  const [saved, setSaved] = useState(loadProfile);
  const [draft, setDraft] = useState(saved);
  const [savedMessage, setSavedMessage] = useState(false);

  const setField = (field, value) => setDraft((prev) => ({ ...prev, [field]: value }));

  const handleSave = (event) => {
    event.preventDefault();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // Storage unavailable — the form still reflects the change in-session.
    }
    setSaved(draft);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  const handleDiscard = () => setDraft(saved);

  return (
    <div className="settings-page">
      <h2>Settings</h2>

      <form className="settings-page__form" onSubmit={handleSave}>
        <div className="settings-page__avatar-row">
          <div className="settings-page__avatar" aria-hidden="true">
            {initials(draft.fullName || 'You')}
          </div>
          <button type="button" className="btn btn-secondary" disabled>
            Replace
          </button>
        </div>

        <div className="settings-page__grid">
          <div className="field">
            <label htmlFor="settings-name">Full name</label>
            <input
              id="settings-name"
              className="input"
              value={draft.fullName}
              onChange={(e) => setField('fullName', e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="settings-email">Email</label>
            <input
              id="settings-email"
              type="email"
              className="input"
              value={draft.email}
              onChange={(e) => setField('email', e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="settings-currency">Currency</label>
            <select
              id="settings-currency"
              className="input"
              value={draft.currency}
              onChange={(e) => setField('currency', e.target.value)}
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="settings-timezone">Time zone</label>
            <select
              id="settings-timezone"
              className="input"
              value={draft.timeZone}
              onChange={(e) => setField('timeZone', e.target.value)}
            >
              {TIME_ZONES.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="settings-page__preferences">
          <label className="settings-page__toggle-row">
            <span>Email renewal reminders</span>
            <input
              type="checkbox"
              checked={draft.emailReminders}
              onChange={(e) => setField('emailReminders', e.target.checked)}
            />
          </label>
          <label className="settings-page__toggle-row">
            <span>Weekly digest</span>
            <input
              type="checkbox"
              checked={draft.weeklyDigest}
              onChange={(e) => setField('weeklyDigest', e.target.checked)}
            />
          </label>
        </div>

        <div className="settings-page__footer">
          {savedMessage && (
            <span className="settings-page__saved" role="status">
              Saved
            </span>
          )}
          <button type="button" className="btn btn-ghost" onClick={handleDiscard}>
            Discard
          </button>
          <button type="submit" className="btn btn-primary">
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}
