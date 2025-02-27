import { nav } from "framer-motion/client";
import { UserOutlined ,GlobalOutlined,HeartOutlined,InboxOutlined,SunOutlined} from '@ant-design/icons';

import '../../ComponentsCSS/MenuHome/navHome.css'

function NavHome() {


    return (
      <nav className="navHome">
          <div className="selectorsNav">

          </div>
          <div className="logoNav">
            <SunOutlined />
            <HeartOutlined />
            <InboxOutlined />
            <GlobalOutlined />
            <UserOutlined />
            
          </div>
      </nav>
    );
  }
  
export default NavHome;
  