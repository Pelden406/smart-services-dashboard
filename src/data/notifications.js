// Notification tab filtering + display helpers. Notification data itself
// now comes from the API (see ServicesContext.getNotifications) rather
// than mock data.
//
// Notification shape (after normalization): { id, type: 'renewal' | 'booking' | 'system', title, meta, read }
 
export const NOTIFICATION_TABS = ['All', 'Renewals', 'Bookings', 'System'];
 
const TAB_TO_TYPE = {
  Renewals: 'renewal',
  Bookings: 'booking',
  System: 'system',
};
 
export function typeForTab(tab) {
  return TAB_TO_TYPE[tab] ?? null;
}
 
/** Human-friendly relative time, e.g. "just now", "5 min ago", "2d ago". */
export function formatRelativeTime(isoString) {
  if (!isoString) return '';
  const diffMs = Date.now() - new Date(isoString).getTime();
  const diffMin = Math.round(diffMs / 60000);
  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHours = Math.round(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.round(diffHours / 24);
  return `${diffDays}d ago`;
}
