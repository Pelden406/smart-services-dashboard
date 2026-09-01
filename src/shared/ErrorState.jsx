/**
 * Owner: Shared
 * Purpose: Shown when the simulated data fetch fails; lets the user retry.
 */
import './ErrorState.css';
 
export default function ErrorState({ onRetry }) {
  return (
    <div className="error-state" role="alert">
      <h2>Couldn't load services</h2>
      <p>The request failed or timed out. Your data is safe — try again.</p>
      <button type="button" className="btn btn-primary" onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}
