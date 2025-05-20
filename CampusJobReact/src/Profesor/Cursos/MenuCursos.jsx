import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function MenuCursos() {
  const navigate = useNavigate();
  const { centroId } = useParams(); // ✅ Recibe el ID del centro desde la URL
  const [cursos, setCursos] = useState([]); // ✅ Estado inicial vacío
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Validamos que el usuario tenga acceso
  const nivelUsuario = localStorage.getItem("nivelUsuario");

  useEffect(() => {
    const fetchCursos = async () => {
      if (!centroId) {
        setError("ID del centro no encontrado");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:4000/api/centro/${centroId}/cursos`);
        const data = await response.json();

        if (data.success) {
          setCursos(data.data); // ✅ Asume que el backend devuelve un array en `data`
        } else {
          throw new Error(data.message || "No se pudieron cargar los cursos");
        }
      } catch (err) {
        setError("Error al conectar con el servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, [centroId]);

  const handleVerInformacion = (id) => {
    if (nivelUsuario === "4" || nivelUsuario === "3") {
      // AdminSupremo o AdminCentro → navegan a gestión de alumnos
      navigate(`/AdminCentro/centro/${centroId}/GestionarCursosAlumnos`);
    } else {
      navigate("/unauthorized");
    }
  };

  return (
    <div className="MenuAdminContenedor">
      <div className="MenuAdminContainer">
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <h1>Cursos Disponibles</h1>
          {loading && <p>Cargando cursos...</p>}
          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="MenuAdminContenido">
          <div className="CursoList">
            {cursos.map((curso) => (
              <div
                key={curso.idcurso}
                className="CursoCard"
                onClick={() => handleVerInformacion(curso.idcurso)}
              >
                <div className="CursoInfo">
                  <h3 className="CursoNombre">{curso.nomcurs}</h3>
                  <p>Descripción: {curso.desccurs || "Sin descripción"}</p>
                </div>
              </div>
            ))}

            <button
              className="BotonAñadirCurso"
              onClick={() => navigate(`/AdminCentro/centro/${centroId}/añadirCurso`)}
            >
              Añadir Curso
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}