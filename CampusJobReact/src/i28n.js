import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar directamente los JSON (opción 1 - más simple)
import enTranslations from './TRADUCCIONES/en/global.json';
import esTranslations from './TRADUCCIONES/es/global.json';
import catTranslations from './TRADUCCIONES/cat/global.json';
import frTranslations from './TRADUCCIONES/fr/global.json';
// OPCIÓN 1: Importación directa (recomendada para tu caso)
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      es: {
        translation: esTranslations
      },
      ca: {
        translation: catTranslations
      },
      fr : {
        translation: frTranslations 
      }
      
    },
    lng: 'es', // idioma por defecto
    fallbackLng: 'ca',
    debug: true, // activar para debugging
    
    interpolation: {
      escapeValue: false, // no escape for react
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    }
  });

export default i18n;