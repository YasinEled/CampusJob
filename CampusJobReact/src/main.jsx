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
import AñadirUsuario from "./Others/AñadirUsuarios/AñadirUsuario.jsx"; // NO SE USA ?
import MenuProfesor from "./Others/MenuProfesor/MenuProfesor.jsx";
import MenuCursos from "./Profesor/Cursos/MenuCursos.jsx";
import AñadirCentro from "./AdminSupremo/Centros/AñadirCentro.jsx";
import AñadirCurso from "./AdminCentro/creadorCursos/createCursos.jsx";
import GestionarCursos from "./Profesor/Cursos/GestionCursos.jsx";
import PrimerInicioProf from "./Common/PrimerIniciForm/PrimerIniciProfesor.jsx";
import PrimerInicioEmpresa from "./Common/PrimerIniciForm/PrimerIniciEmpresa.jsx";
import PerfilTeacher from "./Profesor/PerfilProfesor/PerfilTeacher.jsx";
import Unauthorized from "./Auth/Unauthorized/Unauthorized.jsx";

import NotFound from "./Common/NotFound/NotFound.jsx";

import ProtectedRoute from "./Auth/Servicios/ProtectedRoute.jsx";

// Traducciones
import global_es from "./TRADUCCIONES/es/global.json";
import global_en from "./TRADUCCIONES/en/global.json";
import global_cat from "./TRADUCCIONES/cat/global.json";

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
const nivelUsuario = localStorage.getItem("nivelUsuario");

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <Router>
        <Routes>
          {/* 1) Públicas */}
          <Route path="/login" element={<App />} />
          <Route path="/" element={<App />} />


          {/*<Route path="/comercial" element={<Comercial />} />     Esta sera la pagina para vender el producto*/}

          {/* 2) AdminSupremo (rol 4) */}
          <Route
            path="/AdminSupremo/*"
            element={
              <ProtectedRoute requiredRole="4">
                <MenuHome userType={nivelUsuario} />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="HomeAdmin" replace />} />
            <Route path="HomeAdmin" element={<MenuCentros />} />
            <Route path="AñadirCentro" element={<AñadirCentro />} />
            {/* <Route path="CrearUsuarioAdmin" element={<AñadirUsuario />} /> Esto sera la pagina de Crear AdminSupremo */}
          </Route>

          {/* 3) AdminCentro (rol 3,4) */}
          <Route
            path="/AdminCentro/*"
            element={
              <ProtectedRoute requiredRole="3,4">
                <MenuHome userType={nivelUsuario} />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <Navigate
                  to="/centro/${localStorage.getItem('centroId')}/elegirCurso"
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
            <Route
              path="centro/:centroId/CrearUsuario"
              element={
                <ProtectedRoute requiredRole="3,4">
                  <CreatorUsersAC />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* 4) Profesor (rol 2,3,4) */}
          <Route
            path="/Profesor/*"
            element={
              <ProtectedRoute requiredRole="2,3,4">
                <MenuHome userType={nivelUsuario} />
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
                  to="/centro/${localStorage.getItem('centroId')}/elegirCurso"
                  replace
                />
              }
            />
          </Route>

          {/* 5) Empresa (rol 1,2,3,4) */}
          <Route
            path="/Empresa/*"
            element={
              <ProtectedRoute requiredRole="1,2,3,4">
                <MenuHome userType={nivelUsuario} />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <Navigate
                  to="/centro/${localStorage.getItem('centroId')}/elegirCurso"
                  replace
                />
              }
            />
            <Route
              path="centro/:centroId/añadirOferta"
              element={
                <ProtectedRoute requiredRole="1,2,3,4">
                  <FormOfertas />
                </ProtectedRoute>
              }
            />
            <Route
              path="PerfilEmpresa/:idUsrEmpresa"
              element={
                <ProtectedRoute requiredRole="1,2,3,4">
                  <PerfilEmpresa />
                </ProtectedRoute>
              }
            />
          </Route>
          {/* NUEVA RUTA PRINCIPAL PARA PERFIL EMPRESA */}

          {/* NUEVA RUTA PRINCIPAL PARA PERFIL EMPRESA */}
          <Route
            path="/PerfilProfesor/:idUsrProfe"
            element={
              <ProtectedRoute requiredRole="0,1,2,3,4">
                <PerfilTeacher />
              </ProtectedRoute>
            }
          />

          {/* NUEVA RUTA PRINCIPAL PARA PERFIL EMPRESA */}
          <Route
            path="/PerfilAlumno/:idUsrAlumno"
            element={
              <ProtectedRoute requiredRole="0,1,2,3,4">
                <PerfilPropio />
              </ProtectedRoute>
            }
          />

          {/* 6) Alumno (rol 0,2,3,4) */}
          <Route
            path="/Alumno/*"
            element={
              <ProtectedRoute requiredRole="0,2,3,4">
                <MenuHome userType={nivelUsuario} />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <Navigate
                  to="/centro/${localStorage.getItem('centroId')}/elegirCurso"
                  replace
                />
              }
            />
          </Route>

          {/* 7) Centro general */}
          <Route
            path="/centro/:centroId/*"
            element={
              <ProtectedRoute requiredRole="0,1,2,3,4">
                <MenuHome userType={nivelUsuario} />
              </ProtectedRoute>
            }
          >
            <Route path="elegirCurso" element={<MenuCursos />} />
            <Route
              path="curso/:cursoId/BuscarOfertas"
              element={<MainBusqueda />}
            />
          </Route>

          {/* <Route path="/centro/:centroId/elegirCurso" element={<ProtectedRoute requiredRole="0,1,2,3,4"><MenuCursos /></ProtectedRoute>} />
          <Route path="/centro/:centroId/curso/:cursoId/BuscarOfertas" element={<ProtectedRoute requiredRole="0,1,2,3,4"><MainBusqueda /></ProtectedRoute>} /> */}

          {/* 8) Primer inicio */}

          <Route
            path="/PrimerInicio/*"
            element={
              <ProtectedRoute requiredRole="0,1,2,3,4">
                <MenuHome userType={nivelUsuario} />
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
                <MenuHome userType={nivelUsuario} />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<SeachUser />} />
          </Route>

          <Route path="*" element={<MenuHome userType={nivelUsuario} />}>
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Fallback */}
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
