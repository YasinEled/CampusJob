import '../../ComponentsCSS/MenuHome/MainBusqueda.css';
import Busqueda from '../Menu/busqueda';
import FilterMenu from '../Filtro/filtro';
import ResultadoOfertas from '../Menu/ResultadoOfertas';

function MainBusqueda() {
    return (
        <section className="container-mainBusqueda">
            <div className="mainContent">
                <div className="mainBusqueda">
                    <Busqueda />
                </div>
                <div className="mainCenter">
                    <ResultadoOfertas />
                </div>
            </div>
            <div className="mainFilter">
                <FilterMenu />
            </div>
        </section>
    );
}

export default MainBusqueda;
