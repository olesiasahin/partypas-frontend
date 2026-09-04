import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePageHref } from "../pageLinks";

/**
 * Mirrors the prototype's inner() template: an inner-hero (kicker, h1,
 * lead, CTA | photo) followed by a content-section (title + body), then
 * whatever page-specific block comes after (programs, contact grid, form).
 *
 * `page` is a translation object with { title, lead, body }.
 */
export default function InnerPage({ page, image, children }) {
  const { t } = useTranslation();
  const href = usePageHref();
  return (
    <>
      <section className="inner-hero">
        <div className="inner-copy">
          <div className="kicker">PARTYPAS</div>
          <h1>{page.title}</h1>
          <p>{page.lead}</p>
          <Link className="cta" to={href("trial")}>
            {t("nav.cta")} →
          </Link>
        </div>
        <div className="inner-image">
          <img src={image} alt="" />
        </div>
      </section>
      <section className="content-section">
        <h2>{page.title}</h2>
        <p>{page.body}</p>
      </section>
      {children}
    </>
  );
}
