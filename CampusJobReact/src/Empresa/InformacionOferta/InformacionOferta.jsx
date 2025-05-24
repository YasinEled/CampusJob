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
import { div } from "framer-motion/client";

function InformacionOferta() {
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
  const estado = "aceptado";

  return (
    <main className="InformacionOferta-Container">
      <div className="InformacionOferta-Empresa">
        <div className="InformacionOferta-Fondo">
          <img
            src={fondoEmpresa}
            alt="Fondo Empresa"
            className="InformacionOferta-FondoImagen"
          />
          <img
            className="InformacionOferta-Logo"
            src={logoEmpresa}
            alt="Logo Empresa"
          />
        </div>

        <div className="InformacionOferta-Detalle">
          <h2 className="InformacionOferta-Titulo">{titulo}</h2>
          <p className="InformacionOferta-Descripcion">{descripcion}</p>

          <div className="InformacionOferta-Grid">
            <div className="InformacionOferta-Campo">
              <ClockCircleOutlined /> {jornada}
            </div>
            <div className="InformacionOferta-Campo">
              <HourglassOutlined /> {horasSemanales}
            </div>
            <div className="InformacionOferta-Campo">
              <TeamOutlined /> {plazas} plazas vacantes
            </div>
            <div className="InformacionOferta-Campo">
              <GlobalOutlined /> {modalidad}
            </div>
            <div className="InformacionOferta-Campo">
              <EuroCircleOutlined /> {salario}
            </div>
            <div className="InformacionOferta-Campo">
              <CalendarOutlined /> Publicación: {fechaPublicacion}
            </div>
            <div className="InformacionOferta-Campo">
              <FileTextOutlined /> Finaliza: {fechaFinal}
            </div>
          </div>

          {estado === "aceptado" ? (
            <span className="InformacionOferta-BotonCV">
              <CheckCircleOutlined style={{ pointerEvents: "none", fontSize: "40px" }} />
              {estado}
            </span>
          ) : estado === "rechazado" ? (
            <span className="InformacionOferta-BotonCV">
              <CloseCircleOutlined style={{ pointerEvents: "none", fontSize: "40px" }} />
              {estado}
            </span>
          ) : estado === "en espera" ? (
            <span className="InformacionOferta-BotonCV">
              <HourglassOutlined style={{ pointerEvents: "none", fontSize: "40px" }} />
              {estado}
            </span>
          ) : (
            <button className="InformacionOferta-BotonCV">Enviar CV</button>
          )}
        </div>
      </div>

      {/* Bloque de Requisitos */}
      <div className="InformacionOferta-Isleta">
        <h3>Requisitos</h3>
        <ul>
          <li>Experiencia previa en desarrollo frontend con React.</li>
          <li>Conocimiento de HTML, CSS y JavaScript.</li>
          <li>Capacidad de trabajo en equipo.</li>
          <li>Buena comunicación y actitud proactiva.</li>
        </ul>
      </div>

      <div className="InformacionOferta-Isleta">
        <h3>Ubicación de la empresa</h3>
        <iframe
          title={`Mapa de ${ciudad}`}
          width="100%"
          height="300"
          frameBorder="0"
          style={{ borderRadius: "10px" }}
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            ciudad
          )}&output=embed`}
          allowFullScreen
        ></iframe>
        <small>
          <a
            href={`https://www.google.com/maps/place/${encodeURIComponent(
              ciudad
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver mapa completo de {ciudad}
          </a>
        </small>
      </div>
    </main>
  );
}

export default InformacionOferta;
