import React from 'react';
import fondo404 from './assets/img/Fondo404.png';
import '../src/Components/ComponentsCSS/NotFound.css';

import Menu from "./Components/MenuHome/Menu/menu";
import { Outlet } from "react-router-dom";  // Importa Outlet

import NavHome from "./Components/MenuHome/Nav/NavHome";
import './Components/ComponentsCSS/MenuHome/general.css';

function NotFound() {
  return (
    <div className="NotFoundWrapper">
      <NavHome />
      <Menu /> 
      <Outlet />
      <div className="container404">
        <div className="Texto404">
          <p className="TituloError404">404</p>
          <p className="SubtituloError404">OOPS!</p>
          <p className="ExplicacionError404">Parece que te perdiste. Esta página no existe o fue movida.  📭 🚀</p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
