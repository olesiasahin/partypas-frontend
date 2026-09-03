import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Programs() {
  const { t } = useTranslation();
  const page = t("pages.programs", { returnObjects: true });
  const items = t("programList", { returnObjects: true });

  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">{t("nav.programs")}</p>
        <h1>{page.title}</h1>
        <p className="page-intro">{page.lead}</p>

        <div className="program-list">
          {items.map((item) => (
            <article className="program-card" key={item.name}>
              <h3>{item.name}</h3>
              <p className="details">{item.details}</p>
              <div className="price">{item.price}</div>
              <Link className="text-link" to="/book" style={{ marginTop: 22 }}>
                {t("nav.cta")} →
              </Link>
            </article>
          ))}
        </div>

        <p className="page-intro" style={{ marginTop: 48, marginBottom: 0 }}>
          {page.body}
        </p>
      </div>
    </section>
  );
}
