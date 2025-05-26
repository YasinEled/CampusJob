import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { UserOutlined,ShopOutlined, HomeOutlined, BookOutlined,HeartOutlined,LogoutOutlined,TeamOutlined,SettingOutlined,AppstoreAddOutlined/* ... otros iconos ... */ } from "@ant-design/icons";
import { canSee } from '../utils/permissions'; // Ajusta la ruta
import './Style/menu.css';

const menuConfig = {
  4: [
    { 
      path: '/AdminSupremo/homeAdmin', 
      icon: <SettingOutlined />, 
      label: 'Home Admin',
      allowedTypes: [4] // Solo AdminSupremo
    },
    { 
      path: '/AdminSupremo/AñadirCentro', 
      icon: <AppstoreAddOutlined />, 
      label: 'Añadir Centro',
      allowedTypes: [4]
    },
  ],
  3: [
     { 
      path: '/centro/${centroId}/elegirCurso', 
      icon: <HomeOutlined />, 
      label: 'Inicio',
      allowedTypes: [3] // Alumno + admins
    },
    { 
      path: '/Profesor/centro/:centroId/CrearUsuarios', 
      icon: <BookOutlined />, 
      label: 'Crear Usuarios',
      allowedTypes: [3] // Profesor + admins
    },
  ],
  2: [
     { 
      path: '/centro/${centroId}/elegirCurso', 
      icon: <HomeOutlined />, 
      label: 'Inicio',
      allowedTypes: [2,3,4] // Alumno + admins
    },
    { 
      path: '/Profesor/centro/:centroId/CrearUsuarios', 
      icon: <BookOutlined />, 
      label: 'Crear Usuarios',
      allowedTypes: [2,3,4] // Profesor + admins
    },
  ],
  0: [
    { 
      path: '/centro/${centroId}/elegirCurso', 
      icon: <HomeOutlined />, 
      label: 'Inicio',
      allowedTypes: [0,3,4] // Alumno + admins
    },
    { 
      path: '/favorites', 
      icon: <HeartOutlined />, 
      label: 'Favoritos',
      allowedTypes: [0,3,4]
    },
  ],
  1: [
    { 
      path: '/centro/${centroId}/elegirCurso', 
      icon: <HomeOutlined />, 
      label: 'Inicio',
      allowedTypes: [1,3,4] // Empresa + admins
    },
    { 
      path: '/Empresa/AñadirOferta', 
      icon: <ShopOutlined />, 
      label: 'Publicar',
      allowedTypes: [1,3,4]
    },
  ],
};

function Menu({ userType }) {
  // Convertir a número si viene como string
  const userTypeNum = typeof userType === 'string' 
    ? parseInt(userType.replace(/\D/g, ''), 10) 
    : userType;

  const menuItems = menuConfig[userTypeNum] || [];

  return (
    <main className="MeuIzq">
      <nav className="MenuIzqNav">
        <ul>
          {menuItems
            .filter(item => canSee(userTypeNum, item.allowedTypes))
            .map(item => (
              <li key={item.path} className="limenuizq">
                <Link to={item.path} className="inici" title={item.label}>
                  {item.icon}
                </Link>
              </li>
            ))}
            <li  className="limenuizq">
              <li className="limenuizq">
                <Link to="/" className="inici" title="Cerrar sesión">
                  <LogoutOutlined />
                </Link>
              </li>
              
            </li>
        </ul>
      </nav>
    </main>
  );
}

Menu.propTypes = {
  userType: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(["AdminSupremo", "Admin", "Profesor", "Alumno", "Empresa"])
  ]).isRequired,
};


export default Menu;