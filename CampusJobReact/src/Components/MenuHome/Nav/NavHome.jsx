import { useState, useEffect } from "react";
import { UserOutlined, GlobalOutlined, HeartOutlined, InboxOutlined, SunOutlined } from "@ant-design/icons";
import "../../ComponentsCSS/MenuHome/navHome.css";

// Importamos ambas versiones del logo
const logoLetrasLight = new URL("../../../assets/Logo/ssCampusJobGreen.png", import.meta.url).href;
const logoLetrasDark = new URL("../../../assets/Logo/ssCampusJob.png", import.meta.url).href;
const logoIconLight = new URL("../../../assets/Logo/CampusJobBorderLogoGreen.png", import.meta.url).href;
const logoIconDark = new URL("../../../assets/Logo/logoroundblanco.png", import.meta.url).href;


function NavHome() {
  const [isLightMode, setIsLightMode] = useState(() => {
    return localStorage.getItem("theme") === "light";
  });

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    }
  }, [isLightMode]);

  // Seleccionar imágenes según el modo actual
  const logoLetras = isLightMode ? logoLetrasLight : logoLetrasDark;
  const logoIcon = isLightMode ? logoIconLight : logoIconDark;

  return (
    <nav className="navHome">
      <div className="logoNavSelector">
        <img className="logoNav" src={logoIcon} alt="CampusJob Icon" />
        <img className="logoLetrasNav" src={logoLetras} alt="CampusJob Letras" />
      </div>
      <ul className="selectorsNav">
        <li>
          <a href="#" onClick={() => setIsLightMode(!isLightMode)}>
            <SunOutlined />
          </a>
        </li>
        <li>
          <a href="/"><HeartOutlined /></a>
        </li>
        <li>
          <a href="/"><InboxOutlined /></a>
        </li>
        <li>
          <a href="/"><GlobalOutlined /></a>
        </li>
        <li>
          <a href="/"><UserOutlined /></a>
        </li>
      </ul>
    </nav>
  );
}

export default NavHome;
