import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import i18next from "i18next";

import App from "./App.jsx";
import MenuHome from "./mainHome.jsx";
import MainBusqueda from "./Components/MenuHome/MainBusqueda/MainBusqueda";
import PerfilPropio from "./Components/Perfiles/PerfilAlumno.jsx";
import FormOfertas from "./Components/createOfertas/createOfertas.jsx";
import PerfilEmpresa from "./Components/Perfiles/PerfilEmpresa.jsx";
import CreatorUsers from "./Components/CreadorUser/Page/CreatorUsers.js";
import SeachUser from "./Components/BuscadorPerfil/SeachUser.js";
import PrimerInicio from "./Components/PrimerInici/PrimerIniciUsuari.jsx";
import MenuCentros from "./Components/Centros/MenuCentros.jsx";
import AñadirUsuario from "./Components/AñadirUsuarios/AñadirUsuario.jsx";
import MenuProfesor from "./Components/MenuProfesor/MenuProfesor.jsx";
import MenuCursos from "./Components/Cursos/MenuCursos.jsx";
import AñadirCentro from "./Components/Centros/AñadirCentro.jsx";
import AñadirCurso from "./Components/creadorCursos/createCursos.js";
import GestionarCursos from "./Components/Cursos/GestionCursos.jsx";
import PrimerInicioProf from "./Components/PrimerInici/PrimerIniciProfesor.jsx";
import PrimerInicioEmpresa from "./Components/PrimerInici/PrimerIniciEmpresa.jsx";
import PerfilTeacher from "./Components/Perfiles/PerfilTeacher.jsx";
import NotFound from "./NotFound.jsx";

import ProtectedRoute from "./Components/Servicios/ProtectedRoute.jsx";

// Translation files
import global_es from "./TRADUCCIONES/es/global.json";
import global_en from "./TRADUCCIONES/en/global.json";
import global_cat from "./TRADUCCIONES/cat/global.json";

// Initialize i18next
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

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <Router>
        <Routes>
          {/* Login */}
          <Route path="/login" element={<App />} />

          {/* Unauthorized */}
          <Route path="/unauthorized" element={<Navigate to="/login" />} />

          {/* Nivel 4: AdminSupremo */}
          <Route
            path="/AdminSupremo/*"
            element={
              <ProtectedRoute requiredRole="4">
                <MenuHome userType="AdminSupremo" />
              </ProtectedRoute>
            }
          >
            <Route index element={<NotFound />} />
            <Route path="HomeAdmin" element={<MenuCentros />} />
            <Route path="AñadirCentro" element={<AñadirCentro />} />
          </Route>

          {/* Niveles 3,4: Admin */}
          <Route
            path="/Admin/*"
            element={
              <ProtectedRoute requiredRole="3,4">
                <MenuHome userType="Admin" />
              </ProtectedRoute>
            }
          >
            <Route index element={<NotFound />} />
            <Route path="HomeCursos" element={<MenuCursos />} />
            <Route path="AñadirCurso" element={<AñadirCurso />} />
            <Route path="GestionarCursosAlumnos" element={<GestionarCursos />} />
          </Route>

          {/* Niveles 2,3,4: Profesor */}
          <Route
            path="/Profesor/*"
            element={
              <ProtectedRoute requiredRole="2,3,4">
                <MenuHome userType="Profesor" />
              </ProtectedRoute>
            }
          >
            <Route index element={<NotFound />} />
            <Route path="MenuProfesor" element={<MenuProfesor />} />
            <Route path="PerfilProfesor" element={<PerfilTeacher />} />
          </Route>

          {/* Niveles 0,2,3,4: Alumno */}
          <Route
            path="/Alumno/*"
            element={
              <ProtectedRoute requiredRole="0,2,3,4">
                <MenuHome userType="Alumno" />
              </ProtectedRoute>
            }
          >
            <Route index element={<NotFound />} />
            <Route path="PerfilAlumno" element={<PerfilPropio />} />
            <Route path="BusquedaOfertas" element={<MainBusqueda />} />
          </Route>

          {/* Niveles 1,2,3,4: Empresa */}
          <Route
            path="/Empresa/*"
            element={
              <ProtectedRoute requiredRole="1,2,3,4">
                <MenuHome userType="Empresa" />
              </ProtectedRoute>
            }
          >
            <Route index element={<NotFound />} />
            <Route path="PerfilEmpresa" element={<PerfilEmpresa />} />
            <Route path="CrearOfertas" element={<FormOfertas />} />
          </Route>

          {/* Primer Inicio */}
          <Route
            path="/PrimerInicioAlumno"
            element={
              <ProtectedRoute requiredRole="0">
                <PrimerInicio />
              </ProtectedRoute>
            }
          />
          <Route
            path="/PrimerInicioProfesor"
            element={
              <ProtectedRoute requiredRole="2">
                <PrimerInicioProf />
              </ProtectedRoute>
            }
          />
          <Route
            path="/PrimerInicioEmpresa"
            element={
              <ProtectedRoute requiredRole="1">
                <PrimerInicioEmpresa />
              </ProtectedRoute>
            }
          />

          {/* Global routes */}
          <Route path="/BuscadorPerfil" element={<SeachUser />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </I18nextProvider>
  </StrictMode>
);
