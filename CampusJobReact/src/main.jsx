import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";

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
let enlace = "MenuHome"; // Puedes cambiar este valor según la navegación

// Seleccionamos el componente en función del valor de "enlace"
let component;
switch (enlace) {
  case "Home":
    component = <App />;
    break;
    case "MenuHome":
    component = <MenuHome />;
    break;
}
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      {component}
    </I18nextProvider>
  </StrictMode>
);
