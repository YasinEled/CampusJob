import Menu from "./Common/Menu/menu";
import { Outlet } from "react-router-dom";  // Importa Outlet

import NavHome from "./Common/Nav/NavHome";
import './general.css';


function MenuHome({userType, pagina} ) {


  return (
    <main className="menuHome">

        <NavHome userType={pagina} />

        <Menu userType={userType} />
        <div style={{ marginLeft: "9em" }}>
            <Outlet /> {/* Aquí se renderizarán las subrutas */}
        </div>

    </main>
  );
}

export default MenuHome;
