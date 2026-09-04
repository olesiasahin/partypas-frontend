import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { LOGOS } from "../siteConfig";
import { usePageHref } from "../pageLinks";

// Markup and links mirror the design's header. Below 900px the nav
// collapses behind a menu button (the design only hid it there).
export default function Header() {
  const { t } = useTranslation();
  const href = usePageHref();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="shell header-grid">
        <Link className="brand" to={href("home")}>
          <img src={LOGOS.dark} alt="PartyPas" />
        </Link>

        <nav className={`nav${open ? " open" : ""}`} onClick={close}>
          <Link to={href("home")}>{t("nav.home")}</Link>
          <Link to={href("home", "classes")}>{t("nav.classes")}</Link>
          <Link to={href("programlar")}>{t("nav.programs")}</Link>
          <Link to={href("hakkimda")}>{t("nav.about")}</Link>
          <Link to={href("home", "how")}>{t("nav.how")}</Link>
          <Link to={href("iletisim")}>{t("nav.contact")}</Link>
          <Link className="cta nav-cta-mobile" to={href("trial")}>
            {t("nav.cta")} →
          </Link>
        </nav>

        <div className="header-actions">
          <LanguageSwitcher />
          <Link className="cta header-cta" to={href("trial")}>
            {t("nav.cta")} →
          </Link>
          <button
            type="button"
            className="nav-toggle"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
