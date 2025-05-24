import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
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
  AppstoreAddOutlined,
} from "@ant-design/icons";
import './Style/menu.css';

const menuConfig = {
  4: [
    { path: '/AdminSupremo/homeAdmin', icon: <SettingOutlined />, label: 'Home Admin' },
    { path: '/AdminSupremo/AñadirCentro', icon: <AppstoreAddOutlined />, label: 'Añadir Centro' },

  ],
  3: [
    { path: '/dashboard', icon: <TeamOutlined />, label: 'Panel' },
    { path: '/users', icon: <UserOutlined />, label: 'Usuarios' },
    { path: '/settings', icon: <SettingOutlined />, label: 'Ajustes' },
  ],
  2: [
    { path: '/courses', icon: <BookOutlined />, label: 'Cursos' },
    { path: '/profile', icon: <UserOutlined />, label: 'Perfil' },
  ],
  0: [
    { path: '/centro/${centroId}/elegirCurso', icon: <HomeOutlined />, label: 'Inicio' },
    { path: '/favorites', icon: <HeartOutlined />, label: 'Favoritos' },
  ],
  1: [
    { path: '/home', icon: <HomeOutlined />, label: 'Inicio' },
    { path: '/post-job', icon: <ShopOutlined />, label: 'Publicar' },
  ],
};

function Menu({ userType }) {
  const menuItems = menuConfig[userType] || [];

  return (
    <main className="MeuIzq">
      <nav className="MenuIzqNav">
        <ul>
          {menuItems.map(item => (
            <li key={item.path} className="limenuizq">
              <Link to={item.path} className="inici" title={item.label}>
                {item.icon}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}

Menu.propTypes = {
  userType: PropTypes.oneOf(["AdminSupremo", "Admin", "Profesor", "Alumno", "Empresa"]).isRequired,
};

export default Menu;
