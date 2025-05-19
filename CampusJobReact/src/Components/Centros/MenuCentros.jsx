import { useNavigate } from "react-router-dom";
import fotoProfesor from "../../assets/Logo/CampusJob.png";
import "../ComponentsCSS/MenuCentros/MenuCentros.css";

export default function CrearUsuarios() {
  const nombreCentro = "DAM";
  const centroNombreAdmin = "Eric";
  const imagenCentro = fotoProfesor;

  const navigate = useNavigate();

  const handleAñadirCurso = () => {
    navigate("/AdminSupremo/añadirCentro");
  };

  const handleVerInformacion = () => {
    navigate("/Admin/HomeCursos");
  };

  return (
    <div className="MenuAdminContenedor">
      <div className="CentroCard" onClick={handleVerInformacion}>
        <h3 className="CentroNombre">{nombreCentro}</h3>
        <p className="CentroAdmin">Administrador: {centroNombreAdmin}</p>
        <img src={imagenCentro} alt="Imagen del centro" className="CentroImagen" />
      </div>

      <button className="BotonAñadirCentro" onClick={handleAñadirCurso}>
        Añadir Centro
      </button>
    </div>
  );
}
