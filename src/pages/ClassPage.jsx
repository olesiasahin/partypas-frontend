import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

/**
 * Shared template for the three discipline pages — Classical, Ballroom,
 * Stretching. Same layout, different copy/image via `discKey`/`image`
 * (see App.jsx for the three routes that render this).
 */
export default function ClassPage({ discKey, image }) {
  const { t } = useTranslation();
  const page = t(`pages.${discKey}`, { returnObjects: true });

  return (
    <>
      <section className="inner-hero">
        <div className="inner-copy">
          <p className="kicker">{t("nav.classes")}</p>
          <h1>{page.title}</h1>
          <p>{page.lead}</p>
          <Link className="btn btn-primary" to="/book">
            {t("nav.cta")} →
          </Link>
        </div>
        <div className="inner-image">
          <img src={image} alt={page.title} />
        </div>
      </section>
      <section className="content-section">
        <div className="container">
          <h2>{page.title}</h2>
          <p>{page.body}</p>
        </div>
      </section>
    </>
  );
}
