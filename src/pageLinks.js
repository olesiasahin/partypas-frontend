import { useTranslation } from "react-i18next";

// URL scheme identical to the design prototype: ?page=<key>&lang=<xx>[#hash]
// so any prototype URL pasted onto the site shows the same page.
export const PAGES = ["home", "klasik", "salon", "stretching", "neden-online", "programlar", "hakkimda", "iletisim", "trial", "blog"];

// i18n code -> prototype lang code
export const LANG_OUT = { uk: "ua" };
// prototype lang code -> i18n code
export const LANG_IN = { ua: "uk" };

export function pageHref(page, lang, hash) {
  const l = LANG_OUT[lang] || lang;
  return `/?page=${page}&lang=${l}${hash ? `#${hash}` : ""}`;
}

export function usePageHref() {
  const { i18n } = useTranslation();
  const lang = i18n.resolvedLanguage || i18n.language;
  return (page, hash) => pageHref(page, lang, hash);
}
