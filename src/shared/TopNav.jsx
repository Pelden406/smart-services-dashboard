/**
 * Owner: Shared
 * Purpose: Top navigation bar — brand and primary links to every screen.
 * Collapses into a hamburger menu on mobile widths.
 */
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useServices } from '../context/ServicesContext';
import './TopNav.css';
 
export default function TopNav() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { refetch } = useServices();
 
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    refetch();
    navigate('/signin');
  };
 
  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/services', label: 'Services' },
    { to: '/notifications', label: 'Notifications' },
    { to: '/analytics', label: 'Analytics' },
    { to: '/settings', label: 'Settings' },
  ];
 
  // UI hint only — the API rejects non-admins regardless of what's stored here.
  let isAdmin = false;
  try {
    isAdmin = JSON.parse(localStorage.getItem('user'))?.role === 'admin';
  } catch {
    isAdmin = false;
  }
  if (isAdmin) links.push({ to: '/admin/users', label: 'Admin' });
 
  return (
    <header className="top-nav">
      <div className="top-nav__inner">
        <span className="top-nav__brand">SmartServices</span>
 
        <button
          className="top-nav__toggle"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="primary-nav"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="top-nav__toggle-bar" />
          <span className="top-nav__toggle-bar" />
          <span className="top-nav__toggle-bar" />
        </button>
 
        <nav
          id="primary-nav"
          className={`top-nav__links ${isOpen ? 'is-open' : ''}`}
          aria-label="Primary"
        >
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => (isActive ? 'is-active' : undefined)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
 
        <button type="button" className="top-nav__logout" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </header>
  );
}
