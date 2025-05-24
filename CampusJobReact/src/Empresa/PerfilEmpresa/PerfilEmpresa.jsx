import "./Style/perfilEmpresa.css";
import logoEmpresa from "../../assets/yasin.jpg";
import fondoEmpresa from "../../assets/yasinfondo.jpg";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import ListaOfertasPropias from "../ListaOfertaspropias";

function PerfilEmpresa() {
  const { t } = useTranslation();

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
    console.log(t("perfilEmpresa.logMensajeEnviado"), mensaje);
    setMensaje("");
    setMostrarMensaje(false);
  };

  const handleCambiarFoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(t("perfilEmpresa.msgNuevaFoto", { name: file.name }));
      // Implementa la lógica para actualizar la foto
    }
  };

  return (
    <main className="PerfilEmpresaContainer">
      <div className="PerfilEmpresaMain">
        <div className="PerfilEmpresaFondo">
          <img src={fondoEmpresa} alt={t("perfilEmpresa.altFondo") || "Fondo"} />
          <img
            className="PerfilEmpresaLogo"
            src={logoEmpresa}
            alt={t("perfilEmpresa.altLogo") || "Logo"}
          />
        </div>
        <div className="PerfilEmpresaInfoContainer">
          <div className="PerfilEmpresaInfoPerfil">
            <h2>{nombre}</h2>
            <p>{ubicacion}</p>
            <p>
              <strong>{t("perfilEmpresa.sector")}:</strong> {sector}
            </p>
            <p>
              <strong>{t("perfilEmpresa.fundacion")}:</strong> {fundacion}
            </p>
            <p>
              <strong>{t("perfilEmpresa.telefono")}:</strong> {telefono}
            </p>
            <p>
              <strong>{t("perfilEmpresa.email")}:</strong> {email}
            </p>
            <p>{descripcion}</p>
            {nivelUsuario == "1" && (
              <button
                className="PerfilEmpresaBtnEditarPerfil"
                onClick={() => setMostrarPopup(true)}
              >
                {t("perfilEmpresa.modificarPerfil")}
              </button>
            )}

            <button
              className="PerfilEmpresaBtnMensaje"
              onClick={() => setMostrarMensaje(true)}
            >
              {t("perfilEmpresa.enviarMensaje")}
            </button>
          </div>
        </div>
      </div>

      {mostrarPopup && (
        <div className="PerfilEmpresaPopupOverlay">
          <div className="PerfilEmpresaPopupContenido">
            <h3>{t("perfilEmpresa.editarPerfil")}</h3>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder={t("perfilEmpresa.nombreEmpresa")}
            />
            <input
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              placeholder={t("perfilEmpresa.ubicacion")}
            />
            <input
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              placeholder={t("perfilEmpresa.sector")}
            />
            <input
              value={fundacion}
              onChange={(e) => setFundacion(e.target.value)}
              placeholder={t("perfilEmpresa.anoFundacion")}
            />
            <input
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder={t("perfilEmpresa.telefono")}
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("perfilEmpresa.email")}
            />
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder={t("perfilEmpresa.descripcion")}
            />

            <button
              className="PerfilEmpresaBtnCambiarFoto"
              onClick={() => fileInputRef.current.click()}
            >
              {t("perfilEmpresa.cambiarFoto")}
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleCambiarFoto}
              style={{ display: "none" }}
            />

            <button onClick={handleGuardar}>{t("common.guardar")}</button>
            <button onClick={() => setMostrarPopup(false)}>{t("common.cancelar")}</button>
          </div>
        </div>
      )}

      {mostrarMensaje && (
        <div className="PerfilEmpresaPopupOverlay">
          <div className="PerfilEmpresaPopupContenido">
            <h3>{t("perfilEmpresa.enviarMensajeEmpresa")}</h3>
            <textarea
              placeholder={t("perfilEmpresa.placeholderMensaje")}
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />
            <button onClick={handleEnviarMensaje}>{t("common.enviar")}</button>
            <button onClick={() => setMostrarMensaje(false)}>{t("common.cancelar")}</button>
          </div>
        </div>
      )}

      <ListaOfertasPropias />
    </main>
  );
}

export default PerfilEmpresa;
