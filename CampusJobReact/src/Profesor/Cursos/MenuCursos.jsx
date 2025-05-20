import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fotoProfesor from "../../assets/Logo/CampusJob.png";
import "./Style/MenuCursos.css";

export default function MenuCursos() {
  const { centroId } = useParams(); // ✅ Recibe el centroId desde la URL
  const navigate = useNavigate();
  const [nombreCurso, setNombreCurso] = useState("DAM");
  const cursoNombreAdmin = "Eric";
  const imagenCurso = fotoProfesor;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(nombreCurso);

  const handleAñadirCurso = () => {
    // ✅ Navega a la ruta con el centroId actual
    navigate(`/AdminCentro/centro/${centroId}/añadirCurso`);
  };

  const handleVerInformacion = () => {
    navigate(`/centro/${centroId}/curso/101/BuscarOfertas`);
  };

  const handleModificarCursoClick = (e) => {
    e.stopPropagation();
    setNuevoNombre(nombreCurso);
    setIsModalOpen(true);
  };

  const handleCerrarModal = () => setIsModalOpen(false);

  const handleGuardarNombre = () => {
    setNombreCurso(nuevoNombre);
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* <NavHome userType="admin" /> */}
      <div className="MenuAdminContenedor">
        <div className="MenuAdminContainer">
          <h1>Cursos Disponibles</h1>
          <div className="MenuAdminContenido">
            <div className="CentroList">
              <div className="CentroCard" onClick={handleVerInformacion}>
                <button
                  className="BotonTresPuntos"
                  onClick={handleModificarCursoClick}
                  aria-label="Modificar curso"
                >
                  &#8942;
                </button>
                <div className="CentroInfo">
                  <h3 className="CursoNombre">{nombreCurso}</h3>
                  <p className="CursoAdmin">
                    Administrador: {cursoNombreAdmin}
                  </p>
                </div>

                <img src={imagenCurso} alt="Imagen del curso" className="" />
              </div>

              <button className="BotonAñadirCentro" onClick={handleAñadirCurso}>
                Añadir Curso
              </button>
            </div>
          </div>

          {isModalOpen && (
            <div className="ModalOverlay" onClick={handleCerrarModal}>
              <div
                className="ModalContent"
                onClick={(e) => e.stopPropagation()}
              >
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
      </div>
    </div>
  );
}
