import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import i18next from "i18next";

import App from "./App.jsx";
import MenuHome from "./mainHome.jsx";
import MainBusqueda from "./Alumno/MainBusqueda/MainBusqueda.jsx";
import PerfilPropio from "./Alumno/PerfilAlumno/PerfilAlumno.jsx";
import FormOfertas from "./Profesor/createOfertas/createOfertas.jsx";
import PerfilEmpresa from "./Empresa/PerfilEmpresa/PerfilEmpresa.jsx";
import CreatorUsersAC from "./AdminCentro/CreadorUserAC/Page/CreatorUsers.js";
import SeachUser from "./Common/BuscadorUser/SeachUser.js"; 
import PrimerInicio from "./Common/PrimerIniciForm/PrimerIniciUsuari.jsx";
import MenuCentros from "./AdminSupremo/Centros/MenuCentros.jsx";
import AñadirUsuario from "./Others/AñadirUsuarios/AñadirUsuario.jsx";   // NO SE USA ?
import MenuProfesor from "./Others/MenuProfesor/MenuProfesor.jsx";
import MenuCursos from "./Profesor/Cursos/MenuCursos.jsx";
import AñadirCentro from "./AdminSupremo/Centros/AñadirCentro.jsx";
import AñadirCurso from "./AdminCentro/creadorCursos/createCursos.jsx";
import GestionarCursos from "./Profesor/Cursos/GestionCursos.jsx";
import PrimerInicioProf from "./Common/PrimerIniciForm/PrimerIniciProfesor.jsx";
import PrimerInicioEmpresa from "./Common/PrimerIniciForm/PrimerIniciEmpresa.jsx";
import PerfilTeacher from "./Profesor/PerfilProfesor/PerfilTeacher.jsx";
import NotFound from "./Common/NotFound/NotFound.jsx";

import ProtectedRoute from "./Auth/Servicios/ProtectedRoute.jsx";

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
            <Route path="PerfilProfesor" element={<PerfilTeacher />} />
            <Route path="BusquedaOfertas" element={<MainBusqueda />} />

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
            <Route path="BusquedaOfertas" element={<MainBusqueda />} />

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
