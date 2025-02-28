import Menu from "./Components/MenuHome/Menu/menu";
import NavHome from "./Components/MenuHome/Nav/NavHome";
import './Components/ComponentsCSS/MenuHome/general.css';
import MainBusqueda from "./Components/MenuHome/MainBusqueda/MainBusqueda";

function MenuHome() {


  return (
    <main className="menuHome">

        <NavHome />
        <Menu /> 
        <MainBusqueda />
    </main>
  );
}

export default MenuHome;
