/**
 * Owner: Charity — Dashboard & Data Layer
 * Purpose: Route-level Dashboard screen; feeds the live services list into DashboardOverview.
 */
import DashboardOverview from './DashboardOverview';
import { useServices } from '../../context/ServicesContext';

export default function DashboardPage() {
  const { services } = useServices();
  return <DashboardOverview services={services} />;
}
