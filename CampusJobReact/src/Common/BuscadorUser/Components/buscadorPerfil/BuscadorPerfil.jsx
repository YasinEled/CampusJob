import React, { useState } from "react";
import "../../Style/BuscadorPerfil.css";

const BuscadorPerfil = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const centroId = localStorage.getItem("idCentro");
    if (!centroId) {
      alert("Falta el ID del centro");
      return;
    }

    onSearch(query); // ✅ Enviar vacío para cargar todos los usuarios del centro
  };

  return (
    <div className="buscador-container">
      <h2>Buscar Usuario o Empresa</h2>
      <input
        type="text"
        placeholder="Escribe aquí..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="boton-buscar" onClick={handleSearch}>
        Buscar
      </button>
    </div>
  );
};

export default BuscadorPerfil;