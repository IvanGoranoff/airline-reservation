import React from 'react';
import '../styles/Modal.css';

const Modal = ({ isOpen, onClose, onConfirm, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {children}
                <div className="modal-actions">
                    <button onClick={onConfirm}>Confirm</button>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
