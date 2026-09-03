import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "../i18n";

// Native <select>, exactly as in the approved prototype (TR / EN / UA / FR
// / RU). Switching never navigates or reloads — it only changes i18next's
// active language and every page re-renders in place (PartyPas spec).
const ORDER = ["tr", "en", "uk", "fr", "ru"];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage || i18n.language;
  const langs = ORDER.map((code) => SUPPORTED_LANGUAGES.find((l) => l.code === code)).filter(Boolean);

  const handleChange = (e) => {
    const code = e.target.value;
    if (code === current) return;
    i18n.changeLanguage(code);
    try {
      localStorage.setItem("pp_lang_choice", code);
    } catch {
      // localStorage may be unavailable (private mode) — safe to ignore.
    }
  };

  return (
    <select className="lang-select" id="language" aria-label="Language" value={current} onChange={handleChange}>
      {langs.map((lng) => (
        <option key={lng.code} value={lng.code} title={lng.label}>
          {lng.chip}
        </option>
      ))}
    </select>
  );
}
