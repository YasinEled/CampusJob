import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AñadirCentro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    emailUsrAdmin: '',
    nomUsrAdmin: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/adminCentro/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Centro y usuario creados correctamente");
        setFormData({
          nombre: '',
          correo: '',
          telefono: '',
          emailUsrAdmin: '',
          nomUsrAdmin: ''
        });
        setTimeout(() => {
          navigate("/AdminSupremo/homeAdmin");
        }, 1500);
      } else {
        setMessage(data.message || "Error al crear el centro");
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage("Hubo un problema al conectar con el servidor");
    }
  };

  return (
    <div className="page-wrapper body-style">
      <main className="main-wrapper">
        <h1>Añadir Centro</h1>
        <h2>Información del Centro</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre">Nombre del Centro:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="correo">Correo Electrónico:</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="telefono">Teléfono:</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </div>

          <h2>Información del Usuario Admin</h2>

          <div>
            <label htmlFor="emailUsrAdmin">Email del Admin:</label>
            <input
              type="email"
              id="emailUsrAdmin"
              name="emailUsrAdmin"
              value={formData.emailUsrAdmin}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="nomUsrAdmin">Nombre de Usuario del Admin:</label>
            <input
              type="text"
              id="nomUsrAdmin"
              name="nomUsrAdmin"
              value={formData.nomUsrAdmin}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-login">
            Crear Centro
          </button>

          {message && <p>{message}</p>}
        </form>
      </main>
    </div>
  );
};

export default AñadirCentro;