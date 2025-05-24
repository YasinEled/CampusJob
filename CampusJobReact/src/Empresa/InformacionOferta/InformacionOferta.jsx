import React, { useEffect, useState } from "react";
import "./InformacionOferta.css";
import logoEmpresa from "../../assets/Logo/CampusJob.png";
import fondoEmpresa from "../../assets/Logo/CampusJob.png";
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
import { useParams } from "react-router-dom";

function InformacionOferta() {
  const { t } = useTranslation();
  const { idOferta } = useParams(); // ✅ Obtener ID de la oferta desde la URL
  const [oferta, setOferta] = useState(null);
  const [requisitos, setRequisitos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const nivelUsuario = localStorage.getItem("nivelUsuario");
  const idUsuario = localStorage.getItem("idUsuario");

  useEffect(() => {
    const fetchOferta = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/centro/curso/${idOferta}/verOferta`
        );
        const data = await response.json();
        if (data.success) {
          setOferta(data.oferta);
          setRequisitos(data.requisitos);
        } else {
          setError(data.message || "No se pudo cargar la oferta");
        }
      } catch (err) {
        setError("Error al conectar con el servidor");
      } finally {
        setIsLoading(false);
      }
    };

    if (idOferta) {
      fetchOferta();
    }
  }, [idOferta]);

  const handleEnviarCV = async () => {
    if (!idUsuario || !idOferta) {
      alert("Datos incompletos");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/centro/curso/${idOferta}/enviarCvOferta`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idUsr: idUsuario })
        }
      );

      const data = await response.json();
      if (data.success) {
        alert("CV enviado correctamente");
      } else {
        alert(data.message || "No se pudo enviar el CV");
      }
    } catch (error) {
      console.error("Error al enviar CV:", error);
      alert("Hubo un problema al conectar con el servidor");
    }
  };

  if (isLoading) {
    return <div>Cargando información...</div>;
  }

  if (!oferta) {
    return <div>{error || "Oferta no encontrada"}</div>;
  }

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
            src={oferta.imgoferte}
            alt={t("informacionOferta.logo_alt")}
          />
        </div>

        <div className="InformacionOferta-Detalle">
          <h2 className="InformacionOferta-Titulo">
            {t("informacionOferta.titulo", { titulo: oferta.titoloferta })}
          </h2>
          <p className="InformacionOferta-Descripcion">
            {t("informacionOferta.descripcion", { descripcion: oferta.descripciooferta })}
          </p>

          <div className="InformacionOferta-Grid">
            <div className="InformacionOferta-Campo">
              <ClockCircleOutlined />{" "}
              {t("informacionOferta.jornada", { jornada: oferta.tipusjornada })}
            </div>
            <div className="InformacionOferta-Campo">
              <HourglassOutlined />{" "}
              {t("informacionOferta.horasSemanales", {
                horas: oferta.horessetmanals || "No disponible"
              })}
            </div>
            <div className="InformacionOferta-Campo">
              <TeamOutlined />{" "}
              {t("informacionOferta.plazas", {
                count: oferta.numplacesvacants || 0
              })}
            </div>
            <div className="InformacionOferta-Campo">
              <GlobalOutlined />{" "}
              {t("informacionOferta.modalidad", {
                modalidad: oferta.presencial ? "Presencial" : "Teletrabajo"
              })}
            </div>
            <div className="InformacionOferta-Campo">
              <EuroCircleOutlined />{" "}
              {t("informacionOferta.salario", {
                salario: oferta.salariesperat || "A discutir"
              })}
            </div>
            <div className="InformacionOferta-Campo">
              <CalendarOutlined />{" "}
              {t("informacionOferta.fechaPublicacion", {
                fecha: new Date(oferta.fechapubli).toLocaleDateString()
              })}
            </div>
            <div className="InformacionOferta-Campo">
              <FileTextOutlined />{" "}
              {t("informacionOferta.fechaFinal", {
                fecha: new Date(oferta.fechafin).toLocaleDateString()
              })}
            </div>
          </div>

          {nivelUsuario === "0" && (
            <button
              className="InformacionOferta-BotonCV"
              onClick={handleEnviarCV}
            >
              {t("informacionOferta.botonEnviarCV")}
            </button>
          )}
        </div>
      </div>

      {/* Bloque de Requisitos */}
      <div className="InformacionOferta-Isleta">
        <h3>{t("informacionOferta.requisitos.titulo")}</h3>
        <ul>
          {requisitos.map((req, index) => (
            <li key={index}>{req.requisito}</li>
          ))}
        </ul>
      </div>

      <div className="InformacionOferta-Isleta">
        <h3>{t("informacionOferta.ubicacion.titulo")}</h3>
        <iframe
          title={t("informacionOferta.ubicacion.mapaTitulo", {
            ciudad: oferta.ubicacion || "Sin ubicación"
          })}
          width="100%"
          height="300"
          frameBorder="0"
          style={{ borderRadius: "10px" }}
          src={`https://www.google.com/maps?q= ${encodeURIComponent(
            oferta.ubicacion || "Granollers"
          )}&output=embed`}
          allowFullScreen
        ></iframe>
        <small>
          <a
            href={`https://www.google.com/maps/place/ ${encodeURIComponent(
              oferta.ubicacion || "Granollers"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("informacionOferta.ubicacion.verMapaCompleto", {
              ciudad: oferta.ubicacion || "Sin ubicación"
            })}
          </a>
        </small>
      </div>
    </main>
  );
}

export default InformacionOferta;