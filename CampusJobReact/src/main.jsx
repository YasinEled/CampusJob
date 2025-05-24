import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";

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
import AñadirUsuario from "./Others/AñadirUsuarios/AñadirUsuario.jsx";
import MenuProfesor from "./Others/MenuProfesor/MenuProfesor.jsx";
import MenuCursos from "./Profesor/Cursos/MenuCursos.jsx";
import AñadirCentro from "./AdminSupremo/Centros/AñadirCentro.jsx";
import AñadirCurso from "./AdminCentro/creadorCursos/createCursos.jsx";
import GestionarCursos from "./Profesor/Cursos/GestionCursos.jsx";
import PrimerInicioProf from "./Common/PrimerIniciForm/PrimerIniciProfesor.jsx";
import PrimerInicioEmpresa from "./Common/PrimerIniciForm/PrimerIniciEmpresa.jsx";
import PerfilTeacher from "./Profesor/PerfilProfesor/PerfilTeacher.jsx";
import Unauthorized from "./Auth/Unauthorized/Unauthorized.jsx";
import InformacionOferta from "./Empresa/InformacionOferta/InformacionOferta.jsx";
import GestorOferta from "./Empresa/GestorVacantes/GestorVacantes.js";
import ListaOfertasPropias from "./Empresa/ListaOfertaspropias.jsx";
import Logout from "./logout.jsx";
import NotFound from "./Common/NotFound/NotFound.jsx";
import ProtectedRoute from "./Auth/Servicios/ProtectedRoute.jsx";

// Traducciones
import global_es from "./TRADUCCIONES/es/global.json";
import global_en from "./TRADUCCIONES/en/global.json";
import global_cat from "./TRADUCCIONES/cat/global.json";
import global_fr from "./TRADUCCIONES/fr/global.json";

// Configuración correcta de i18next
i18next
  .use(initReactI18next) // Esta línea es crucial
  .init({
    resources: {
      es: {
        translation: global_es // Cambio: usa 'translation' en lugar de 'global'
      },
      en: {
        translation: global_en
      },
      ca: {
        translation: global_cat
      },
      fr : {
        translation: global_fr
      }
    },
    lng: "es", // idioma por defecto
    fallbackLng: "en", // idioma de respaldo
    debug: true, // activar para ver logs en consola (quitar en producción)
    
    interpolation: {
      escapeValue: false // necesario para React
    }
  });

const nivelUsuario = localStorage.getItem("nivelUsuario");
const centroId = localStorage.getItem('idCentro');

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <Router>
        <Routes>
          {/* 1) Públicas */}
          <Route path="/login" element={<App />} />
          <Route path="/" element={<App />} />
          <Route path="/logout" element={<Logout />} />

          {/* 2) AdminSupremo (rol 4) */}
          <Route
            path="/AdminSupremo/*"
            element={
              <ProtectedRoute requiredRole="4">
                <MenuHome userType={nivelUsuario} pagina="4" />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="HomeAdmin" replace />} />
            <Route path="HomeAdmin" element={<MenuCentros />} />
            <Route path="AñadirCentro" element={<AñadirCentro />} />
          </Route>

          {/* 3) AdminCentro (rol 3,4) */}
          <Route
            path="/AdminCentro/*"
            element={
              <ProtectedRoute requiredRole="3,4">
                <MenuHome userType={nivelUsuario} pagina="3" />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <Navigate
                  to={`/centro/${centroId}/elegirCurso`}
                  replace
                />
              }
            />
            <Route
              path="centro/:centroId/añadirCurso"
              element={
                <ProtectedRoute requiredRole="3,4">
                  <AñadirCurso />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* 4) Profesor (rol 2,3,4) */}
          <Route
            path="/Profesor/*"
            element={
              <ProtectedRoute requiredRole="2,3,4">
                <MenuHome userType={nivelUsuario} pagina="2" />
              </ProtectedRoute>
            }
          >
            <Route
              path="centro/:centroId/CrearUsuarios"
              element={<AñadirUsuario />}
            />
            <Route
              index
              element={
                <Navigate
                  to={`/centro/${centroId}/elegirCurso`}
                  replace
                />
              }
            />
            
          </Route>

          {/* 5) Empresa (rol 1,2,3,4) */}
          <Route
            path="/Empresa/*"
            element={
              <ProtectedRoute requiredRole="0,1,2,3,4">
                <MenuHome userType={nivelUsuario} pagina="1" />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <Navigate
                  to={`/centro/${centroId}/elegirCurso`}
                  replace
                />
              }
            />
            <Route
              path="añadirOferta/:cursoId"
              element={
                <ProtectedRoute requiredRole="1">
                  <FormOfertas />
                </ProtectedRoute>
              }
            />
            <Route
              path="InformacionOferta/:idOferta"
              element={
                <ProtectedRoute requiredRole="0,1,2,3,4">
                  <InformacionOferta />
                </ProtectedRoute>
              }
            />
            <Route
              path="gestioOferta/:idOferta"
              element={
                <ProtectedRoute requiredRole="1,2,3,4">
                  <GestorOferta />
                </ProtectedRoute>
              }
            />
            <Route
              path="PerfilEmpresa/:idUsrEmpresa"
              element={
                <ProtectedRoute requiredRole="0,1,2,3,4">
                  <PerfilEmpresa />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* 6) Alumno (rol 0,2,3,4) */}
          <Route
            path="/Alumno/*"
            element={
              <ProtectedRoute requiredRole="0,2,3,4">
                <MenuHome userType={nivelUsuario} pagina="0" />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <Navigate
                  to={`/centro/${centroId}/elegirCurso`}
                  replace
                />
              }
            />
            <Route
              path="PerfilAlumno/:idUsrAlumno"
              element={
                <PerfilPropio />
              }
            />
            <Route
              path="PerfilProfesor/:idUsrProfe"
              element={
                <ProtectedRoute requiredRole="0,1,2,3,4">
                  <PerfilTeacher />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* 7) Centro general */}
          <Route
            path="/centro/:centroId/*"
            element={
              <ProtectedRoute requiredRole="0,1,2,3,4">
                <MenuHome userType={nivelUsuario} pagina={nivelUsuario} />
              </ProtectedRoute>
            }
          >
            <Route path="elegirCurso" element={<MenuCursos />} />
            <Route
              path="curso/:cursoId/BuscarOfertas"
              element={<MainBusqueda />}
            />
          </Route>

          {/* 8) Primer inicio */}
          <Route
            path="/PrimerInicio/*"
            element={
              <ProtectedRoute requiredRole="0,1,2,3,4">
                <MenuHome userType={-1} />
              </ProtectedRoute>
            }
          >
            <Route
              path="Empresa"
              element={
                <ProtectedRoute requiredRole="0,1,2,3,4">
                  <PrimerInicioEmpresa />
                </ProtectedRoute>
              }
            />
            <Route
              path="Alumno"
              element={
                <ProtectedRoute requiredRole="0,1,2,3,4">
                  <PrimerInicio />
                </ProtectedRoute>
              }
            />
            <Route
              path="Profesor"
              element={
                <ProtectedRoute requiredRole="0,1,2,3,4">
                  <PrimerInicioProf />
                </ProtectedRoute>
              }
            />
          </Route>
          

          <Route
            path="/BuscadorPerfil"
            element={
              <ProtectedRoute requiredRole="0,1,2,3,4">
                <MenuHome userType={nivelUsuario} pagina={nivelUsuario} />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<SeachUser />} />
          </Route>

          <Route path="*" element={<MenuHome userType={nivelUsuario} />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </I18nextProvider>
  </StrictMode>
);


