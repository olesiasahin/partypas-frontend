import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "../i18n";

// Switching language never navigates or reloads the route — it only
// changes i18next's active language, and every page re-renders in place
// with the new strings (per the PartyPas spec: don't re-navigate on
// language change).
export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    const code = e.target.value;
    i18n.changeLanguage(code);
    try {
      localStorage.setItem("pp_lang_choice", code);
    } catch (err) {
      // localStorage may be unavailable (e.g. private mode) — safe to ignore.
    }
  };

  return (
    <select
      className="lang-switcher"
      value={i18n.resolvedLanguage || i18n.language}
      onChange={handleChange}
      aria-label="Language"
    >
      {SUPPORTED_LANGUAGES.map((lng) => (
        <option key={lng.code} value={lng.code}>
          {lng.label}
        </option>
      ))}
    </select>
  );
}
