import Menu from "./Components/MenuHome/Menu/menu";
import { Outlet } from "react-router-dom";  // Importa Outlet

import NavHome from "./Components/MenuHome/Nav/NavHome";
import './Components/ComponentsCSS/MenuHome/general.css';


function MenuHome() {


  return (
    <main className="menuHome">

        <NavHome />
        <Menu /> 
        <Outlet /> {/* Aquí se renderizarán las subrutas */}

    </main>
  );
}

export default MenuHome;
