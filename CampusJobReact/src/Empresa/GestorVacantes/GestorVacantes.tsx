import React, { useState } from "react";
import "./style/gestorOferta.css";
import SelectorOferta from "./Components/SelectorOferta";

function GestorOferta() {
  // Estado de la sección activa
  const [seccionActiva, setSeccionActiva] = useState(1);

  // Estado del candidato, incluyendo su estado de solicitud
  const [candidato, setCandidato] = useState({
    fotoPerfil: "https://randomuser.me/api/portraits/men/32.jpg",
    nombre: "Carlos",
    apellido: "García López",
    escuela: "IES Innovación Digital",
    telefono: "+34 612 345 678",
    email: "carlos.garcia@example.com",
    direccion: "Calle Mayor 45, 2ºA, 28013 Madrid",
    estado: "solicitado", // "solicitado", "rechazado", "aprobado"
  });

  // Funciones para cambiar el estado del candidato
  const aceptarCandidato = () => {
    setCandidato((prev) => ({ ...prev, estado: "aprobado" }));
  };

  const rechazarCandidato = () => {
    setCandidato((prev) => ({ ...prev, estado: "rechazado" }));
  };

  // Función para descargar CV (puedes personalizarla)
  const descargarCV = () => {
    alert("Descargando CV...");
    // Aquí puedes poner la lógica real de descarga
  };

  // Mostrar el candidato solo en la sección correspondiente
  const mostrarCandidato =
    (seccionActiva === 1 && candidato.estado === "solicitado") ||
    (seccionActiva === 2 && candidato.estado === "rechazado") ||
    (seccionActiva === 3 && candidato.estado === "aprobado");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        
        height: "100%",
      }}
    >
      <div className="containerGestioOferta">
        {/* Botones en fila */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
            height: "100%",
            fontSize: "1.2em",
          }}
        >
          <button
            className={
              seccionActiva === 1
                ? "activaSelectorGestorOferta"
                : "buttonSelectorGestorOferta"
            }
            onClick={() => setSeccionActiva(1)}
          >
            Solicitados
          </button>
          <button
            className={
              seccionActiva === 2
                ? "activaSelectorGestorOferta"
                : "buttonSelectorGestorOferta"
            }
            onClick={() => setSeccionActiva(2)}
          >
            Rechazados
          </button>
          <button
            className={
              seccionActiva === 3
                ? "activaSelectorGestorOferta"
                : "buttonSelectorGestorOferta"
            }
            onClick={() => setSeccionActiva(3)}
          >
            Aprobados
          </button>
        </div>

        {/* Sección condicional */}
        <div
          style={{
            padding: "1em",
            borderTopRightRadius: "0px",
            borderTopLeftRadius: "0px",
            borderBottomRightRadius: "1em",
            borderBottomLeftRadius: "1em",
            backgroundColor: "#16a085",
            height: "43em",
            overflowY: "auto",
          }}
        >
          {mostrarCandidato && (
            <SelectorOferta
              candidato={candidato}
              estado={candidato.estado}
              onAceptar={aceptarCandidato}
              onRechazar={rechazarCandidato}
              onDescargarCV={descargarCV}
            />
          )}
          {mostrarCandidato && (
            <SelectorOferta
              candidato={candidato}
              estado={candidato.estado}
              onAceptar={aceptarCandidato}
              onRechazar={rechazarCandidato}
              onDescargarCV={descargarCV}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default GestorOferta;
