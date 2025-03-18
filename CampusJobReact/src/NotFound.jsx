import React from 'react';
import fondo404 from './assets/img/Fondo404.png'

function NotFound() {
  return (
    <div>
      <img className="imagen404" src={fondo404} alt="" />
      <h1>Error 404</h1>
      <p>Página no encontrada.</p>
    </div>
  );
}

export default NotFound;
