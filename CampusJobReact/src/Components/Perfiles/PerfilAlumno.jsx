import "../ComponentsCSS/perfilUsuarioCSS/perfilPropio.css";
import pfp from '../../assets/yasin.jpg';
import pfpFondo from '../../assets/yasinfondo.jpg';
import { useState } from "react";

function PerfilPropio() {
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [nombre, setNombre] = useState("Yasin El Edrissi");
  const [ubicacion, setUbicacion] = useState("Granollers, Cataluña, España");
  const [telefono, setTelefono] = useState("+34 632789372");
  const [email, setEmail] = useState("yeledrissi@educem.net");
  const [fechaNacimiento, setFechaNacimiento] = useState("12 / 08 / 2004");
  const [descripcion, setDescripcion] = useState("Desarrollador Full Stack con 3 años de experiencia en la creación de aplicaciones web eficientes y escalables utilizando React y Node.js. Apasionado por resolver problemas complejos y aprender nuevas tecnologías.");

  const handleGuardar = () => {
    setMostrarPopup(false);
  };

  return (
    <main className="perfilContainer">
      <div className="PerfilUsuario">
        <div className="fondo">
          <img src={pfpFondo} alt="Fondo" />
          <img className="profile" src={pfp} alt="Perfil" />
        </div>
        <div className="InfoContainer">
          <div className="infoPerfil">
            <div className="InformacionPrincipalUsuario">
              <h2>{nombre}</h2>
              <p>{ubicacion}</p>
            </div>
            <div className="InformacionContactoUsuario">
              <p>{telefono}</p>
              <p>{email}</p>
              <p>{fechaNacimiento}</p>
            </div>
            <p>{descripcion}</p>
            <button className="btnEditarPerfil" onClick={() => setMostrarPopup(true)}>Modificar perfil</button>
          </div>
          <div>
            <img src="https://www.micole.net/imagenes/colegio/logo/20718/educem-ii_512.png?v=MjAyMi0wOC0zMSAwMDoyODoyOA==" alt="Imagen Centro" className="ImagenCentroPerfil" />
          </div>
        </div>
      </div>

      {mostrarPopup && (
        <div className="popupOverlay">
          <div className="popupContenido">
            <h3>Editar Perfil</h3>
            <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" />
            <input value={ubicacion} onChange={e => setUbicacion(e.target.value)} placeholder="Ubicación" />
            <input value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="Teléfono" />
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} placeholder="Fecha de nacimiento" />
            <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Descripción" />
            <button onClick={handleGuardar}>Guardar</button>
            <button onClick={() => setMostrarPopup(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </main>
  );
}

export default PerfilPropio;
