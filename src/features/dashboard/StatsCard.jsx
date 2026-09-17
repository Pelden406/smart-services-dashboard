/**
 * Owner: Charity — Stastistics card
 * Purpose: A single summary metric tile used in the dashboard's stats row.
 */
import './StatsCard.css';

export default function StatsCard({ label, value, tone = 'default' }) {
  return (
    <div className={`stats-card stats-card--${tone}`}>
      <div className="stats-card__label">{label}</div>
      <div className="stats-card__value">{value}</div>
    </div>
  );
}
