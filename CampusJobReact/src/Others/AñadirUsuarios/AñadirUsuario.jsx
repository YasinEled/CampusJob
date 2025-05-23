import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Style/AddUser.css";
import {
  PlusOutlined,
  LoadingOutlined,
  UserOutlined,
  CheckOutlined,
  CloseOutlined,
  LeftOutlined
} from "@ant-design/icons";
import { Spin } from "antd";

export default function AñadirUsuario() {
  const navigate = useNavigate();
  const { centroId } = useParams(); // ✅ Recibe el centroId desde la URL
  const nivelUsuario = localStorage.getItem("nivelUsuario");

  const [formData, setFormData] = useState({
    email: "",
    nivell: 0, // 0 = Alumno por defecto
  });
  const [cursosDisponibles, setCursosDisponibles] = useState([]);
  const [cursosSeleccionados, setCursosSeleccionados] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Roles disponibles (Profesor se oculta si el admin es Profesor)
  const roles = [
    { value: 0, label: "Alumno" },
    { value: 1, label: "Empresa" },
  ];
  if (nivelUsuario !== "2") {
    roles.push({ value: 2, label: "Profesor" });
  }

  // Cargar cursos del centro desde `/api/centro/:centroId/cursos`
  // AñadirUsuario.jsx
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

        // ✅ Verifica que la respuesta sea JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text(); // Captura la respuesta como texto
          console.error("Respuesta no es JSON:", text);
          throw new Error("Respuesta inválida del servidor");
        }

        const data = await response.json();
        if (data.success) {
          setCursosDisponibles(data.data);
        } else {
          setError(data.message || "Error al cargar cursos");
        }
      } catch (err) {
        setError("Error al conectar con el servidor CENTROS");
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, [centroId]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Mover curso entre listas con doble clic
  const moverCurso = (cursoId, desdeDisponibles) => {
    const curso = desdeDisponibles
      ? cursosDisponibles.find((c) => c.idcurso === cursoId)
      : cursosSeleccionados.find((c) => c.idcurso === cursoId);

    if (!curso) return;

    if (desdeDisponibles) {
      setCursosDisponibles((prev) => prev.filter((c) => c.idcurso !== cursoId));
      setCursosSeleccionados((prev) => [...prev, curso]);
    } else {
      setCursosSeleccionados((prev) =>
        prev.filter((c) => c.idcurso !== cursoId)
      );
      setCursosDisponibles((prev) => [...prev, curso]);
    }
  };

  // Validar y enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cursosSeleccionados.length < 1) {
      setError("Debes seleccionar al menos un curso");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/centro/${centroId}/usuario`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            nivell: formData.nivell,
            cursos: cursosSeleccionados.map((c) => c.idcurso),
          }),
        }
      );

      // ✅ Validar que la respuesta es JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(`La respuesta no es JSON: ${text.substring(0, 50)}...`);
      }

      const data = await response.json();
      if (data.success) {
        alert("Usuario creado exitosamente");
        navigate(-1); // Volver a la página anterior
      } else {
        setError(data.message || "Error al crear el usuario");
      }
    } catch (err) {
      setError(err.message || "Error al conectar con el servidor de backend");
    }
  };

  return (
    <div className="FormularioAñadirUsuario">
      <div className="FormAddUserContainer">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: "5em",
          }}
        >
          <h2>Añadir Usuario</h2>
          {loading && (
            <Spin
              indicator={<LoadingOutlined spin />}
              style={{ color: "white" }}
              size="large"
            />
          )}
          {error && <p className="error-message">{error}</p>}
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ejemplo@correo.com"
              required
            />
          </div>
          <div className="roles-containerAddUser">
            <div className="roles">
              <div>
                <label>Selecciona el rol:</label>
                <div style={{ display: "flex", gap: "1em" }}>
                  {roles.map((rol) => (
                    <label key={rol.value} className="custom-radio">
                      <input
                        type="radio"
                        name="nivell"
                        value={rol.value}
                        checked={Number(formData.nivell) === rol.value}
                        onChange={handleChange}
                      />
                      <span className="custom-radio-box">{rol.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="acciones">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="BotonVolverAtras"
                >
                  <LeftOutlined />
                </button>
                <button type="submit" className="BotonAñadirUsuario">
                  Crear
                </button>
                
              </div>
            </div>
            <div className="cursos-containerSelectorAddUser">
              <div className="seleccion-cursos">
                <label>Cursos Disponibles</label>
                <div className="listbox">
                  {cursosDisponibles.map((curso) => (
                    <div
                      key={curso.idcurso}
                      className="curso-item"
                      onClick={() => moverCurso(curso.idcurso, true)}
                    >
                      {curso.nomcurs}
                    </div>
                  ))}
                </div>
              </div>

              <div className="seleccion-cursos">
                <label>Cursos Asignados</label>
                <div className="listbox">
                  {cursosSeleccionados.map((curso) => (
                    <div
                      key={curso.idcurso}
                      className="curso-item"
                      onClick={() => moverCurso(curso.idcurso, false)}
                    >
                      {curso.nomcurs}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
