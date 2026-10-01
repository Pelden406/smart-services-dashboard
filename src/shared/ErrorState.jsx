/**
 * Owner: Shared
 * Purpose: Shown when the simulated data fetch fails; lets the user retry.
 */
import './ErrorState.css';
 
export default function ErrorState({
  onRetry,
  title = "Couldn't load services",
  message = 'The request failed or timed out. Your data is safe — try again.',
  level = 2,
}) {
  const Heading = level === 1 ? 'h1' : 'h2';
  return (
    <div className="error-state" role="alert">
      <Heading>{title}</Heading>
      <p>{message}</p>
      <button type="button" className="btn btn-primary" onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}
