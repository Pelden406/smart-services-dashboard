# Smart Services Dashboard

A full-stack subscription and utility manager built for **ICT930 Advanced Web Application Development — Assessment 3**. Users register, log in, and track their recurring services (subscriptions, utilities, bookings): search and filter them, view spend analytics, receive notifications, and add, edit, pause or delete services. Administrators can also manage user accounts.

## Project Overview

People who subscribe to many services manage them across separate apps, emails and paper bills, so renewals are missed and total spend is unclear. Smart Services Dashboard gives one place to see what you pay for, when it renews, and how spend changes over time.

The system has three tiers: a React single-page application, an Express REST API, and a MongoDB Atlas database accessed through Mongoose. After login the frontend sends a JSON Web Token (JWT) with every request, and every query is scoped to the logged-in user.

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React (functional components and hooks), React Router, plain CSS with shared design tokens, Vite |
| State | React Context (`ServicesContext`) |
| Backend | Node.js, Express, bcryptjs, jsonwebtoken, cors, dotenv |
| Database | MongoDB Atlas via Mongoose |
| Tooling | npm, nodemon, oxlint, Git and GitHub |

## Installation Instructions

**Prerequisites:** Node.js 18 or later, and access to the team's MongoDB Atlas database (ask a team member for the connection values; your IP address must be allowed under Atlas Network Access).

```
git clone https://github.com/Pelden406/smart-services-dashboard.git
cd smart-services-dashboard
```

**1. Backend** (first terminal)

Create `backend/.env` with:

```
MONGO_URI=<your MongoDB Atlas connection string>
JWT_SECRET=<a long random string>
PORT=5000
```

- If the database password contains special characters such as `@`, URL-encode them (`@` becomes `%40`).
- `.env` is git-ignored. Never commit it.

```
cd backend
npm install
npm run dev
```

You should see `Server running on port 5000` and `MongoDB connected successfully`.

**2. Frontend** (second terminal, from the project root)

```
npm install
npm run dev
```

Open `http://localhost:5173/`. Both servers must be running. Register an account on the **Create Account** tab, then log in.

**Other commands**

```
npm run build        # production build (frontend)
npm run lint         # code quality check (frontend)
```

**Creating an administrator:** register a normal account first, then from the `backend` folder run:

```
npm run make-admin -- <user-email>
```

Add `--remove` to return that account to a normal user.

## Key Features

- **Authentication:** registration and login with bcrypt-hashed passwords and 7-day JWTs
- **Services:** create, read, update, pause and delete, scoped per user
- **Search, filter and sort:** live search by name, category and status filters, sorting by name or cost
- **Dashboard:** active services, monthly spend, renewals due within 7 days, bookings, spend by category
- **Analytics:** month-by-month spend by category over 3, 6 and 12 months from real cost history
- **Notifications:** stored in the database, with mark-as-read that persists; welcome notifications created on sign-up
- **Settings:** profile pre-filled from the logged-in account
- **Admin:** administrators can view, create and delete users at `/admin/users`; admins cannot delete their own account or the last admin
- **Marketing homepage and onboarding flow**
- **Responsive design:** mobile, tablet and desktop layouts, with a hamburger menu below 640 px
- **Accessibility:** WCAG 2.2 AA colour contrast, one h1 per page, labelled form fields, keyboard-operable tabs and dialogs, visible focus states, error summaries on forms

## API Overview

| Method and path | Purpose | Access |
|---|---|---|
| POST `/api/auth/register`, `/api/auth/login` | Create an account, log in | Public |
| GET, POST `/api/services` | List (search, category, status, sortBy) and create | Logged in |
| GET, PUT, DELETE `/api/services/:id` | Read, update, delete one service | Owner only |
| GET `/api/analytics/stats`, `/api/analytics/spend-trend?months=3\|6\|12` | Dashboard figures and spend trend | Logged in |
| GET `/api/notifications`, PATCH `/api/notifications/:id/read` | List and mark as read | Logged in |
| GET, POST `/api/admin/users`, DELETE `/api/admin/users/:id` | Manage users | Admin only |
| GET `/api/health` | Server check | Public |

## Database Design

Three collections in the `smart-services-dashboard` database:

- **User:** name, email (unique), password (bcrypt hash), role (`user` or `admin`)
- **Service:** userId (reference to User), name, provider, accountNumber, category, cost, billingCycle, status, renewalDate, reminder, notes, with embedded `usageHistory`, `activity` and `costHistory` arrays
- **Notification:** userId (reference to User), type, message, read

A user has many services and many notifications, linked by `userId`. Mongoose enforces required fields, allowed values (for example category and status) and numeric cost.

## Security Measures

- Passwords hashed with bcrypt (10 salt rounds); the plain password is never stored or returned
- JWT required on every protected route; every query is filtered by the logged-in user's ID
- Admin routes check the user's role in the database on every request, so removing admin access takes effect immediately
- One generic message for a wrong email or password, which avoids revealing which accounts exist
- Input validation in the front end and in the Mongoose schemas
- A central error handler returns friendly messages; full error detail is logged on the server only
- Secrets are kept in a git-ignored `.env` file

## Design Decisions

- **Feature-based folders** (`dashboard`, `services-list`, `forms-detail`, `extras`, `marketing`, `admin`) so each team member's section is self-contained
- **React Context over prop drilling:** services load once and refetch after any change, so every screen stays in sync
- **Plain CSS with design tokens:** one set of colour, spacing and type variables (`src/styles/tokens.css`) keeps three developers visually consistent
- **MongoDB:** the flexible document model matches the JSON shape the frontend already used, and Atlas gives the team one shared cloud database with no local install
- **Mobile-first navigation:** the nav collapses into a hamburger menu after usability testing showed horizontal scrolling was not discoverable
- **Accessible by design:** colours were rebuilt after contrast checks found three failures, and status colours also differ in lightness for colour-blind users

## Team

| Member | Responsibilities |
|---|---|
| Charity | Dashboard, Analytics and spend trend, Marketing homepage, analytics endpoints, admin features |
| Sonam | Services list and search/filter, Notifications, Settings, backend setup, API client and integration |
| Zubair | Forms and service detail, Sign In, Onboarding, authentication, services create/update/delete endpoints |

## Project Structure

```
backend/
├── config/        # MongoDB connection
├── controllers/   # auth, services, analytics, notifications, admin
├── middleware/    # JWT auth, admin check, error handler
├── models/        # User, Service, Notification
├── routes/        # one router per feature
├── scripts/       # seedHistory.js, makeAdmin.js
└── server.js
src/
├── api/           # fetch wrapper that attaches the JWT
├── context/       # ServicesContext (shared state)
├── features/      # dashboard, services-list, forms-detail, extras, marketing, admin
├── shared/        # nav, footer, layout, modal, loading/empty/error states, keyboard-nav hook
├── data/          # constants and helper functions
├── styles/        # design tokens and global styles
├── App.jsx
└── main.jsx
```

## Known Limitations and Future Work

- No automated unit tests (testing was done with curl and Playwright)
- Settings preferences are stored in the browser, not the database
- Login is not rate-limited, CORS is open to all origins, and the token is kept in `localStorage`
- Runs locally against a shared cloud database; deployment (for example Vercel and Render) is a future step
- Analytics history is seeded for demonstration rather than accumulated from long-term use
