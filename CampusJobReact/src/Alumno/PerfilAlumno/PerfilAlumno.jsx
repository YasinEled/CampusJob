import "./Style/perfilPropio.css";
import pfp from '../../assets/yasin.jpg';
import pfpFondo from '../../assets/yasinfondo.jpg';
import ListaOfertasSolicitadas from "../llistaOfertasEstado";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function PerfilPropio({
  nombreInicial,
  ubicacionInicial,
  telefonoInicial,
  emailInicial,
  fechaNacimientoInicial,
  descripcionInicial,
  fotoPerfil = pfp,
  fotoFondo = pfpFondo
}) {
  const { t, ready } = useTranslation();
  
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [nombre, setNombre] = useState(nombreInicial || "");
  const [ubicacion, setUbicacion] = useState(ubicacionInicial || "");
  const [telefono, setTelefono] = useState(telefonoInicial || "");
  const [email, setEmail] = useState(emailInicial || "");
  const [fechaNacimiento, setFechaNacimiento] = useState(fechaNacimientoInicial || "");
  const [descripcion, setDescripcion] = useState(descripcionInicial || "");

  
  const handleGuardar = () => {
    setMostrarPopup(false);
    // Aquí podrías emitir un evento o llamar una función para guardar los cambios fuera
  };

  if (!ready) {
    return <div>Cargando...</div>;
  }

  return (
    <main className="perfilContainer">
      <div className="PerfilUsuario">
        <div className="fondo">
          <img src={fotoFondo} alt={t("perfil.fondo_alt")} />
          <img className="profile" src={fotoPerfil} alt={t("perfil.perfil_alt")} />
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
            <button 
              className="btnEditarPerfil" 
              onClick={() => setMostrarPopup(true)}
            >
              {t("perfil.modificar_perfil")}
            </button>
          </div>
          <div>
            <img
              src="https://www.micole.net/imagenes/colegio/logo/20718/educem-ii_512.png?v=MjAyMi0wOC0zMSAwMDoyODoyOA=="
              alt={t("perfil.imagen_centro_alt")}
              className="ImagenCentroPerfil"
            />
          </div>
        </div>
      </div>

      {mostrarPopup && (
        <div className="perfilAlumnopopup-Overlay">
          <div className="perfilAlumnopopup-Contenido">
            <h3>{t("perfil.editar_perfil")}</h3>
            <input 
              value={nombre} 
              onChange={e => setNombre(e.target.value)} 
              placeholder={t("perfil.nombre")} 
            />
            <input 
              value={ubicacion} 
              onChange={e => setUbicacion(e.target.value)} 
              placeholder={t("perfil.ubicacion")} 
            />
            <input 
              value={telefono} 
              onChange={e => setTelefono(e.target.value)} 
              placeholder={t("perfil.telefono")} 
            />
            <input 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder={t("perfil.email")} 
            />
            <input 
              value={fechaNacimiento} 
              onChange={e => setFechaNacimiento(e.target.value)} 
              placeholder={t("perfil.fecha_nacimiento")} 
            />
            <textarea 
              value={descripcion} 
              onChange={e => setDescripcion(e.target.value)} 
              placeholder={t("perfil.descripcion")} 
            />

            <label className="perfilAlumnopopup-btnSubirArchivo">
              {t("perfil.aniadir_cv")}
              <input
                type="file"
                accept="application/pdf,image/*"
                style={{ display: "none" }}
                onChange={e => {
                  const file = e.target.files[0];
                  if (file) {
                    alert(`${t("perfil.archivo_seleccionado")}: ${file.name}`);
                  }
                }}
              />
            </label>

            <label className="perfilAlumnopopup-btnSubirImagen">
              {t("perfil.aniadir_foto")}
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={e => {
                  const file = e.target.files[0];
                  if (file) {
                    alert(`${t("perfil.archivo_seleccionado")}: ${file.name}`);
                  }
                }}
              />
            </label>

            <button 
              className="perfilAlumnopopup-btnGuardar" 
              onClick={handleGuardar}
            >
              {t("perfil.guardar")}
            </button>
            <button 
              className="perfilAlumnopopup-btnCancelar" 
              onClick={() => setMostrarPopup(false)}
            >
              {t("perfil.cancelar")}
            </button>
          </div>
        </div>
      )}
      
      <ListaOfertasSolicitadas />
    </main>
  );
}

export default PerfilPropio;