/*
  RUTAS DISPONIBLES

  1) Públicas
     GET  /login                          → App.jsx
     GET  /unauthorized                   → Unauthorized.jsx
     GET  /comercial                      → Comercial.jsx

  2) AdminSupremo (rol 4)
     GET  /AdminSupremo                   → redirige a /AdminSupremo/HomeAdmin
     GET  /AdminSupremo/HomeAdmin         → MenuCentros.jsx
     GET  /AdminSupremo/AñadirCentro      → AñadirCentro.jsx
     GET  /AdminSupremo/CrearUsuario      → (pendiente AñadirUsuario.jsx)

  3) AdminCentro (rol 3,4)
     GET  /AdminCentro                    → redirige a /centro/{centroId}/elegirCurso
     GET  /AdminCentro/centro/:centroId/AñadirCurso     → AñadirCurso.jsx
     GET  /AdminCentro/centro/:centroId/CrearUsuario    → CreatorUsersAC.js

  4) Profesor (rol 2,3,4)
     GET  /Profesor                       → redirige a /centro/{centroId}/elegirCurso
     GET  /Profesor/centro/:centroId/PerfilProfesor/:idUsrProfe  → PerfilTeacher.jsx

  5) Empresa (rol 1,2,3,4)
     GET  /Empresa                        → redirige a /centro/{centroId}/elegirCurso
     GET  /Empresa/centro/:centroId/PerfilEmpresa/:idUsrEmpresa → PerfilEmpresa.jsx

  6) Alumno (rol 0,2,3,4)
     GET  /Alumno                         → redirige a /centro/{centroId}/elegirCurso
     GET  /Alumno/centro/:centroId/PerfilAlumno/:idUsrAlumno   → PerfilPropio.jsx

  7) Centro general (todos los roles)
     GET  /centro/:centroId/elegirCurso   → MenuCursos.jsx
     GET  /centro/:centroId/curso/:cursoId/BuscarOfertas → MainBusqueda.jsx

  8) Primer inicio
     GET  /PrimerInicioAlumno             → PrimerInicioUsuari.jsx
     GET  /PrimerInicioProfesor           → PrimerInicioProfesor.jsx
     GET  /PrimerInicioEmpresa            → PrimerInicioEmpresa.jsx

  9) Buscador de perfil
     GET  /BuscadorPerfil                 → SeachUser.js

  10) Fallback
     GET  /*                             → NotFound.jsx
*/
