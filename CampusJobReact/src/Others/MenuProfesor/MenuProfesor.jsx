import React from "react";
import { Link } from "react-router-dom";

export default function MenuProfesor() {
  return (
    <div className="MenuProfesor">
      <h1 className="MenuProfesorTitulo">Menú Profesor</h1>
      
      <nav className="MenuProfesorNavegacion">
    
        <Link to="gestionClases" className="MenuProfesorGestionarCursos">
          Gestionar Cursos
        </Link>
        <Link to="CrearEmpresa" className="MenuProfesorCrearEmpresa">
          Ver Estudiantes
        </Link>
        <Link to="CrearAlumno" className="MenuProfesorCrearEstudiantes">
          Crear Estudiantes
        </Link>
        <Link to="AsociarAlumnoCurso" className="MenuProfesorAsociarAlumnoCurso">
          Asociar Estudiantes a Cursos
        </Link>
      </nav>
    </div>
  );
}
