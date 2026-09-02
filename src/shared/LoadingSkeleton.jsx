/**
 * Owner: Shared
 * Purpose: Skeleton placeholder shown while the simulated data fetch is in flight.
 */
import './LoadingSkeleton.css';

export default function LoadingSkeleton() {
  return (
    <div className="loading-skeleton" role="status" aria-busy="true" aria-live="polite">
      <span className="visually-hidden">Loading services…</span>
      <div className="loading-skeleton__bar loading-skeleton__bar--title" />
      <div className="loading-skeleton__row">
        <div className="loading-skeleton__tile" />
        <div className="loading-skeleton__tile" />
        <div className="loading-skeleton__tile" />
        <div className="loading-skeleton__tile" />
      </div>
      <div className="loading-skeleton__bar" />
      <div className="loading-skeleton__bar" style={{ width: '85%' }} />
      <div className="loading-skeleton__bar" style={{ width: '65%' }} />
    </div>
  );
}
