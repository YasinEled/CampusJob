import React, { useRef } from 'react';
import NavPublication from "./nav.jsx";
import HeaderBg from "./Header-bg.jsx";
import TileHeader from './titleHeader.jsx';
import DescriptionHeader from './headerDescrptionComercial.jsx';
import Targeta from './TarjetaPublicidad.jsx';
import "./Components/WebComercial/ComponentsCSS/publicationGeneral.css"

function PublicationHeader() {

  return (
    <header  className="">
      
      <div className="absolute fondo w-full h-250 z-0">
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
