import { useTranslation } from "react-i18next";
import InnerPage from "../components/InnerPage";

/** Classical / Ballroom / Stretching — same template, different copy + photo. */
export default function ClassPage({ discKey, image }) {
  const { t } = useTranslation();
  const page = t(`pages.${discKey}`, { returnObjects: true });
  return <InnerPage page={page} image={image} />;
}
