import React, { useState } from "react";

export default function AñadirCorreo() {
  const [correo, setCorreo] = useState("");

  const handleCrearCorreo = (e) => {
    e.preventDefault();
    if (correo.trim() === "") return;


    setCorreo("");
  };

  return (
    <form onSubmit={handleCrearCorreo} className="FormularioAñadirUsuario">
      <h2 className="TituloAñadirUsuario">Añadir Correo Electrónico</h2>
      <input
        type="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        placeholder="ejemplo@correo.com"
        className="InputAñadirUsuario"
        required
      />
      <button
        type="submit"
        className="BotonAñadirUsuario"
      >
        Crear
      </button>
    </form>
  );
}
