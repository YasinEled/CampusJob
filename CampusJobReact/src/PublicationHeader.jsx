import React, { useRef } from 'react';
import NavPublication from "./Components/nav.jsx";
import HeaderBg from "./Components/Header-bg.jsx";
import TileHeader from './Components/titleHeader.jsx';
import DescriptionHeader from './Components/headerDescrptionComercial.jsx';
import Targeta from './Components/TarjetaPublicidad.jsx';
import "./Components/ComponentsCSS/publicationGeneral.css"

function PublicationHeader() {

  return (
    <header  className="relative h-screen">
      
      <div className="absolute   w-screen py-10 h-screen inset-0 z-0">
        <HeaderBg />
      </div>

      <div className="absolute top-0 left-0 right-0 z-30">
        <NavPublication />
      </div>

      <div className="absolute top-20 left-0 right-0 z-10">
        <TileHeader />
      </div>

      <div className="absolute top_description left-0 right-0 flex justify-center z-20">
        <DescriptionHeader />
      </div>

      <div className="absolute top_Targeta left-0 right-0  z-25">
        <Targeta />
      </div>
    </header>
  );
}
export default PublicationHeader;
