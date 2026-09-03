import { useState } from "react";
import { useTranslation } from "react-i18next";

// Blog & FAQ — required by the original PartyPas brief; not part of the
// design prototype, so it borrows the prototype's content-section /
// program-card language rather than inventing a new one.
export default function Blog() {
  const { t } = useTranslation();
  const posts = t("blog.posts", { returnObjects: true });
  const faq = t("blog.faq", { returnObjects: true });
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="blog-page">
      <section className="content-section" style={{ borderTop: "none" }}>
        <div className="kicker">{t("blog.eyebrow")}</div>
        <h1>{t("blog.title")}</h1>
        <p>{t("blog.intro")}</p>
        <div className="post-grid">
          {posts.map((post) => (
            <article className="post-card" key={post.title}>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span className="read-more">{t("blog.readMore")} →</span>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section" id="faq">
        <h2>{t("blog.faqTitle")}</h2>
        <div className="faq-list">
          {faq.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div className="faq-item" key={item.q}>
                <button className="faq-question" onClick={() => setOpenIndex(isOpen ? null : i)} aria-expanded={isOpen}>
                  <span>{item.q}</span>
                  <span className="faq-icon">{isOpen ? "–" : "+"}</span>
                </button>
                {isOpen && <p className="faq-answer">{item.a}</p>}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
