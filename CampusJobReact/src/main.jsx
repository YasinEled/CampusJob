import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import i18next from "i18next";

import App from "./App.jsx";
import MenuHome from "./mainHome.jsx";
// Import language files
import global_es from "./TRADUCCIONES/es/global.json";
import global_en from "./TRADUCCIONES/en/global.json";
import global_cat from "./TRADUCCIONES/cat/global.json";

// Inicializar i18next
await i18next.init({
  interpolation: { escapeValue: false },
  lng: "cat",
  resources: {
    es: { global: global_es },
    en: { global: global_en },
    cat: { global: global_cat },
  },
});

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/mainHome" element={<MenuHome />} />
        </Routes>
      </Router>
    </I18nextProvider>
  </StrictMode>
);
