import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "./Logo";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-cell">
            <Logo height={44} />
            <p className="footer-tagline">{t("brand.tagline")}</p>
          </div>

          <div className="footer-cell">
            <div className="footer-title">{t("footerCta.title")}</div>
            <p>{t("footerCta.text")}</p>
            <NavLink to="/book" className="text-link" style={{ color: "var(--gold)", marginTop: 10 }}>
              {t("footerCta.button")} →
            </NavLink>
          </div>

          <div className="footer-cell footer-nav">
            <NavLink to="/classical">{t("nav.classes")}</NavLink>
            <NavLink to="/programs">{t("nav.programs")}</NavLink>
            <NavLink to="/about">{t("nav.about")}</NavLink>
            <NavLink to="/blog">{t("nav.blog")}</NavLink>
          </div>

          <div className="footer-cell footer-contact">
            <a href="mailto:letsdance@partypas.com" className="metallic-text">
              letsdance@partypas.com
            </a>
            <NavLink to="/contact" className="text-link" style={{ color: "var(--gold)", marginTop: 10 }}>
              {t("nav.contact")} →
            </NavLink>
          </div>
        </div>
      </div>
      <p className="footer-legal">
        © {year} PartyPas. {t("footer.rights")}
      </p>
    </footer>
  );
}
