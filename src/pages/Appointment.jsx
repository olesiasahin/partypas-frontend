import { useState } from "react";
import { useTranslation } from "react-i18next";
import InnerPage from "../components/InnerPage";
import { CONTACT, IMAGES } from "../siteConfig";

// "Start your classes" — mirrors the prototype's trial page: inner hero +
// a four-card form (name / e-mail / WhatsApp / submit). The prototype's
// submit was a placeholder alert; here it opens a pre-filled email to
// letsdance@partypas.com so requests actually reach you until a real
// form backend / Zoom scheduler is wired in (see components/ZoomBooking.jsx).
export default function Appointment() {
  const { t } = useTranslation();
  const page = t("pages.trial", { returnObjects: true });
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "" });
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`${page.title} — ${form.name}`);
    const body = encodeURIComponent(
      `Name / Ad Soyad: ${form.name}\nE-mail: ${form.email}\nWhatsApp: ${form.whatsapp}\n`
    );
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  };

  return (
    <InnerPage page={page} image={IMAGES.hero}>
      <section className="content-section">
        <form className="program-list" onSubmit={submit}>
          <div className="program-card">
            <label htmlFor="trial-name">Name / Ad Soyad</label>
            <br />
            <input id="trial-name" required value={form.name} onChange={update("name")} />
          </div>
          <div className="program-card">
            <label htmlFor="trial-email">E-mail</label>
            <br />
            <input id="trial-email" type="email" required value={form.email} onChange={update("email")} />
          </div>
          <div className="program-card">
            <label htmlFor="trial-whatsapp">WhatsApp</label>
            <br />
            <input id="trial-whatsapp" required value={form.whatsapp} onChange={update("whatsapp")} />
          </div>
          <div className="program-card">
            <button className="cta" type="submit">
              {t("nav.cta")} →
            </button>
          </div>
        </form>
      </section>
    </InnerPage>
  );
}
