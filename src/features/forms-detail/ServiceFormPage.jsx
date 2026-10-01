/**
 * Owner: Zubair — Forms & Service Detail
 * Purpose: Route-level Add/Edit Service screen — handles both modes based
 * on whether an :id param is present, and wires ServiceForm to context.
 */
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ServiceForm from './ServiceForm';
import { useServices } from '../../context/ServicesContext';
import { emptyService } from '../../data/serviceUtils';
import './ServiceFormPage.css';
 
export default function ServiceFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getServiceById, createService, updateService } = useServices();
  const [error, setError] = useState('');
  const isEditing = Boolean(id);
  const existing = isEditing ? getServiceById(id) : null;
 
  if (isEditing && !existing) {
    return (
      <div>
        <h1>Service not found</h1>
        <p>
          <Link to="/services">Back to services</Link>
        </p>
      </div>
    );
  }
 
  const initialValues = existing
    ? { ...existing, cost: String(existing.cost) }
    : emptyService();
 
  const handleSubmit = async (values) => {
    setError('');
    try {
      if (isEditing) {
        await updateService(id, values);
        navigate(`/services/${id}`);
      } else {
        const created = await createService(values);
        navigate(`/services/${created.id}`);
      }
    } catch (err) {
      setError(err.message);
    }
  };
 
  return (
    <div className="service-form-page">
      <h1>{isEditing ? 'Edit service' : 'Add service'}</h1>
      {error && (
        <p className="service-form-page__error" role="alert">
          {error}
        </p>
      )}
      <ServiceForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel={isEditing ? 'Save changes' : 'Save service'}
      />
    </div>
  );
}
