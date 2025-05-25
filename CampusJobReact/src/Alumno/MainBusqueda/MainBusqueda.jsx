import React, { useEffect, useState } from "react";
import './Style/MainBusqueda.css';
import Busqueda from './Components/busqueda';
import FilterMenu from './Components/filtro';
import ResultadoOfertas from './Components/resultadoOfertas';
import { useParams } from "react-router-dom";

function MainBusqueda() {
  const { cursoId } = useParams();
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    const fetchOfertas = async () => {
      if (!cursoId) {
        console.error("cursoId no definido");
        return;
      }
      try {
        const response = await fetch(`http://localhost:4000/api/centro/curso/${cursoId}/ofertas`);
        const data = await response.json();
        if (response.ok && data.success) {
          setOfertas(data.data);
        } else {
          console.error("Error al cargar ofertas:", data.message || "Respuesta incorrecta del servidor");
        }
      } catch (err) {
        console.error("Error al conectar con el servidor:", err);
      }
    };
    fetchOfertas();
  }, [cursoId]);

  return (
    <section className="container-mainBusqueda">
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
