import { useTranslation } from "react-i18next";
import InnerPage from "../components/InnerPage";
import { IMAGES } from "../siteConfig";

export default function About() {
  const { t } = useTranslation();
  const page = t("pages.about", { returnObjects: true });
  return <InnerPage page={page} image={IMAGES.teacher} />;
}
