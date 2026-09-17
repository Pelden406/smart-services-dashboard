/**
 * Owner: Charity — Spend by category chart
 * Purpose: Simple bar chart of monthly spend per category ( reused
 * by the Analytics screen's category-breakdown panel).
 */
import { formatCurrency } from '../../data/serviceUtils';
import './SpendByCategoryChart.css';

export default function SpendByCategoryChart({ totals }) {
  const entries = Object.entries(totals);
  const max = Math.max(...entries.map(([, value]) => value), 1);

  return (
    <section className="spend-chart" aria-labelledby="spend-chart-heading">
      <h3 id="spend-chart-heading">Spend by category</h3>
      <div className="spend-chart__bars" role="img" aria-label={entries.map(([cat, value]) => `${cat}: ${formatCurrency(value)}`).join(', ')}>
        {entries.map(([category, value]) => (
          <div className="spend-chart__bar-col" key={category}>
            <div
              className="spend-chart__bar"
              style={{ height: `${Math.max((value / max) * 100, 4)}%` }}
            />
            <span className="spend-chart__value">{formatCurrency(value)}</span>
            <span className="spend-chart__label">{category}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
