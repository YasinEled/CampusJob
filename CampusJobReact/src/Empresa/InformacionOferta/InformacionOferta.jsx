import "./InformacionOferta.css";
import logoEmpresa from "../../assets/Logo/CampusJob.png";
import fondoEmpresa from "../../assets/Logo/CampusJob.png";
import { useState } from "react";
import {
  ClockCircleOutlined,
  CalendarOutlined,
  TeamOutlined,
  GlobalOutlined,
  EuroCircleOutlined,
  FileTextOutlined,
  HourglassOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from "@ant-design/icons";

import { useTranslation } from "react-i18next";

function InformacionOferta() {
  const { t } = useTranslation();

  const [titulo] = useState("Desarrollador Frontend");
  const [descripcion] = useState(
    "Buscamos un desarrollador frontend con experiencia en React para unirse a nuestro equipo de innovación."
  );
  const [jornada] = useState("Jornada completa");
  const [horasSemanales] = useState("40 horas");
  const [plazas] = useState(3);
  const [modalidad] = useState("Remoto");
  const [salario] = useState("30.000 - 40.000 € anuales");
  const [fechaPublicacion] = useState("20/05/2025");
  const [fechaFinal] = useState("20/06/2025");
  const ciudad = "Madrid";
  const [estado, setCandidato] = useState("");

  return (
    <main className="InformacionOferta-Container">
      <div className="InformacionOferta-Empresa">
        <div className="InformacionOferta-Fondo">
          <img
            src={fondoEmpresa}
            alt={t("informacionOferta.fondo_alt")}
            className="InformacionOferta-FondoImagen"
          />
          <img
            className="InformacionOferta-Logo"
            src={logoEmpresa}
            alt={t("informacionOferta.logo_alt")}
          />
        </div>

        <div className="InformacionOferta-Detalle">
          <h2 className="InformacionOferta-Titulo">{t('informacionOferta.titulo', { titulo })}</h2>
          <p className="InformacionOferta-Descripcion">{t('informacionOferta.descripcion', { descripcion })}</p>

          <div className="InformacionOferta-Grid">
            <div className="InformacionOferta-Campo">
              <ClockCircleOutlined /> {t('informacionOferta.jornada', { jornada })}
            </div>
            <div className="InformacionOferta-Campo">
              <HourglassOutlined /> {t('informacionOferta.horasSemanales', { horas: horasSemanales })}
            </div>
            <div className="InformacionOferta-Campo">
              <TeamOutlined /> {t('informacionOferta.plazas', { count: plazas })}
            </div>
            <div className="InformacionOferta-Campo">
              <GlobalOutlined /> {t('informacionOferta.modalidad', { modalidad })}
            </div>
            <div className="InformacionOferta-Campo">
              <EuroCircleOutlined /> {t('informacionOferta.salario', { salario })}
            </div>
            <div className="InformacionOferta-Campo">
              <CalendarOutlined /> {t('informacionOferta.fechaPublicacion', { fecha: fechaPublicacion })}
            </div>
            <div className="InformacionOferta-Campo">
              <FileTextOutlined /> {t('informacionOferta.fechaFinal', { fecha: fechaFinal })}
            </div>
          </div>

          {estado === "aceptado" && window.localStorage.getItem("nivelUsuario") === "0" ? (
            <span className="InformacionOferta-BotonCV">
              <CheckCircleOutlined style={{ pointerEvents: "none", fontSize: "40px" }} />
              {t('informacionOferta.estado.aceptado')}
            </span>
          ) : estado === "rechazado" && window.localStorage.getItem("nivelUsuario") === "0" ? (
            <span className="InformacionOferta-BotonCV">
              <CloseCircleOutlined style={{ pointerEvents: "none", fontSize: "40px" }} />
              {t('informacionOferta.estado.rechazado')}
            </span>
          ) : estado === "en espera" && window.localStorage.getItem("nivelUsuario") === "0" ? (
            <span className="InformacionOferta-BotonCV">
              <HourglassOutlined style={{ pointerEvents: "none", fontSize: "40px" }} />
              {t('informacionOferta.estado.enEspera')}
            </span>
          ) : window.localStorage.getItem("nivelUsuario") === "0" ? (
            <button
              className="InformacionOferta-BotonCV"
              onClick={() => setCandidato("en espera")}
            >
              {t('informacionOferta.botonEnviarCV')}
            </button>
          ) : (
            ""
          )}
        </div>
      </div>

      {/* Bloque de Requisitos */}
      <div className="InformacionOferta-Isleta">
        <h3>{t('informacionOferta.requisitos.titulo')}</h3>
        <ul>
          <li>{t('informacionOferta.requisitos.experiencia')}</li>
          <li>{t('informacionOferta.requisitos.conocimiento')}</li>
          <li>{t('informacionOferta.requisitos.trabajoEquipo')}</li>
          <li>{t('informacionOferta.requisitos.comunicacion')}</li>
        </ul>
      </div>

      <div className="InformacionOferta-Isleta">
        <h3>{t('informacionOferta.ubicacion.titulo')}</h3>
        <iframe
          title={t('informacionOferta.ubicacion.mapaTitulo', { ciudad })}
          width="100%"
          height="300"
          frameBorder="0"
          style={{ borderRadius: "10px" }}
          src={`https://www.google.com/maps?q=${encodeURIComponent(ciudad)}&output=embed`}
          allowFullScreen
        ></iframe>
        <small>
          <a
            href={`https://www.google.com/maps/place/${encodeURIComponent(ciudad)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('informacionOferta.ubicacion.verMapaCompleto', { ciudad })}
          </a>
        </small>
      </div>
    </main>
  );
}

export default InformacionOferta;
