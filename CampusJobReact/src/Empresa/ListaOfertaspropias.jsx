import React, { useEffect, useState } from "react";
import "./PerfilEmpresa/Style/ListaOfertaPropias.css";
import campusJobFavicon from "../assets/Logo/CampusJob.png";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ListaOfertasPropias() {
  const { idUsrEmpresa } = useParams(); // ✅ ID de la empresa desde la URL
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Estado de carga
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/empresa/${idUsrEmpresa}/ofertas`
        );
        const data = await response.json();

        console.log("Respuesta del backend:", data); // ✅ Debugging

        if (data.success) {
          setOfertas(data.data);
        } else {
          console.error("Error al cargar ofertas:", data.message);
        }
      } catch (err) {
        console.error("Error de conexión:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOfertas();
  }, [idUsrEmpresa]);

  // ✅ Navegar a la gestión de la oferta
  const handleOfertaClick = (idOferta) => {
    navigate(`/Empresa/gestioOferta/${idOferta}`);
  };

  if (loading) {
    return <p>Cargando ofertas...</p>;
  }

  if (!ofertas || ofertas.length === 0) {
    return <p>No hay ofertas disponibles</p>;
  }

  return (
    <div className="containerBusquedaOfertasPropias">
      <h2>Ofertas Propias</h2>
      <div className="ofertas-lista">
        {ofertas.map((oferta) => (
          <div
            key={oferta.idoferta}
            className="ofertaPropia-Container"
            onClick={() => handleOfertaClick(oferta.idoferta)}
          >
            <img
              className="ofertaPropia-ImagenEmpresa"
              src={oferta.imgoferte}
              alt="CampusJob Logo"
            />
            <div className="ofertaPropia-TextContainer">
              <h3 className="ofertaPropia-TituloEmpresa">{oferta.titoloferta}</h3>
              <div className="ofertaPropia-InfoPrincipal">
                <p className="ofertaPropia-Ubicacion">{oferta.fechapubli}</p>
              </div>
              <p className="ofertaPropia-Descripcion">
                {oferta.descripciooferta.length > 250
                  ? `${oferta.descripciooferta.substring(0, 250)}...`
                  : oferta.descripciooferta}
              </p>
              <div className="ofertaPropia-InfoExtra">
                <p className="ofertaPropia-Salario">{oferta.salariesperat}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaOfertasPropias;