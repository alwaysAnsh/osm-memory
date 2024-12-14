// Modal.js
import React from "react";
import "./Modal.css"; // Ensure the CSS file is imported

const InstructionsModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default InstructionsModal;
