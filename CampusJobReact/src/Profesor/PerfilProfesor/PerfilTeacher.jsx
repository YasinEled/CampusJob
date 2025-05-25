import React, { useState, useEffect } from "react";
import "./Style/perfilTeacher.css"; // ✅ Usar mismo estilo que Empresa
import fotoProfesor from "../../assets/yasin.jpg";
import fondoProfesor from "../../assets/yasinfondo.jpg";
import { useParams } from "react-router-dom";

function PerfilTeacher() {
  const { idUsrProfe } = useParams();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    descripcion: "",
    fotoPerfil: ""
  });

  const userId = localStorage.getItem("idUsuario");
  const esPropietario = idUsrProfe ? idUsrProfe === userId : true;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const idToFetch = idUsrProfe || userId;
        const response = await fetch(
          `http://localhost:4000/api/buscausr/perfil/${idToFetch}`
        );
        const data = await response.json();

        if (data.success) {
          setUserData(data.data);
          setFormData({
            nombre: data.data.nombre || "",
            apellido: data.data.cognoms || "", // ✅ Cargar apellido desde `cognoms`
            descripcion: data.data.descripcion || "",
            fotoPerfil: data.data.fotoperfil || ""
          });
        }
      } catch (err) {
        console.error("Error al cargar perfil:", err);
      }
    };

    fetchUserData();
  }, [idUsrProfe, userId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({ ...prev, fotoPerfil: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const updateData = {
        nombre: formData.nombre,
        apellido: formData.apellido, // ✅ Enviar apellido
        descripcion: formData.descripcion
      };

      // ✅ Solo incluir foto si hay una nueva
      if (formData.fotoPerfil && !formData.fotoPerfil.startsWith("data:image")) {
        updateData.fotoPerfil = formData.fotoPerfil;
      }

      const response = await fetch(
        `http://localhost:4000/api/buscausr/perfil/${userId}/editar`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...updateData,
            nivel: "2" // Fijo para profesores
          })
        }
      );

      const result = await response.json();
      if (result.success) {
        alert("Perfil actualizado exitosamente");
        setUserData({ ...userData, ...formData });
        setIsEditing(false);
      } else {
        alert("Error al actualizar el perfil");
      }
    } catch (error) {
      console.error("Error al guardar cambios:", error);
      alert("Hubo un problema al conectar con el servidor");
    }
  };

  if (!userData) {
    return <div>Cargando...</div>;
  }

  return (
    <main className="PerfilEmpresaContainer">
      <div className="PerfilEmpresaMain">
        <div className="PerfilEmpresaFondo">
          <img src={fondoProfesor} alt="Fondo Profesor" />
          <img
            className="PerfilEmpresaLogo"
            src={userData.fotoperfil || fotoProfesor}
            alt="Foto del profesor"
          />
        </div>
        <div className="PerfilEmpresaInfoContainer">
          <div className="PerfilEmpresaInfoPerfil">
            <h1>{userData.nombre} {userData.cognoms}</h1>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Última conexión:</strong> {userData.lastSingIn}</p>
            <p><strong>Descripción:</strong> {userData.descripcion || "Sin descripción"}</p>
            
            {/* ✅ Mostrar botón solo si es el propietario */}
            {esPropietario && (
              <button
                className="PerfilEmpresaBtnEditarPerfil"
                onClick={() => setIsEditing(true)}
              >
                Modificar perfil
              </button>
            )}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="PerfilEmpresaPopupOverlay">
          <div className="PerfilEmpresaPopupContenido">
            <h3>Editar Perfil del Profesor</h3>
            <input
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre"
            />
            <input
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              placeholder="Apellido"
            />
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Descripción"
            />
            <label className="perfilAlumnopopup-btnSubirImagen">
              Subir foto de perfil
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </label>
            <button onClick={handleSave}>Guardar</button>
            <button onClick={() => setIsEditing(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </main>
  );
}

export default PerfilTeacher;