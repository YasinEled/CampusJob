import {HomeOutlined, SettingOutlined, DollarOutlined, FundProjectionScreenOutlined } from '@ant-design/icons';
import Imagenlogomenuizquierdahecho from '../../../assets/Logo/CampusJobBorderLogo.png';
import '../../ComponentsCSS/MenuHome/menu.css';


function Menu() {


    return (
      <main>
        <img src={Imagenlogomenuizquierdahecho} alt="Logo" />
        <nav>
          <ul>
            <li>
              <a href="/menu"  className='inici'><HomeOutlined  className="logoMnuIzq"/>Inici</a>
            </li>
            <li>
              <a href="/menu" className='inici'><FundProjectionScreenOutlined className="logoMnuIzq" />Empresas</a>
            </li>
            <li>
              <a href="/menu" className='inici'><DollarOutlined className="logoMnuIzq"/>Salaris</a>
            </li>
            <li>
              <a href="/menu" className='inici'> <SettingOutlined className="logoMnuIzq" />Configuració</a>
            </li>
          </ul>
        </nav>
      </main>
    );
  }
  
export default Menu;
  