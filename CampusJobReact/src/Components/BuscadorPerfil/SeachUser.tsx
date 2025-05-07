import React from "react";
import BuscadorPerfil from "./buscadorPerfil/BuscadorPerfil";
import CardSearch from "./componentCard/CardSeach";

const SeachUser = () => (
  <div>
    <BuscadorPerfil />
    {[...Array(10)].map((_, i) => (
      <CardSearch key={i} name={`John Doe ${i + 1}`} user="Software Engineer" />
    ))}
  </div>
);


export default SeachUser;