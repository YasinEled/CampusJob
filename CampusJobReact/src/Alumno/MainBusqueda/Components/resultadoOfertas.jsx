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
            key={oferta.id} 
            className="OfertasContainer"
            onClick={() => navigate(`/Empresa/InformacionOferta/${oferta.id}`)}
          >
            <img
              className="ImagenOfertaEmpresa"
              src={oferta.imgoferte || campusJobFavicon}

              alt="Logo Empresa"
            />
            <div className="OfertaTextContainer">
              <h3 className="TituloOfertaEmpresa">{oferta.titulo}</h3>
              <h5 className="NomOfertaEmpresa">{oferta.empresa}</h5>
              <div className="OfertaInfoPrincipalContainer">
                <p className="OfertaUbicacion">{oferta.ubicacion}</p>
                <p> | </p>
                <p className="OfertaTipoModalidad">{oferta.jornada}</p>
                <p> | </p>
                <p className="OfertaFecha">{new Date(oferta.fechaPublicacion).toLocaleDateString()}</p>
              </div>
              <p className="OfertaDescripcion">{oferta.descripcion}</p>
              <div className="OfertaInfoContainer">
                <p className="OfertaTipoContrato">{oferta.presencial === 1 ? "Presencial" : "Remoto"}</p>
                <p> | </p>
                <p className="OfertaTipoJornada">{oferta.horasSemanales ? `${oferta.horasSemanales} h/sem` : "N/D"}</p>
                <p> | </p>
                <p className="OfertaSalario">{oferta.salario ? `${oferta.salario} €` : "Salario no indicado"}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ResultadoOfertas;
