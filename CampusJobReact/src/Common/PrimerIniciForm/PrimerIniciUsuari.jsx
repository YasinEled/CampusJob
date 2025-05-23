// PrimerInicioUsuari.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Style/PrimerInicio.css"; // ✅ Asegúrate de importar el mismo CSS

export default function FormularioRegistro() {
  const navigate = useNavigate();
  const idUsuario = localStorage.getItem("idUsuarioAux");
  const nivelUsuario = localStorage.getItem("nivelUsuarioAux");
  if (!idUsuario || !nivelUsuario) {
    navigate("/"); // 👈 Cambia a tu ruta de login real
    return null; // 👈 Salir del componente si no están
  }
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    nombreUsuario: "",
    contrasena: "",
    confirmarContrasena: "",
    fotoPerfil: null,
    descripcion: "",
    nif: ""
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // ✅ Guarda todo el base64 incluyendo el prefijo
        setFormData({ ...formData, fotoPerfil: reader.result });
        setPreviewImage(reader.result);
      };
      reader.onerror = () => {
        setError("Error al leer el archivo");
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.contrasena !== formData.confirmarContrasena) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/usuario/${nivelUsuario}/completar-perfil`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idUsuario,
            nombre: formData.nombre,
            cognoms: formData.apellido, // ✅ Cambia `apellido` a `cognoms`
            nombreUsuario: formData.nombreUsuario,
            contrasena: formData.contrasena,
            confirmarContrasena: formData.confirmarContrasena,
            nif: formData.nif, // ✅ Asegúrate de enviar como `nif`
            descripcion: formData.descripcion,
            fotoPerfil: formData.fotoPerfil
          })
        }
      );

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("idUsuario", idUsuario);
        localStorage.setItem("nivelUsuario", nivelUsuario);
        localStorage.removeItem("idUsuarioAux");
        localStorage.removeItem("nivelUsuarioAux");
        navigate("/Alumno/BusquedaOfertas");
      } else {
        setError(data.message || "Error al completar perfil");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="page-wrapper body-style">
      <main className="main-wrapper">
        <div className="marginHeader">
          <h2 className="CreadorProfessorTitulo">Bienvenido!</h2>
          <h5 className="">Rellena este formulario para continuar!</h5>
        </div>
        <form onSubmit={handleSubmit} className="CreadorProfessorFormulario" autoComplete="off">
          {/* Campos específicos para Alumno */}
          <div className="CreadorProfessorGrupo">
            <label className="CreadorProfessorEtiqueta">
              Nombre:
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="CreadorProfessorEntrada"
                required
              />
            </label>
          </div>

          <div className="CreadorProfessorGrupo">
            <label className="CreadorProfessorEtiqueta">
              Apellido:
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="CreadorProfessorEntrada"
                required
              />
            </label>
          </div>

          <div className="CreadorProfessorGrupo">
            <label className="CreadorProfessorEtiqueta">
              NIF:
              <input
                type="text"
                name="nif"
                value={formData.nif}
                onChange={handleChange}
                className="CreadorProfessorEntrada"
                required
              />
            </label>
          </div>

          <div className="CreadorProfessorGrupo">
            <label className="CreadorProfessorEtiqueta">
              Nombre de Usuario:
              <input
                type="text"
                name="nombreUsuario"
                value={formData.nombreUsuario}
                onChange={handleChange}
                className="CreadorProfessorEntrada"
                required
              />
            </label>
          </div>

          <div className="CreadorProfessorGrupo">
            <label className="CreadorProfessorEtiqueta">
              Contraseña:
              <input
                type="password"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
                className="CreadorProfessorEntrada"
                required
              />
            </label>
          </div>

          <div className="CreadorProfessorGrupo">
            <label className="CreadorProfessorEtiqueta">
              Confirmar Contraseña:
              <input
                type="password"
                name="confirmarContrasena"
                value={formData.confirmarContrasena}
                onChange={handleChange}
                className="CreadorProfessorEntrada"
                required
              />
            </label>
          </div>

          <div className="CreadorProfessorGrupo">
            <label className="CreadorProfessorEtiqueta">
              Foto de Perfil:
              <input
                type="file"
                name="fotoPerfil"
                onChange={handleFileChange}
                className="CreadorProfessorEntradaArchivo"
                accept="image/*"
              />
            </label>
            {previewImage && (
              <div className="CreadorProfessorPreviewContainer">
                <img 
                  src={previewImage} 
                  alt="Vista previa de avatar" 
                  className="CreadorProfessorAvatarPreview" 
                />
              </div>
            )}
          </div>

          <div className="CreadorProfessorGrupo">
            <label className="CreadorProfessorEtiqueta">
              Descripción:
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className="CreadorProfessorAreaTexto"
                rows="4"
              />
            </label>
          </div>

          <button type="submit" className="CreadorProfessorBoton">
            Registrarse
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </main>
    </div>
  );
}