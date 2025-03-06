import '../../ComponentsCSS/MenuHome/MainBusqueda.css'
import Busqueda from '../Menu/busqueda';
import FilterMenu from '../Filtro/filtro';

function MainBusqueda() {


    return (
      <section className='container-mainBusqueda'>
        <div className="mainBusqueda">
          <Busqueda />
        </div>
        <div className="mainFilter">
          <FilterMenu />
        </div>
      </section>
    );
  }
  
export default MainBusqueda;
  