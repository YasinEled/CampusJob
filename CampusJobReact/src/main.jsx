import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";

import i18next from "i18next";

import App from "./App.jsx";
import PublicationHeader from "./PublicationHeader.jsx";


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

// Renderizar los componentes
if (document.getElementById("Publication")) {
  createRoot(document.getElementById("Publication")).render(
    <StrictMode>
      <PublicationHeader />
    </StrictMode>
  );
}

if (document.getElementById("root")) {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </StrictMode>
  );
}
