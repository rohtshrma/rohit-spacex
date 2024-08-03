// src/components/Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, rocket }) => {
  if (!isOpen) return null;

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <button style={closeButtonStyle} onClick={onClose}>×</button>
        <h3>{rocket.name}</h3>
        <p>{rocket.description}</p>
        <img
          src={rocket.flickr_images[0]} // Use the first image from the flickr_images array
          alt={rocket.name}
          style={imageStyle}
        />
      </div>
    </div>
  );
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  width: '80%',
  maxWidth: '600px',
  position: 'relative',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  background: 'none',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer',
};

const imageStyle = {
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
};

export default Modal;
