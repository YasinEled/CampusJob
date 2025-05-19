import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fotoProfesor from "../../assets/Logo/CampusJob.png";
import "../ComponentsCSS/MenuCursos/MenuCursos.css";

export default function CrearUsuarios() {
  const [nombreCurso, setNombreCurso] = useState("DAM");
  const cursoNombreAdmin = "Eric";
  const imagenCurso = fotoProfesor;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(nombreCurso);

  const navigate = useNavigate();

  const handleAñadirCurso = () => {
    navigate("/Admin/AñadirCurso");
  };

  const handleVerInformacion = () => {
    navigate("/Admin/GestionarCursosAlumnos");
  };

  const handleModificarCursoClick = (e) => {
    e.stopPropagation(); 
    setNuevoNombre(nombreCurso);
    setIsModalOpen(true);
  };

  const handleCerrarModal = () => {
    setIsModalOpen(false);
  };

  const handleGuardarNombre = () => {
    setNombreCurso(nuevoNombre);
    setIsModalOpen(false);
    // Aquí podrías también actualizar el nombre en backend o contexto global si tienes
  };

  return (
    <div className="MenuAdminContenedor">
      <div className="CursoCard" onClick={handleVerInformacion} style={{ position: "relative" }}>
        <button
          className="BotonTresPuntos"
          onClick={handleModificarCursoClick}
          aria-label="Modificar curso"
        >
          &#8942;
        </button>
        <h3 className="CursoNombre">{nombreCurso}</h3>
        <p className="CursoAdmin">Administrador: {cursoNombreAdmin}</p>
        <img src={imagenCurso} alt="Imagen del curso" className="CursoImagen" />
      </div>

      <button className="BotonAñadirCurso" onClick={handleAñadirCurso}>
        Añadir Curso
      </button>

      {isModalOpen && (
        <div className="ModalOverlay" onClick={handleCerrarModal}>
          <div className="ModalContent" onClick={e => e.stopPropagation()}>
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
