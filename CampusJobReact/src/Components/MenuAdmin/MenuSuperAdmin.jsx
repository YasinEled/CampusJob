import { useNavigate } from "react-router-dom";
import fotoProfesor from "../../assets/Logo/CampusJob.png" // Asegúrate de importar correctamente la imagen
import "../ComponentsCSS/MenuAdmin/MenuAdmin.css";

export default function CrearUsuarios() {
  const nombreCurso = "DAM";
  const cursoNombreAdmin = "Eric";
  const imagenCurso = fotoProfesor;

  const navigate = useNavigate();
  const handleAñadirCurso = () => {
    navigate("/añadircentro");
  };

  return (
    <div className="MenuAdminContenedor">
      <div className="CursoCard">
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
