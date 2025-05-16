import React, { useState } from "react";
import "../ComponentsCSS/MenuAdmin/AñadirUsuarios.css";
import { useNavigate } from "react-router-dom";

export default function ModalCrearUsuarios({ onClose }) {
  const navigate = useNavigate(); 

  const [tipoUsuario, setTipoUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const abrirModal = (tipo) => {
    setTipoUsuario(tipo);
    setEmail("");
    setMensaje("");
  };

  const handleCrear = (tipo) => {
    abrirModal(tipo);
    if (tipo === "Usuario") {
      navigate("/AñadirUsuario"); 
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Selecciona el tipo de usuario a crear</h2>

        <button onClick={() => handleCrear("Admin")} className="CreadorAdminAdmin">
          Crear Admin
        </button>
        <button onClick={() => handleCrear("Profesor")} className="CreadorAdminProfe">
          Crear Profesor
        </button>
        <button onClick={() => handleCrear("Empresa")} className="CreadorAdminEmpresa">
          Crear Empresa
        </button>
        <button onClick={() => handleCrear("Usuario")} className="CreadorAdminUsuario">
          Crear Usuario
        </button>

        <button onClick={onClose} className="CerrarModal">Cerrar</button>
      </div>
    </div>
  );
}
