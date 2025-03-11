import '../../ComponentsCSS/MenuHome/busqueda.css'


function Busqueda() {


    return (
      <div className="busquedaContainer">
        
        <p className="TextoBusquedaUbicacion">En...</p>
        
        <div className="BuscaUbicacion">
        <input type="text" placeholder="Escribe aquí" className="BuscaUbicacionTextBox"></input>
        <button className="BuscaButtonUbicacion">BUSCAR</button>
        </div>
        
      </div>
    );
  }
  
export default Busqueda;
  