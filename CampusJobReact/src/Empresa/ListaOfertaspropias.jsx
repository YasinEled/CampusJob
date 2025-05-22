import React, { useEffect, useState } from 'react';
import './PerfilEmpresa/Style/ListaOfertaPropias.css';
import campusJobFavicon from '../../../assets/Logo/CampusJob.png';

function ListaOfertasPropias() {
  const [ofertas, setOfertas] = useState([]);

  // Cargar ofertas al montar el componente
  useEffect(() => {
    fetch('http://10.0.11.133:4000/api/auth/ofertas')
      .then((res) => res.json())
      .then((data) => setOfertas(data))
      .catch((err) => console.error('Error al cargar las ofertas:', err));
  }, []);

  return (
    <div className="ofertaPropia-ListaContainer">
      {/* Si no hay ofertas, mostramos un mensaje */}
      {ofertas.length === 0 ? (
        <p>Cargando ofertas o no hay ofertas disponibles.</p>
      ) : (
        ofertas.map((oferta) => (
          <div key={oferta.id} className="ofertaPropia-Container">
            <img
              className="ofertaPropia-ImagenEmpresa"
              src={campusJobFavicon}
              alt="CampusJob Logo"
            />
            <div className="ofertaPropia-TextContainer">
              <h3 className="ofertaPropia-TituloEmpresa">{oferta.titulo}</h3>
              <h5 className="ofertaPropia-NombreEmpresa">{oferta.empresa}</h5>
              <div className="ofertaPropia-InfoPrincipal">
                <p className="ofertaPropia-Ubicacion">{oferta.ubicacion}</p>
                <p> | </p>
                <p className="ofertaPropia-Modalidad">{oferta.jornada}</p>
                <p> | </p>
                <p className="ofertaPropia-Fecha">{oferta.fecha}</p>
              </div>
              <p className="ofertaPropia-Descripcion">{oferta.descripcion}</p>
              <div className="ofertaPropia-InfoExtra">
                <p className="ofertaPropia-TipoContrato">{oferta.tipoContrato}</p>
                <p> | </p>
                <p className="ofertaPropia-TipoJornada">{oferta.tipoJornada}</p>
                <p> | </p>
                <p className="ofertaPropia-Salario">{oferta.salario}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ListaOfertasPropias;
