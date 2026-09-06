/**
 * Owner: Zubair
 * Purpose: 3-step first-run flow — intro, choose what to track, turn on
 * reminders — then continue into the dashboard.
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingStep from './OnboardingStep';
import './OnboardingPage.css';

const TOTAL_STEPS = 3;
const TRACKABLE_CATEGORIES = [
  { value: 'Subscription', label: 'Subscriptions' },
  { value: 'Utility', label: 'Utilities' },
  { value: 'Booking', label: 'Bookings' },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState(['Subscription']);
  const [remindersOn, setRemindersOn] = useState(true);

  const toggleCategory = (value) => {
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value],
    );
  };

  const finish = () => navigate('/dashboard');

  if (step === 1) {
    return (
      <div className="onboarding-page">
        <OnboardingStep step={1} totalSteps={TOTAL_STEPS} title="Welcome to SmartServices" onNext={() => setStep(2)}>
          <p>
            One place to track subscriptions, utilities and bookings — see what's renewing, what it costs, and
            where your money's going.
          </p>
        </OnboardingStep>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="onboarding-page">
        <OnboardingStep
          step={2}
          totalSteps={TOTAL_STEPS}
          title="Which services do you track?"
          onBack={() => setStep(1)}
          onSkip={() => setStep(3)}
          onNext={() => setStep(3)}
        >
          <div className="onboarding-page__categories">
            {TRACKABLE_CATEGORIES.map((category) => {
              const selected = selectedCategories.includes(category.value);
              return (
                <button
                  key={category.value}
                  type="button"
                  className={`onboarding-page__category${selected ? ' is-selected' : ''}`}
                  aria-pressed={selected}
                  onClick={() => toggleCategory(category.value)}
                >
                  <span>{category.label}</span>
                  {selected && <span className="onboarding-page__category-tag">Selected</span>}
                </button>
              );
            })}
          </div>
        </OnboardingStep>
      </div>
    );
  }

  return (
    <div className="onboarding-page">
      <OnboardingStep
        step={3}
        totalSteps={TOTAL_STEPS}
        title="Stay ahead of renewals"
        onBack={() => setStep(2)}
        onNext={finish}
        nextLabel="Get started"
      >
        <label className="onboarding-page__reminder">
          <input type="checkbox" checked={remindersOn} onChange={(e) => setRemindersOn(e.target.checked)} />
          Email me 7 days before something renews
        </label>
        <p className="onboarding-page__hint">You can change this any time from Settings.</p>
      </OnboardingStep>
    </div>
  );
}
