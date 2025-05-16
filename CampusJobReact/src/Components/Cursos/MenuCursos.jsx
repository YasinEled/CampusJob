import { useNavigate } from "react-router-dom";
import fotoProfesor from "../../assets/Logo/CampusJob.png";
import "../ComponentsCSS/MenuCursos/MenuCursos.css";

export default function CrearUsuarios() {
  const nombreCurso = "DAM";
  const cursoNombreAdmin = "Eric";
  const imagenCurso = fotoProfesor;

  const navigate = useNavigate();

  const handleAñadirCurso = () => {
    navigate("/mainhome/AñadirCurso");
  };

  const handleVerInformacion = () => {
    navigate("/GestionarCursos");
  };

  return (
    <div className="MenuAdminContenedor">
      <div className="CursoCard" onClick={handleVerInformacion}>
        <h3 className="CursoNombre">{nombreCurso}</h3>
        <p className="CursoAdmin">Administrador: {cursoNombreAdmin}</p>
        <img src={imagenCurso} alt="Imagen del curso" className="CursoImagen" />
      </div>

      <button className="BotonAñadirCurso" onClick={handleAñadirCurso}>
        Añadir Curso
      </button>
    </div>
  );
}
