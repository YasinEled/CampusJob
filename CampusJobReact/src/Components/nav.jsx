// import "./ComponentsCSS/nav.css";
import logoMini from "../assets/Logo/logoroundblanco.png"; 
import logoLetras from "../assets/Logo/ssCampusJob.png";
import AnimatedTabs from "./slideTabs.jsx";

function Nav() {
  return (
    <nav>
      <div className="flex justify-between items-center container-nav">
        {/* Logo de la marca */}
        <div className="flex items-center mr-2">
          <a className="navbar-brand" href="#">
            <img className="logoNav" src={logoMini} alt="CampusJobMini" />
          </a>
          <img className="logoLetrasNav ml-2" src={logoLetras} alt="CampusJobLetras" />
        </div>
        
        {/* Botones de navegación */}
        <div >
          <AnimatedTabs />
        </div>
      </div>
    </nav>

  );
}

export default Nav;