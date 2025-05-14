import React from "react";
import { useState } from "react";


const CreaCurso = () => {

  const [curso, setCurso] = useState({
    nombre: '',
    descripcion: '',
    centro: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCurso({
      ...curso,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form>
      <label>
        Nombre del curso:
        <input type="text" name="nombre" value={curso.nombre} onChange={handleChange} />
      </label>
      <br />
      <label>
        Descripcion del curso:
        <input type="text" name="descripcion" value={curso.descripcion} onChange={handleChange} />
      </label>
      <br />

      <button type="submit">Enviar</button>
    </form>
  );
};

export default CreaCurso;