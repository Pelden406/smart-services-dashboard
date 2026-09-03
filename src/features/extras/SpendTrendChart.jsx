/**
 * Owner: Unassigned — bonus screen beyond the core 3-person task split
 * Purpose: Stacked-bar monthly spend trend by category, for the Analytics screen.
 */
import { SPEND_TREND_CATEGORIES } from '../../data/spendTrend';
import './SpendTrendChart.css';

const CATEGORY_CLASSES = {
  Utility: 'spend-trend-chart__segment--utility',
  Subscription: 'spend-trend-chart__segment--subscription',
  Booking: 'spend-trend-chart__segment--booking',
};

export default function SpendTrendChart({ trend, months = 6 }) {
  const data = trend.slice(-months);
  const totals = data.map((month) => SPEND_TREND_CATEGORIES.reduce((sum, c) => sum + month[c], 0));
  const max = Math.max(...totals, 1);

  return (
    <section className="spend-trend-chart" aria-labelledby="spend-trend-heading">
      <h3 id="spend-trend-heading">Monthly spend by category</h3>
      <div className="spend-trend-chart__bars">
        {data.map((month, index) => (
          <div className="spend-trend-chart__col" key={month.month}>
            <div className="spend-trend-chart__stack" style={{ height: `${(totals[index] / max) * 100}%` }}>
              {SPEND_TREND_CATEGORIES.map((category) => (
                <div
                  key={category}
                  className={`spend-trend-chart__segment ${CATEGORY_CLASSES[category]}`}
                  style={{ height: `${(month[category] / totals[index]) * 100}%` }}
                  title={`${category}: $${month[category]}`}
                />
              ))}
            </div>
            <span className="spend-trend-chart__month">{month.month}</span>
          </div>
        ))}
      </div>
      <div className="spend-trend-chart__legend">
        {SPEND_TREND_CATEGORIES.map((category) => (
          <span key={category} className="spend-trend-chart__legend-item">
            <span className={`spend-trend-chart__swatch ${CATEGORY_CLASSES[category]}`} />
            {category}
          </span>
        ))}
      </div>
    </section>
  );
}
