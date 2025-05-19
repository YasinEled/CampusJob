import React, { useState } from 'react';
import "../../Style/BuscadorPerfil.css";

const BuscadorPerfil = () => {

  return (
    <div className="buscador-container">
      <h2>Buscar Usuario o Empresa</h2>

      <label htmlFor="busqueda">Introduce tu búsqueda:</label>
      <input
        type="text"
        id="busqueda"
        placeholder="Escribe aquí..."
        className="input-busqueda"
      />

      <button className="boton-buscar">
        Buscar
      </button>

      <p id="resultado" className="resultado"></p>
    </div>
  );
};

export default BuscadorPerfil;
