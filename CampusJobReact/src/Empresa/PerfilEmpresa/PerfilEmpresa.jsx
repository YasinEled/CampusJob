import React, { useState, useEffect } from "react";
import "./Style/perfilEmpresa.css";
import logoEmpresa from "../../assets/yasin.jpg";
import fondoEmpresa from "../../assets/yasinfondo.jpg";
import ListaOfertasPropias from "../ListaOfertaspropias";

import { useParams } from "react-router-dom";

function PerfilEmpresa() {
  const { idUsrEmpresa } = useParams();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    empresaNombre: "",
    descripcion: "",
    fotoPerfil: ""
  });

  const userId = localStorage.getItem("idUsuario");
  const esPropietario = idUsrEmpresa ? idUsrEmpresa === userId : true;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const idToFetch = idUsrEmpresa;
        const response = await fetch(
          `http://localhost:4000/api/buscausr/perfil/${idToFetch}`
        );
        const data = await response.json();

        if (data.success) {
          const user = data.data;

          // ✅ Usar los campos correctos desde el backend
          setUserData({
            ...user,
            empresaNombre: user.nom_empresausr || "",
            descripcion: user.descripcion || user.descripcio || ""
          });

          setFormData({
            empresaNombre: user.nom_empresausr || "",
            descripcion: user.descripcion || user.descripcio || "",
            fotoPerfil: user.fotoperfil || ""
          });
        }
      } catch (err) {
        console.error("Error al cargar perfil:", err);
      }
    };

    fetchUserData();
  }, [idUsrEmpresa, userId]);

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
      const updateData = {};

      // ✅ Solo incluir campos definidos
      if (formData.empresaNombre) {
        updateData.empresaNombre = formData.empresaNombre;
      }

      if (formData.descripcion) {
        updateData.descripcion = formData.descripcion;
      }

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
            nivel: "1" // Fijo para empresas
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
          <img src={fondoEmpresa} alt="Fondo" />
          <img
            className="PerfilEmpresaLogo"
            src={userData.fotoperfil || logoEmpresa}
            alt="Logo de la empresa"
          />
        </div>
        <div className="PerfilEmpresaInfoContainer">
          <div className="PerfilEmpresaInfoPerfil">
            <h1>{userData.empresaNombre}</h1> {/* ✅ Mostrar nombre correcto */}
            <p><strong>Nombre de usuario:</strong> {userData.nomusuari}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Última conexión:</strong> {userData.lastSingIn}</p>
            <p><strong>Descripción:</strong> {userData.descripcio || "Sin descripción"}</p>
            
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
              name="empresaNombre"
              value={formData.empresaNombre}
              onChange={handleChange}
              placeholder="Nombre de la empresa"
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
            {esPropietario && (
              <ListaOfertasPropias />
            )}

    </main>
  );
}

export default PerfilEmpresa;