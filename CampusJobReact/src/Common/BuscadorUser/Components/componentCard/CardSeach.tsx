import React from "react";
import "../../Style/CardSearch.css";

interface UserProps {
  id: number;
  username: string;
  nombre: string;
  apellido: string;
  empresaNombre: string;
  nivel: number;
  fotoPerfil?: string;
}

const CardSearch: React.FC<{ user: UserProps }> = ({ user }) => {
  const { id, username, nombre, apellido, empresaNombre, nivel, fotoPerfil } = user;

  // ✅ Mostrar nombre según el nivel
  const displayName =
  nivel === 1
    ? empresaNombre // Mostrar nombre de empresa para nivel 1
    : nivel === 2
    ? nombre // Mostrar solo nombre para profesores (nivel 2)
    : `${nombre} ${apellido}`; // Mostrar nombre y apellido para alumnos

  let perfilPath = "";
  switch (nivel) {
    case 0:
      perfilPath = `/Alumno/PerfilAlumno/${id}`;
      break;
    case 1:
      perfilPath = `/Empresa/PerfilEmpresa/${id}`;
      break;
    case 2:
      perfilPath = `/Alumno/PerfilProfesor/${id}`;
      break;
    default:
      perfilPath = "/";
  }

  return (
    <div className="cardSearch">
      <img
        src={fotoPerfil || "https://randomuser.me/api/portraits/men/75.jpg "}
        alt="profile"
        className="cardSearch__avatar"
      />
      <div className="cardSearch__info">
        <p className="cardSearch__name">{displayName}</p>
        <p className="cardSearch__job">{username}</p>
      </div>
      <div className="cardSearch__button">
        <button className="button" onClick={() => window.location.href = perfilPath}>
          Ver Perfil
        </button>
      </div>
    </div>
  );
};

export default CardSearch;