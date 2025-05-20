
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CreaCurso = () => {
  const { centroId } = useParams<{ centroId: string }>(); // Recibe el centroId desde la URL
  const navigate = useNavigate();

  const [curso, setCurso] = useState({
    nombre: '',
    descripcion: '',
    foto: null as string | null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurso(prev => ({ ...prev, [name]: value }));
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      alert('Solo se permiten imágenes (JPG, PNG, GIF)');
      return;
    }

    // Convertir a base64
    const reader = new FileReader();
    reader.onload = (event) => {
      setCurso(prev => ({ ...prev, foto: event.target?.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:4000/api/centro/${centroId}/curso`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: curso.nombre,
          descripcion: curso.descripcion,
          foto: curso.foto
        })
      });

      const data = await response.json();

      if (data.success) {
        alert('Curso creado exitosamente');
        navigate(`/centro/${centroId}/elegirCurso`);
      } else {
        alert(data.message || 'Error al crear el curso');
      }
    } catch (err) {
      console.error('Error al enviar:', err);
      alert('Hubo un problema al conectar con el servidor');
    }
  };

  return (

    <div className="crear-curso-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
      <h2>Crear Curso en Centro ID: {centroId}</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "15em" ,marginTop: "10em", border: "1px solid black", padding: "1em", borderRadius: "10px" }}>
        <div>
          <label>
            Nombre del Curso:
            <input
              type="text"
              name="nombre"
              value={curso.nombre}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Descripción:
            <textarea
              name="descripcion"
              value={curso.descripcion}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Logo del Curso:
            <input
              type="file"
              accept="image/*"
              onChange={handleFotoChange}
            />
          </label>
        </div>
        <button type="submit">Crear Curso</button>
      </form>
    </div>
  );
};

export default CreaCurso;