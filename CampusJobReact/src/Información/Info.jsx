import React from 'react';

const AboutUs = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>Quiénes Somos</h1>
      <p>
        Somos un equipo apasionado dedicado a crear soluciones web innovadoras y efectivas, comprometidos con la calidad y la mejora continua.
      </p>

      <h2>Creadores</h2>
      <div style={{ display: 'flex', gap: '40px', marginBottom: '40px' }}>
        <div style={{ textAlign: 'center' }}>
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Creador 1"
            style={{ width: '150px', borderRadius: '50%' }}
          />
          <h3>Juan Pérez</h3>
          <p>Desarrollador Frontend</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Creadora 2"
            style={{ width: '150px', borderRadius: '50%' }}
          />
          <h3>María Gómez</h3>
          <p>Diseñadora UX/UI</p>
        </div>
      </div>

      <h2>Tecnologías Usadas</h2>
      <ul>
        <li>React</li>
        <li>JavaScript (ES6+)</li>
        <li>CSS3 y Flexbox</li>
        <li>HTML5</li>
        <li>Node.js (backend)</li>
      </ul>
    </div>
  );
};

export default AboutUs;
