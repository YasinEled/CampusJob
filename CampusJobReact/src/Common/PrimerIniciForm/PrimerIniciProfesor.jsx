import { useState } from "react";
import "./Style/PrimerInicio.css"; 

const FormularioRegistro = () => {
  const [formData, setFormData] = useState({
    email: "",
    dni: "",
    nombreUsuario: "",
    contrasena: "",
    confirmarContrasena: "",
    fotoPerfil: null,
    descripcion: "",
    nombre: "",
    apellido: ""
  });
  
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      setFormData({
        ...formData,
        fotoPerfil: file
      });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
  };

  return (
    <div className="CreadorProfessorContenedor">
      <h2 className="CreadorProfessorTitulo">Bienvenido!</h2>
      <h5 className="">Rellena este formulario para continuar!</h5>
      <form onSubmit={handleSubmit} className="CreadorProfessorFormulario">
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
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="CreadorProfessorEntrada"
              required
            />
          </label>
        </div>

        <div className="CreadorProfessorGrupo">
          <label className="CreadorProfessorEtiqueta">
            DNI:
            <input
              type="text"
              name="dni"
              value={formData.dni}
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
            ></textarea>
          </label>
        </div>

        <button type="submit" className="CreadorProfessorBoton">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default FormularioRegistro;