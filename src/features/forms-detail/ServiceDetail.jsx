/**
 * Owner: Zubir — Forms & Service Detail
 * Purpose: Full detail view for a single service — header actions, key
 * stats, tabbed content, and delete confirmation.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from '../../shared/StatusBadge';
import Modal from '../../shared/Modal';
import { formatCurrency, formatDate, formatDateLong } from '../../data/serviceUtils';
import './ServiceDetail.css';

const TABS = ['Usage', 'Invoices', 'Documents', 'Activity'];

export default function ServiceDetail({ service, onTogglePause, onDelete }) {
  const [activeTab, setActiveTab] = useState('Usage');
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const maxUsage = Math.max(...service.usageHistory, 1);

  return (
    <div className="service-detail">
      <nav className="service-detail__breadcrumb" aria-label="Breadcrumb">
        <Link to="/services">Services</Link> / {service.category} /{' '}
        <span aria-current="page">{service.name}</span>
      </nav>

      <div className="service-detail__layout">
        <div className="service-detail__main">
          <div className="service-detail__header">
            <div>
              <h2>{service.name}</h2>
              <span className="service-detail__subtitle">
                {service.provider} · account #{service.accountNumber}
              </span>
            </div>
            <div className="service-detail__actions">
              {service.status !== 'Cancelled' && (
                <button type="button" className="btn btn-secondary" onClick={onTogglePause}>
                  {service.status === 'Active' ? 'Pause' : 'Resume'}
                </button>
              )}
              <Link to={`/services/${service.id}/edit`} className="btn btn-primary">
                Edit
              </Link>
              <button type="button" className="btn btn-danger" onClick={() => setConfirmingDelete(true)}>
                Delete
              </button>
            </div>
          </div>

          <div className="service-detail__stats">
            <div className="service-detail__stat">
              <span className="service-detail__stat-label">Cost / mo</span>
              <span className="service-detail__stat-value">{formatCurrency(service.cost)}</span>
            </div>
            <div className="service-detail__stat">
              <span className="service-detail__stat-label">Renews</span>
              <span className="service-detail__stat-value">{formatDate(service.renewalDate)}</span>
            </div>
            <div className="service-detail__stat">
              <span className="service-detail__stat-label">Status</span>
              <span className="service-detail__stat-value">
                <StatusBadge status={service.status} />
              </span>
            </div>
          </div>

          <div className="service-detail__tabs" role="tablist" aria-label="Service information">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                id={`tab-${tab}`}
                aria-selected={activeTab === tab}
                aria-controls={`panel-${tab}`}
                className={`service-detail__tab${activeTab === tab ? ' is-active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div
            className="service-detail__panel"
            role="tabpanel"
            id={`panel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
          >
            {activeTab === 'Usage' && (
              <div className="service-detail__usage">
                <span className="service-detail__panel-label">Usage over 6 months</span>
                <div className="service-detail__usage-bars">
                  {service.usageHistory.map((value, index) => (
                    <div
                      key={index}
                      className="service-detail__usage-bar"
                      style={{ height: `${Math.max((value / maxUsage) * 100, 4)}%` }}
                    />
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'Invoices' && <p className="service-detail__placeholder">No invoices on file yet.</p>}
            {activeTab === 'Documents' && <p className="service-detail__placeholder">No documents uploaded yet.</p>}
            {activeTab === 'Activity' && (
              <ul className="service-detail__timeline">
                {service.activity.length === 0 && <li className="service-detail__placeholder">No activity yet.</li>}
                {service.activity.map((entry, index) => (
                  <li key={index}>
                    <span className="service-detail__timeline-date">{formatDateLong(entry.date)}</span>
                    <span>{entry.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <aside className="service-detail__sidebar">
          <h3>Next actions</h3>
          <ul className="service-detail__next-actions">
            <li>Compare plans</li>
            <li>Download invoice</li>
            <li>Set reminder</li>
          </ul>
        </aside>
      </div>

      <Modal open={confirmingDelete} title="Delete this service?" onClose={() => setConfirmingDelete(false)}>
        <p>
          This removes <strong>{service.name}</strong> and its history. This can't be undone.
        </p>
        <div className="service-detail__modal-actions">
          <button type="button" className="btn btn-secondary" onClick={() => setConfirmingDelete(false)}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={onDelete}>
            Delete service
          </button>
        </div>
      </Modal>
    </div>
  );
}
