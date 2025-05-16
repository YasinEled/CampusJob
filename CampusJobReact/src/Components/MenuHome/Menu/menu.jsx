import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  SettingOutlined,
  DollarOutlined,
  FundProjectionScreenOutlined,
  TeamOutlined,
  BookOutlined,
  HeartOutlined,
  ShopOutlined,
  UserOutlined,
} from '@ant-design/icons';
import '../../ComponentsCSS/MenuHome/menu.css';

const menuConfig = {
  AdminSupremo: [
    { path: '/dashboard', icon: <TeamOutlined />, label: 'Panel' },
    { path: '/settings', icon: <SettingOutlined />, label: 'Ajustes' },
    { path: '/finance', icon: <DollarOutlined />, label: 'Finanzas' },
    { path: '/reports', icon: <FundProjectionScreenOutlined />, label: 'Informes' },
  ],
  Admin: [
    { path: '/dashboard', icon: <TeamOutlined />, label: 'Panel' },
    { path: '/users', icon: <UserOutlined />, label: 'Usuarios' },
    { path: '/settings', icon: <SettingOutlined />, label: 'Ajustes' },
  ],
  Profesor: [
    { path: '/courses', icon: <BookOutlined />, label: 'Cursos' },
    { path: '/messages', icon: <FundProjectionScreenOutlined />, label: 'Mensajes' },
    { path: '/profile', icon: <UserOutlined />, label: 'Perfil' },
  ],
  Alumno: [
    { path: '/home', icon: <HomeOutlined />, label: 'Inicio' },
    { path: '/search', icon: <FundProjectionScreenOutlined />, label: 'Buscar' },
    { path: '/favorites', icon: <HeartOutlined />, label: 'Favoritos' },
  ],
  Empresa: [
    { path: '/home', icon: <HomeOutlined />, label: 'Inicio' },
    { path: '/post-job', icon: <ShopOutlined />, label: 'Publicar' },
    { path: '/finance', icon: <DollarOutlined />, label: 'Finanzas' },
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
