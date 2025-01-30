import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {I18nextProvider, Translation} from 'react-i18next'
import i18next from 'i18next'
import './index.css'
import App from './App.jsx'
// Import language
import global_es from './TRADUCCIONES/es/global.json';
import global_en from './TRADUCCIONES/en/global.json';
import global_cat from './TRADUCCIONES/cat/global.json';

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'cat',
  resources: {
    es: {
      global: global_es
    },
    en: {
      global: global_en
    },
    cat: {
      global: global_cat
    }
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </StrictMode>,
)
