import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Blog() {
  const { t } = useTranslation();
  const posts = t("blog.posts", { returnObjects: true });
  const faq = t("blog.faq", { returnObjects: true });
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      <section className="section">
        <div className="container">
          <p className="eyebrow">{t("blog.eyebrow")}</p>
          <h1>{t("blog.title")}</h1>
          <p className="page-intro">{t("blog.intro")}</p>

          <div className="post-grid">
            {posts.map((post, i) => (
              <article className="post-card card" key={i}>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span className="read-more">{t("blog.readMore")} →</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="faq">
        <div className="container">
          <h2>{t("blog.faqTitle")}</h2>
          <div className="faq-list">
            {faq.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div className={`faq-item card ${isOpen ? "open" : ""}`} key={i}>
                  <button
                    className="faq-question"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <span className="faq-icon">{isOpen ? "–" : "+"}</span>
                  </button>
                  {isOpen && <p className="faq-answer">{item.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
