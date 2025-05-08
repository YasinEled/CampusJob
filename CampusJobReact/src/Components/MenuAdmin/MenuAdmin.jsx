import React, { useState } from "react";
import "../ComponentsCSS/MenuAdmin/MenuAdmin.css";

export default function CrearUsuarios() {
  const [showModal, setShowModal] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const abrirModal = (tipo) => {
    setTipoUsuario(tipo);
    setEmail("");
    setMensaje("");
    setShowModal(true);
  };

  const handleCrearAdmin = () => {
    abrirModal("Admin");
  };

  const handleCrearProfesor = () => {
    abrirModal("Profesor");
  };

  const handleCrearEmpresa = () => {
    abrirModal("Empresa");
  };

  const handleCrearUsuario = () => {
    abrirModal("Usuario");
  };

  const cerrarModal = () => {
    setShowModal(false);
  };

  const registrarUsuario = () => {
    if (!email || !email.includes('@')) {
      setMensaje("Por favor ingrese un correo electrónico válido");
      return;
    }
    
    setMensaje(`${tipoUsuario} registrado exitosamente con el correo: ${email}`);
    

  };

  return (
    <div className="MenuAdminContenedor">
      <h2 className="MenuAdminTitulo">Gestión de Usuarios</h2>
      
      <button
        onClick={handleCrearAdmin}
        className="CreadorAdminAdmin"
      >
        Crear Admin
      </button>

      <button
        onClick={handleCrearProfesor}
        className="CreadorAdminProfe"
      >
        Crear Profesor
      </button>

      <button
        onClick={handleCrearEmpresa}
        className="CreadorAdminEmpresa"
      >
        Crear Empresa
      </button>

      <button
        onClick={handleCrearUsuario}
        className="CreadorAdminUsuario"
      >
        Crear Usuario
      </button>

      {/* Modal para crear usuario */}
      {showModal && (
        <div className="MenuAdminPopup">
          <div className="MenuAdminPopupContent">
            <div className="MenuAdminPopupHeader">
              <h3>Crear Nuevo {tipoUsuario}</h3>
              <button onClick={cerrarModal}>✕</button>
            </div>
            
            <div>
              <div className="MenuAdminPopupBody">
                <label htmlFor="email">Correo Electrónico:</label>
                <input
                  type="email"
                  id="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              {mensaje && (
                <div className="MenuAdminPopupMensaje">
                  {mensaje}
                </div>
              )}
              
              <div className="MenuAdminPopupFooter">
                <button 
                  type="button"
                  onClick={cerrarModal}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={registrarUsuario}
                >
                  Registrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}