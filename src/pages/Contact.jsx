import { useTranslation } from "react-i18next";
import ZoomBooking from "../components/ZoomBooking";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">{t("contact.eyebrow")}</p>
        <h1>{t("contact.title")}</h1>
        <p className="page-intro">{t("contact.text")}</p>

        <div className="contact-email-card card">
          <span className="eyebrow">{t("contact.emailLabel")}</span>
          <a href={`mailto:${t("contact.email")}`} className="contact-email-link">
            {t("contact.email")}
          </a>
        </div>

        <div className="contact-appointment">
          <h2>{t("contact.appointmentTitle")}</h2>
          <p>{t("contact.appointmentText")}</p>
          <ZoomBooking compact />
        </div>
      </div>
    </section>
  );
}
