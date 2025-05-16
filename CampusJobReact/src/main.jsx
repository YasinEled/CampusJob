import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import i18next from "i18next";

import App from "./App.jsx";
import MenuHome from "./mainHome.jsx";
import MainBusqueda from "./Components/MenuHome/MainBusqueda/MainBusqueda";
import PerfilPropio from "./Components/Perfiles/PerfilAlumno.jsx";
import FormOfertas from "./Components/createOfertas/createOfertas.jsx";
import PerfilEmpresa from "./Components/Perfiles/PerfilEmpresa.jsx";
import CreatorUsers from "./Components/CreadorUser/Page/CreatorUsers.js";
import SeachUser from "./Components/BuscadorPerfil/SeachUser.js";
import PrimerInicio from "./Components/PrimerInici/PrimerIniciUsuari.jsx"; // Importa el componente PrimerInicio
import MenuCentros from "./Components/Centros/MenuCentros.jsx";
import AñadirUsuario from "./Components/AñadirUsuarios/AñadirUsuario.jsx";
import MenuProfesor from "./Components/MenuProfesor/MenuProfesor.jsx";
import MenuCursos from "./Components/Cursos/MenuCursos.jsx";
import AñadirCentro from "./Components/Centros/AñadirCentro.jsx";
import AñadirCurso from "./Components/creadorCursos/createCursos.js";
import GestionarCursos from "./Components/Cursos/GestionCursos.jsx";
// import BuscadorPerfil from "./Components/BuscadorPerfil/BuscadorPerfil.jsx";
import PerfilTeacher from "./Components/Perfiles/PerfilTeacher.jsx";
// Import language files
import global_es from "./TRADUCCIONES/es/global.json";
import global_en from "./TRADUCCIONES/en/global.json";
import global_cat from "./TRADUCCIONES/cat/global.json";
// Import NotFound component
import NotFound from "./NotFound.jsx"; // Importa el componente NotFound

// Inicializar i18next
(async () => {
  await i18next.init({
    interpolation: { escapeValue: false },
    lng: "cat",
    resources: {
      es: { global: global_es },
      en: { global: global_en },
      cat: { global: global_cat },
    },
  });
})();

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <Router>
        <Routes>
          <Route path="/login" element={<App />} />
          {/* NO SIRVEN CREO */}
          <Route path="AñadirUsuario" element={<AñadirUsuario />} />{" "}
          {/* FALTA CSS. */} {/* PONER CORREO AÑADIR USUARIOS */}
          <Route path="CrearUsuarios" element={<CreatorUsers />} />{" "}
          {/* FALTA ARREGLARLO */}
          {/* Rutas de Super Admin */}
          <Route path="SuperAdmin">
            <Route index element={<NotFound />} />
            <Route path="HomeAdmin" element={<MenuCentros />} />{" "}
            {/* FALTA ARREGLAR CSS. */}
            <Route path="AñadirCentro" element={<AñadirCentro />} />{" "}
            {/* FALTA ARREGLAR CSS. */}
          </Route>
          {/* Rutas de Admin */}
          <Route path="Admin">
            <Route index element={<NotFound />} />
            <Route path="HomeCursos" element={<MenuCursos />} />{" "}
            {/* FALTA  ARREGLAR CSS. */}
            <Route path="AñadirCurso" element={<AñadirCurso />} />{" "}
            {/* FALTA ARREGLAR CSS. */}
          </Route>
          /* MenuAdmin/HomeCurso */ /* MenuAlumno/HomeCurso */
          {/* Rutas de Profesor */}
          <Route path="profesor">
            <Route index element={<NotFound />} />
            <Route path="MenuProfesor" element={<MenuProfesor />} />{" "}
            {/* FALTA CSS. */} {/* FALTA SABER PARA QUE SIRVE */}
            <Route path="PerfilProfesor" element={<PerfilTeacher />} />{" "}
            {/* FALTA ARREGLAR CSS. */}
            <Route
              path="GestionarCursosAlumnos"
              element={<GestionarCursos />}
            />{" "}
            {/* FALTA CSS. */}
          </Route>
          {/* Rutas de Alumno */}
          <Route path="Alumno" element={<MenuHome />}>
            <Route index element={<NotFound />} />

            <Route path="PerfilAlumno" element={<PerfilPropio />} />
            <Route path="BusquedaOfertas" element={<MainBusqueda />} />
          </Route>
          {/* Rutas de Empresa */}
          <Route path="Empresa">
            <Route index element={<NotFound />} />
            <Route path="PerfilEmpresa" element={<PerfilEmpresa />} />{" "}
            {/* FALTA ARREGLAR CSS. */}
            <Route path="CrearOfertas" element={<FormOfertas />} />
          </Route>
          {/* Rutas de Primer Inicio */}
          <Route path="PrimerInicioAlumno" element={<PrimerInicio />} />
          {/* Rutas Generales */}
          <Route path="BuscadorPerfil" element={<SeachUser />} />{" "}
          {/* FALTA ARREGLAR CSS */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </I18nextProvider>
  </StrictMode>
);
