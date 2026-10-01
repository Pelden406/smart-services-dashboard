/**
 * Owner: Shared
 * Purpose: App-wide footer shown beneath every authenticated screen — mirrors
 * the marketing homepage's footer so the whole app reads as one product.
 */
import { Link } from 'react-router-dom';
import './Footer.css';
 
const quickLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/services', label: 'Services' },
  { to: '/notifications', label: 'Notifications' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/settings', label: 'Settings' },
];
 
const socialLinks = [
  {
    label: 'Twitter / X',
    href: '#',
    icon: (
      <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7.1l-5.6-7.3L4.2 22H1l8.2-9.3L.7 2h7.3l5 6.7L18.9 2Zm-1.2 18h1.9L6.4 4h-2L17.7 20Z" />
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.5 9.25h5V21h-5V9.25Zm7.75 0h4.8v1.6h.07c.67-1.2 2.3-2.47 4.73-2.47 5.06 0 6 3.06 6 7.04V21h-5v-5.06c0-1.21-.02-2.76-1.68-2.76-1.68 0-1.94 1.31-1.94 2.67V21h-5V9.25Z" />
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <path d="M13.5 21v-7.5H16l.4-3H13.5V8.4c0-.87.24-1.46 1.5-1.46H16.5V4.35A20.7 20.7 0 0 0 14.4 4.25c-2.3 0-3.9 1.4-3.9 3.98v2.27H8v3h2.5V21h3Z" />
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <path d="M12 2c2.7 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.42.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77c-.55.55-1.11.9-1.77 1.15-.64.25-1.37.42-2.43.47-1.06.05-1.42.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.7 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77a4.9 4.9 0 0 1 1.77-1.15c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.3 2 12 2Zm0 1.8c-2.65 0-2.98.01-4.02.06-.87.04-1.34.18-1.65.3-.42.16-.71.36-1.02.67-.31.31-.5.6-.67 1.02-.12.31-.26.78-.3 1.65C4.29 8.7 4.28 9.03 4.28 12s.01 3.3.06 4.5c.04.87.18 1.34.3 1.65.16.42.36.71.67 1.02.31.31.6.5 1.02.67.31.12.78.26 1.65.3 1.04.05 1.37.06 4.02.06s2.98-.01 4.02-.06c.87-.04 1.34-.18 1.65-.3.42-.16.71-.36 1.02-.67.31-.31.5-.6.67-1.02.12-.31.26-.78.3-1.65.05-1.2.06-1.53.06-4.5s-.01-3.3-.06-4.5c-.04-.87-.18-1.34-.3-1.65a2.7 2.7 0 0 0-.67-1.02 2.7 2.7 0 0 0-1.02-.67c-.31-.12-.78-.26-1.65-.3C14.98 3.81 14.65 3.8 12 3.8Zm0 3.4a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6Zm0 1.8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5-2.15a1.12 1.12 0 1 1 0 2.24 1.12 1.12 0 0 1 0-2.24Z" />
    ),
  },
];
 
export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="app-footer__inner">
        <div className="app-footer__brand">
          <span className="app-footer__brand-name">SmartServices</span>
          <p>Track every subscription, utility and booking in one dashboard.</p>
          <div className="app-footer__social">
            {socialLinks.map(({ label, href, icon }) => (
              <a key={label} href={href} className="app-footer__social-link" aria-label={label}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  {icon}
                </svg>
              </a>
            ))}
          </div>
        </div>
 
        <div className="app-footer__links">
          <span className="app-footer__heading">Quick Links</span>
          {quickLinks.map(({ to, label }) => (
            <Link key={to} to={to}>
              {label}
            </Link>
          ))}
        </div>
      </div>
 
      <div className="app-footer__legal">
        <p className="app-footer__copyright">
          © 2026 SmartServices. Built as a student project for ICT930 Assessment 3.
        </p>
        <div className="app-footer__legal-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
