import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { SUPPORTED_LANGUAGES } from "../i18n";
import { LANG_OUT } from "../pageLinks";

// Native <select> exactly as in the design (TR / EN / UA / FR / RU).
// Changes language in place (no reload) and mirrors it into ?lang= so the
// URL matches the prototype's.
const ORDER = ["tr", "en", "uk", "fr", "ru"];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [params, setParams] = useSearchParams();
  const current = i18n.resolvedLanguage || i18n.language;
  const langs = ORDER.map((code) => SUPPORTED_LANGUAGES.find((l) => l.code === code)).filter(Boolean);

  const handleChange = (e) => {
    const code = e.target.value;
    if (code === current) return;
    i18n.changeLanguage(code);
    try {
      localStorage.setItem("pp_lang_choice", code);
    } catch {
      // ignore
    }
    const next = new URLSearchParams(params);
    next.set("lang", LANG_OUT[code] || code);
    setParams(next, { replace: true });
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
