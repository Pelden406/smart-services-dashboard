/**
 * Owner: Unassigned — bonus screen beyond the core 3-person task split
 * Purpose: Presentational shell for one onboarding step — progress bar,
 * heading, body content, and Back/Skip/Next navigation.
 */
import './OnboardingStep.css';

export default function OnboardingStep({
  step,
  totalSteps,
  title,
  children,
  onBack,
  onNext,
  onSkip,
  nextLabel = 'Continue',
}) {
  return (
    <div className="onboarding-step">
      <div className="onboarding-step__progress" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={totalSteps}>
        {Array.from({ length: totalSteps }, (_, i) => (
          <span key={i} className={`onboarding-step__segment${i < step ? ' is-complete' : ''}`} />
        ))}
        <span className="onboarding-step__count">
          Step {step} of {totalSteps}
        </span>
      </div>

      <h1 className="onboarding-step__title">{title}</h1>

      <div className="onboarding-step__body">{children}</div>

      <div className="onboarding-step__footer">
        {onBack ? (
          <button type="button" className="btn btn-ghost" onClick={onBack}>
            Back
          </button>
        ) : (
          <span />
        )}
        <div className="onboarding-step__footer-right">
          {onSkip && (
            <button type="button" className="btn btn-secondary" onClick={onSkip}>
              Skip
            </button>
          )}
          <button type="button" className="btn btn-primary" onClick={onNext}>
            {nextLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
