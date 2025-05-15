import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import i18next from "i18next";

// Componentes
import App from "./App.jsx";
import MenuHome from "./mainHome.jsx";
import MainBusqueda from "./Components/MenuHome/MainBusqueda/MainBusqueda";
import PerfilPropio from "./Components/PerfilUsuario/perfilPropio.jsx";
import PerfilMod from "./Components/PerfilUsuario/perfilModificable.jsx";
import FormOfertas from "./Components/createOfertas/createOfertas.jsx";
import PerfilEmpresa from "./Components/PerfilEmpresa/PerfilEmpresa.jsx";
import CreatorUsers from "./Components/CreadorUser/Page/CreatorUsers.js";
import SeachUser from "./Components/BuscadorPerfil/SeachUser.js";
import PrimerInicio from "./Components/PrimerInici/PrimerIniciUsuari.jsx";
import MenuAdmin from "./Components/MenuAdmin/MenuAdmin.jsx";
import AñadirUsuario from "./Components/MenuAdmin/AñadirUsuario.jsx";
import MenuProfesor from "./Components/MenuProfesor/MenuProfesor.jsx";
import AñadirCursos from "./Components/MenuProfesor/AñadirCursos.jsx";
import AñadirCentro from "./Components/MenuAdmin/AñadirCentro.jsx";
import CreaCurso from "./Components/creadorCursos/createCursos.js";
import NotFound from "./NotFound.jsx";
import Unauthorized from "./Unauthorized.jsx";
import ProtectedRoute from "./ProtectedRoute";

// Ruta principal
root.render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <Router>
        <Routes>
          {/* Ruta pública */}
          <Route path="/" element={<App />} />

          {/* Rutas protegidas dentro de /mainHome */}
          <Route
            path="/mainHome"
            element={<MenuHome />}
          >
            <Route index element={<MainBusqueda />} />
            <Route path="busqueda" element={<MainBusqueda />} />
            <Route path="CreatorUsers" element={<CreatorUsers />} />
            <Route path="perfil" element={<PerfilPropio />} />
            <Route path="PerfilEmpresa" element={<PerfilEmpresa />} />
            <Route path="perfilModificable" element={<PerfilMod />} />
            <Route path="formOfertes" element={<FormOfertas />} />
            <Route path="BuscadorPerfil" element={<SeachUser />} />
            <Route path="PrimerInicio" element={<PrimerInicio />} />
            <Route path="PerfilTeacher" element={<PerfilTeacher />} />

            {/* Rutas protegidas - nivel admin = 0 */}
            <Route
              path="MenuAdmin"
              element={
                <ProtectedRoute requiredRole={0}>
                  <MenuAdmin />
                </ProtectedRoute>
              }
            >
              <Route path="AñadirCursos" element={<AñadirCursos />} />
              <Route path="AñadirUsuario" element={<AñadirUsuario />} />
            </Route>
          </Route>

          {/* Rutas protegidas fuera de /mainHome */}
          <Route
            path="AñadirCursos"
            element={
              <ProtectedRoute requiredRole={0}>
                <AñadirCursos />
              </ProtectedRoute>
            }
          />
          <Route
            path="AñadirCentro"
            element={
              <ProtectedRoute requiredRole={0}>
                <AñadirCentro />
              </ProtectedRoute>
            }
          />

          {/* Página de acceso denegado */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Página no encontrada */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </I18nextProvider>
  </StrictMode>
);