import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { canSee } from "../utils/permissions";
import { useTranslation } from "react-i18next";
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
  SearchOutlined,
  TeamOutlined,
  BookOutlined,
  CheckSquareOutlined,
  ShopOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import PropTypes from "prop-types";
import "./Style/navHome.css";

// Importamos ambas versiones del logo
const logoLetrasLight = new URL(
  "../../assets/Logo/ssCampusJobGreen.png",
  import.meta.url
).href;
const logoLetrasDark = new URL(
  "../../assets/Logo/ssCampusJob.png",
  import.meta.url
).href;
const logoIconLight = new URL(
  "../../assets/Logo/CampusJobBorderLogoGreen.png",
  import.meta.url
).href;
const logoIconDark = new URL(
  "../../assets/Logo/logoroundblanco.png",
  import.meta.url
).href;

// Configuración de menús por tipo de usuario
const menuConfig = {
  4: [
    {
      path: `/AdminSupremo/AñadirCentro`,
      icon: <AppstoreAddOutlined />,
      label: "Añadir Centro",
      allowedTypes: [4],
    },
    {
      path: "/BuscadorPerfil",
      icon: <TeamOutlined />,
      label: "Fitrado Usuario",
    },
    {
      path: "/AdminSupremo/HomeAdmin",
      icon: <HomeOutlined />,
      label: "Home Admin",
    },
  ],
  3: [
    {
      path: "GestionarCursosAlumnos",
      icon: <FormOutlined />,
      label: "AddCurso",
      allowedTypes: [3, 4],

    },
    {
      path: "/BuscadorPerfil",
      icon: <TeamOutlined />,
      label: "Fitrado Usuario",
      allowedTypes: [0,1,2,3, 4],

    },

  ],
  2: [
    {
      path: "/BuscadorPerfil",
      icon: <TeamOutlined />,
      label: "Fitrado Usuario",
      allowedTypes: [0,1,2, 3, 4],
    },
    { path: "/Alumno/PerfilProfesor/" + localStorage.getItem("idUsuario"), 
      icon: <UserOutlined />, 
      label: "Perfil",
      allowedTypes: [2]
    }
  ],
  0: [
    {
      path: "/BuscadorPerfil",
      icon: <TeamOutlined />,
      label: "Fitrado Usuario",
      allowedTypes: [0,1,2, 3, 4],
    },
    {
      path: "/Alumno/PerfilAlumno/" + localStorage.getItem("idUsuario"),
      icon: <UserOutlined />,
      label: "Perfil",
      allowedTypes: [0],
    },
  ],
  1: [
    {
      path: "/Empresa/gestioOferta/:idOferta",
      icon: <CheckSquareOutlined />,
      label: "Publicar Oferta",
      allowedTypes: [1],
    },
    {
      path: "/BuscadorPerfil",
      icon: <TeamOutlined />,
      label: "Fitrado Usuario",
      allowedTypes: [0,1,2, 3, 4],
    },
    {
      path: "/Empresa/PerfilEmpresa/" + localStorage.getItem("idUsuario"),
      icon: <UserOutlined />,
      label: "Perfil",
      allowedTypes: [1],
    },
  ],
};

function NavHome({ userType }) {
  const [isLightMode, setIsLightMode] = useState(() => {
    return localStorage.getItem("theme") === "light";
  });

  const { i18n } = useTranslation();

  const handleLanguageChange = ({ key }) => {
    i18n.changeLanguage(key);
  };

  const languageMenu = (
    <Menu
      onClick={handleLanguageChange}
      items={[
        { key: "ca", label: "Català" },
        { key: "es", label: "Español" },
        { key: "en", label: "English" },
        { key: "fr", label: "Français" },
      ]}
    />
  );

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    }
  }, [isLightMode]);

  const logoLetras = isLightMode ? logoLetrasLight : logoLetrasDark;
  const logoIcon = isLightMode ? logoIconLight : logoIconDark;
  const userTypeNum =
    typeof userType === "string"
      ? parseInt(userType.replace(/\D/g, ""), 10)
      : userType;

  const menuItems = menuConfig[userTypeNum] || [];

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

        {/* Menú desplegable de idiomas */}
        <li>
          <Dropdown
            overlay={languageMenu}
            placement="bottomRight"
            trigger={["click"]}
          >
            <button className="CambiarLeng">
              <GlobalOutlined />
            </button>
          </Dropdown>
        </li>

        {/* Menú dinámico según tipo de usuario */}
        {menuItems
          .filter((item) => canSee(userTypeNum, item?.allowedTypes))
          .map((item) => (
            <li key={item.path}>
              <Link to={item.path} title={item.label} className="selector-item">
                {item.icon}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
}

NavHome.propTypes = {
  userType: PropTypes.oneOf([0, 1, 2, 3, 4]).isRequired,
};

export default NavHome;
