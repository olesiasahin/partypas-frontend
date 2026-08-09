import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const STYLE_KEYS = ["ballroom", "classic", "ballet", "latino"];

export default function DanceStyles() {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace("#", ""));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location]);

  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">{t("danceTypes.eyebrow")}</p>
        <h1>{t("danceTypes.title")}</h1>
        <p className="page-intro">{t("danceTypes.intro")}</p>

        <div className="style-list">
          {STYLE_KEYS.map((key) => (
            <article className="style-detail card" id={key} key={key}>
              <h2>{t(`danceTypes.${key}.name`)}</h2>
              <p>{t(`danceTypes.${key}.desc`)}</p>
              <Link to="/book" className="btn btn-primary">
                {t("danceTypes.cta")}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
