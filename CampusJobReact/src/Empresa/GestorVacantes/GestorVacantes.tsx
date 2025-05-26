import React, { useState, useEffect } from "react";
import "./style/gestorOferta.css";
import SelectorOferta from "./Components/SelectorOferta";
import { useParams } from "react-router-dom";

// ✅ Definir tipos para los datos
interface Aplicacion {
  id: number;
  idusr: number;
  email: string;
  nombre: string;
  cognoms: string;
  curriculum: string;
  fotoPerfil: string;
  Estado: number; // 0 = Solicitado, 1 = Aprobado, 2 = Rechazado
}

function GestorOferta() {
  const { idOferta } = useParams(); // ID de la oferta desde la URL
  const [aplicaciones, setAplicaciones] = useState<Aplicacion[]>([]);
  const [seccionActiva, setSeccionActiva] = useState(1); // 1=Solicitados, 2=Aprobados, 3=Rechazados

  // ✅ Cargar aplicaciones al montar el componente
  useEffect(() => {
    if (!idOferta) return;

    const fetchAplicaciones = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/empresa/${idOferta}/aplicaciones`);
        const data = await response.json();
        if (data.success) setAplicaciones(data.data);
      } catch (err) {
        console.error("Error al cargar aplicaciones:", err);
      }
    };

    fetchAplicaciones();
  }, [idOferta]);

  // ✅ Cambiar estado de una aplicación
  const cambiarEstado = async (idUsr: number, nuevoEstado: number) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/empresa/${idOferta}/actualizar-estado/${idUsr}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nuevoEstado })
        }
      );
  
      const result = await response.json();
      if (result.success) {
        setAplicaciones((prev) =>
          prev.map((app) =>
            app.idusr === idUsr ? { ...app, Estado: nuevoEstado } : app
          )
        );
      } else {
        alert("Error al actualizar el estado");
      }
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      alert("Hubo un problema al conectar con el servidor");
    }
  };
  

  // ✅ Filtrar aplicaciones por estado
  const aplicacionesFiltradas = aplicaciones.filter((app) => {
    if (seccionActiva === 1) return app.Estado === 0; // Solicitados
    if (seccionActiva === 2) return app.Estado === 1; // Aprobados
    if (seccionActiva === 3) return app.Estado === 2; // Rechazados
    return true;
  });

  if (!idOferta) {
    return <p>No se ha especificado una oferta</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%"
      }}
    >
      <div className="containerGestioOferta">
        {/* Botones de sección */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
            fontSize: "1.2em"
          }}
        >
          <button
            className={seccionActiva === 1 ? "activaSelectorGestorOferta" : "buttonSelectorGestorOferta"}
            onClick={() => setSeccionActiva(1)}
          >
            Solicitados
          </button>
          <button
            className={seccionActiva === 2 ? "activaSelectorGestorOferta" : "buttonSelectorGestorOferta"}
            onClick={() => setSeccionActiva(2)}
          >
            Aprobados
          </button>
          <button
            className={seccionActiva === 3 ? "activaSelectorGestorOferta" : "buttonSelectorGestorOferta"}
            onClick={() => setSeccionActiva(3)}
          >
            Rechazados
          </button>
        </div>

        {/* Lista de aplicaciones */}
        <div
          className="containerSelectorGestorOferta"
          style={{
            padding: "1em",
            backgroundColor: "#045e56",
            height: "43em",
            overflowY: "auto"
          }}
        >
          {aplicacionesFiltradas.length > 0 ? (
            aplicacionesFiltradas.map((app) => (
              <SelectorOferta
                key={app.id}
                candidato={{
                  fotoPerfil: app.fotoPerfil,
                  nombre: app.nombre,
                  apellido: app.cognoms,
                  email: app.email,
                  curriculum: app.curriculum,
                  ubicacion: "Granollers", // ✅ Ubicación fija
                  telefono: "+34 612 345 678" // ✅ Teléfono fijo
                }}
                estado={app.Estado}
                onAceptar={() => cambiarEstado(app.idusr, 1)} // Estado 1 = Aprobado
                onRechazar={() => cambiarEstado(app.idusr, 2)} // Estado 2 = Rechazado
                onDescargarCV={() => alert("Descargar CV no implementado aún")}
              />
            ))
          ) : (
            <p>No hay aplicaciones en esta sección</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GestorOferta;