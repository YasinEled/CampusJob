import {HomeOutlined, SettingOutlined, DollarOutlined, FundProjectionScreenOutlined } from '@ant-design/icons';
import Imagenlogomenuizquierdahecho from '../../../assets/Logo/CampusJobBorderLogo.png';
import '../../ComponentsCSS/MenuHome/menu.css';


function Menu() {


    return (
      <main className="MeuIzq">
        
        <nav className="MenuIzqNav">
          <ul>
            <li className="limenuizq">
              <a href="/menu"  className='inici'><HomeOutlined  className="logoMnuIzq"/></a>
            </li>
            <li>
              <a href="/menu" className='inici'><FundProjectionScreenOutlined className="logoMnuIzq" /></a>
            </li>
            <li>
              <a href="/menu" className='inici'><DollarOutlined className="logoMnuIzq"/></a>
            </li>
            <li>
              <a href="/menu" className='inici'> <SettingOutlined className="logoMnuIzq" /></a>
            </li>
          </ul>
        </nav>
      </main>
    );
  }
  
export default Menu;
  