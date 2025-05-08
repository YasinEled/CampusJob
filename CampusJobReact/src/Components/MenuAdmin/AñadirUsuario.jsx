import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AñadirCorreo() {
  const [correo, setCorreo] = useState("");
  const navigate = useNavigate(); // Hook para navegar

  const handleCrearCorreo = (e) => {
    e.preventDefault();
    if (correo.trim() === "") return;

    // Aquí iría la lógica de envío

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

      <div className="flex space-x-4 mt-4">
        <button type="submit" className="BotonAñadirUsuario">
          Crear
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)} // Vuelve a la página anterior
          className="BotonVolverAtras"
        >
          Volver
        </button>
      </div>
    </form>
  );
}
