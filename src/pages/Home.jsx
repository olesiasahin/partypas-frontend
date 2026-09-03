import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IMAGES, LOGOS } from "../siteConfig";
import withBreaks from "../utils/withBreaks";

// Mirrors the prototype's home(): hero → three discipline rows (copy |
// photo | editorial photo) → how (intro | steps | photo) → teacher
// (photo | copy | watermark).
const DISCIPLINES = [
  { key: "classical", to: "/classical", img: IMAGES.classical },
  { key: "ballroom", to: "/ballroom", img: IMAGES.ballroom },
  { key: "stretching", to: "/stretching", img: IMAGES.stretching },
];

export default function Home() {
  const { t } = useTranslation();
  const location = useLocation();
  const steps = t("how.steps", { returnObjects: true });

  // Header "Classes" / "How it works" arrive here as /#classes, /#how.
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location]);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="kicker">01</div>
          <h1>{withBreaks(t("hero.title"))}</h1>
          <div className="hero-sub">{withBreaks(t("hero.subtitle"))}</div>
          <Link className="text-link" to="/book">
            {t("hero.cta")} →
          </Link>
        </div>
        <div className="hero-image">
          <img src={IMAGES.hero} alt="PartyPas" />
          <img className="hero-seal" src={LOGOS.light} alt="" />
        </div>
      </section>

      <div className="disciplines" id="classes">
        {DISCIPLINES.map((d, i) => {
          const lines = t(`disciplines.${d.key}.lines`, { returnObjects: true });
          const name = t(`disciplines.${d.key}.name`);
          return (
            <section className="discipline" id={d.key} key={d.key}>
              <div className="discipline-copy">
                <div className="num">0{i + 1}</div>
                <h2>{name}</h2>
                <p>{withBreaks(lines.join("\n"))}</p>
                <Link className="text-link" to={d.to} style={{ marginTop: 26 }}>
                  {t(`disciplines.${d.key}.more`)} →
                </Link>
              </div>
              <div className="discipline-img">
                <img src={d.img} alt={name} />
              </div>
              <div className="editorial-img">
                <img src={IMAGES.editorial} alt="" />
              </div>
            </section>
          );
        })}
      </div>

      <section className="how" id="how">
        <div className="how-intro">
          <div className="kicker">{t("how.eyebrow")}</div>
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
        <div className="how-photo">
          <img src={IMAGES.online} alt="Online" />
        </div>
      </section>

      <section className="teacher">
        <div className="teacher-photo">
          <img src={IMAGES.teacher} alt="" />
        </div>
        <div className="teacher-copy">
          <div className="kicker">{t("teacher.eyebrow")}</div>
          <h2>{withBreaks(t("teacher.title"))}</h2>
          <p>{t("teacher.text")}</p>
          <Link className="text-link" to="/about">
            {t("teacher.more")} →
          </Link>
        </div>
        <div className="teacher-mark">
          <img src={LOGOS.light} alt="" />
        </div>
      </section>
    </>
  );
}
