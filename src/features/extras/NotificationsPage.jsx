/**
 * Owner: Sonam
 * Purpose: Notification list with read/unread state, tab filters, and
 * mark-as-read / mark-all-read actions.
 */
import { useCallback, useEffect, useState } from 'react';
import NotificationItem from './NotificationItem';
import EmptyState from '../../shared/EmptyState';
import LoadingSkeleton from '../../shared/LoadingSkeleton';
import ErrorState from '../../shared/ErrorState';
import { useTabKeyboardNav } from '../../shared/useTabKeyboardNav';
import { useServices } from '../../context/ServicesContext';
import { NOTIFICATION_TABS, typeForTab } from '../../data/notifications';
import './NotificationsPage.css';
 
export default function NotificationsPage() {
  const { getNotifications, markNotificationRead } = useServices();
  const [notifications, setNotifications] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'error' | 'success'
  const [activeTab, setActiveTab] = useState('All');
  const { registerTab, handleKeyDown: handleTabKeyDown } = useTabKeyboardNav(NOTIFICATION_TABS.length, (index) =>
    setActiveTab(NOTIFICATION_TABS[index]),
  );
 
  const load = useCallback(() => {
    setStatus('loading');
    getNotifications()
      .then((data) => {
        setNotifications(data);
        setStatus('success');
      })
      .catch(() => setStatus('error'));
  }, [getNotifications]);
 
  useEffect(() => load(), [load]);
 
  const markRead = async (id) => {
    try {
      const updated = await markNotificationRead(id);
      setNotifications((prev) => prev.map((n) => (n.id === id ? updated : n)));
    } catch {
      load();
    }
  };
 
  const markAllRead = async () => {
    const unreadIds = notifications.filter((n) => !n.read).map((n) => n.id);
    if (unreadIds.length === 0) return;
    try {
      const updates = await Promise.all(unreadIds.map((id) => markNotificationRead(id)));
      setNotifications((prev) => prev.map((n) => updates.find((u) => u.id === n.id) ?? n));
    } catch {
      load();
    }
  };
 
  const filtered = notifications.filter((n) => {
    const type = typeForTab(activeTab);
    return type === null || n.type === type;
  });
 
  return (
    <div className="notifications-page">
      <div className="notifications-page__header">
        <h1>Notifications</h1>
        <button type="button" className="btn btn-ghost" onClick={markAllRead} disabled={status !== 'success'}>
          Mark all read
        </button>
      </div>
 
      <div className="notifications-page__tabs" role="tablist" aria-label="Notification filters">
        {NOTIFICATION_TABS.map((tab, index) => (
          <button
            key={tab}
            type="button"
            role="tab"
            ref={registerTab(index)}
            aria-selected={activeTab === tab}
            tabIndex={activeTab === tab ? 0 : -1}
            className={`notifications-page__tab${activeTab === tab ? ' is-active' : ''}`}
            onClick={() => setActiveTab(tab)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
          >
            {tab}
          </button>
        ))}
      </div>
 
      {status === 'loading' && <LoadingSkeleton />}
      {status === 'error' && (
        <ErrorState
          title="Couldn't load notifications"
          message="The request failed or timed out. Try again."
          onRetry={load}
        />
      )}
      {status === 'success' &&
        (filtered.length === 0 ? (
          <EmptyState title="Nothing here" message="You're all caught up in this category." />
        ) : (
          <ul className="notifications-page__list">
            {filtered.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} onMarkRead={markRead} />
            ))}
          </ul>
        ))}
    </div>
  );
}
 
