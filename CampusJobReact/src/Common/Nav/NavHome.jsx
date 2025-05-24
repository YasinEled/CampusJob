import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
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
    },
    {
      path: "/Profesor/centro/11/CrearUsuarios",
      icon: <UserAddOutlined />,
      label: "AddUser",
    },
    {
      path: "centro/:centroId/añadirCurso",
      icon: <BookOutlined />,
      label: "Usuarios",
    },
    {
      path: "/BuscadorPerfil",
      icon: <TeamOutlined />,
      label: "Fitrado Usuario",
    },
    {
      path: "/centro/${localStorage.getItem('centroId')}/elegirCurso",
      icon: <HomeOutlined />,
      label: "Home",
    },
  ],
  2: [
    { path: "/courses", icon: <BookOutlined />, label: "Cursos" },
    { path: "/AñadirCentro", icon: <UserAddOutlined />, label: "AddUser" },
    { path: "/BusquedaOfertas", icon: <HomeOutlined />, label: "Home" },
    {
      path: "/BuscadorPerfil",
      icon: <TeamOutlined />,
      label: "Fitrado Usuario",
    },
    { path: "/PerfilProfesor", icon: <UserOutlined />, label: "Perfil" },
  ],
  0: [
    {
      path: "/BuscadorPerfil",
      icon: <TeamOutlined />,
      label: "Fitrado Usuario",
    },
    {
      path: "/Alumno/PerfilAlumno/:idUsrAlumno",
      icon: <UserOutlined />,
      label: "Perfil",
    },
    {
      path: "/centro/${centroId}/elegirCurso",
      icon: <HomeOutlined />,
      label: "Home",
    },
  ],
  1: [
    {
      path: "/Empresa/añadirOferta",
      icon: <ShopOutlined />,
      label: "Publicar Oferta",
    },
    {
      path: "/BuscadorPerfil",
      icon: <TeamOutlined />,
      label: "Fitrado Usuario",
    },
    {
      path: "/centro/:centroId/curso/:cursoId/BuscarOfertas",
      icon: <SearchOutlined />,
      label: "Filtrador Oferta",
    },
    {
      path: "/centro/${localStorage.getItem('centroId')}/elegirCurso",
      icon: <HomeOutlined />,
      label: "Filtrador Oferta",
    },
    {
      path: "/Empresa/PerfilEmpresa/:idUsrEmpresa",
      icon: <UserOutlined />,
      label: "Perfil",
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

  const menuItems = menuConfig[userType] || [];

  return (
    <nav className="navHome">
      <div className="logoNavSelector">
        <img className="logoNav" src={logoIcon} alt="CampusJob Icon" />
        <img className="logoLetrasNav" src={logoLetras} alt="CampusJob Letras" />
      </div>
      <ul className="selectorsNav">
        {/* Botón de cambio de tema */}
        <li>
          <button onClick={() => setIsLightMode(!isLightMode)} className="theme-toggle">
            <SunOutlined />
          </button>
        </li>

        {/* Menú desplegable de idiomas */}
        <li>
          <Dropdown overlay={languageMenu} placement="bottomRight" trigger={['click']}>
            <button className="CambiarLeng">
              <GlobalOutlined />
            </button>
          </Dropdown>
        </li>

        {/* Menú dinámico según tipo de usuario */}
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link to={`${item.path}`} title={item.label} className="selector-item">
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
