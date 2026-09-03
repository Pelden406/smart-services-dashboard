/**
 * Owner: Shared — routing (temporary trimmed version for local testing on
 * zubair-forms-detail branch; will be reconciled with other sections' routes
 * when branches are merged into main).
 */
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import AppLayout from './shared/AppLayout';
import NotFoundPage from './shared/NotFoundPage';
import ServiceFormPage from './features/forms-detail/ServiceFormPage';
import ServiceDetailPage from './features/forms-detail/ServiceDetailPage';
import { ServicesProvider } from './context/ServicesContext';

export default function App() {
  return (
    <ServicesProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<ServiceDetailPage />} />
            <Route path="services/new" element={<ServiceFormPage />} />
            <Route path="services/:id" element={<ServiceDetailPage />} />
            <Route path="services/:id/edit" element={<ServiceFormPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ServicesProvider>
  );
}