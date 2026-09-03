/**
 * Owner: Zubair — Forms & Service Detail
 * Purpose: Route-level Service Detail screen — resolves the :id param and
 * wires pause/resume/delete actions to context.
 */
import { Link, useNavigate, useParams } from 'react-router-dom';
import ServiceDetail from './ServiceDetail';
import { useServices } from '../../context/ServicesContext';
 
export default function ServiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getServiceById, updateService, deleteService } = useServices();
  const service = getServiceById(id);
 
  if (!service) {
    return (
      <div>
        <h2>Service not found</h2>
        <p>
          <Link to="/services">Back to services</Link>
        </p>
      </div>
    );
  }
 
  const handleTogglePause = () => {
    updateService(service.id, { status: service.status === 'Active' ? 'Paused' : 'Active' });
  };
 
  const handleDelete = () => {
    deleteService(service.id);
    navigate('/services');
  };
 
  return <ServiceDetail service={service} onTogglePause={handleTogglePause} onDelete={handleDelete} />;
}
