import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import InnerPage from "../components/InnerPage";
import { IMAGES } from "../siteConfig";
import { usePageHref } from "../pageLinks";

const BRANCH_IMAGES = { online: IMAGES.online, studio: IMAGES.editorial };

export default function ProgramBranch({ branchKey }) {
  const { t } = useTranslation();
  const branch = t(`programBranches.${branchKey}`, { returnObjects: true });
  const href = usePageHref();

  return (
    <InnerPage page={branch} image={BRANCH_IMAGES[branchKey]}>
      <section className="content-section program-detail-section">
        <div className="program-list">
          {branch.programs.map((program) => (
            <article className="program-card" key={program.name}>
              <h3>{program.name}</h3>
              <p className="program-meta">{program.details}</p>
              <p>{program.description}</p>
              {program.price && <div className="price">{program.price}</div>}
              <Link className="text-link" to={href("trial")}>
                {t("nav.cta")} →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </InnerPage>
  );
}
