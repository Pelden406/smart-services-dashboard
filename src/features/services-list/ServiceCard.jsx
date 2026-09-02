/**
 * Owner: Sonam — Services List & Search/Filter
 * Purpose: Card representation of one service, used for the mobile/narrow
 * layout of the services list.
 */
import { Link } from 'react-router-dom';
import StatusBadge from '../../shared/StatusBadge';
import { formatCurrency, formatDate } from '../../data/serviceUtils';
import './ServiceCard.css';

export default function ServiceCard({ service }) {
  return (
    <Link to={`/services/${service.id}`} className="service-card">
      <div className="service-card__top">
        <span className="service-card__name">{service.name}</span>
        <StatusBadge status={service.status} />
      </div>
      <div className="service-card__meta">
        <span className="tag tag-category">{service.category}</span>
        <span className="service-card__renews">Renews {formatDate(service.renewalDate)}</span>
      </div>
      <div className="service-card__cost">{formatCurrency(service.cost)} <span>/ {service.billingCycle.toLowerCase()}</span></div>
    </Link>
  );
}
