import React from 'react';
import { Modal } from 'react-bootstrap';

const CustomModal = ({ isOpen, onClose, title, body, footer }) => {
  if (!isOpen) return null;

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">{body}</Modal.Body>
      {footer && (
        <Modal.Footer className="text-center">{footer}</Modal.Footer>
      )}
    </Modal>
  );
};

export default CustomModal;
