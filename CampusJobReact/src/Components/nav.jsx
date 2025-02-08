import logoMini from "../assets/Logo/logoroundblanco.png"; 
import logoLetras from "../assets/Logo/ssCampusJob.png";
import AnimatedTabs from "./slideTabs.jsx";
import NavHamburguer from "./hamburguer.jsx";

function Nav() {
  
  return (
    <nav className="container-Nav scaled">
      <div className="flex justify-between items-center z-2 ">
        {/* Logo de la marca */}
        <div className="flex items-center mr-2">
          <a className="navbar-brand z-1" href="#">
            <img className="logoNav" src={logoMini} alt="CampusJobMini" />
          </a>
          <img className="logoLetrasNav z-1" src={logoLetras} alt="CampusJobLetras" />
        </div>
        
        {/* Botones de navegación */}
        <div className="" >
          <AnimatedTabs />
          <NavHamburguer />
        </div>
      </div>
    </nav>

  );
}

export default Nav;