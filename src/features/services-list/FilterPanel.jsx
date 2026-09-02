/**
 * Owner: Sonam — Services List & Search/Filter
 * Purpose: Category/status/sort controls for the services list, plus a
 * summary of active filters as removable tags.
 */
import { CATEGORIES, STATUSES } from '../../data/services';
import { SORT_OPTIONS } from '../../data/serviceUtils';
import './FilterPanel.css';

export default function FilterPanel({
  category,
  status,
  sortBy,
  onCategoryChange,
  onStatusChange,
  onSortChange,
  resultCount,
  totalCount,
}) {
  const activeFilters = [
    category !== 'All' && { key: 'category', label: category, clear: () => onCategoryChange('All') },
    status !== 'All' && { key: 'status', label: status, clear: () => onStatusChange('All') },
  ].filter(Boolean);

  return (
    <div className="filter-panel">
      <div className="filter-panel__controls">
        <div className="field filter-panel__field">
          <label htmlFor="filter-category">Category</label>
          <select
            id="filter-category"
            className="input"
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
          >
            <option value="All">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="field filter-panel__field">
          <label htmlFor="filter-status">Status</label>
          <select
            id="filter-status"
            className="input"
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
          >
            <option value="All">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="field filter-panel__field">
          <label htmlFor="filter-sort">Sort</label>
          <select
            id="filter-sort"
            className="input"
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value)}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="filter-panel__summary">
        {activeFilters.map((filter) => (
          <button
            key={filter.key}
            type="button"
            className="tag tag-category filter-panel__chip"
            onClick={filter.clear}
          >
            {filter.label} <span aria-hidden="true">×</span>
            <span className="visually-hidden">Remove {filter.label} filter</span>
          </button>
        ))}
        <span className="filter-panel__count">
          {resultCount} of {totalCount} results
        </span>
      </div>
    </div>
  );
}
