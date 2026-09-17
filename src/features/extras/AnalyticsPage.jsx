/**
 * Owner: Charity
 * Purpose: Spend trends, category breakdown, savings goal and biggest
 * movers. Reuses the Dashboard's SpendByCategoryChart component.
 */
import { useState } from 'react';
import SpendByCategoryChart from '../dashboard/SpendByCategoryChart';
import SpendTrendChart from './SpendTrendChart';
import { useServices } from '../../context/ServicesContext';
import { spendByCategory, formatCurrency } from '../../data/serviceUtils';
import { spendTrend, categoryDeltas } from '../../data/spendTrend';
import './AnalyticsPage.css';

const PERIODS = [
  { label: '3M', months: 3 },
  { label: '6M', months: 6 },
  { label: '12M', months: 12 },
];

const SAVINGS_GOAL = { target: 500, saved: 340 };

export default function AnalyticsPage() {
  const { services } = useServices();
  const [months, setMonths] = useState(6);

  const totals = spendByCategory(services);
  const movers = categoryDeltas(spendTrend);
  const savingsPct = Math.round((SAVINGS_GOAL.saved / SAVINGS_GOAL.target) * 100);

  return (
    <div className="analytics-page">
      <div className="analytics-page__header">
        <h2>Spend &amp; usage</h2>
        <div className="analytics-page__periods" role="group" aria-label="Time range">
          {PERIODS.map((period) => (
            <button
              key={period.label}
              type="button"
              className={`analytics-page__period${months === period.months ? ' is-active' : ''}`}
              onClick={() => setMonths(period.months)}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      <SpendTrendChart trend={spendTrend} months={months} />

      <div className="analytics-page__grid">
        <SpendByCategoryChart totals={totals} />

        <section className="analytics-page__card" aria-labelledby="savings-goal-heading">
          <h3 id="savings-goal-heading">Savings goal</h3>
          <div className="analytics-page__savings-value">{savingsPct}%</div>
          <div className="analytics-page__progress-track">
            <div className="analytics-page__progress-fill" style={{ width: `${savingsPct}%` }} />
          </div>
          <span className="analytics-page__hint">
            {formatCurrency(SAVINGS_GOAL.saved)} of {formatCurrency(SAVINGS_GOAL.target)} target
          </span>
        </section>

        <section className="analytics-page__card" aria-labelledby="movers-heading">
          <h3 id="movers-heading">Biggest movers</h3>
          <ul className="analytics-page__movers">
            {movers.map((mover) => (
              <li key={mover.category}>
                <span>{mover.category}</span>
                <span className={mover.change >= 0 ? 'analytics-page__mover-up' : 'analytics-page__mover-down'}>
                  {mover.change >= 0 ? '+' : ''}
                  {mover.change.toFixed(1)}%
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
