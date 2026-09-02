// Helpers for working with the service data model: formatting, derived
// stats, filtering and sorting. Kept separate from the seed data so pages
// and components can share the same logic.

/** Convert a cost + billing cycle into an equivalent monthly cost. */
export function monthlyEquivalent(service) {
  if (service.status !== 'Active') return 0;
  switch (service.billingCycle) {
    case 'Quarterly':
      return service.cost / 3;
    case 'Yearly':
      return service.cost / 12;
    default:
      return service.cost;
  }
}

export function formatCurrency(value) {
  return `$${value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

export function formatDate(isoDate) {
  if (!isoDate) return '—';
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export function formatDateLong(isoDate) {
  if (!isoDate) return '—';
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

/** Days between today and an ISO date; negative when the date has passed. */
export function daysUntil(isoDate, today = new Date()) {
  if (!isoDate) return null;
  const target = new Date(`${isoDate}T00:00:00`);
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const diffMs = target - start;
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

/** Aggregated stats used by the dashboard's StatsCard row. */
export function computeStats(services, today = new Date()) {
  const active = services.filter((s) => s.status === 'Active');
  const monthlySpend = active.reduce((sum, s) => sum + monthlyEquivalent(s), 0);
  const dueSoon = active.filter((s) => {
    const days = daysUntil(s.renewalDate, today);
    return days !== null && days >= 0 && days <= 7;
  });
  const bookings = active.filter((s) => s.category === 'Booking');

  return {
    activeCount: active.length,
    monthlySpend,
    dueSoonCount: dueSoon.length,
    bookingsCount: bookings.length,
  };
}

/** Spend grouped by category, for the "spend by category" chart. */
export function spendByCategory(services) {
  const totals = { Subscription: 0, Utility: 0, Booking: 0 };
  services
    .filter((s) => s.status === 'Active')
    .forEach((s) => {
      totals[s.category] += monthlyEquivalent(s);
    });
  return totals;
}

/** Services with an upcoming renewal, soonest first. */
export function upcomingRenewals(services, today = new Date(), limit = 5) {
  return services
    .filter((s) => s.status === 'Active' && s.renewalDate)
    .map((s) => ({ ...s, daysUntil: daysUntil(s.renewalDate, today) }))
    .filter((s) => s.daysUntil >= 0)
    .sort((a, b) => a.daysUntil - b.daysUntil)
    .slice(0, limit);
}

/** Filter + search services for the Services List screen. */
export function filterServices(services, { query = '', category = 'All', status = 'All' } = {}) {
  const q = query.trim().toLowerCase();
  return services.filter((s) => {
    if (category !== 'All' && s.category !== category) return false;
    if (status !== 'All' && s.status !== status) return false;
    if (q && !s.name.toLowerCase().includes(q) && !s.provider.toLowerCase().includes(q)) return false;
    return true;
  });
}

export const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name (A–Z)' },
  { value: 'cost-desc', label: 'Cost (high to low)' },
  { value: 'renewal-asc', label: 'Renews soonest' },
];

export function sortServices(services, sortBy = 'name-asc') {
  const sorted = [...services];
  switch (sortBy) {
    case 'cost-desc':
      return sorted.sort((a, b) => b.cost - a.cost);
    case 'renewal-asc':
      return sorted.sort((a, b) => {
        if (!a.renewalDate) return 1;
        if (!b.renewalDate) return -1;
        return a.renewalDate.localeCompare(b.renewalDate);
      });
    case 'name-asc':
    default:
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
}

export function generateId() {
  return `svc-${Math.random().toString(36).slice(2, 9)}`;
}

/** A blank service used to seed the "add" form. */
export function emptyService() {
  return {
    id: '',
    name: '',
    provider: '',
    accountNumber: '',
    category: 'Utility',
    cost: '',
    billingCycle: 'Monthly',
    status: 'Active',
    renewalDate: '',
    reminder: false,
    notes: '',
    usageHistory: [],
    activity: [],
  };
}
