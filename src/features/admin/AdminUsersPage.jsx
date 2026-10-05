/**
 * Owner: Shared
 * Purpose: Admin-only user management — list, search, add and delete users.
 * The server enforces the admin check; this page just shows the 403 message
 * if a non-admin lands here.
 */
import { useCallback, useEffect, useState } from 'react';
import EmptyState from '../../shared/EmptyState';
import LoadingSkeleton from '../../shared/LoadingSkeleton';
import ErrorState from '../../shared/ErrorState';
import Modal from '../../shared/Modal';
import { apiFetch } from '../../api/client';
import './AdminUsersPage.css';

const EMPTY_FORM = { name: '', email: '', password: '', role: 'user' };

const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Name is required.';
  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!values.password) {
    errors.password = 'Password is required.';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }
  return errors;
}

function getCurrentUserId() {
  try {
    return JSON.parse(localStorage.getItem('user'))?.id ?? null;
  } catch {
    return null;
  }
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'error' | 'success'
  const [errorMessage, setErrorMessage] = useState('');
  const [query, setQuery] = useState('');
  const currentUserId = getCurrentUserId();

  // Add-user modal
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [touched, setTouched] = useState({});
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  // Delete-user modal
  const [deleting, setDeleting] = useState(null); // user being deleted, or null
  const [deleteError, setDeleteError] = useState('');
  const [removing, setRemoving] = useState(false);

  const load = useCallback(() => {
    setStatus('loading');
    apiFetch('/admin/users')
      .then((data) => {
        setUsers(data);
        setStatus('success');
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setStatus('error');
      });
  }, []);

  useEffect(() => load(), [load]);

  const errors = validate(form);
  const showError = (field) => touched[field] && errors[field];
  const setField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
  const markTouched = (field) => setTouched((prev) => ({ ...prev, [field]: true }));

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setTouched({});
    setFormError('');
    setAdding(true);
  };
  const closeAdd = useCallback(() => setAdding(false), []);

  const handleAdd = async (event) => {
    event.preventDefault();
    setTouched({ name: true, email: true, password: true });
    if (Object.keys(errors).length > 0) return;

    setSaving(true);
    setFormError('');
    try {
      const created = await apiFetch('/admin/users', { method: 'POST', body: JSON.stringify(form) });
      setUsers((prev) => [created, ...prev]);
      setAdding(false);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const openDelete = (user) => {
    setDeleteError('');
    setDeleting(user);
  };
  const closeDelete = useCallback(() => setDeleting(null), []);

  const handleDelete = async () => {
    setRemoving(true);
    setDeleteError('');
    try {
      await apiFetch(`/admin/users/${deleting.id}`, { method: 'DELETE' });
      setUsers((prev) => prev.filter((u) => u.id !== deleting.id));
      setDeleting(null);
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setRemoving(false);
    }
  };

  const needle = query.trim().toLowerCase();
  const filtered = users.filter(
    (u) => !needle || u.name.toLowerCase().includes(needle) || u.email.toLowerCase().includes(needle),
  );

  return (
    <div className="admin-users">
      <div className="admin-users__header">
        <div>
          <h1>All users</h1>
          {status === 'success' && <span className="admin-users__count">{users.length} total</span>}
        </div>
        <button type="button" className="btn btn-primary" onClick={openAdd} disabled={status !== 'success'}>
          Add user
        </button>
      </div>

      <input
        type="search"
        className="admin-users__search"
        placeholder="Search by name or email"
        aria-label="Search users"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      {status === 'loading' && <LoadingSkeleton />}
      {status === 'error' && <ErrorState title="Couldn't load users" message={errorMessage} onRetry={load} />}
      {status === 'success' &&
        (filtered.length === 0 ? (
          <EmptyState title="No users found" message="Try a different search." />
        ) : (
          <div className="admin-users__table-wrap">
            <table className="admin-users__table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Services</th>
                  <th scope="col">Joined</th>
                  <th scope="col">
                    <span className="visually-hidden">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => {
                  const isSelf = user.id === currentUserId;
                  return (
                    <tr key={user.id}>
                      <td>
                        {user.name}
                        {isSelf && <span className="admin-users__you"> (you)</span>}
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`tag ${user.role === 'admin' ? 'tag-active' : 'tag-category'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>{user.serviceCount}</td>
                      <td>{formatDate(user.createdAt)}</td>
                      <td className="admin-users__actions">
                        {!isSelf && (
                          <button
                            type="button"
                            className="btn btn-ghost admin-users__delete"
                            onClick={() => openDelete(user)}
                            aria-label={`Delete ${user.name}`}
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}

      <Modal open={adding} title="Add a user" onClose={closeAdd}>
        <form className="admin-users__form" onSubmit={handleAdd} noValidate>
          {formError && (
            <div className="form-error-summary" role="alert">
              {formError}
            </div>
          )}
          <div className="field">
            <label htmlFor="admin-new-name">Name</label>
            <input
              id="admin-new-name"
              className={`input${showError('name') ? ' is-invalid' : ''}`}
              value={form.name}
              onChange={(event) => setField('name', event.target.value)}
              onBlur={() => markTouched('name')}
            />
            {showError('name') && <span className="error">{errors.name}</span>}
          </div>
          <div className="field">
            <label htmlFor="admin-new-email">Email</label>
            <input
              id="admin-new-email"
              type="email"
              className={`input${showError('email') ? ' is-invalid' : ''}`}
              value={form.email}
              onChange={(event) => setField('email', event.target.value)}
              onBlur={() => markTouched('email')}
            />
            {showError('email') && <span className="error">{errors.email}</span>}
          </div>
          <div className="field">
            <label htmlFor="admin-new-password">Temporary password</label>
            <input
              id="admin-new-password"
              type="password"
              autoComplete="new-password"
              className={`input${showError('password') ? ' is-invalid' : ''}`}
              value={form.password}
              onChange={(event) => setField('password', event.target.value)}
              onBlur={() => markTouched('password')}
            />
            {showError('password') ? (
              <span className="error">{errors.password}</span>
            ) : (
              <span className="hint">At least 6 characters. Share it with the user so they can log in.</span>
            )}
          </div>
          <div className="field">
            <label htmlFor="admin-new-role">Role</label>
            <select
              id="admin-new-role"
              className="input"
              value={form.role}
              onChange={(event) => setField('role', event.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="admin-users__modal-actions">
            <button type="button" className="btn btn-secondary" onClick={closeAdd}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Adding…' : 'Add user'}
            </button>
          </div>
        </form>
      </Modal>

      <Modal open={deleting !== null} title="Delete this user?" onClose={closeDelete}>
        {deleting && (
          <>
            <p>
              This permanently removes <strong>{deleting.name}</strong> ({deleting.email}) along with their{' '}
              {deleting.serviceCount} service{deleting.serviceCount === 1 ? '' : 's'} and notifications. This
              can&apos;t be undone.
            </p>
            {deleteError && (
              <div className="form-error-summary" role="alert">
                {deleteError}
              </div>
            )}
            <div className="admin-users__modal-actions">
              <button type="button" className="btn btn-secondary" onClick={closeDelete}>
                Cancel
              </button>
              <button type="button" className="btn btn-danger" onClick={handleDelete} disabled={removing}>
                {removing ? 'Deleting…' : 'Delete user'}
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
