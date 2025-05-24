import "./Style/perfilEmpresa.css";
import logoEmpresa from "../../assets/yasin.jpg";
import fondoEmpresa from "../../assets/yasinfondo.jpg";
import { useState, useRef } from "react";
import ListaOfertasPropias from "../ListaOfertaspropias";

function PerfilEmpresa() {
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const [nombre, setNombre] = useState("TechNova Solutions");
  const [ubicacion, setUbicacion] = useState("Barcelona, Cataluña, España");
  const [sector, setSector] = useState("Desarrollo de Software");
  const [fundacion, setFundacion] = useState("2015");
  const [telefono, setTelefono] = useState("+34 654321098");
  const [email, setEmail] = useState("contacto@technova.com");
  const [descripcion, setDescripcion] = useState(
    "Empresa dedicada a soluciones tecnológicas innovadoras con foco en eficiencia, escalabilidad y experiencia de usuario."
  );
  const nivelUsuario = localStorage.getItem("nivelUsuario");

  const fileInputRef = useRef(null);

  const handleGuardar = () => {
    setMostrarPopup(false);
  };

  const handleEnviarMensaje = () => {
    console.log("Mensaje enviado:", mensaje);
    setMensaje("");
    setMostrarMensaje(false);
  };

  const handleCambiarFoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Nueva foto seleccionada:", file.name);
      // Aquí podrías actualizar la imagen del logo si guardas la ruta temporal, por ejemplo con URL.createObjectURL(file)
    }
  };

  return (
    <main className="PerfilEmpresaContainer">
      <div className="PerfilEmpresaMain">
        <div className="PerfilEmpresaFondo">
          <img src={fondoEmpresa} alt="Fondo Empresa" />
          <img
            className="PerfilEmpresaLogo"
            src={logoEmpresa}
            alt="Logo Empresa"
          />
        </div>
        <div className="PerfilEmpresaInfoContainer">
          <div className="PerfilEmpresaInfoPerfil">
            <h2>{nombre}</h2>
            <p>{ubicacion}</p>
            <p>
              <strong>Sector:</strong> {sector}
            </p>
            <p>
              <strong>Fundación:</strong> {fundacion}
            </p>
            <p>
              <strong>Teléfono:</strong> {telefono}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>{descripcion}</p>
            {nivelUsuario == "1" && (
              <button
                className="PerfilEmpresaBtnEditarPerfil"
                onClick={() => setMostrarPopup(true)}
              >
                Modificar perfil
              </button>
            )}

            <button
              className="PerfilEmpresaBtnMensaje"
              onClick={() => setMostrarMensaje(true)}
            >
              Enviar mensaje
            </button>
          </div>
        </div>
      </div>

      {mostrarPopup && (
        <div className="PerfilEmpresaPopupOverlay">
          <div className="PerfilEmpresaPopupContenido">
            <h3>Editar Perfil Empresa</h3>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre Empresa"
            />
            <input
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              placeholder="Ubicación"
            />
            <input
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              placeholder="Sector"
            />
            <input
              value={fundacion}
              onChange={(e) => setFundacion(e.target.value)}
              placeholder="Año de Fundación"
            />
            <input
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="Teléfono"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Descripción"
            />

            <button
              className="PerfilEmpresaBtnCambiarFoto"
              onClick={() => fileInputRef.current.click()}
            >
              Cambiar foto de perfil
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleCambiarFoto}
              style={{ display: "none" }}
            />

            <button onClick={handleGuardar}>Guardar</button>
            <button onClick={() => setMostrarPopup(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {mostrarMensaje && (
        <div className="PerfilEmpresaPopupOverlay">
          <div className="PerfilEmpresaPopupContenido">
            <h3>Enviar mensaje a la empresa</h3>
            <textarea
              placeholder="Escribe tu mensaje aquí..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />
            <button onClick={handleEnviarMensaje}>Enviar</button>
            <button onClick={() => setMostrarMensaje(false)}>Cancelar</button>
          </div>
        </div>
      )}

      <ListaOfertasPropias />
    </main>
  );
}

export default PerfilEmpresa;
