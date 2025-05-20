import { div } from "framer-motion/client";
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
   <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
    <form style={{ display: "flex", flexDirection: "column", width: "15em" ,marginTop: "10em", border: "1px solid black", padding: "1em", borderRadius: "10px" }}>
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
   </div>
    
  );
};

export default CreaCurso;