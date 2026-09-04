import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import InnerPage from "../components/InnerPage";
import { IMAGES } from "../siteConfig";
import { usePageHref } from "../pageLinks";

export default function Programs() {
  const { t } = useTranslation();
  const page = t("pages.programs", { returnObjects: true });
  const items = t("programList", { returnObjects: true });
  const href = usePageHref();

  return (
    <InnerPage page={page} image={IMAGES.hero}>
      <section className="content-section">
        <div className="program-list">
          {items.map((item) => (
            <article className="program-card" key={item.name}>
              <h3>{item.name}</h3>
              <p>{item.details}</p>
              <div className="price">{item.price}</div>
              <Link className="text-link" to={href("trial")} style={{ marginTop: 26 }}>
                {t("nav.cta")} →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </InnerPage>
  );
}
