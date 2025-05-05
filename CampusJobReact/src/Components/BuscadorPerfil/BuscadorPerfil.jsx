import React, { useState } from 'react';
import '../../Components/ComponentsCSS/BuscadorPerfil/buscadorPerfil.css';

const BuscadorPerfil = () => {
  const [filtro, setFiltro] = useState('usuario');
  const [busqueda, setBusqueda] = useState('');
  const [resultado, setResultado] = useState('');

  const handleBuscar = () => {
    if (busqueda.trim() === '') {
      setResultado('Por favor, ingresa un término de búsqueda.');
    } else {
      setResultado(`Buscando '${busqueda}' en ${filtro === 'usuario' ? 'Usuarios' : 'Empresas'}...`);
    }
  };

  return (
    <div className="buscador-container">
      <h2>Buscar Usuario o Empresa</h2>

      <label htmlFor="filtro">Selecciona el filtro:</label>
      <select
        id="filtro"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="select-filtro"
      >
        <option value="usuario">Usuario</option>
        <option value="empresa">Empresa</option>
      </select>

      <label htmlFor="busqueda">Introduce tu búsqueda:</label>
      <input
        type="text"
        id="busqueda"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Escribe aquí..."
        className="input-busqueda"
      />

      <button onClick={handleBuscar} className="boton-buscar">
        Buscar
      </button>

      <p id="resultado" className="resultado">{resultado}</p>
    </div>
  );
};

export default BuscadorPerfil;
