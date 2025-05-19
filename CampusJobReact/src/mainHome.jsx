import Menu from "./Common/Menu/menu";
import { Outlet } from "react-router-dom";  // Importa Outlet

import NavHome from "./Common/Nav/NavHome";
import './general.css';


function MenuHome({userType} ) {


  return (
    <main className="menuHome">

        <NavHome userType={userType} />
        
        <Outlet /> {/* Aquí se renderizarán las subrutas */}

    </main>
  );
}

export default MenuHome;
