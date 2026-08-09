import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import tr from "./locales/tr.json";
import uk from "./locales/uk.json";
import ru from "./locales/ru.json";
import fr from "./locales/fr.json";

export const SUPPORTED_LANGUAGES = [
  { code: "tr", label: "Türkçe" },
  { code: "en", label: "English" },
  { code: "uk", label: "Українська" },
  { code: "ru", label: "Русский" },
  { code: "fr", label: "Français" },
];

const resources = {
  en: { translation: en },
  tr: { translation: tr },
  uk: { translation: uk },
  ru: { translation: ru },
  fr: { translation: fr },
};

// Cloudflare sets this cookie at the edge based on the visitor's country
// (see /cloudflare/worker.js). If present, it wins over the browser's
// own language settings so a first-time visit lands in the right language
// without a redirect or flash of the wrong content.
function readCloudflareLangCookie() {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)pp_lang=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

const cfLang = readCloudflareLangCookie();

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LANGUAGES.map((l) => l.code),
    lng: cfLang && SUPPORTED_LANGUAGES.some((l) => l.code === cfLang) ? cfLang : undefined,
    interpolation: { escapeValue: false },
    detection: {
      // localStorage remembers an explicit user choice across visits;
      // navigator is the browser-language fallback when there's no
      // Cloudflare cookie and no stored preference yet.
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "pp_lang_choice",
    },
  });

export default i18n;
