import "./InformacionOferta.css";
import logoEmpresa from "../../assets/Logo/CampusJob.png";
import fondoEmpresa from "../../assets/Logo/CampusJob.png";
import { useState } from "react";

// Importación de íconos de Ant Design
import {
  ClockCircleOutlined,
  CalendarOutlined,
  TeamOutlined,
  GlobalOutlined,
  EuroCircleOutlined,
  FileTextOutlined,
  HourglassOutlined,
} from "@ant-design/icons";

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

          <button className="InformacionOferta-BotonCV">Enviar CV</button>
        </div>
      </div>
    </main>
  );
}

export default InformacionOferta;
