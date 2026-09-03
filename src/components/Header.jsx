import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { LOGOS } from "../siteConfig";

// Markup mirrors the prototype's header() exactly:
// <header.site-header> <a.brand><img></a> <nav.nav>…</nav>
// <div.header-actions><select.lang-select/><a.cta.header-cta/></div>
//
// "Classes" and "How it works" are anchors on the Home page (not routes);
// from another page they navigate home first, then scroll.
function AnchorLink({ hash, onClick, children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = (e) => {
    onClick?.();
    if (location.pathname === "/") {
      e.preventDefault();
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      e.preventDefault();
      navigate(`/#${hash}`);
    }
  };
  return (
    <a href={`/#${hash}`} onClick={handleClick}>
      {children}
    </a>
  );
}

export default function Header() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <Link className="brand" to="/" onClick={close}>
        <img src={LOGOS.dark} alt="PartyPas" />
      </Link>

      <nav className={`nav${open ? " open" : ""}`}>
        <Link to="/" onClick={close}>{t("nav.home")}</Link>
        <AnchorLink hash="classes" onClick={close}>{t("nav.classes")}</AnchorLink>
        <Link to="/programs" onClick={close}>{t("nav.programs")}</Link>
        <Link to="/about" onClick={close}>{t("nav.about")}</Link>
        <AnchorLink hash="how" onClick={close}>{t("nav.how")}</AnchorLink>
        <Link to="/contact" onClick={close}>{t("nav.contact")}</Link>
      </nav>

      <div className="header-actions">
        <LanguageSwitcher />
        <Link className="cta header-cta" to="/book" onClick={close}>
          {t("nav.cta")} →
        </Link>
        {/* React addition — the prototype has no mobile menu at all */}
        <button className="nav-toggle" aria-label="Toggle navigation" onClick={() => setOpen((o) => !o)}>
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
