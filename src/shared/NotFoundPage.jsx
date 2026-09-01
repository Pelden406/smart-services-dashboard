/**
 * Owner: Shared
 * Purpose: Fallback screen for any unmatched route.
 */
import { Link } from 'react-router-dom';
 
export default function NotFoundPage() {
  return (
    <div>
      <h2>Page not found</h2>
      <p>
        <Link to="/dashboard">Back to dashboard</Link>
      </p>
    </div>
  );
}
 
