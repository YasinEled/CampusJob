import "../../ComponentsCSS/MenuHome/filter.css";
import React, { useState, useRef, useEffect } from "react";

const provincias = [
  "Álava",
  "Albacete",
  "Alicante",
  "Almería",
  "Asturias",
  "Ávila",
  "Badajoz",
  "Baleares",
  "Barcelona",
  "Burgos",
  "Cáceres",
  "Cádiz",
  "Cantabria",
  "Castellón",
  "Ciudad Real",
  "Córdoba",
  "Cuenca",
  "Girona",
  "Granada",
  "Guadalajara",
  "Guipúzcoa",
  "Huelva",
  "Huesca",
  "Jaén",
  "La Rioja",
  "Las Palmas",
  "León",
  "Lleida",
  "Lugo",
  "Madrid",
  "Málaga",
  "Murcia",
  "Navarra",
  "Ourense",
  "Palencia",
  "Pontevedra",
  "Salamanca",
  "Santa Cruz de Tenerife",
  "Segovia",
  "Sevilla",
  "Soria",
  "Tarragona",
  "Teruel",
  "Toledo",
  "Valencia",
  "Valladolid",
  "Vizcaya",
  "Zamora",
  "Zaragoza",
];

function FilterMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [experience, setExperience] = useState(5);
  const [salario, setSalario] = useState(0); // Agregar estado para el salario

  const handleSalarioChange = (e) => {
    setSalario(e.target.value);
  };

  const [selected, setSelected] = useState([]);
  const containerRef = useRef(null);
  const handleChange = (e) => {
    setExperience(e.target.value);
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (provincia) => {
    setSelected((prevSelected) =>
      prevSelected.includes(provincia)
        ? prevSelected.filter((item) => item !== provincia)
        : [...prevSelected, provincia]
    );
  };

  // Cierra el dropdown al hacer clic fuera del componente
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Texto del botón: muestra las provincias seleccionadas o el placeholder
  const buttonText =
    selected.length > 0 ? selected.join(", ") : "Selecciona provincias";

  return (
    <section className="container-Filter">
      <div className="ordenarOfertes">
        <h3>Ordenar ofertas</h3>
        <div>
          <input
            type="radio"
            id="FechaPorPublicacion"
            name="ofertes"
            value="FechaPorPublicacion"
          />
          <label htmlFor="FechaPorPublicacion">Fecha por publicacion</label>
        </div>

        <div>
          <input
            type="radio"
            id="relevancia"
            name="ofertes"
            value="relevancia"
          />
          <label htmlFor="relevancia">Relevancia</label>
        </div>
      </div>
      <div className="palabraClave">
        <h3>Palabra clave</h3>
        <div className="FormPalabraClave">
          <div>
            <input type="text" id="buscador" name="buscador" className="buscadorFiltroPalabraClave"/>
          </div>
          <div>
            <button type="submit" className="buscadorFiltroPalabraClaveBoton">Buscar</button>
          </div>
        </div>
        <div className="ordenarFecha">
          <h3>Fecha</h3>
          <div>
            <input
              type="radio"
              id="CualquierFecha"
              name="fecha"
              value="CualquierFecha"
            />
            <label htmlFor="CualquierFecha">Cualquier Fecha</label>
          </div>
          <div>
            <input type="radio" id="24H" name="fecha" value="24H" />
            <label htmlFor="24H">Últimas 24 horas</label>
          </div>
          <div>
            <input type="radio" id="7D" name="fecha" value="7D" />
            <label htmlFor="7D">Últimas 7 dias</label>
          </div>
          <div>
            <input type="radio" id="14D" name="fecha" value="14D" />
            <label htmlFor="14D">Últimas 14 dias</label>
          </div>
        </div>
        <div className="presencialTeletrabajo">
          <h3>Presencial/Teletrabajo</h3>
          <div>
            <input
              type="checkbox"
              id="presencial"
              name="pres/Tele"
              value="prpesencial"
            />
            <label htmlFor="prpesencial">Presencial</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="teletrabajo"
              name="pres/Tele"
              value="teletrabajo"
            />
            <label htmlFor="teletrabajo">Teletrabajo</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="sinEspecificar"
              name="pres/Tele"
              value="sinEspecificar"
            />
            <label htmlFor="sinEspecificar">Sin especificar</label>
          </div>
        </div>
        <div className="combobox" ref={containerRef}>
          <button className="combobox-button" onClick={toggleDropdown}>
            {buttonText}
          </button>
          {isOpen && (
            <div className="combobox-dropdown">
              {provincias.map((provincia, index) => (
                <label key={index} className="combobox-option">
                  <input
                    type="checkbox"
                    value={provincia}
                    checked={selected.includes(provincia)}
                    onChange={() => handleCheckboxChange(provincia)}
                  />
                  {provincia}
                </label>
              ))}
            </div>
          )}
        </div>
        <div className="experience-slider slider">
          <label htmlFor="experienceRange">
            Experiencia: {experience} {experience === "1" ? "año" : "años"}
          </label>
          <input
            type="range"
            id="experienceRange"
            min="0"
            max="30"
            step="1"
            value={experience}
            onChange={handleChange}
          />
        </div>
        <div className="Salario-slider slider">
          <label htmlFor="salarioRange">
            Salario: {salario} {salario === "1" ? "Euro" : "Euros"}
          </label>
          <input
            type="range"
            id="salarioRange"
            min="0"
            max="20000"
            step="100" /* Para que no sea tan sensible */
            value={salario}
            onChange={handleSalarioChange}
          />
        </div>
        <div className="JornadaLaboral">
          <h3>Jornada laboral</h3>
          <div>
            <input type="checkbox" id="JornadaMedia" name="pres/Tele" value="prpesencial"/>
            <label>Media Jornada</label>
          </div>
          <div>
            <input type="checkbox" id="JornadaCompleta" name="pres/Tele" value="teletrabajo"/>
            <label>Completo</label>
          </div>
          <div>
            <input type="checkbox" id="JornadaParcial" name="pres/Tele" value="sinEspecificar"/>
            <label>Parcial</label>
          </div>
          <div>
            <input type="checkbox" id="SinEspecificarJornada" name="pres/Tele" value="sinEspecificar"/>
            <label>Sin Especificar</label>
          </div>
        </div>
        <div>
        <h3>Tipo de contrato</h3>
          <div>
            <input type="checkbox" id="ContratoIndefinido" name="pres/Tele" value="prpesencial"/>
            <label>Indefinido</label>
          </div>
          <div>
            <input type="checkbox" id="ContratoTiempoParcial" name="pres/Tele" value="teletrabajo"/>
            <label>Tiempo Definido</label>
          </div>
          <div>
            <input type="checkbox" id="JornadaParcial" name="pres/Tele" value="sinEspecificar"/>
            <label>Sin Especificar</label>
          </div>
          <div>
            <input type="checkbox" id="SinEspecificarJornada" name="pres/Tele" value="sinEspecificar"/>
            <label>Sin Especificar</label>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FilterMenu;
