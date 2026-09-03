/**
 * Owner: Shared
 * Purpose: App-wide footer shown beneath every authenticated screen — mirrors
 * the marketing homepage's footer so the whole app reads as one product.
 */
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="app-footer__inner">
        <div className="app-footer__brand">
          <span className="app-footer__brand-name">SmartServices</span>
          <p>Track every subscription, utility and booking in one dashboard.</p>
        </div>
        <div className="app-footer__links">
          <div>
            <span className="app-footer__heading">Product</span>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/services">Services</Link>
            <Link to="/notifications">Notifications</Link>
            <Link to="/analytics">Analytics</Link>
          </div>
          <div>
            <span className="app-footer__heading">Account</span>
            <Link to="/settings">Settings</Link>
            <Link to="/">Home</Link>
          </div>
        </div>
      </div>
      <p className="app-footer__copyright">
        Built by Charity, Sonam & Zubair for Web Development Assessment 2. 
      </p>
    </footer>
  );
}
