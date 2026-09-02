/**
 * Owner: Shared
 * Purpose: Generic "nothing to show" placeholder, reused wherever a list can
 * be empty — either genuinely empty, or empty because of active filters.
 */
import { Link } from 'react-router-dom';
import './EmptyState.css';

export default function EmptyState({ title, message, actionLabel, actionTo }) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon" aria-hidden="true" />
      <h3>{title}</h3>
      <p>{message}</p>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="btn btn-primary">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
