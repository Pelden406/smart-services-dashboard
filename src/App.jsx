import { Navigate, Route, BrowserRouter, Routes } from 'react-router-dom';
import AppLayout from './shared/AppLayout';
import NotFoundPage from './shared/NotFoundPage';
import SignInPage from './features/extras/SignInPage';
import OnboardingPage from './features/extras/OnboardingPage';
import NotificationsPage from './features/extras/NotificationsPage';
import AnalyticsPage from './features/extras/AnalyticsPage';
import SettingsPage from './features/extras/SettingsPage';
import DashboardPage from './features/dashboard/DashboardPage';
import ServicesPage from './features/services-list/ServicesPage';
import ServiceDetailPage from './features/forms-detail/ServiceDetailPage';
import ServiceFormPage from './features/forms-detail/ServiceFormPage';
import { ServicesProvider } from './context/ServicesContext';
 
export default function App() {
  return (
    <ServicesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="signin" element={<SignInPage />} />
          <Route path="onboarding" element={<OnboardingPage />} />
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/new" element={<ServiceFormPage />} />
            <Route path="services/:id" element={<ServiceDetailPage />} />
            <Route path="services/:id/edit" element={<ServiceFormPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ServicesProvider>
  );
}