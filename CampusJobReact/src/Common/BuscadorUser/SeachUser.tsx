import React, { useState, useEffect } from "react";
import BuscadorPerfil from "./Components/buscadorPerfil/BuscadorPerfil";
import CardSearch from "./Components/componentCard/CardSeach";
import "./Style/CardSearch.css";

// ✅ Añadir `empresaNombre` al tipo de usuario
interface Usuario {
  id: number;
  username: string;
  nombre: string;
  apellido: string;
  empresaNombre: string;
  nivel: number;
  fotoPerfil?: string;
}

const SeachUser = () => {
  const [results, setResults] = useState<Usuario[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query = "") => {
    const centroId = localStorage.getItem("idCentro");
    if (!centroId) {
      setError("Falta el ID del centro");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:4000/api/buscausr/buscar-usuarios?q=${encodeURIComponent(query)}&centroId=${encodeURIComponent(centroId)}`
      );
      const data = await response.json();

      if (data.success) {
        setResults(data.data);
      } else {
        setError(data.message || "No se pudieron cargar los resultados");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Cargar todos los usuarios al montar el componente
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="searchuser-wrapper">
      <BuscadorPerfil onSearch={handleSearch} />

      {isLoading && <div>Cargando...</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="cardSearch__grid">
        {results.map((user) => (
          <CardSearch key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default SeachUser;