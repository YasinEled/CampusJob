
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  UserOutlined,
  HomeOutlined,
  UserAddOutlined,
  FormOutlined,
  GlobalOutlined,
  HeartOutlined,
  InboxOutlined,
  SunOutlined,
  SettingOutlined,
  TeamOutlined,
  BookOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import "../../ComponentsCSS/MenuHome/navHome.css";

// Importamos ambas versiones del logo
const logoLetrasLight = new URL(
  "../../../assets/Logo/ssCampusJobGreen.png",
  import.meta.url
).href;
const logoLetrasDark = new URL(
  "../../../assets/Logo/ssCampusJob.png",
  import.meta.url
).href;
const logoIconLight = new URL(
  "../../../assets/Logo/CampusJobBorderLogoGreen.png",
  import.meta.url
).href;
const logoIconDark = new URL(
  "../../../assets/Logo/logoroundblanco.png",
  import.meta.url
).href;

// Configuración de menús por tipo de usuario
const menuConfig = {
  AdminSupremo: [
    { path: `/AñadirCentro`, icon: <FormOutlined />, label: "AddCentro" },
    { path: "/AñadirUsuario", icon: <UserAddOutlined />, label: "AddUser" },
    { path: "/users", icon: <TeamOutlined />, label: "Usuarios" },
    { path: "/global", icon: <GlobalOutlined />, label: "Global" },
    { path: "/settings", icon: <SettingOutlined />, label: "Ajustes" },
    { path: "/HomeAdmin", icon: <HomeOutlined />, label: "Home" },
    { path: "/profile", icon: <UserOutlined />, label: "Perfil" },
  ],
  Admin: [
    { path: "/AñadirCurso", icon: <FormOutlined />, label: "AddCurso" },
    { path: "/AñadirCentro", icon: <UserAddOutlined />, label: "AddUser" },
    { path: "/CrearUsuarios", icon: <TeamOutlined />, label: "Usuarios" },
    { path: "/global", icon: <GlobalOutlined />, label: "Global" },
    { path: "/settings", icon: <SettingOutlined />, label: "Ajustes" },
    { path: "/home", icon: <HomeOutlined />, label: "Home" },
    { path: "/HomeCursos", icon: <UserOutlined />, label: "Perfil" },
  ],
  Profesor: [
    { path: "/courses", icon: <BookOutlined />, label: "Cursos" },
    { path: "/AñadirCentro", icon: <UserAddOutlined />, label: "AddUser" },
    { path: "/inbox", icon: <InboxOutlined />, label: "Mensajes" },
    { path: "/settings", icon: <SettingOutlined />, label: "Ajustes" },
    { path: "/home", icon: <HomeOutlined />, label: "Home" },
    { path: "/profile", icon: <UserOutlined />, label: "Perfil" },
  ],
  Alumno: [
    { path: "/favorites", icon: <HeartOutlined />, label: "Favoritos" },
    { path: "/inbox", icon: <InboxOutlined />, label: "Mensajes" },
    { path: "/settings", icon: <SettingOutlined />, label: "Ajustes" },
    { path: "/home", icon: <HomeOutlined />, label: "Home" },
    { path: "/profile", icon: <UserOutlined />, label: "Perfil" },
  ],
  Empresa: [
    { path: "/post-job", icon: <ShopOutlined />, label: "Publicar" },
    { path: "/favorites", icon: <HeartOutlined />, label: "Favoritos" },
    { path: "/settings", icon: <SettingOutlined />, label: "Ajustes" },
    { path: "/home", icon: <HomeOutlined />, label: "Home" },
    { path: "/profile", icon: <UserOutlined />, label: "Perfil" },
  ],
};

function NavHome({ userType }) {
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

  // Obtener menú para el tipo de usuario, o un menú vacío si no existe
  const menuItems = menuConfig[userType] || [];

  return (
    <nav className="navHome">
      <div className="logoNavSelector">
        <img className="logoNav" src={logoIcon} alt="CampusJob Icon" />
        <img
          className="logoLetrasNav"
          src={logoLetras}
          alt="CampusJob Letras"
        />
      </div>
      <ul className="selectorsNav">
        {/* Botón de cambio de tema */}
        <li>
          <button
            onClick={() => setIsLightMode(!isLightMode)}
            className="theme-toggle"
          >
            <SunOutlined />
          </button>
        </li>

        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={`/${userType}${item.path}`} 
              title={item.label}
              className="selector-item"
            >
              {item.icon}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

NavHome.propTypes = {
  userType: PropTypes.oneOf([
    "AdminSupremo",
    "Admin",
    "Profesor",
    "Alumno",
    "Empresa",
  ]).isRequired,
};

export default NavHome;
