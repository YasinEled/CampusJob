import React, { useState } from 'react';
import './Style/CreateOfertas.css';

function FormOfertas() {
  const [formData, setFormData] = useState({
    titoloferta: '',
    descripciooferta: '',
    tipusjornada: '',
    horessetmanals: '',
    numplacesvacants: '',
    presencial: true,
    salariesperat: '',
    fechafin: '',
    imgoferte: '', // opcional
    documentadjunto: '', // opcional
    idusrpublica: 1 // este valor deberías obtenerlo del login
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://campusjobbackend.onrender.com/api/crearOferta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        alert('Oferta creada con éxito');
      } else {
        alert('Error al crear la oferta: ' + data.message);
      }
    } catch (error) {
      console.error('Error al enviar la oferta:', error);
      alert('Hubo un error al enviar la oferta.');
    }
  };

  return (
    <div className="ContainerFormOfertas">
      <h1 className="tituloOfertas">AÑADIR OFERTA DE TRABAJO</h1>
      <div className="continerformOfertasCentral">
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '2em', width: '100%' }}>
          <div className="formOfertasLeft">
            <label htmlFor="titulo">Título de puesto *</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
            />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '44%' }}>
                <label htmlFor="telefono">Teléfono de contacto *</label>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={{ width: '44%' }}>
                <label htmlFor="ubicacion">Ubicación *</label>
                <input
                  type="text"
                  id="ubicacion"
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <label htmlFor="sector">Sector *</label>
            <select
              id="sector"
              name="sector"
              value={formData.sector}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un sector</option>
              <option value="Tecnología">Tecnología</option>
              <option value="Salud">Salud</option>
              <option value="Educación">Educación</option>
            </select>

            <label htmlFor="descripcion">Descripción de la oferta *</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
              style={{ resize: 'none', height: '227px' }}
            ></textarea>

            <label htmlFor="experiencia">Experiencia mínima</label>
            <input
              type="range"
              id="experiencia"
              name="experiencia"
              min="0"
              max="50"
              step="1"
              value={formData.experiencia}
              onChange={handleChange}
            />
          </div>

          <div className="formOfertasCenter">
            <label htmlFor="requisitos">Requisitos</label>
            <input
              type="text"
              id="requisitos"
              name="requisitos"
              value={formData.requisitos}
              onChange={handleChange}
              required
            />

            <label htmlFor="extras">Extras</label>
            <input
              type="text"
              id="extras"
              name="extras"
              value={formData.extras}
              onChange={handleChange}
              required
            />

            <label htmlFor="fechaLimite">Fecha Límite para Postularse</label>
            <input
              type="date"
              id="fechaLimite"
              name="fechaLimite"
              value={formData.fechaLimite}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formOfertesRight">
            <div className="botonesOfertas">
              <button type="submit">CREAR OFERTA</button>
              <button type="button" onClick={() => alert('Cancelar acción')}>
                CANCELAR
              </button>
            </div>
            <div className="botoneBorrador">
              <button type="button" className="botonBorrador">
                BORRADORES
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormOfertas;
