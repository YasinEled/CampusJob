import Menu from "./Components/MenuHome/Menu/menu";
import NavHome from "./Components/MenuHome/Nav/NavHome";
import './Components/ComponentsCSS/MenuHome/general.css';

function MenuHome() {


  return (
    <main className="menuHome">
      
        <NavHome />
        <Menu /> 

    </main>
  );
}

export default MenuHome;
