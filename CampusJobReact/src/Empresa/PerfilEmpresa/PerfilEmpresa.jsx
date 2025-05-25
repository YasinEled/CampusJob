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
    nombre: "",
    email: "",
    sector: "",
    fundacion: "",
    descripcion: ""
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/buscausr/perfil/${idUsrEmpresa}`
        );
        const data = await response.json();

        if (data.success) {
          setUserData(data.data);
          setFormData({
            nombre: data.data.nom_empresausr || "",
            email: data.data.email || "",
            sector: data.data.sector || "",
            fundacion: data.data.fundacion || "",
            descripcion: data.data.descripcion || ""
          });
        }
      } catch (err) {
        console.error("Error al cargar perfil:", err);
      }
    };

    fetchUserData();
  }, [idUsrEmpresa]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/buscausr/perfil/${idUsrEmpresa}/editar`,
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

  // ✅ Verificar si el usuario es el propietario del perfil
  const esPropietario = userData.id === parseInt(localStorage.getItem("idUsuario"), 10);

  return (
    <main className="PerfilEmpresaContainer">
      <div className="PerfilEmpresaMain">
        <div className="PerfilEmpresaFondo">
          <img src={fondoEmpresa} alt="Fondo" />
          <img
            className="PerfilEmpresaLogo"
            src={userData.fotoperfil}
            alt="Logo de la empresa"
          />
        </div>
        <div className="PerfilEmpresaInfoContainer">
          <div className="PerfilEmpresaInfoPerfil">
            <h1>{userData.nom_empresausr}</h1>
            <h4><strong>Nom Usuari:</strong> {userData.nomusuari}</h4>

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
              placeholder="Nombre de la empresa"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              name="sector"
              value={formData.sector}
              onChange={handleChange}
              placeholder="Sector"
            />
            <input
              name="fundacion"
              value={formData.fundacion}
              onChange={handleChange}
              placeholder="Año de fundación"
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
      <ListaOfertasPropias />
    </main>
  );
}

export default PerfilEmpresa;