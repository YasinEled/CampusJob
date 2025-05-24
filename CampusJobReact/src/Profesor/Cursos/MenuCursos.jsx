// src/components/MenuCursos.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Style/MenuCursos.css";
import {
  PlusOutlined,
  LoadingOutlined,
  UserOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Spin } from "antd";

export default function MenuCursos() {
  const { centroId } = useParams();
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const nivelUsuario = localStorage.getItem("nivelUsuario"); // "0","1","2","3","4"
  const idUsuario    = localStorage.getItem("idUsuario");

  useEffect(() => {
    if (!centroId) {
      setError("ID del centro no encontrado");
      setLoading(false);
      return;
    }
    const fetchCursos = async () => {
      try {
        // Construimos la URL con query params
        const url = new URL(`http://localhost:4000/api/centro/${centroId}/cursos`);
        url.searchParams.set("idUsuario", localStorage.getItem("idUsuario"));
        url.searchParams.set("nivelUsuario", localStorage.getItem("nivelUsuario"));
  
        const response = await fetch(url.toString());
        const data = await response.json();
  
        if (data.success) {
          setCursos(data.data);
        } else {
          setError(data.message || "No se pudieron cargar los cursos");
        }
      } catch (err) {
        setError("Error al conectar con el servidor");
      } finally {
        setLoading(false);
      }
    };
  
    fetchCursos();
  }, [centroId]);
  

  const handleVerInformacion = (cursoId) => {
    navigate(`/centro/${centroId}/curso/${cursoId}/BuscarOfertas`);
  };
  const handleAñadirCurso = () =>
    navigate(`/AdminCentro/centro/${centroId}/añadirCurso`);
  const handleAñadirUsuario = () =>
    navigate(`/Profesor/centro/${centroId}/CrearUsuarios`);

  return (
    <div className="MenuAdminContenedor">
      <div className="MenuAdminContainer">
        <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <h2>Cursos del Centro ID: {centroId}</h2>
          {loading && <Spin indicator={<LoadingOutlined spin />} />}
          {error && <p className="error-message">{error}</p>}
          {!loading && !error && ["2", "3", "4"].includes(nivelUsuario) && (
            <button className="BotonAñadirUserCurso" onClick={handleAñadirUsuario}>
              Añadir usuario
            </button>
          )}
        </div>
        <div className="MenuAdminContenido">
          <div className="CentroList">
            {cursos.map((curso) => (
              <div
                key={curso.idcurso}
                className="CursoCard"
                onClick={() => handleVerInformacion(curso.idcurso)}
              >
                <div className="CentroInfo">
                  <button className="BotonTresPuntos" onClick={(e) => e.stopPropagation()}>
                    &#8942;
                  </button>
                  <h3 className="CursoNombre">{curso.nomcurs}</h3>
                </div>
                {curso.fotoCurso ? (
                  <img src={curso.fotoCurso} className="CentroImagen" />
                ) : (
                  <div className="CentroImagenPlaceholder">Sin logo</div>
                )}
              </div>
            ))}
            {["3", "4"].includes(nivelUsuario) && (
              <button className="BotonAñadirCentro" onClick={handleAñadirCurso}>
                <PlusOutlined style={{ fontSize: 64 }} />
                <br />
                Añadir Curso
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
