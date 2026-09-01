/**
 * Owner: Shared
 * Purpose: Page chrome for every route — top nav plus a constrained content
 * column — and the gate that holds routes behind the simulated data fetch.
 */
import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';
import LoadingSkeleton from './LoadingSkeleton';
import ErrorState from './ErrorState';
import { useServices } from '../context/ServicesContext';
import './AppLayout.css';
 
export default function AppLayout() {
  const { status, retry } = useServices();
 
  return (
    <div className="app-layout">
      <TopNav />
      <main className="app-layout__content">
        {status === 'loading' && <LoadingSkeleton />}
        {status === 'error' && <ErrorState onRetry={retry} />}
        {status === 'success' && <Outlet />}
      </main>
    </div>
  );
}
