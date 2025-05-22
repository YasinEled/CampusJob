import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Style/MenuCursos.css";

export default function MenuCursos() {
  const { centroId } = useParams(); // ✅ Recibe el centroId desde la URL
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState("");

  const nivelUsuario = localStorage.getItem("nivelUsuario");

  useEffect(() => {
    const fetchCursos = async () => {
      if (!centroId) {
        setError("ID del centro no encontrado");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:4000/api/centro/${centroId}/cursos`
        );
        const data = await response.json();

        if (data.success) {
          setCursos(data.data);
        } else {
          setError(data.message || "No se pudieron cargar los cursos");
        }
      } catch (err) {
        setError("Error al conectar con el servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, [centroId]);

  const handleVerInformacion = (cursoId) => {
    navigate(`/centro/${centroId}/curso/${cursoId}/BuscarOfertas`);
  };

  const handleAñadirCurso = () => {
    navigate(`/AdminCentro/centro/${centroId}/añadirCurso`);
  };
  const handleAñadirUsuario = () => {
    navigate(`/Profesor/centro/${centroId}/CrearUsuarios`);
  };

  const handleModificarCursoClick = (e, curso) => {
    e.stopPropagation();
    setNuevoNombre(curso.nomcurs);
    setIsModalOpen(true);
  };

  const handleCerrarModal = () => setIsModalOpen(false);
  const handleGuardarNombre = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="MenuAdminContenedor">
      <div className="MenuAdminContainer">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Cursos del Centro ID: {centroId}</h2>

          {loading && <p>Cargando cursos...</p>}
          {error && <p className="error-message">{error}</p>}
        </div>
        <div className="MenuAdminContenido">
          {cursos.length > 0 ? (
            <div className="CentroList">
              {cursos.map((curso) => (
                <div
                  key={curso.idcurso}
                  className="CursoCard"
                  onClick={() => handleVerInformacion(curso.idcurso)}
                >
                  <div className="CentroInfo">
                    <button
                      className="BotonTresPuntos"
                      onClick={(e) => handleModificarCursoClick(e, curso)}
                      aria-label="Ver información"
                    >
                      &#8942;
                    </button>
                    <h3 className="CursoNombre">{curso.nomcurs}</h3>
                    <p className="CursoAdmin">Administrador: Eric</p>
                  </div>

                  {/* ✅ Muestra la foto del curso si existe */}
                  {curso.fotoCurso ? (
                    <img
                      src={curso.fotoCurso}
                      alt="Imagen del curso"
                      className="CentroImagen"
                    />
                  ) : (
                    <div className="CentroImagenPlaceholder">Sin logo</div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No hay cursos disponibles</p>
          )}

          <button className="BotonAñadirCentro" onClick={handleAñadirCurso}>
            
            Añadir Curso
          </button>
        </div>
        <button className="BotonAñadirCentro" onClick={handleAñadirUsuario}>Añadir usuario</button>

      </div>

      {isModalOpen && (
        <div className="ModalOverlay" onClick={handleCerrarModal}>
          <div className="ModalContent" onClick={(e) => e.stopPropagation()}>
            <h2>Modificar nombre del curso</h2>
            <input
              type="text"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
            />
            <div className="ModalButtons">
              <button onClick={handleGuardarNombre}>Guardar</button>
              <button onClick={handleCerrarModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
