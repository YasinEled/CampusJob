import React from 'react';
import '../Style/resultadoOfertas.css';
import campusJobFavicon from '../../../assets/Logo/CampusJob.png';
import { useNavigate } from "react-router-dom";

function ResultadoOfertas({ ofertas }) {
  const navigate = useNavigate();

  return (
    <div className="ListaOfertasContainer">
      {ofertas.length === 0 ? (
        <p>Cargando ofertas o no hay ofertas disponibles.</p>
      ) : (
        ofertas.map((oferta) => (
          <div 
            key={oferta.idoferta} 
            className="OfertasContainer"
            onClick={() => navigate(`/Empresa/InformacionOferta/${oferta.idoferta}`)}
          >
            <img
              className="ImagenOfertaEmpresa"
              src={campusJobFavicon}
              alt="CampusJob Logo"
            />
            <div className="OfertaTextContainer">
              <h3 className="TituloOfertaEmpresa">{oferta.titoloferta}</h3>
              <h5 className="NomOfertaEmpresa">Empresa</h5> {/* ✅ Reemplazar con nombre real */}
              <div className="OfertaInfoPrincipalContainer">
                <p className="OfertaUbicacion">{oferta.ubicacion}</p>
                <p> | </p>
                <p className="OfertaTipoModalidad">{oferta.tipusjornada}</p>
                <p> | </p>
                <p className="OfertaFecha">{oferta.fechapubli}</p>
              </div>
              <p className="OfertaDescripcion">{oferta.descripciooferta}</p>
              <div className="OfertaInfoContainer">
                <p className="OfertaTipoContrato">{oferta.tipoContrato}</p>
                <p> | </p>
                <p className="OfertaTipoJornada">{oferta.tipoJornada}</p>
                <p> | </p>
                <p className="OfertaSalario">{oferta.salariesperat}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ResultadoOfertas;