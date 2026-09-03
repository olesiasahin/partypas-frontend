import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CONTACT, LOGOS } from "../siteConfig";

// Mirrors the prototype's footer(): four cells — logo | trial pitch |
// contact links | CTA button. Contact lines render only when set in
// siteConfig.js (spec: email only until phone/socials are ready).
export default function Footer() {
  const { t } = useTranslation();
  const c = CONTACT;

  return (
    <footer className="site-footer">
      <div className="footer-cell">
        <img className="footer-logo" src={LOGOS.dark} alt="PartyPas" />
      </div>
      <div className="footer-cell">
        <div className="footer-title">{t("footerCta.title")}</div>
        <p>{t("footerCta.text")}</p>
        <Link to="/book">{t("footerCta.button")} →</Link>
      </div>
      <div className="footer-cell footer-contact">
        {c.phone && <a href={`tel:${c.phone.replace(/\s/g, "")}`}>{c.phone}</a>}
        {c.instagram && (
          <a href={c.instagramUrl || "https://instagram.com"} target="_blank" rel="noreferrer">
            {c.instagram}
          </a>
        )}
        <a href={`mailto:${c.email}`}>{c.email}</a>
      </div>
      <div className="footer-cell">
        <Link className="cta" to="/book">
          {t("footerCta.button")} →
        </Link>
      </div>
    </footer>
  );
}
