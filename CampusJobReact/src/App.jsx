import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./index.css";


function App() {
  const { t, i18n } = useTranslation("global");
  const [showLangOptions, setShowLangOptions] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLangOptions(false);
  };

  return (
    <main>
      <div className="marginHeader">
        <div className="language-selector">
          <button className="transparent-button" onClick={() => setShowLangOptions(!showLangOptions)}>
            {showLangOptions ? (
              <span >leng&nbsp;&nbsp;&nbsp;&nbsp;▲&nbsp;&nbsp;</span>
            ) : (
              <span >leng&nbsp;&nbsp;&nbsp;&nbsp;▼&nbsp;&nbsp;</span>
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
            <img className="logoMini" src="/src/assets/Logo/CampusJob.png" alt="Logo" />
          </div>
          <div className="col-12 col-lg-6 ml-5 mr-5">
            <form action="./PHP/login.php" method="POST">
              <div className="form-group">
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" placeholder="Username" />
                <input type="password" className="form-control" id="exampleInputPassword1" name="password" placeholder="Password" />
              </div>
              <button type="submit" className="btn-login">{t("header.login")}</button>
            </form>
          </div>
        </div>
      </div>
      <div className="marginFooter"></div>
      <footer className="col-12 text-center">
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
    </main>
  );
}

export default App;
