/**
 * Owner: Shared
 * Purpose: Top navigation bar — brand and primary links to every screen.
 */
import { NavLink } from 'react-router-dom';
import './TopNav.css';

export default function TopNav() {
  return (
    <header className="top-nav">
      <div className="top-nav__inner">
        <span className="top-nav__brand">SmartServices</span>
        <nav className="top-nav__links" aria-label="Primary">
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
            Dashboard
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
            Services
          </NavLink>
          <NavLink to="/notifications" className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
            Notifications
          </NavLink>
          <NavLink to="/analytics" className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
            Analytics
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
            Settings
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
