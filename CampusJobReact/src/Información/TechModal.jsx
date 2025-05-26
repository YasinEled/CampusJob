import React from 'react';

const TechModal = ({ isOpen, onClose, tech }) => {
  if (!isOpen || !tech) return null;

  return (
    <div className="tech-modal-overlay" onClick={onClose}>
      <div className="tech-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>✕</button>
        <img src={tech.image} alt={tech.name} className="tech-image" />
        <h2>{tech.name}</h2>
        <p>{tech.description}</p>
        <a href={tech.link} target="_blank" rel="noopener noreferrer" className="tech-link">
          Visita el lloc oficial
        </a>
      </div>
    </div>
  );
};

export default TechModal;
