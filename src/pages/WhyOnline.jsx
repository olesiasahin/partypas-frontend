import { useTranslation } from "react-i18next";
import InnerPage from "../components/InnerPage";
import { IMAGES } from "../siteConfig";

export default function WhyOnline() {
  const { t } = useTranslation();
  const page = t("pages.whyOnline", { returnObjects: true });
  return <InnerPage page={page} image={IMAGES.online} />;
}
