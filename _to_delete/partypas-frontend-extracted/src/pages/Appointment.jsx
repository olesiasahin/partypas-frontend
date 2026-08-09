import { useTranslation } from "react-i18next";
import ZoomBooking from "../components/ZoomBooking";

export default function Appointment() {
  const { t } = useTranslation();

  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">{t("appointment.eyebrow")}</p>
        <h1>{t("appointment.title")}</h1>
        <p className="page-intro">{t("appointment.intro")}</p>
        <ZoomBooking />
      </div>
    </section>
  );
}
