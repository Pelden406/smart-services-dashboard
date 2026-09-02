/**
 * Owner: Shared
 * Purpose: Small colored pill showing a service's status (Active/Paused/Cancelled).
 */
const STATUS_CLASSES = {
  Active: 'tag-active',
  Paused: 'tag-paused',
  Cancelled: 'tag-cancelled',
};

export default function StatusBadge({ status }) {
  const className = STATUS_CLASSES[status] ?? 'tag-paused';
  return <span className={`tag ${className}`}>{status}</span>;
}
