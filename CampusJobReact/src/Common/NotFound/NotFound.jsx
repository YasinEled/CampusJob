import React from 'react';
import fondo404 from '../../assets/img/Fondo404.png';
import './Style/NotFound.css';

import Menu from "../Menu/menu";
import { Outlet } from "react-router-dom";  // Importa Outlet

import NavHome from "../Nav/NavHome";

function NotFound() {
  return (
    <div className="NotFoundWrapper">
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
