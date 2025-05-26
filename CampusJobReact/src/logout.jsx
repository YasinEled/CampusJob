// src/components/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    // Borra TODO
    // localStorage.clear();
    navigate("/login", { replace: true });
  }, []);
  return null; // no renderizamos nada
}
