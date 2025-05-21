import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlusOutlined,
  LoadingOutlined,
  UserOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Spin } from "antd";

import "./Style/AñadirCentro.css"; // Asegúrate de tener este archivo CSS

const AñadirCentro = () => {
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    emailUsrAdmin: "",
    nomUsrAdmin: "",
    logoCentro: null,
  });

  const [message, setMessage] = useState("");
  const [errorType, setErrorType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validar tamaño (máximo 5MB)
    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      setMessage("El logo no puede superar los 5MB");
      setErrorType("logoTooBig");
      return;
    }

    // Validar tipo de archivo (solo imágenes)
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validImageTypes.includes(file.type)) {
      setMessage("Solo se permiten imágenes (JPG, PNG, GIF)");
      setErrorType("invalidLogo");
      return;
    }

    // Convertir a base64
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData({ ...formData, logoCentro: event.target.result });
      setErrorType("");
    };
    reader.onerror = () => {
      setMessage("Error al leer el archivo");
      setErrorType("readError");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrorType("");

    try {
      const response = await fetch(
        "http://localhost:4000/api/adminCentro/crear",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        setFormData({
          nombre: "",
          correo: "",
          telefono: "",
          emailUsrAdmin: "",
          nomUsrAdmin: "",
          logoCentro: "",
        });
        setTimeout(() => navigate("/AdminSupremo/homeAdmin"), 2000);
      } else {
        setMessage(data.message);
        setErrorType(data.errorType);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error.message);
      setMessage("Hubo un problema al conectar con el servidor");
      setErrorType("serverError");
    }
  };

  return (
    <div className="page-wrapperAñadirCentro">
      <div className="main-wrapperCentro">
        <h1>Añadir Centro</h1>
        <form style={{ display: "flex", flexDirection: "column" , height:"100%"}} onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "row", gap: "1em" ,flex:"1" , height:"100%"}}>
            <div style={{ flex: 1 , display: "flex", flexDirection: "column", gridGap: "1em"}}>
              <h2>Información del Centro</h2>

              {/* Campos del centro */}
              <div
                className={errorType === "centerExists" ? "error-field" : ""}
              >
                <label htmlFor="nombre">Nombre del Centro:</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="correo">Correo Electrónico:</label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="telefono">Teléfono:</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                />
              </div>

              
            </div>
            <div style={{ flex: 1 , display: "flex", flexDirection: "column",heightÑ: "100%", gridGap: "1em"}}>
              <h2>Información del Usuario Admin</h2>

              <div className={errorType === "userExists" ? "error-field" : ""}>
                <label htmlFor="emailUsrAdmin">Email del Admin:</label>
                <input
                  type="email"
                  id="emailUsrAdmin"
                  name="emailUsrAdmin"
                  value={formData.emailUsrAdmin}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={errorType === "userExists" ? "error-field" : ""}>
                <label htmlFor="nomUsrAdmin">
                  Nombre de Usuario del Admin:
                </label>
                <input
                  type="text"
                  id="nomUsrAdmin"
                  name="nomUsrAdmin"
                  value={formData.nomUsrAdmin}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="ButtonSeleccionarLogoCrearCentro">
                <label htmlFor="logo">Logo del Centro (máx. 5MB):</label>
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  accept="image/jpeg,image/png,image/gif"
                  onChange={handleLogoChange}
                />
                
              </div>
              {formData.logoCentro && (
                  <div className="logo-preview">
                    <img
                      src={formData.logoCentro}
                      alt="Vista previa del logo"
                      style={{ maxWidth: "200px", marginTop: "1em" }}
                    />
                  </div>
                )}
            </div>
            
          </div>

          <button type="submit" className="btn-login">
            Crear Centro
          </button>
          {message && <p className={`message ${errorType}`}>{message}</p>}
        </form>
      </div>
      <div className="ContainerAdminSupremoUser">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <UserOutlined style={{ fontSize: "65px", margin: "0em" }} />
          <h2 style={{ margin: "0em" }}>ADMIN SUP</h2>
        </div>
        <div
          style={{
            fontSize: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <p style={{ margin: "0em" }}>Yasin El Edrissi</p>
          <p style={{ margin: "0em" }}>Yasin@gmail.com</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              margin: "0em",
              width: "100%",
              border: "1px solid #fff",
              borderRadius: "50px",
              textAlign: "center",
            }}
          >
            STATUS
          </h1>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            borderRadius: "25px",
            width: "100%",
            backgroundColor: error ? "#ffe6e6" : "#c6ffd6",
            border: error ? "2px solid red" : "2px solid green",
          }}
        >
          {!loading &&
            (error ? (
              <CloseOutlined style={{ fontSize: "100px", color: "red" }} />
            ) : (
              <CheckOutlined style={{ fontSize: "100px", color: "green" }} />
            ))}

          {loading && (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: "100px" }} spin />}
              style={{ color: "green" }}
              size="large"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AñadirCentro;
