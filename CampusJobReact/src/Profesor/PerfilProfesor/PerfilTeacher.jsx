import React, { useState, useEffect } from "react";
import "./Style/perfilTeacher.css";
import fotoProfesor from "../../assets/yasin.jpg";
import fondoProfesor from "../../assets/yasinfondo.jpg";
import { useParams } from "react-router-dom";


function PerfilTeacher() {
    const { idUsrProfe } = useParams();
  
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    ubicacion: "",
    especialidad: "",
    experienciaDesde: "",
    telefono: "",
    email: "",
    descripcion: ""
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/buscausr/perfil/${idUsrProfe}`
        );
        const data = await response.json();

        if (data.success) {
          setUserData(data.data);
          setFormData({
            nombre: data.data.nombre || "",
            ubicacion: data.data.ubicacion || "",
            especialidad: data.data.especialidad || "",
            experienciaDesde: data.data.experienciaDesde || "",
            telefono: data.data.telefono || "",
            email: data.data.email || "",
            descripcion: data.data.descripcion || ""
          });
        }
      } catch (err) {
        console.error("Error al cargar perfil:", err);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/buscausr/perfil/${idUsrProfe}}/editar`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
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

  const esPropietario = idUsrProfe === parseInt(localStorage.getItem("idUsuario"), 10);

  return (
    <main className="PerfilEmpresaContainer">
      <div className="PerfilEmpresaMain">
        <div className="PerfilEmpresaFondo">
          <img src={fondoProfesor} alt="Fondo" />
          <img
            className="PerfilEmpresaLogo"
            src={userData.fotoperfil || fotoProfesor}
            alt="Foto del profesor"
          />
        </div>
        <div className="PerfilEmpresaInfoContainer">
          <div className="PerfilEmpresaInfoPerfil">
          <h1>{userData.nombre} {userData.cognoms}</h1>
            <p>{userData.nomusuari}</p>

            <p>Granollers</p>
            <p><strong>Descripción:</strong> {userData.descripcion || "Sin descripción"}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Última conexión:</strong> {userData.lastSingIn}</p>

            
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
              placeholder="Nombre completo"
            />
            <input
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
              placeholder="Ubicación"
            />
            <input
              name="especialidad"
              value={formData.especialidad}
              onChange={handleChange}
              placeholder="Especialidad"
            />
            <input
              name="experienciaDesde"
              value={formData.experienciaDesde}
              onChange={handleChange}
              placeholder="Experiencia desde (año)"
            />
            <input
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Teléfono"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Descripción"
            />
            <button onClick={handleSave}>Guardar</button>
            <button onClick={() => setIsEditing(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </main>
  );
}

export default PerfilTeacher;