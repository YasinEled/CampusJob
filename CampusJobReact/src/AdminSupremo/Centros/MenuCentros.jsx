import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Style/MenuCentros.css";
import {
  PlusOutlined,
  LoadingOutlined,
  UserOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Spin } from "antd";

export default function MenuCentros() {
  const navigate = useNavigate();
  const [centros, setCentros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const nivelUsuario = localStorage.getItem("nivelUsuario");

  useEffect(() => {
    const fetchCentros = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/centro/all");
        const data = await response.json();

        if (data.success) {
          setCentros(data.data);
        } else {
          setError(data.message || "No se pudieron cargar los centros");
        }
      } catch (err) {
        setError("Error al conectar con el servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchCentros();
  }, []);

  const handleVerInformacion = (id) => {
    // Redirigir según el rol del usuario
    if (nivelUsuario === "4") {
      // AdminSupremo → /centro/:centroId/elegirCurso
      navigate(`/centro/${id}/elegirCurso`);
    } else {
      navigate("/unauthorized");
    }
  };

  return (
    <div className="MenuAdminSupremoContenedor">
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
          <h1>Centros Disponibles</h1>
          {loading && (
            <Spin
              indicator={<LoadingOutlined spin />}
              style={{ color: "white" }}
              size="large"
            />
          )}
          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="MenuAdminContenido">
          <div className="CentroList">
            {centros.map((centro) => (
              <div
                key={centro.idcentro}
                className="CentroCard"
                onClick={() => handleVerInformacion(centro.idcentro)}
              >
                <div className="CentroInfo">
                  <h3 className="CentroNombre">{centro.nombreCentro}</h3>
                  <p>ID Admin: {centro.idUsrAdmin}</p>
                  <p>Usuario: {centro.adminNombre}</p>
                </div>
                {centro.logoCentro ? (
                  <img
                    src={centro.logoCentro}
                    alt="Logo del centro"
                    className="CentroImagen"
                  />
                ) : (
                  <div className="CentroImagenPlaceholder">Sin logo</div>
                )}
              </div>
            ))}

            <button
              className="BotonAñadirCentro"
              onClick={() => navigate("/AdminSupremo/añadirCentro")}
            >
              <div style={{ fontSize: "100px" }}>
                <PlusOutlined />
              </div>
              Añadir Centro
            </button>
          </div>
        </div>
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
}
