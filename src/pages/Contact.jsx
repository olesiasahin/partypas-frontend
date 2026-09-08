import { useTranslation } from "react-i18next";
import InnerPage from "../components/InnerPage";
import { CONTACT, IMAGES } from "../siteConfig";

// Mirrors the prototype's contact page: inner hero + a 2-column grid of
// contact channels. Channels render only when set in Site settings
// (src/content/settings.json) — clearing a value hides its card.
//
// The prototype labelled the phone card "WhatsApp" and the WhatsApp card
// "PartyPas", which read as the same channel twice. Phone and WhatsApp are
// now labelled for what they actually are; the labels themselves are
// translated (Website texts → Contact page).
export default function Contact() {
  const { t } = useTranslation();
  const page = t("pages.contact", { returnObjects: true });
  const c = CONTACT;

  return (
    <InnerPage page={page} image={IMAGES.hero}>
      <section className="content-section">
        <div className="contact-grid">
          {c.instagram && (
            <div>
              <h2>{t("contact.labels.instagram")}</h2>
              <p>
                <a href={c.instagramUrl || "https://instagram.com"} target="_blank" rel="noreferrer">
                  {c.instagram}
                </a>
              </p>
            </div>
          )}
          {c.phone && (
            <div>
              <h2>{t("contact.labels.phone")}</h2>
              <p>
                <a href={`tel:${c.phone.replace(/\s/g, "")}`}>{c.phone}</a>
              </p>
            </div>
          )}
          <div>
            <h2>{t("contact.labels.email")}</h2>
            <p>
              <a href={`mailto:${c.email}`}>{c.email}</a>
            </p>
          </div>
          {c.whatsapp && (
            <div>
              <h2>{t("contact.labels.whatsapp")}</h2>
              <a className="text-link" href={c.whatsapp} target="_blank" rel="noreferrer">
                {t("contact.whatsappCta")} →
              </a>
            </div>
          )}
        </div>
      </section>
    </InnerPage>
  );
}
