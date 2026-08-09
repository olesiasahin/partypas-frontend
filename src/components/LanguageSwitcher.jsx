import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "../i18n";

// Switching language never navigates or reloads the route — it only
// changes i18next's active language, and every page re-renders in place
// with the new strings (per the PartyPas spec: don't re-navigate on
// language change).
//
// Two markups are rendered together and CSS decides which one shows:
// a single-row chip group (TR / EN / UA / RU / FR) on wider screens where
// it fits on one line, and a compact native dropdown — still short codes,
// never full language names — once the header narrows to the mobile nav
// breakpoint, where five separate chips would crowd the hamburger button.
export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage || i18n.language;

  const persist = (code) => {
    try {
      localStorage.setItem("pp_lang_choice", code);
    } catch (err) {
      // localStorage may be unavailable (e.g. private mode) — safe to ignore.
    }
  };

  const handleSelect = (code) => {
    if (code === current) return;
    i18n.changeLanguage(code);
    persist(code);
  };

  return (
    <div className="lang-switcher-wrap">
      <div className="lang-chips" role="group" aria-label="Language">
        {SUPPORTED_LANGUAGES.map((lng) => (
          <button
            key={lng.code}
            type="button"
            className={"lang-chip" + (current === lng.code ? " active" : "")}
            onClick={() => handleSelect(lng.code)}
            title={lng.label}
            aria-pressed={current === lng.code}
          >
            {lng.chip}
          </button>
        ))}
      </div>

      <select
        className="lang-select"
        value={current}
        onChange={(e) => handleSelect(e.target.value)}
        aria-label="Language"
      >
        {SUPPORTED_LANGUAGES.map((lng) => (
          <option key={lng.code} value={lng.code} title={lng.label}>
            {lng.chip}
          </option>
        ))}
      </select>
    </div>
  );
}
