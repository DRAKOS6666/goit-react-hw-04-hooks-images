import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import propTypes from 'prop-types';

function Modal({ closeModal, children }) {
  const modalRoot = document.querySelector('#modal-root');

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleCloseClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleCloseClick}>
      <div className="Modal">{children}</div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  closeModal: propTypes.func.isRequired,
  children: propTypes.node.isRequired,
};

export default Modal;
