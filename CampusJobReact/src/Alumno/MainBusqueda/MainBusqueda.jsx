import React, { useEffect, useState } from "react";
import "./Style/MainBusqueda.css";
import Busqueda from "./Components/busqueda";
import FilterMenu from "./Components/filtro";
import ResultadoOfertas from "./Components/resultadoOfertas";
import { useParams, Link } from "react-router-dom";

function MainBusqueda() {
  const { cursoId } = useParams();
  const [ofertas, setOfertas] = useState([]);
  const nivelUsuario = localStorage.getItem("nivelUsuario"); // ✅ Verificar nivel del usuario

  useEffect(() => {
    const fetchOfertas = async () => {
      if (!cursoId) {
        console.error("cursoId no definido");
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:4000/api/centro/curso/${cursoId}/ofertas`
        );
        const data = await response.json();
        if (data.success) {
          setOfertas(data.data);
        } else {
          console.error("Error al cargar ofertas:", data.message);
        }
      } catch (err) {
        console.error("Error al conectar con el servidor:", err);
      }
    };

    fetchOfertas();
  }, [cursoId]);

  return (
    <section className="container-mainBusqueda">
      {/* ✅ Botón "Añadir Oferta" posicionado en la esquina superior derecha */}
      {nivelUsuario === "1" && (
        <Link
          to={`/Empresa/añadirOferta/${cursoId}`}
          className="btn-anadir-oferta"
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            zIndex: "10",
            backgroundColor: "#045e56",
            color: "white",
            textDecoration: "none",
            padding: "0.8em 1.5em",
            borderRadius: "4px",
            fontWeight: "bold",
            fontSize: "1.1em"
          }}
        >
          Añadir Oferta
        </Link>
      )}

      <div className="mainContent">
        <div className="mainBusqueda">
          <Busqueda />
        </div>
        <div className="mainCenter">
          <ResultadoOfertas ofertas={ofertas} />
        </div>
      </div>
      <div className="mainFilter">
        <FilterMenu />
      </div>
    </section>
  );
}

export default MainBusqueda;