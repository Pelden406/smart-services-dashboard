/**
 * Owner: Unassigned — bonus screen beyond the core 3-person task split
 * Purpose: Notification list with read/unread state, tab filters, and
 * mark-as-read / mark-all-read actions.
 */
import { useState } from 'react';
import NotificationItem from './NotificationItem';
import EmptyState from '../../shared/EmptyState';
import { notifications as seedNotifications, NOTIFICATION_TABS, typeForTab } from '../../data/notifications';
import './NotificationsPage.css';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(seedNotifications);
  const [activeTab, setActiveTab] = useState('All');

  const markRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const filtered = notifications.filter((n) => {
    const type = typeForTab(activeTab);
    return type === null || n.type === type;
  });

  return (
    <div className="notifications-page">
      <div className="notifications-page__header">
        <h2>Notifications</h2>
        <button type="button" className="btn btn-ghost" onClick={markAllRead}>
          Mark all read
        </button>
      </div>

      <div className="notifications-page__tabs" role="tablist" aria-label="Notification filters">
        {NOTIFICATION_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            className={`notifications-page__tab${activeTab === tab ? ' is-active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="Nothing here" message="You're all caught up in this category." />
      ) : (
        <ul className="notifications-page__list">
          {filtered.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} onMarkRead={markRead} />
          ))}
        </ul>
      )}
    </div>
  );
}
