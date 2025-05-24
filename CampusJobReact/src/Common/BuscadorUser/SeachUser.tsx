import React from "react";
import BuscadorPerfil from "./Components/buscadorPerfil/BuscadorPerfil";
import CardSearch from "./Components/componentCard/CardSeach";
import "./Style/CardSearch.css"; // Asegúrate de que la ruta sea correcta

const SeachUser = () => (
  <div className="searchuser-wrapper">
    <BuscadorPerfil />
    
    <div className="cardSearch__grid">
      {[...Array(10)].map((_, i) => (
        <CardSearch
          key={i}
          name={`John Doe ${i + 1}`}
          user="Software Engineer"
        />
      ))}
    </div>
  </div>
);

export default SeachUser;
