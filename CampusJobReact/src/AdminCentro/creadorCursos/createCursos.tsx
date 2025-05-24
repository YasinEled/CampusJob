import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  PlusOutlined,
  LoadingOutlined,
  UserOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Spin } from "antd";
import { useTranslation } from "react-i18next";
import "./Style/createCurso.css"

const CreaCurso = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { centroId } = useParams();
  const navigate = useNavigate();

  const [curso, setCurso] = useState({
    nombre: "",
    descripcion: "",
    foto: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurso((prev) => ({ ...prev, [name]: value }));
  };

  // const handleFotoChange = (e) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onload = (event) => {
  //     setCurso((prev) => ({
  //       ...prev,
  //       foto: event.target?.result,
  //     }));
  //   };
  //   reader.readAsDataURL(file);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!centroId) {
      alert(t("crearCurso.id_centro_no_encontrado"));
      return;
    }

    const idUsuario = localStorage.getItem("idUsuario");
    const nivelUsuario = localStorage.getItem("nivelUsuario");

    if (!idUsuario || nivelUsuario === null) {
      alert(t("crearCurso.faltan_datos_usuario"));
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/centro/${centroId}/curso`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: curso.nombre,
            descripcion: curso.descripcion,
            foto: curso.foto,
            idUsuario,
            nivelUsuario,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        alert(
          errorData.message ||
            `Error ${response.status}: ${response.statusText}`
        );
        return;
      }

      const data = await response.json();
      if (data.success) {
        alert(t("crearCurso.curso_creado_exito"));
        navigate(`/centro/${centroId}/elegirCurso`);
      } else {
        alert(data.message || t("crearCurso.error_crear"));
      }
    } catch (err) {
      console.error("Error al enviar:", err);
      alert(t("crearCurso.error_conexion"));
    }
  };

  return (
    <div className="crear-curso-container">
      <div className="MenuAdminContainer">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: "5em",
          }}
        >
          <h2>{t("crearCurso.crear_en", { id: centroId })}</h2>
        </div>
        <form className="crear-curso-form" onSubmit={handleSubmit}>
          <div>
            <label>
              {t("crearCurso.nombre")}:
              <input
                type="text"
                name="nombre"
                value={curso.nombre}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              {t("crearCurso.descripcion")}:
              <textarea
                name="descripcion"
                value={curso.descripcion}
                onChange={handleChange}
                required
                rows={4}
                style={{ resize: "none" }}
              />
            </label>
          </div>
          <div>
            <label className="ButtonSeleccionarLogoCrearCentro">
              {t("crearCurso.logo")}:
              {/* <input type="file" accept="image/*" onChange={handleFotoChange} /> */}
            </label>
          </div>
          {curso.foto && (
            <div className="logo-preview">
              <img
                src={curso.foto}
                alt={t("crearCurso.vista_previa_logo")}
                style={{ maxWidth: "200px", marginTop: "1em" }}
              />
            </div>
          )}
          <button className="btn-login" type="submit">{t("crearCurso.crear")}</button>
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
          <p style={{ margin: "0em" }}>{t("adminSup.nombre")}</p>
          <p style={{ margin: "0em" }}>{t("adminSup.email")}</p>
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
            {t("adminSup.status")}
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

export default CreaCurso;

