import React from "react";
import {
  DownloadOutlined,
  CheckOutlined,
  CloseOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
} from "@ant-design/icons";

function SelectorOferta({
  candidato,
  estado,
  onAceptar,
  onRechazar,
  onDescargarCV,
}) {
  return (
    <div
      style={{
        display: "flex",
        borderRadius: "15px",
        padding: "1em",
        margin: "1em 0",
        backgroundColor: "#042522",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        
        color: "#fff",
        alignItems: "center",
      }}
    >
      {/* Sección izquierda - Información básica */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: "1.5em",
          height: "100%",
        }}
      >
        {candidato.fotoPerfil ? (
          <img
            src={candidato.fotoPerfil}
            alt="Foto perfil"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #16a085",
            }}
          />
        ) : (
          <UserOutlined style={{ fontSize: "80px", color: "#bdbdbd" }} />
        )}
        <div>
          <h3 style={{ margin: 0, color: "#fff" }}>
            {candidato.nombre} {candidato.apellido}
          </h3>
          <p style={{ margin: "0.3em 0 0.7em 0", color: "#b2dfdb" }}>
            {candidato.escuela}
          </p>
          {estado === "aprobado" && (
            <div style={{ marginTop: "0.7em", color: "#e0f2f1" }}>
              <p style={{ margin: "0.2em 0" }}>
                <PhoneOutlined style={{ marginRight: "0.5em" }} />
                {candidato.telefono}
              </p>
              <p style={{ margin: "0.2em 0" }}>
                <MailOutlined style={{ marginRight: "0.5em" }} />
                {candidato.email}
              </p>
              <p style={{ margin: "0.2em 0" }}>
                <HomeOutlined style={{ marginRight: "0.5em" }} />
                {candidato.direccion}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Sección derecha - Botones */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1em",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          
        }}
      >
        {/* Botón Descargar CV */}
        <button
          onClick={onDescargarCV}
          style={{
            display: "flex",
            flexDirection: "row",
            
            alignItems: "center",
            gap: "0.5em",
            
            padding: "0.5em 1.2em",
            backgroundColor: "#e8e8e8",
            height: "100%",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
            color: "#042522",
          }}
        >
          <DownloadOutlined />
          CV
        </button>

        {/* Botones de acción según estado */}
        {estado === "solicitado" && (
          <div style={{ display: "flex", gap: "0.5em", height: "100%" }}>
            <button
              onClick={onAceptar}
              style={{
                padding: "0.5em",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                height: "100%",

                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "1.3em",
              }}
              title="Aceptar"
            >
              <CheckOutlined />
            </button>
            <button
              onClick={onRechazar}
              style={{
                padding: "0.5em",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                height: "100%",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "1.3em",
              }}
              title="Rechazar"
            >
              <CloseOutlined />
            </button>
          </div>
        )}
        {estado === "aprobado" && (
          <span
            style={{
              color: "#4CAF50",
              fontWeight: "bold",
              fontSize: "2em",
              display: "flex",
              alignItems: "center",
              gap: "0.4em",
            }}
          >
            <CheckOutlined />
          </span>
        )}
        {estado === "rechazado" && (
          <span
            style={{
              color: "#f44336",
              fontWeight: "bold",
              fontSize: "2em",
              display: "flex",
              alignItems: "center",
              gap: "0.4em",
            }}
          >
            <CloseOutlined />
          </span>
        )}
      </div>
    </div>
  );
}

export default SelectorOferta;
