import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function WhyOnline() {
  const { t } = useTranslation();
  const page = t("pages.whyOnline", { returnObjects: true });

  return (
    <>
      <section className="inner-hero">
        <div className="inner-copy">
          <p className="kicker">{t("how.eyebrow")}</p>
          <h1>{page.title}</h1>
          <p>{page.lead}</p>
          <Link className="btn btn-primary" to="/book">
            {t("nav.cta")} →
          </Link>
        </div>
        <div className="inner-image">
          <img src="/images/online.jpg" alt={page.title} />
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
