/**
 * Owner: Sonam — Services List & Search/Filter
 * Purpose: Text search input for the services list, controlled by the parent page.
 */
import './SearchBar.css';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label htmlFor="service-search" className="visually-hidden">
        Search services
      </label>
      <input
        id="service-search"
        type="search"
        className="input search-bar__input"
        placeholder="Search services…"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
