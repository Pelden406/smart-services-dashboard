# Smart Services Dashboard

A subscription and utility management frontend built for **ICT930 Advanced Web Application Development — Assessment 2**. The app lets a user track their recurring services (subscriptions, utilities, bookings), search and filter them, view detailed information, and add or edit services through a validated form — alongside a marketing landing page, analytics, notifications, and account settings.

## Project Overview

Smart Services Dashboard simulates a real-world frontend developer task: consuming and managing structured service data through a clean, component-based UI. The application includes a public marketing homepage, a sign-in and onboarding flow, a dashboard overview, a searchable/filterable services list, individual service detail views, a full add/edit form flow, notifications, spending analytics, and account settings.

## Technology Stack

- **React** (functional components + hooks)
- **React Router** — client-side, multi-page navigation
- **Plain CSS** — no CSS framework; component-scoped stylesheets following an 8px spacing scale, with shared design tokens (colour, typography, spacing) defined once and reused everywhere
- **Vite** — build tooling and dev server
- **React Context** — shared in-memory state (`ServicesContext`) across screens
- **localStorage** — persists service data across page refreshes (no backend/API)

## Installation Instructions

```
git clone https://github.com/Pelden406/smart-services-dashboard.git
cd smart-services-dashboard
npm install
npm run dev
```

The app will be available locally, typically at `http://localhost:5173/`.

To build for production:
```
npm run build
```

To check code quality:
```
npm run lint
```

## Key Features

- **Marketing homepage** — public landing page introducing the app
- **Sign in & onboarding** — entry point and a multi-step introduction flow for new users
- **Dashboard** — overview stats, upcoming renewals, and spend-by-category breakdown
- **Services List** — search, category/status filters, sorting, responsive card and table layout
- **Service Detail** — tabbed detail view with pause/edit actions
- **Add/Edit Service Form** — inline validation, disabled submit until valid
- **Notifications** — tabbed list of renewal, booking, and system notifications
- **Analytics** — spend trends across 3/6/12 months with a savings goal
- **Settings** — profile and account preferences
- **Shared UI states** — loading skeletons, empty states, and error states used consistently across screens
- **Responsive design** — mobile, tablet, and desktop layouts, including a collapsible hamburger navigation menu below 640px
- **Data persistence** — changes survive a hard browser refresh via localStorage

## Design Decisions

- **Feature-based folder structure** (`src/features/dashboard`, `src/features/services-list`, `src/features/forms-detail`, `src/features/extras`, `src/features/marketing`) rather than grouping by file type, so each team member's section is self-contained and easy to navigate
- **Shared Context over prop drilling** for service data, since multiple unrelated screens (dashboard, list, detail, form) all need read/write access to the same data
- **Plain CSS over a utility framework** to keep styling explicit and easy for all team members to read and modify without a shared design-system dependency
- **Mock data instead of a live API**, since the assignment scope is frontend-only; the data layer (`src/data/services.js`, `serviceUtils.js`) is structured so it could be swapped for real API calls with minimal changes
- **Mobile-first responsive navigation** — the top navigation collapses into a hamburger menu below 640px rather than relying on horizontal scrolling, based on usability issues found during manual mobile testing

## Team

| Section | Owner |
|---|---|
| Dashboard, Data Layer, Analytics & Spend Trend, Marketing Homepage | Charity |
| Services List, Search/Filter, Notifications & Settings | Sonam |
| Forms, Service Detail, Sign In & Onboarding | Zubair |

## Project Structure

```
src/
├── features/
│   ├── dashboard/        # Charity — DashboardPage, StatsCard, UpcomingRenewals, SpendByCategoryChart
│   ├── services-list/    # Sonam — ServicesPage, ServiceList, ServiceCard, SearchBar, FilterPanel
│   ├── forms-detail/     # Zubair — ServiceFormPage, ServiceForm, ServiceDetailPage, ServiceDetail
│   ├── extras/           # Analytics, SpendTrendChart, Notifications, Settings, SignIn, Onboarding
│   └── marketing/        # Public HomePage
├── shared/                # Nav, layout, footer, loading/empty/error states, modal
├── data/                  # Mock data + helper functions
├── context/                # ServicesContext (shared state)
├── styles/                # Design tokens and global styles
├── App.jsx
└── main.jsx
```

