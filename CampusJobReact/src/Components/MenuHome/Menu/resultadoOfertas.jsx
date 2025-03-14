import '../../ComponentsCSS/MenuHome/resultadoOfertas.css'
import campusJobFavicon from '../../../assets/Logo/CampusJob.png';


function ResultadoOfertas() {

  return (
    <div className="OfertasContainer">
        <img className="ImagenOfertaEmpresa" src={campusJobFavicon} alt="CampusJob Logo"/>
        <div className="OfertaTextContainer">
          <h3 className="TituloOfertaEmpresa">Titulo Oferta</h3>
          <h5 className="NomOfertaEmpresa">Nombre Empresa</h5>
          <div className="OfertaInfoPrincipalContainer">
            <p className="OfertaUbicacion">Ubicacion</p>
            <p> | </p>
            <p className="OfertaTipoModalidad">Jornada</p>
            <p> | </p>
            <p className="OfertaFecha">Fecha</p>
          </div>
          <p className="OfertaDescripcion">Este es un texto de ejemplo que puedes usar como placeholder. Sirve para mostrar cómo quedará el contenido en una interfaz antes de colocar el texto final. Puedes reemplazarlo con la información relevante una vez esté disponible.</p>
          <div className="OfertaInfoContainer">
              <p className="OfertaTipoContrato">Contrato</p>
              <p> | </p>
              <p className="OfertaTipoJornada">Jornada</p>
              <p> | </p>
              <p className="OfertaSalario">Salario</p>
          </div>

        </div>
    </div>
);
}
  
export default ResultadoOfertas;