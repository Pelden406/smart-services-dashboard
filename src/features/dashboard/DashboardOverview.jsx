/**
 * Owner: Charity — Dashboard & Data Layer
 * Purpose: Top-level dashboard content — stats row, upcoming renewals and a
 * spend-by-category chart, all derived from the shared services list.
 */
import { Link } from 'react-router-dom';
import StatsCard from './StatsCard';
import UpcomingRenewals from './UpcomingRenewals';
import SpendByCategoryChart from './SpendByCategoryChart';
import { computeStats, spendByCategory, upcomingRenewals, formatCurrency } from '../../data/serviceUtils';
import './DashboardOverview.css';

export default function DashboardOverview({ services }) {
  const stats = computeStats(services);
  const renewals = upcomingRenewals(services);
  const totals = spendByCategory(services);

  return (
    <div className="dashboard-overview">
      <div className="dashboard-overview__header">
        <div>
          <h2>Overview</h2>
          <span className="dashboard-overview__subtitle">This month</span>
        </div>
        <Link to="/services/new" className="btn btn-primary">
          + Add service
        </Link>
      </div>

      <div className="dashboard-overview__stats">
        <StatsCard label="Active" value={stats.activeCount} />
        <StatsCard label="Monthly spend" value={formatCurrency(stats.monthlySpend)} tone="accent" />
        <StatsCard label="Due in 7 days" value={stats.dueSoonCount} tone="warning" />
        <StatsCard label="Bookings" value={stats.bookingsCount} />
      </div>

      <div className="dashboard-overview__panels">
        <UpcomingRenewals services={renewals} />
        <SpendByCategoryChart totals={totals} />
      </div>
    </div>
  );
}
