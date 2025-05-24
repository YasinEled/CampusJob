import React from "react";
import BuscadorPerfil from "./Components/buscadorPerfil/BuscadorPerfil";
import CardSearch from "./Components/componentCard/CardSeach";
import "./Style/BuscadorPerfil.css";

const SeachUser = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
    <BuscadorPerfil />
    {[...Array(10)].map((_, i) => (
      <CardSearch key={i} name={`John Doe ${i + 1}`} user="Software Engineer" />
    ))}
  </div>
);


export default SeachUser;