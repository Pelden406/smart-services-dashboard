/**
 * Owner: Charity
 * Purpose: Spend trends, category breakdown, savings goal and biggest
 * movers. Reuses the Dashboard's SpendByCategoryChart component.
 */
import { useCallback, useEffect, useState } from 'react';
import SpendByCategoryChart from '../dashboard/SpendByCategoryChart';
import SpendTrendChart from './SpendTrendChart';
import LoadingSkeleton from '../../shared/LoadingSkeleton';
import ErrorState from '../../shared/ErrorState';
import { useServices } from '../../context/ServicesContext';
import { spendByCategory, formatCurrency } from '../../data/serviceUtils';
import { categoryDeltas } from '../../data/spendTrend';
import './AnalyticsPage.css';
 
const PERIODS = [
  { label: '3M', months: 3 },
  { label: '6M', months: 6 },
  { label: '12M', months: 12 },
];
 
const SAVINGS_GOAL = { target: 500, saved: 340 };
 
export default function AnalyticsPage() {
  const { services, getSpendTrend } = useServices();
  const [months, setMonths] = useState(6);
  const [trend, setTrend] = useState([]);
  const [trendStatus, setTrendStatus] = useState('loading'); // 'loading' | 'error' | 'success'
 
  const loadTrend = useCallback(() => {
    setTrendStatus('loading');
    getSpendTrend(months)
      .then((series) => {
        setTrend(series);
        setTrendStatus('success');
      })
      .catch(() => {
        setTrendStatus('error');
      });
  }, [months, getSpendTrend]);
 
  useEffect(() => {
    loadTrend();
  }, [loadTrend]);
 
  const totals = spendByCategory(services);
  const movers = trendStatus === 'success' ? categoryDeltas(trend) : [];
  const savingsPct = Math.round((SAVINGS_GOAL.saved / SAVINGS_GOAL.target) * 100);
 
  return (
    <div className="analytics-page">
      <div className="analytics-page__header">
        <h1>Spend &amp; usage</h1>
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
 
      {trendStatus === 'loading' && <LoadingSkeleton />}
      {trendStatus === 'error' && (
        <ErrorState
          title="Couldn't load spend trend"
          message="The request failed or timed out. Try again."
          onRetry={loadTrend}
        />
      )}
      {trendStatus === 'success' && <SpendTrendChart trend={trend} months={months} />}
 
      <div className="analytics-page__grid">
        <SpendByCategoryChart totals={totals} />
 
        <section className="analytics-page__card" aria-labelledby="savings-goal-heading">
          <h2 id="savings-goal-heading">Savings goal</h2>
          <div className="analytics-page__savings-value">{savingsPct}%</div>
          <div className="analytics-page__progress-track">
            <div className="analytics-page__progress-fill" style={{ width: `${savingsPct}%` }} />
          </div>
          <span className="analytics-page__hint">
            {formatCurrency(SAVINGS_GOAL.saved)} of {formatCurrency(SAVINGS_GOAL.target)} target
          </span>
        </section>
 
        <section className="analytics-page__card" aria-labelledby="movers-heading">
          <h2 id="movers-heading">Biggest movers</h2>
          {trendStatus === 'success' ? (
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
          ) : (
            <span className="analytics-page__hint">—</span>
          )}
        </section>
      </div>
    </div>
  );
}
