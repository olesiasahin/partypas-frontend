import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import InnerPage from "../components/InnerPage";
import { IMAGES } from "../siteConfig";
import { usePageHref } from "../pageLinks";

const BRANCHES = [
  { key: "online", page: "programlar-online", image: IMAGES.online },
  { key: "studio", page: "programlar-studio", image: IMAGES.editorial },
];

export default function Programs() {
  const { t } = useTranslation();
  const page = t("pages.programs", { returnObjects: true });
  const branches = t("programBranches", { returnObjects: true });
  const href = usePageHref();

  return (
    <InnerPage page={page} image={IMAGES.hero}>
      <section className="content-section program-branches">
        <div className="program-branch-grid">
          {BRANCHES.map(({ key, page: pageKey, image }) => {
            const branch = branches[key];
            return (
              <Link className="program-branch" to={href(pageKey)} key={key}>
                <img src={image} alt="" />
                <div className="program-branch-copy">
                  <span>{branch.eyebrow}</span>
                  <h2>{branch.title}</h2>
                  <p>{branch.lead}</p>
                  <strong>{branch.linkLabel} →</strong>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </InnerPage>
  );
}
