import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { services as seedServices } from '../data/services';
import { generateId } from '../data/serviceUtils';

// Shared store for services, so the dashboard, list, detail and form
// screens all read/write the same data. Mirrored to localStorage so a
// browser refresh doesn't wipe out changes made during the session.
//
// Loading the list is simulated as an async fetch (a fixed delay, with an
// occasional simulated failure) so the app has real loading/error states to
// show, even though the "backend" is just localStorage.
const ServicesContext = createContext(null);
const STORAGE_KEY = 'smart-services-dashboard:services';
const SIMULATED_LOAD_DELAY_MS = 700;
const SIMULATED_FAILURE_RATE = 0.2;

function readStoredServices() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : seedServices;
  } catch {
    return seedServices;
  }
}

export function ServicesProvider({ children }) {
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'error' | 'success'

  const load = useCallback(() => {
    setStatus('loading');
    const timer = setTimeout(() => {
      if (Math.random() < SIMULATED_FAILURE_RATE) {
        setStatus('error');
        return;
      }
      setServices(readStoredServices());
      setStatus('success');
    }, SIMULATED_LOAD_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => load(), [load]);

  useEffect(() => {
    if (status !== 'success') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
    } catch {
      // Storage unavailable (e.g. private browsing) — state still works in-memory.
    }
  }, [services, status]);

  const value = useMemo(
    () => ({
      services,
      status,
      retry: load,
      getServiceById: (id) => services.find((s) => s.id === id),
      addService: (service) => {
        const newService = { ...service, id: generateId() };
        setServices((prev) => [newService, ...prev]);
        return newService;
      },
      updateService: (id, updates) => {
        setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
      },
      deleteService: (id) => {
        setServices((prev) => prev.filter((s) => s.id !== id));
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
