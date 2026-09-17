/**
 * Owner: Sonam
 * Purpose: A single notification row — unread dot, title, meta, and an
 * optional link through to the related service.
 */
import { Link } from 'react-router-dom';
import './NotificationItem.css';

export default function NotificationItem({ notification, onMarkRead }) {
  const { title, meta, read, serviceId } = notification;

  return (
    <li className={`notification-item${read ? '' : ' is-unread'}`}>
      <span className="notification-item__dot" aria-hidden="true" />
      <div className="notification-item__body">
        <span className="notification-item__title">{title}</span>
        <span className="notification-item__meta">{meta}</span>
      </div>
      <div className="notification-item__actions">
        {serviceId && (
          <Link to={`/services/${serviceId}`} className="notification-item__link">
            View
          </Link>
        )}
        {!read && (
          <button type="button" className="notification-item__link" onClick={() => onMarkRead(notification.id)}>
            Mark read
          </button>
        )}
      </div>
    </li>
  );
}
