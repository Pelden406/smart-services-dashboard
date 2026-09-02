/**
 * Owner: Shared
 * Purpose: Generic, reusable modal dialog. Closes on Escape or backdrop click.
 */
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

export default function Modal({ open, title, onClose, children }) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="modal-title" className="modal__title">
          {title}
        </h2>
        <div className="modal__body">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
