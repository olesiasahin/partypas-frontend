import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const STYLE_KEYS = ["ballroom", "classic", "ballet", "latino"];

export default function Home() {
  const { t } = useTranslation();
  const whyItems = t("home.why.items", { returnObjects: true });

  return (
    <>
      <section className="hero section">
        <div className="container hero-inner">
          <p className="eyebrow">{t("home.hero.eyebrow")}</p>
          <h1>{t("home.hero.title")}</h1>
          <p className="hero-subtitle">{t("home.hero.subtitle")}</p>
          <div className="hero-actions">
            <Link to="/book" className="btn btn-primary">{t("home.hero.ctaPrimary")}</Link>
            <Link to="/dance-styles" className="btn btn-outline">{t("home.hero.ctaSecondary")}</Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container intro-block">
          <h2>{t("home.intro.title")}</h2>
          <p>{t("home.intro.text")}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>{t("home.styles.title")}</h2>
          <div className="style-grid">
            {STYLE_KEYS.map((key) => (
              <Link to={`/dance-styles#${key}`} key={key} className="style-card card">
                <h3>{t(`danceTypes.${key}.name`)}</h3>
                <p>{t(`danceTypes.${key}.short`)}</p>
              </Link>
            ))}
          </div>
          <div className="center-cta">
            <Link to="/dance-styles" className="btn btn-outline">{t("home.styles.cta")}</Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2>{t("home.why.title")}</h2>
          <div className="why-grid">
            {whyItems.map((item, i) => (
              <div className="why-item" key={i}>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container cta-band-inner">
          <h2>{t("home.cta.title")}</h2>
          <p>{t("home.cta.text")}</p>
          <Link to="/book" className="btn btn-gold">{t("home.cta.button")}</Link>
        </div>
      </section>
    </>
  );
}
