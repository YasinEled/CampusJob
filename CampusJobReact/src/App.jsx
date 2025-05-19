import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./index.css";

function App() {
  const { t, i18n } = useTranslation("global");
  const [showLangOptions, setShowLangOptions] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLangOptions(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await fetch('http://localhost:4000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        setMessage(data.message);

        if (data.success) {
          console.log(
            "[Login] guardando en localStorage →",  
            "idUsuario:", data.idUsuario,
            "nivelUsuario:", data.nivelUsuario
          );
          localStorage.setItem("idUsuario", data.idUsuario);
          localStorage.setItem("nivelUsuario", data.nivelUsuario);
          console.log(
            "[Login] valores en localStorage →",
            "idUsuario:", localStorage.getItem("idUsuario"),
            "nivelUsuario:", localStorage.getItem("nivelUsuario")
          );
          // Navega a la ruta donde toca que vaya cada usr.
          if(data.nivelUsuario==0) {navigate("/Alumno/BusquedaOfertas");}
          else if(data.nivelUsuario==1) {navigate("/");}
          else if(data.nivelUsuario==2) {navigate("/Alumno/BusquedaOfertas");}
          else if(data.nivelUsuario==3) {navigate("/Alumno/BusquedaOfertas");}
          else if(data.nivelUsuario==4) {navigate("/AdminSupremo/homeAdmin");}


        }
    } catch (error) {
        console.error('Error:', error);
        setMessage(t("login.connectionError"));
    }
  };

  return (
    <div className="page-wrapper body-style">
      <main className="main-wrapper">
        <div className="marginHeader">
          <div className="language-selector">
            <button className="transparent-button" onClick={() => setShowLangOptions(!showLangOptions)}>
              {showLangOptions ? (
                <span>lang&nbsp;&nbsp;&nbsp;&nbsp;▲&nbsp;&nbsp;</span>
              ) : (
                <span>lang&nbsp;&nbsp;&nbsp;&nbsp;▼&nbsp;&nbsp;</span>
              )}
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
                    id="exampleInputUsername1"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                  />
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
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