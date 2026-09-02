/**
 * Owner: Zubir — Forms & Service Detail
 * Purpose: Route-level Add/Edit Service screen — handles both modes based
 * on whether an :id param is present, and wires ServiceForm to context.
 */
import { Link, useNavigate, useParams } from 'react-router-dom';
import ServiceForm from './ServiceForm';
import { useServices } from '../../context/ServicesContext';
import { emptyService } from '../../data/serviceUtils';
import './ServiceFormPage.css';

export default function ServiceFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getServiceById, addService, updateService } = useServices();
  const isEditing = Boolean(id);
  const existing = isEditing ? getServiceById(id) : null;

  if (isEditing && !existing) {
    return (
      <div>
        <h2>Service not found</h2>
        <p>
          <Link to="/services">Back to services</Link>
        </p>
      </div>
    );
  }

  const initialValues = existing
    ? { ...existing, cost: String(existing.cost) }
    : emptyService();

  const handleSubmit = (values) => {
    if (isEditing) {
      updateService(id, values);
      navigate(`/services/${id}`);
    } else {
      const created = addService(values);
      navigate(`/services/${created.id}`);
    }
  };

  return (
    <div className="service-form-page">
      <h2>{isEditing ? 'Edit service' : 'Add service'}</h2>
      <ServiceForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel={isEditing ? 'Save changes' : 'Save service'}
      />
    </div>
  );
}
