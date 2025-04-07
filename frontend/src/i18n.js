import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import trEn from "./locale/en.json";
import trFr from "./locale/fr.json";
import trDe from "./locale/de.json";
const resources = {
  en: {
    translation: trEn,
  },
  fr: {
    translation: trFr,
  },
  de: {
    translation: trDe,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
