import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "./Logo";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Logo size={32} />
          <p className="footer-tagline">{t("footer.tagline")}</p>
        </div>

        <nav className="footer-nav">
          <NavLink to="/dance-styles">{t("nav.danceTypes")}</NavLink>
          <NavLink to="/book">{t("nav.appointment")}</NavLink>
          <NavLink to="/blog">{t("nav.blog")}</NavLink>
          <NavLink to="/contact">{t("nav.contact")}</NavLink>
        </nav>

        <div className="footer-contact">
          <a href="mailto:letsdance@partypas.com" className="metallic-text">letsdance@partypas.com</a>
        </div>
      </div>
      <div className="container">
        <p className="footer-legal">© {year} PartyPas. {t("footer.rights")}</p>
      </div>
    </footer>
  );
}
