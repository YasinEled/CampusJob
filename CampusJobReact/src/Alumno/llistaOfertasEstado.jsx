import React, { useEffect, useState } from "react";
import campusJobFavicon from "../assets/Logo/CampusJob.png";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./llistasolitiaciones.css";

function ListaOfertasSolicitadas() {
  const { t } = useTranslation();
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    const datosDePrueba = [
      {
        id: 1,
        titulo: "Desarrollador Frontend",
        empresa: "Tech Solutions",
        ubicacion: "Madrid, España",
        jornada: "Remoto",
        fecha: "2025-05-20",
        descripcion: "Buscamos desarrollador frontend con experiencia en React.",
        tipoContrato: "Indefinido",
        tipoJornada: "Jornada completa",
        salario: "30.000 - 40.000 €/año",
      },
      {
        id: 2,
        titulo: "Diseñador UX/UI",
        empresa: "Creative Minds",
        ubicacion: "Barcelona, España",
        jornada: "Presencial",
        fecha: "2025-05-18",
        descripcion: "Diseñador con experiencia en Figma y Adobe XD.",
        tipoContrato: "Temporal",
        tipoJornada: "Media jornada",
        salario: "20.000 - 25.000 €/año",
      },
    ];

    setOfertas(datosDePrueba);
  }, []);

  return (
    <div className="containerBusquedaOfertasPropias">
      <div className="buscador-containerOfertasPropias">
        <h2>{t("ofertaPropia.buscarSolicitudes")}</h2>

        <label htmlFor="busqueda">{t("ofertaPropia.introduceBusqueda")}</label>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            type="text"
            id="busqueda"
            placeholder={t("ofertaPropia.placeholderBusqueda")}
            className="input-busquedaOfertaPropias"
          />

          <button className="boton-buscarOfertaPropias">{t("ofertaPropia.buscar")}</button>
        </div>

        <p id="resultado" className="resultadoOfertaPropias"></p>
      </div>
      <div>
        {ofertas.length === 0 ? (
          <p>{t("ofertaPropia.cargandoOFertas")}</p>
        ) : (
          ofertas.map((oferta) => (
            <div
              key={oferta.id}
              className="ofertaPropia-Container"
              onClick={() => {
                window.location.href = "/Empresa/InformacionOferta/3";
              }}
            >
              <img
                className="ofertaPropia-ImagenEmpresa"
                src={campusJobFavicon}
                alt={t("ofertaPropia.logoCampusJob")}
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
                <p
                  className="ofertaPropia-Descripcion"
                  style={{ maxWidth: "300px" }}
                >
                  {oferta.descripcion.length > 250
                    ? `${oferta.descripcion.substring(0, 250)}...`
                    : oferta.descripcion}
                </p>
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
    </div>
  );
}

export default ListaOfertasSolicitadas;
