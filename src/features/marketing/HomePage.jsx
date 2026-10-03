/**
 * Owner: Charity
 * Purpose: Public marketing homepage for feature highlights,
 * social proof and calls to action into sign-in. Structured after 
 * Rocket money (n.d) but built on this app's own
 * design tokens and content.
 References
 Rocket Money - Take control of your money. (n.d.). Rocket Money - Take Control of Your Money. Retrieved September 2, 2026, from https://www.rocketmoney.com/
 */
import { Link } from 'react-router-dom';
import './HomePage.css';

const STATS = [
  { value: '12', label: 'services tracked per member, on average' },
  { value: '$186', label: 'in forgotten subscriptions found, on average' },
  { value: '4.8/5', label: 'average rating from student testers' },
];

const FEATURES = [
  {
    title: 'Get control over your subscriptions',
    copy: 'SmartServices keeps every subscription, utility and booking in one list, so nothing renews without you knowing about it first.',
    cta: { label: 'Manage my subscriptions', to: '/signin' },
    mock: 'services',
  },
  {
    title: 'Stay on top of your everyday spending',
    copy: 'See spend broken down by category and by month, so it is obvious where your money is actually going.',
    cta: { label: 'Track my spending', to: '/signin' },
    mock: 'spend',
  },
  {
    title: 'Never miss a renewal again',
    copy: 'Turn on reminders and get notified before a renewal or a price change catches you off guard.',
    cta: { label: 'See upcoming renewals', to: '/signin' },
    mock: 'renewals',
  },
];

const STEPS = [
  { step: '01', title: 'Add your services', copy: 'List out every subscription, utility and booking in a couple of minutes.' },
  { step: '02', title: 'See it all in one place', copy: 'A single dashboard shows what is active, what is due soon, and what it all costs.' },
  { step: '03', title: 'Get ahead of renewals', copy: 'Reminders and notifications mean you decide what to keep, not the renewal date.' },
];

const TESTIMONIALS = [
  { quote: 'I found two subscriptions I completely forgot I was paying for. Paid for itself in the first five minutes.', name: 'Priya S.', role: 'Student' },
  { quote: 'Having utilities, streaming and my gym membership in one list actually made me stick to a budget.', name: 'Marcus T.', role: 'Student' },
  { quote: 'The renewal reminders are the whole point for me — I always used to get caught out by yearly plans.', name: 'Aroha K.', role: 'Student' },
];

function HeroMock() {
  return (
    <div className="hero-mock" aria-hidden="true">
      <div className="hero-mock__bar">
        <span />
        <span />
        <span />
      </div>
      <div className="hero-mock__stat">
        <span className="hero-mock__stat-label">Monthly spend</span>
        <span className="hero-mock__stat-value">$214.50</span>
      </div>
      <div className="hero-mock__chart">
        <div style={{ height: '40%' }} />
        <div style={{ height: '65%' }} />
        <div style={{ height: '50%' }} />
        <div style={{ height: '85%' }} />
        <div style={{ height: '60%' }} />
        <div style={{ height: '95%' }} />
      </div>
      <ul className="hero-mock__list">
        <li>
          <span className="hero-mock__dot hero-mock__dot--a" />
          StreamPlus
          <span className="hero-mock__price">$15.99</span>
        </li>
        <li>
          <span className="hero-mock__dot hero-mock__dot--b" />
          Fibretel Internet
          <span className="hero-mock__price">$79.00</span>
        </li>
        <li>
          <span className="hero-mock__dot hero-mock__dot--c" />
          FitZone Gym
          <span className="hero-mock__price">$45.00</span>
        </li>
      </ul>
    </div>
  );
}

function FeatureMock({ kind }) {
  if (kind === 'spend') {
    return (
      <div className="feature-mock" aria-hidden="true">
        <div className="feature-mock__chart">
          <div style={{ height: '35%' }} />
          <div style={{ height: '70%' }} />
          <div style={{ height: '55%' }} />
          <div style={{ height: '90%' }} />
        </div>
        <div className="feature-mock__legend">
          <span><i className="feature-mock__dot feature-mock__dot--a" />Subscriptions</span>
          <span><i className="feature-mock__dot feature-mock__dot--b" />Utilities</span>
          <span><i className="feature-mock__dot feature-mock__dot--c" />Bookings</span>
        </div>
      </div>
    );
  }

  if (kind === 'renewals') {
    return (
      <div className="feature-mock" aria-hidden="true">
        <ul className="feature-mock__renewals">
          <li>
            <span>TuneWave</span>
            <span className="tag tag-paused">Due in 3 days</span>
          </li>
          <li>
            <span>Fibretel Internet</span>
            <span className="tag tag-paused">Due in 6 days</span>
          </li>
          <li>
            <span>FitZone Gym</span>
            <span className="tag tag-active">Renewed</span>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="feature-mock" aria-hidden="true">
      <ul className="feature-mock__services">
        <li>
          <span className="hero-mock__dot hero-mock__dot--a" />
          StreamPlus <span className="tag tag-category">Subscription</span>
        </li>
        <li>
          <span className="hero-mock__dot hero-mock__dot--b" />
          Fibretel Internet <span className="tag tag-category">Utility</span>
        </li>
        <li>
          <span className="hero-mock__dot hero-mock__dot--c" />
          FitZone Gym <span className="tag tag-category">Booking</span>
        </li>
      </ul>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="home-page">
      <header className="home-nav">
        <div className="home-nav__inner">
          <span className="home-nav__brand">SmartServices</span>
          <nav className="home-nav__links" aria-label="Primary">
            <a href="#top">Home</a>
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
          </nav>
          <div className="home-nav__actions">
            <Link to="/signin" className="home-nav__login">
              Log in
            </Link>
            <Link to="/signin" className="btn btn-primary">
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="home-hero">
          <div className="home-hero__panel">
            <div className="home-hero__text">
              <h1>The subscription app that works for you</h1>
              <p>
                Managing every subscription, utility and booking is hard, but you don't have to keep track of it
                alone. SmartServices finds the pattern in your spending and tells you what needs your attention
                next.
              </p>
              <div className="home-hero__actions">
                <Link to="/signin" className="btn btn-primary">
                  Get started free
                </Link>
                <span className="home-hero__note">No card required for the demo</span>
              </div>
            </div>
            <HeroMock />
          </div>
        </section>

        <section className="home-stats" aria-label="Highlights">
          <div className="home-stats__inner">
            {STATS.map((stat) => (
              <div className="home-stats__item" key={stat.label}>
                <span className="home-stats__value">{stat.value}</span>
                <span className="home-stats__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="home-features" id="features">
          {FEATURES.map((feature, index) => (
            <div
              className={`home-features__row${index % 2 === 1 ? ' home-features__row--reverse' : ''}`}
              key={feature.title}
            >
              <div className="home-features__text">
                <h2>{feature.title}</h2>
                <p>{feature.copy}</p>
                <Link to={feature.cta.to} className="home-features__link">
                  {feature.cta.label} →
                </Link>
              </div>
              <FeatureMock kind={feature.mock} />
            </div>
          ))}
        </section>

        <section className="home-steps" id="how-it-works">
          <h2>Get set up in minutes</h2>
          <div className="home-steps__grid">
            {STEPS.map((item) => (
              <div className="home-steps__item" key={item.step}>
                <span className="home-steps__number">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="home-testimonials" aria-label="Testimonials">
          <h2>Feel the love</h2>
          <div className="home-testimonials__grid">
            {TESTIMONIALS.map((t) => (
              <figure className="home-testimonials__card" key={t.name}>
                <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption>
                  {t.name} <span>· {t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="home-cta">
          <h2>Ready to take control of your subscriptions?</h2>
          <p>Set up your dashboard in a couple of minutes — no card required for the demo.</p>
          <Link to="/signin" className="btn btn-primary">
            Get started free
          </Link>
        </section>
      </main>

      <footer className="home-footer">
        <div className="home-footer__inner">
          <div className="home-footer__brand">
            <span className="home-nav__brand">SmartServices</span>
            <p>Track every subscription, utility and booking in one dashboard.</p>
          </div>
          <div className="home-footer__links">
            <div>
              <span className="home-footer__heading">Product</span>
              <Link to="/signin">Dashboard</Link>
              <Link to="/signin">Services</Link>
              <Link to="/signin">Analytics</Link>
              <Link to="/signin">Notifications</Link>
            </div>
            <div>
              <span className="home-footer__heading">Account</span>
              <Link to="/signin">Log in</Link>
              <Link to="/onboarding">Onboarding</Link>
            </div>
          </div>
        </div>
        <p className="home-footer__copyright">
          Built by Charity, Sonam & Zubair for Web Development Assessment 2.
        </p>
      </footer>
    </div>
  );
}
