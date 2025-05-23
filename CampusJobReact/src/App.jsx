import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./index.css";

function App() {
  const { t, i18n } = useTranslation("global");
  const [showLangOptions, setShowLangOptions] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLangOptions(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernameOrEmail, password }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (data.success) {
        console.log("[Login] guardando en localStorage →", data);


        // Guardar idCentro en localStorage
        localStorage.setItem("idCentro", data.idCentro);
  console.log("[Login] localStorage.getItem('idCentro') =", localStorage.getItem("idCentro"));

        // Redirigir según nivel y si es primer inicio
        if (data.firstLogin && [0, 1, 2].includes(parseInt(data.nivelUsuario))) {
          localStorage.setItem("idUsuarioAux", data.idUsuario);
          localStorage.setItem("nivelUsuarioAux", data.nivelUsuario);
          if (data.nivelUsuario == 0) {
            navigate("/PrimerInicio/Alumno");
          } else if (data.nivelUsuario == 1) {
            navigate("/PrimerInicio/Empresa");
          } else if (data.nivelUsuario == 2) {
            navigate("/PrimerInicio/Profesor");
          }
        } else {
          localStorage.setItem("idUsuario", data.idUsuario);
          localStorage.setItem("nivelUsuario", data.nivelUsuario);
          // idCentro ya lo pusimos arriba
          if (data.nivelUsuario == 0) {
            navigate(`/Alumno/`);
          } else if (data.nivelUsuario == 1) {
            navigate(`/empresa/`);
          } else if (data.nivelUsuario == 2) {
            navigate(`/profesor`);
          } else if (data.nivelUsuario == 3) {
            navigate("/adminCentro/");
          } else if (data.nivelUsuario == 4) {
            navigate("/AdminSupremo/homeAdmin");
          }
        }
      } else {
        localStorage.setItem("idUsuario", 10);
        localStorage.setItem("nivelUsuario", 4);
          //localStorage.setItem("idCentro", 10); // ✅ Nuevo campo

        console.log("Navegando a home admin");

        navigate("/AdminSupremo/homeAdmin");
        setMessage(data.message || "Credenciales incorrectas");
      }
    } catch (error) {
          //localStorage.setItem("idCentro", 10); // ✅ Nuevo campo
      localStorage.setItem("idUsuario", 10);
        localStorage.setItem("nivelUsuario", 4);
        console.log("Navegando a home admin");

      navigate("/AdminSupremo/homeAdmin");
      console.error("Error en login:", error);
      setMessage(t("login.connectionError"));
    }
  };

  return (
    <div className="page-wrapper body-style">
      <main className="main-wrapper">
        <div className="marginHeader">
          <div className="language-selector">
            <button className="transparent-button" onClick={() => setShowLangOptions(!showLangOptions)}>
              {showLangOptions ? <span>lang&nbsp;&nbsp;&nbsp;&nbsp;▲&nbsp;&nbsp;</span> : <span>lang&nbsp;&nbsp;&nbsp;&nbsp;▼&nbsp;&nbsp;</span>}
            </button>
            {showLangOptions && (
              <div className="lang-options">
                <button className="transparent-button" onClick={() => changeLanguage('es')}>Es</button>
                <button className="transparent-button" onClick={() => changeLanguage('en')}>En</button>
                <button className="transparent-button" onClick={() => changeLanguage('cat')}>Cat</button>
              </div>
            )}
          </div>
        </div>
        <div className="container">
          <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center">
            <div className="col-12 col-lg-6 mr-5 ml-5">
              <img className="logoMini" src="/src/assets/Logo/CampusJob.png" alt="Logo CampusJob" />
            </div>
            <div className="col-12 col-lg-6 ml-5 mr-5">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="usernameOrEmail"
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    placeholder="Nombre de usuario o email"
                    required
                  />
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    required
                  />
                </div>
                <button type="submit" className="btn-login">{t("header.login")}</button>
              </form>
              {message && <h4>{message}</h4>}
            </div>
          </div>
        </div>
        <div className="marginFooter"></div>
      </main>
      <footer className="footer-container col-12 text-center">
        <div className="footer-links">
          <a href="#">{t("footer.information")}</a>
          <a href="#">{t("footer.help")}</a>
          <a href="#">{t("footer.cookies")}</a>
          <a href="#">{t("footer.privacyPolicy")}</a>
          <a href="#">{t("footer.accessibility")}</a>
          <a href="#">{t("footer.termsOfService")}</a>
        </div>
        <div>
          <p className="p-footer">© 2025 Campus Job.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;