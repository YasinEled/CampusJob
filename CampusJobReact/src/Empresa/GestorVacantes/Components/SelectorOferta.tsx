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
import { Popconfirm } from "antd";

interface Candidato {
  fotoPerfil: string;
  nombre: string;
  apellido: string;
  email: string;
  curriculum: string;
  ubicacion: string;
  telefono: string;
}

interface Props {
  candidato: Candidato;
  estado: number; // 0 = Solicitado, 1 = Aprobado, 2 = Rechazado
  onAceptar: () => void;
  onRechazar: () => void;
  onDescargarCV: () => void;
}

function SelectorOferta({ candidato, estado, onAceptar, onRechazar, onDescargarCV }: Props) {
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
        minHeight: "120px",
      }}
    >
      {/* Sección izquierda - Información básica */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: "1.5em",
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
            {candidato.ubicacion}
          </p>
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
              {candidato.ubicacion}
            </p>
          </div>
        </div>
      </div>

      {/* Sección derecha - Botones en fila */}
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
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
            color: "#042522",
            height: "100%",
            minWidth: "80px",
          }}
        >
          <DownloadOutlined />
          CV
        </button>

        {/* Botones de acción según estado */}
        {estado === 0 && (
          <div style={{ display: "flex", gap: "0.5em", height: "100%" }}>
            <button
              onClick={onAceptar}
              style={{
                padding: "0.5em",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "1.3em",
                height: "100%",
                minWidth: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              title="Aceptar"
            >
              <CheckOutlined />
            </button>
            {/* Botón de rechazar con confirmación */}
            <Popconfirm
              title="¿Seguro que quieres rechazar este candidato?"
              onConfirm={onRechazar}
              okText="Sí"
              cancelText="No"
            >
              <button
                style={{
                  padding: "0.5em",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "1.3em",
                  height: "100%",
                  minWidth: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                title="Rechazar"
              >
                <CloseOutlined />
              </button>
            </Popconfirm>
          </div>
        )}
        {estado === 1 && (
          <span
            style={{
              color: "#4CAF50",
              fontWeight: "bold",
              fontSize: "2em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              minWidth: "60px",
            }}
          >
            <CheckOutlined />
          </span>
        )}
        {estado === 2 && (
          <span
            style={{
              color: "#f44336",
              fontWeight: "bold",
              fontSize: "2em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              minWidth: "60px",
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