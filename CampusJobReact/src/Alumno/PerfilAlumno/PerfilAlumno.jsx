import React, { useState, useEffect } from "react";
import "./Style/perfilPropio.css"; // ✅ Usar mismo estilo que PerfilEmpresa
import pfp from "../../assets/yasin.jpg";
import pfpFondo from "../../assets/yasinfondo.jpg";
import ListaOfertasSolicitadas from "../llistaOfertasEstado";
import { useParams } from "react-router-dom";


function PerfilPropio() {
  const { idUsrAlumno } = useParams();

  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    ubicacion: "",
    telefono: "",
    email: "",
    fechaNacimiento: "",
    descripcion: ""
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/buscausr/perfil/${idUsrAlumno}`
        );
        const data = await response.json();

        if (data.success) {
          setUserData(data.data);
          setFormData({
            nombre: data.data.nombre || "",
            ubicacion: data.data.ubicacion || "",
            telefono: data.data.telefono || "",
            email: data.data.email || "",
            fechaNacimiento: data.data.fechaNacimiento || "",
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
        `http://localhost:4000/api/buscausr/perfil/${idUsrAlumno}/editar`,
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

  // ✅ Verificar si es el propietario del perfil
  const esPropietario = idUsrAlumno === parseInt(localStorage.getItem("idUsuario"), 10);


  return (
    <main className="PerfilEmpresaContainer"> {/* ✅ Usar misma clase que PerfilEmpresa */}
      <div className="PerfilEmpresaMain">
        <div className="PerfilEmpresaFondo">
          <img src={pfpFondo} alt="Fondo" />
          <img
            className="PerfilEmpresaLogo"
            src={userData.fotoperfil || pfp}
            alt="Foto de perfil"
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
                Modificar Perfil
              </button>
            )}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="PerfilEmpresaPopupOverlay">
          <div className="PerfilEmpresaPopupContenido">
            <h3>Editar Perfil</h3>
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
            <input
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              placeholder="Fecha de nacimiento"
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

      {/* ✅ Mostrar ListaOfertasSolicitadas solo si es el propio perfil */}
      {esPropietario && <ListaOfertasSolicitadas />}
    </main>
  );
}

export default PerfilPropio;