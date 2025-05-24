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
  const { centroId } = useParams(); // ✅ Recibe el centroId desde la URL
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const idCentro = localStorage.getItem("idCentro");

  const nivelUsuario = localStorage.getItem("nivelUsuario");

  // if(nivelUsuario!=4 && centroId!=idCentro)
  //   {
  //     navigate('/');
  //   }

  useEffect(() => {
    const fetchCursos = async () => {
      if (!centroId) {
        setError("ID del centro no encontrado");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:4000/api/centro/${centroId}/cursos`
        );
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

  const handleAñadirCurso = () => {
    navigate(`/AdminCentro/centro/${centroId}/añadirCurso`);
  };
  const handleAñadirUsuario = () => {
    navigate(`/Profesor/centro/${centroId}/CrearUsuarios`);
  };

  const handleModificarCursoClick = (e, curso) => {
    e.stopPropagation();
    setNuevoNombre(curso.nomcurs);
    setIsModalOpen(true);
  };

  const handleCerrarModal = () => setIsModalOpen(false);
  const handleGuardarNombre = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="MenuAdminContenedor">
      <div className="MenuAdminContainer">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Cursos del Centro ID: {centroId}</h2>
          {loading && (
            <Spin
              indicator={<LoadingOutlined spin />}
              style={{ color: "white" }}
              size="large"
            />
          )}{" "}
          {error && <p className="error-message">{error}</p>}
          {nivelUsuario == 4 && nivelUsuario == 3 && !error && !loading && (
            <button
              className="BotonAñadirUserCurso"
              onClick={handleAñadirUsuario}
            >
              Añadir usuario
            </button>
          )}
        </div>
        <div className="MenuAdminContenido">
          <div className="CentroList">
            {cursos.length > 0 ? (
              cursos.map((curso) => (
                <div
                  key={curso.idcurso}
                  className="CursoCard"
                  onClick={() => handleVerInformacion(curso.idcurso)}
                >
                  <div className="CentroInfo">
                    <button
                      className="BotonTresPuntos"
                      onClick={(e) => handleModificarCursoClick(e, curso)}
                      aria-label="Ver información"
                    >
                      &#8942;
                    </button>
                    <h3 className="CursoNombre">{curso.nomcurs}</h3>
                    <p className="CursoAdmin">Administrador: Eric</p>
                  </div>

                  {/* ✅ Muestra la foto del curso si existe */}
                  {curso.fotoCurso ? (
                    <img
                      src={curso.fotoCurso}
                      alt="Imagen del curso"
                      className="CentroImagen"
                    />
                  ) : (
                    <div className="CentroImagenPlaceholder">Sin logo</div>
                  )}
                </div>
              ))
            ) : (
              <p></p>
            )}
            {(nivelUsuario == 4 || nivelUsuario == 3) && (
              <button className="BotonAñadirCentro" onClick={handleAñadirCurso}>
                <div style={{ fontSize: "100px" }}>
                  <PlusOutlined />
                </div>
                Añadir Curso
              </button> 
            )}
            
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="ModalOverlay" onClick={handleCerrarModal}>
          <div className="ModalContent" onClick={(e) => e.stopPropagation()}>
            <h2>Modificar nombre del curso</h2>
            <input
              type="text"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
            />
            <div className="ModalButtons">
              <button onClick={handleGuardarNombre}>Guardar</button>
              <button onClick={handleCerrarModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
      {nivelUsuario == 4 && nivelUsuario == 3 && (
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
                indicator={
                  <LoadingOutlined style={{ fontSize: "100px" }} spin />
                }
                style={{ color: "green" }}
                size="large"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
