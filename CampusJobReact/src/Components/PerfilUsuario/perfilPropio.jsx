import "../ComponentsCSS/perfilUsuarioCSS/perfilPropio.css";
import pfp from '../../assets/yasin.jpg';
import pfpFondo from '../../assets/yasinfondo.jpg';


function PerfilPropio() {
  return (
    <main className="perfilContainer">
      <div className="PerfilUsuario">
        <div className="fondo">
        <img src={pfpFondo} alt="Fondo" />
        <img className="profile" src={pfp} alt="Perfil" />
        </div>
        <div className="InfoContainer">
          <div className="infoPerfil">
            <div className="InformacionPrincipalUsuario">
            <h2>Yasin El Edrissi</h2>
            <p>Granollers, Cataluña, España</p>
            </div>
            <div className="InformacionContactoUsuario">
              <p>+34 632789372</p>
              <p>yeledrissi@educem.net</p>
              <p>12 / 08 / 2004</p>
            </div>
          <p>Desarrollador Full Stack con 3 años de experiencia en la creación de aplicaciones web eficientes y escalables utilizando React y Node.js. Apasionado por resolver problemas complejos y aprender nuevas tecnologías.</p>
        </div>
        <div>
          <img src="https://www.micole.net/imagenes/colegio/logo/20718/educem-ii_512.png?v=MjAyMi0wOC0zMSAwMDoyODoyOA==" alt="Imagen Centro" className="ImagenCentroPerfil"/>
        </div>
        </div>

        <p className="descriptionPerfil">
        </p>
      </div>
    </main>
  );
}

export default PerfilPropio;
