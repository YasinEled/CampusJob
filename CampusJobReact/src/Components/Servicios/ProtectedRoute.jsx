// src/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, requiredRole }) {
  const location = useLocation();
  const idUsuario = localStorage.getItem("idUsuario");
  const nivelUsuario = localStorage.getItem("nivelUsuario");

  // Si no está logueado → redirige al login
  if (!idUsuario) return <Navigate to="/" replace />;

  // Si requiere rol y no coincide → redirige a página no autorizada
  if (requiredRole && nivelUsuario !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Si todo bien → muestra el contenido
  return children;
}