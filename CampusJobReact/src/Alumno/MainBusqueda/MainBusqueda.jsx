import './Style/MainBusqueda.css';
import Busqueda from './Components/busqueda';
import FilterMenu from './Components/filtro';
import ResultadoOfertas from './Components/resultadoOfertas';

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
