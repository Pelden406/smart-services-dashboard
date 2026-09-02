/**
 * Owner: Sonam — Services List & Search/Filter
 * Purpose: Renders services as a table on desktop and as ServiceCards on
 * mobile (both exist in the DOM; CSS toggles which is visible).
 */
import { Link } from 'react-router-dom';
import ServiceCard from './ServiceCard';
import StatusBadge from '../../shared/StatusBadge';
import EmptyState from '../../shared/EmptyState';
import { formatCurrency, formatDate } from '../../data/serviceUtils';
import './ServiceList.css';

export default function ServiceList({ services, totalCount }) {
  if (services.length === 0) {
    return totalCount === 0 ? (
      <EmptyState
        title="No services yet"
        message="Add your first subscription, utility or booking to see it tracked here."
        actionLabel="+ Add service"
        actionTo="/services/new"
      />
    ) : (
      <EmptyState title="No services match your filters" message="Try a different search term or clear a filter." />
    );
  }

  return (
    <div className="service-list">
      <ul className="service-list__cards" aria-label="Services">
        {services.map((service) => (
          <li key={service.id}>
            <ServiceCard service={service} />
          </li>
        ))}
      </ul>

      <table className="service-list__table">
        <caption className="visually-hidden">Services</caption>
        <thead>
          <tr>
            <th scope="col">Service</th>
            <th scope="col">Category</th>
            <th scope="col">Status</th>
            <th scope="col">Renews</th>
            <th scope="col">Cost</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td data-label="Service">
                <Link to={`/services/${service.id}`}>{service.name}</Link>
              </td>
              <td data-label="Category">{service.category}</td>
              <td data-label="Status">
                <StatusBadge status={service.status} />
              </td>
              <td data-label="Renews">{formatDate(service.renewalDate)}</td>
              <td data-label="Cost">{formatCurrency(service.cost)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
