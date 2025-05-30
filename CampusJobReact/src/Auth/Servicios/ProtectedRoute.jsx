// src/Components/Servicios/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, requiredRole }) {
  const location = useLocation();
  const idUsuario = localStorage.getItem("idUsuario");
  const nivelUsuario = localStorage.getItem("nivelUsuario");

  // <-- Añade este console.log:
  console.log("[ProtectedRoute] idUsuario:", idUsuario, "| nivelUsuario:", nivelUsuario, "| requiredRole:", requiredRole);

  // Si NO está logueado → permite acceder a `/` (login)
  if (!idUsuario) {
    if (location.pathname === "/") return children;
    return <Navigate to="/login" replace />;
  }

  // Si requiere rol y no coincide → redirige a /unauthorized
  if (requiredRole && !String(requiredRole).includes(nivelUsuario)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Si todo ok → muestra el contenido
  return children;
}
