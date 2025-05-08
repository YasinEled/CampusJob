import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import i18next from "i18next";

import App from "./App.jsx";
import MenuHome from "./mainHome.jsx";
import MainBusqueda from "./Components/MenuHome/MainBusqueda/MainBusqueda";
import PerfilPropio from "./Components/PerfilUsuario/perfilPropio.jsx";
import PerfilMod from "./Components/PerfilUsuario/perfilModificable.jsx";
import FormOfertas from "./Components/createOfertas/createOfertas.jsx";
import PerfilEmpresa from "./Components/PerfilEmpresa/PerfilEmpresa.jsx";
import CreatorUsers from "./Components/CreadorUser/Page/CreatorUsers.js";
import SeachUser from "./Components/BuscadorPerfil/SeachUser.js";
import PrimerInicio from "./Components/PrimerInici/PrimerIniciUsuari.jsx"; // Importa el componente PrimerInicio
import MenuAdmin from "./Components/MenuAdmin/MenuAdmin.jsx";
import AñadirUsuario from "./Components/MenuAdmin/AñadirUsuario.jsx";
// import BuscadorPerfil from "./Components/BuscadorPerfil/BuscadorPerfil.jsx";
import PerfilTeacher from "./Components/PerfilTeacher/PerfilTeacher.jsx";
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
          <Route path="/" element={<App />} />

          <Route path="/mainHome" element={<MenuHome />}>
            <Route path="busqueda" element={<MainBusqueda />} />
            <Route path="CreatorUsers" element={<CreatorUsers />} />
            <Route path="perfil" element={<PerfilPropio />} />
            <Route path="PerfilEmpresa" element={<PerfilEmpresa />} />
            <Route path="perfilModificable" element={<PerfilMod />} />
            <Route path="formOfertes" element={<FormOfertas />} />
            <Route path="BuscadorPerfil" element={<SeachUser />} />
            <Route path="PrimerInicio" element={<PrimerInicio />} />
            <Route path="PerfilTeacher" element={<PerfilTeacher />} />
          </Route>

          {/* Rutas de Admin con anidación */}
          <Route path="MenuAdmin" element={<MenuAdmin />} />
          <Route path="AñadirUsuario" element={<AñadirUsuario />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </I18nextProvider>
  </StrictMode>
);
