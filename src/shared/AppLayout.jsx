/**
 * Owner: Shared
 * Purpose: Page chrome for every route — top nav plus a constrained content
 * column — and the gate that holds routes behind the simulated data fetch.
 */
import { Navigate, Outlet } from 'react-router-dom';
import TopNav from './TopNav';
import Footer from './Footer';
import LoadingSkeleton from './LoadingSkeleton';
import ErrorState from './ErrorState';
import { useServices } from '../context/ServicesContext';
import './AppLayout.css';
 
export default function AppLayout() {
  const { status, refetch } = useServices();
 
  if (status === 'unauthenticated') {
    return <Navigate to="/signin" replace />;
  }
 
  return (
    <div className="app-layout">
      <TopNav />
      <main className="app-layout__content">
        {status === 'loading' && <LoadingSkeleton />}
        {status === 'error' && <ErrorState onRetry={refetch} level={1} />}
        {status === 'success' && <Outlet />}
      </main>
      <Footer />
    </div>
  );
}
