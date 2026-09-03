/**
 * Owner: Charity — Dashboard & Data Layer
 * Purpose: Table of the soonest-renewing active services, shown on the dashboard.
 */
import { Link } from 'react-router-dom';
import { formatCurrency, formatDate } from '../../data/serviceUtils';
import './UpcomingRenewals.css';

export default function UpcomingRenewals({ services }) {
  return (
    <section className="upcoming-renewals" aria-labelledby="upcoming-renewals-heading">
      <div className="upcoming-renewals__header">
        <h3 id="upcoming-renewals-heading">Upcoming renewals</h3>
        <Link to="/services" className="upcoming-renewals__view-all">
          View all
        </Link>
      </div>

      {services.length === 0 ? (
        <p className="upcoming-renewals__empty">Nothing renewing soon.</p>
      ) : (
        <table className="upcoming-renewals__table">
          <thead>
            <tr>
              <th scope="col">Service</th>
              <th scope="col">Category</th>
              <th scope="col">Renews</th>
              <th scope="col">Cost</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>
                  <Link to={`/services/${service.id}`}>{service.name}</Link>
                </td>
                <td>{service.category}</td>
                <td>{formatDate(service.renewalDate)}</td>
                <td>{formatCurrency(service.cost)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
