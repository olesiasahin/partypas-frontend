import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DISCIPLINES = [
  { key: "classical", to: "/classical", img: "/images/classical.jpg" },
  { key: "ballroom", to: "/ballroom", img: "/images/ballroom.jpg" },
  { key: "stretching", to: "/stretching", img: "/images/stretching.jpg" },
];

function withBreaks(text) {
  return text.split("\n").map((line, i, arr) => (
    <span key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </span>
  ));
}

export default function Home() {
  const { t } = useTranslation();
  const steps = t("how.steps", { returnObjects: true });

  return (
    <>
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="kicker">{t("brand.tagline")}</p>
            <h1>{withBreaks(t("hero.title"))}</h1>
            <div className="hero-sub">{withBreaks(t("hero.subtitle"))}</div>
            <Link to="/book" className="text-link">
              {t("hero.cta")} →
            </Link>
          </div>
          <div className="hero-image">
            <img src="/images/hero.jpg" alt="PartyPas" />
            <img className="hero-seal" src="/logo-burgundy.png" alt="" />
          </div>
        </div>
      </section>

      <div className="disciplines" id="classes">
        {DISCIPLINES.map((d, i) => {
          const lines = t(`disciplines.${d.key}.lines`, { returnObjects: true });
          return (
            <section className="discipline" id={d.key} key={d.key}>
              <div className="discipline-copy">
                <div className="num">0{i + 1}</div>
                <h2>{t(`disciplines.${d.key}.name`)}</h2>
                <ul className="discipline-lines">
                  {lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <Link className="text-link" to={d.to}>
                  {t(`disciplines.${d.key}.more`)} →
                </Link>
              </div>
              <div className="discipline-img">
                <img src={d.img} alt={t(`disciplines.${d.key}.name`)} />
              </div>
            </section>
          );
        })}
      </div>

      <section className="how" id="how">
        <div className="how-intro">
          <p className="kicker">{t("how.eyebrow")}</p>
          <h2>{withBreaks(t("how.title"))}</h2>
          <Link className="text-link" to="/why-online">
            {t("how.more")} →
          </Link>
        </div>
        <div className="steps">
          {steps.map((step, i) => (
            <div className="step" key={step}>
              <div className="n">0{i + 1} →</div>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="teacher">
        <div className="teacher-photo">
          <img src="/images/teacher.jpg" alt="" />
        </div>
        <div className="teacher-copy">
          <p className="kicker">{t("teacher.eyebrow")}</p>
          <h2>{withBreaks(t("teacher.title"))}</h2>
          <p>{t("teacher.text")}</p>
          <Link className="text-link" to="/about">
            {t("teacher.more")} →
          </Link>
          <img className="teacher-mark" src="/logo-burgundy.png" alt="" />
        </div>
      </section>
    </>
  );
}
