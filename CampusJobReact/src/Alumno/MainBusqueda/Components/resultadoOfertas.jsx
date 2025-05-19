import React, { useEffect, useState } from 'react';
import '../Style/resultadoOfertas.css';
import campusJobFavicon from '../../../assets/Logo/CampusJob.png';

function ResultadoOfertas() {
  const [ofertas, setOfertas] = useState([]);

  // Cargar ofertas al montar el componente
  useEffect(() => {
    fetch('http://10.0.11.133:4000/api/auth/ofertas')
      .then((res) => res.json())
      .then((data) => setOfertas(data))
      .catch((err) => console.error('Error al cargar las ofertas:', err));
  }, []);

  return (
    <div className="ListaOfertasContainer">
      {/* Si no hay ofertas, mostramos un mensaje */}
      {ofertas.length === 0 ? (
        <p>Cargando ofertas o no hay ofertas disponibles.</p>
      ) : (
        ofertas.map((oferta) => (
          <div key={oferta.id} className="OfertasContainer">
            <img
              className="ImagenOfertaEmpresa"
              src={campusJobFavicon}
              alt="CampusJob Logo"
            />
            <div className="OfertaTextContainer">
              <h3 className="TituloOfertaEmpresa">{oferta.titulo}</h3>
              <h5 className="NomOfertaEmpresa">{oferta.empresa}</h5>
              <div className="OfertaInfoPrincipalContainer">
                <p className="OfertaUbicacion">{oferta.ubicacion}</p>
                <p> | </p>
                <p className="OfertaTipoModalidad">{oferta.jornada}</p>
                <p> | </p>
                <p className="OfertaFecha">{oferta.fecha}</p>
              </div>
              <p className="OfertaDescripcion">{oferta.descripcion}</p>
              <div className="OfertaInfoContainer">
                <p className="OfertaTipoContrato">{oferta.tipoContrato}</p>
                <p> | </p>
                <p className="OfertaTipoJornada">{oferta.tipoJornada}</p>
                <p> | </p>
                <p className="OfertaSalario">{oferta.salario}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ResultadoOfertas;