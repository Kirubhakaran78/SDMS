import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend) 
  .use(LanguageDetector) 
  .use(initReactI18next) 
  .init({
    fallbackLng: "en",

    supportedLngs: ["en", "pl", "ko", "fr", "ja"],

    interpolation: {
      escapeValue: false,
    },

    backend: {
      loadPath: "/LogilabSDMS/locales/{{lng}}/translation.json",
    },

    requestOptions: {
    mode: 'cors',
    headers: { 'Accept': 'application/json; charset=utf-8' }
  },
  detection: {
  order: ["navigator"],
  caches: [],
  lookupNavigator: true,
  checkWhitelist: true,
  convertDetectedLanguage: (lng) => {
    return lng.split('-')[0];
  },
},

     react: {
      useSuspense: false, 
    },

  });

export default i18n;
