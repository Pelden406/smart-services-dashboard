/**
 * Owner: Shared — routing (temporary trimmed version for local testing on
 * charity-dashboard branch; will be reconciled with other sections' routes
 * when branches are merged into main).
 */
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import AppLayout from './shared/AppLayout';
import NotFoundPage from './shared/NotFoundPage';
import DashboardPage from './features/dashboard/DashboardPage';
import HomePage from './features/marketing/HomePage';
import SignInPage from './features/extras/SignInPage';
import OnboardingPage from './features/extras/OnboardingPage';
import { ServicesProvider } from './context/ServicesContext';

export default function App() {
  return (
    <ServicesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="onboarding" element={<OnboardingPage />} />
          <Route element={<AppLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ServicesProvider>
  );
}