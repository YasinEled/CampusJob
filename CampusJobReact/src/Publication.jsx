import React, { useRef } from 'react';
import NavPublication from "./Components/nav.jsx";
import HeaderBg from "./Components/Header-bg.jsx";
import TileHeader from './Components/titleHeader.jsx';
import DescriptionHeader from './Components/headerDescrptionComercial.jsx';
import "./Components/ComponentsCSS/titleHeder.css";


function Publication() {

  return (
    <header>
      
      <HeaderBg  />
      <NavPublication />
      <TileHeader />
      <DescriptionHeader />

    </header>
  );
}
export default Publication;
