import { useState, useEffect } from "react";
import "../ComponentsCSS/MenuAdmin/AñadirUsuarios.css";
import ModalCrearUsuarios from "./AñadirUsuarios.jsx";

export default function CrearUsuarios() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Al entrar al componente, abre el modal automáticamente
    setShowModal(true);
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="MenuAdminContenedor">
      <h2 className="MenuAdminTitulo">Gestión de Usuarios</h2>

      <button onClick={() => setShowModal(true)} className="MenuAdminBotonCrearUsuarios">
        Crear Usuarios
      </button>

      {showModal && <ModalCrearUsuarios onClose={handleCloseModal} />}
    </div>
  );
}
