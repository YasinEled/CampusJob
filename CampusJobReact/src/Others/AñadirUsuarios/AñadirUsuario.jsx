import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AñadirUsuario() {
  const navigate = useNavigate();
  const { centroId } = useParams();
  const nivelUsuario = localStorage.getItem("nivelUsuario");

  const [formData, setFormData] = useState({
    email: "",
    nivell: 0, // 0 = Alumno por defecto
  });
  const [cursosDisponibles, setCursosDisponibles] = useState([]);
  const [cursosSeleccionados, setCursosSeleccionados] = useState([]);
  const [error, setError] = useState("");

  // Roles disponibles según el nivel del usuario actual
  const roles = [
    { value: 0, label: "Alumno" },
    { value: 1, label: "Empresa" },
  ];
  if (nivelUsuario !== "2") {
    roles.push({ value: 2, label: "Profesor" });
  }

  // Cargar cursos del centro
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/centro/${centroId}/cursos`);
        const data = await response.json();
        if (data.success) {
          setCursosDisponibles(data.data);
        }
      } catch (err) {
        setError("Error al cargar cursos");
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
  const moverCurso = (curso, desdeDisponibles) => {
    if (desdeDisponibles) {
      setCursosDisponibles((prev) => prev.filter((c) => c.idcurso !== curso.idcurso));
      setCursosSeleccionados((prev) => [...prev, curso]);
    } else {
      setCursosSeleccionados((prev) => prev.filter((c) => c.idcurso !== curso.idcurso));
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
      const response = await fetch(`http://localhost:4000/api/centro/${centroId}/usuario`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          nivell: formData.nivell,
          cursos: cursosSeleccionados.map((c) => c.idcurso),
        }),
      });

      const data = await response.json();
      if (data.success) {
        navigate(`/PrimerInicio${["", "Empresa", "Profesor"][formData.nivell]}`);
      } else {
        setError(data.message || "Error al crear el usuario");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="FormularioAñadirUsuario">
      <h2>Añadir Usuario</h2>
      {error && <p className="error-message">{error}</p>}

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

        <div className="roles">
          <label>Selecciona el rol:</label>
          {roles.map((rol) => (
            <label key={rol.value}>
              <input
                type="radio"
                name="nivell"
                value={rol.value}
                checked={formData.nivell === rol.value}
                onChange={handleChange}
              />
              {rol.label}
            </label>
          ))}
        </div>

        <div className="seleccion-cursos">
          <label>Cursos Disponibles</label>
          <div
            className="listbox"
            onDoubleClick={(e) => {
              const cursoId = parseInt(e.target.dataset.cursoId);
              const curso = cursosDisponibles.find((c) => c.idcurso === cursoId);
              if (curso) moverCurso(curso, true);
            }}
          >
            {cursosDisponibles.map((curso) => (
              <div key={curso.idcurso} data-curso-id={curso.idcurso} className="curso-item">
                {curso.nomcurs}
              </div>
            ))}
          </div>
        </div>

        <div className="seleccion-cursos">
          <label>Cursos Asignados</label>
          <div
            className="listbox"
            onDoubleClick={(e) => {
              const cursoId = parseInt(e.target.dataset.cursoId);
              const curso = cursosSeleccionados.find((c) => c.idcurso === cursoId);
              if (curso) moverCurso(curso, false);
            }}
          >
            {cursosSeleccionados.map((curso) => (
              <div key={curso.idcurso} data-curso-id={curso.idcurso} className="curso-item">
                {curso.nomcurs}
              </div>
            ))}
          </div>
        </div>

        <div className="acciones">
          <button type="submit" className="BotonAñadirUsuario">
            Crear
          </button>
          <button type="button" onClick={() => navigate(-1)} className="BotonVolverAtras">
            Volver
          </button>
        </div>
      </form>
    </div>
  );
}