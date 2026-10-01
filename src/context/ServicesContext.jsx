import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { apiFetch } from '../api/client';
import { formatRelativeTime } from '../data/notifications';
 
// Shared store for services, backed by the real API, so the dashboard, list,
// detail and form screens all read/write the same data.
const ServicesContext = createContext(null);
 
function normalizeNotification(raw) {
  return {
    id: raw._id,
    type: raw.type.toLowerCase(),
    title: raw.message,
    meta: formatRelativeTime(raw.createdAt),
    read: raw.read,
  };
}
 
function normalizeService(raw) {
  return {
    ...raw,
    id: raw._id,
    renewalDate: raw.renewalDate ? raw.renewalDate.slice(0, 10) : null,
    activity: (raw.activity || []).map((entry) => ({
      ...entry,
      date: entry.date ? entry.date.slice(0, 10) : entry.date,
    })),
  };
}
 
export function ServicesProvider({ children }) {
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'error' | 'success' | 'unauthenticated'
 
  const load = useCallback(() => {
    if (!localStorage.getItem('token')) {
      setStatus('unauthenticated');
      return;
    }
    setStatus('loading');
    apiFetch('/services')
      .then((data) => {
        setServices(data.map(normalizeService));
        setStatus('success');
      })
      .catch(() => {
        setStatus('error');
      });
  }, []);
 
  useEffect(() => load(), [load]);
 
  const value = useMemo(
    () => ({
      services,
      status,
      refetch: load,
      getServiceById: (id) => services.find((s) => s.id === id),
      createService: async (service) => {
        const created = await apiFetch('/services', {
          method: 'POST',
          body: JSON.stringify(service),
        });
        load();
        return normalizeService(created);
      },
      updateService: async (id, updates) => {
        const updated = await apiFetch(`/services/${id}`, {
          method: 'PUT',
          body: JSON.stringify(updates),
        });
        load();
        return normalizeService(updated);
      },
      deleteService: async (id) => {
        await apiFetch(`/services/${id}`, { method: 'DELETE' });
        load();
      },
      getSpendTrend: async (months) => {
        const data = await apiFetch(`/analytics/spend-trend?months=${months}`);
        return data.series;
      },
      getNotifications: async () => {
        const data = await apiFetch('/notifications');
        return data.map(normalizeNotification);
      },
      markNotificationRead: async (id) => {
        const updated = await apiFetch(`/notifications/${id}/read`, { method: 'PATCH' });
        return normalizeNotification(updated);
      },
    }),
    [services, status, load],
  );
 
  return <ServicesContext.Provider value={value}>{children}</ServicesContext.Provider>;
}
 
export function useServices() {
  const ctx = useContext(ServicesContext);
  if (!ctx) throw new Error('useServices must be used within a ServicesProvider');
  return ctx;
}
