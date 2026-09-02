/**
 * Owner: Sonam — Services List & Search/Filter
 * Purpose: Route-level Services List screen — wires search, filters and
 * sort state together and renders the resulting list.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import ServiceList from './ServiceList';
import { useServices } from '../../context/ServicesContext';
import { filterServices, sortServices } from '../../data/serviceUtils';
import './ServicesPage.css';

export default function ServicesPage() {
  const { services } = useServices();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');

  const filtered = sortServices(filterServices(services, { query, category, status }), sortBy);

  return (
    <div className="services-page">
      <div className="services-page__header">
        <h2>Services</h2>
        <Link to="/services/new" className="btn btn-primary">
          + Add service
        </Link>
      </div>

      <div className="services-page__toolbar">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <FilterPanel
        category={category}
        status={status}
        sortBy={sortBy}
        onCategoryChange={setCategory}
        onStatusChange={setStatus}
        onSortChange={setSortBy}
        resultCount={filtered.length}
        totalCount={services.length}
      />

      <ServiceList services={filtered} totalCount={services.length} />
    </div>
  );
}
