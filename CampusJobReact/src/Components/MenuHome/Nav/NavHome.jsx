import { useState, useEffect } from "react";
import { UserOutlined, GlobalOutlined, HeartOutlined, InboxOutlined, SunOutlined } from "@ant-design/icons";
import "../../ComponentsCSS/MenuHome/navHome.css";
import logoLetras from "../../../assets/Logo/ssCampusJob.png";
import logoIcon from "../../../assets/Logo/logoroundblanco.png";

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

  return (
    <nav className="navHome">
      <div className="logoNavSelector">
        <img className="logoNav" src={logoIcon} alt="CampusJobLetras" />
        <img className="logoLetrasNav" src={logoLetras} alt="CampusJobLetras" />
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
