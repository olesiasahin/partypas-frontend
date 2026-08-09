import { useTranslation } from "react-i18next";

/**
 * Appointment booking block.
 *
 * PartyPas books classes through Zoom's scheduling tools rather than a
 * custom backend. Replace ZOOM_SCHEDULER_URL below with your real Zoom
 * Scheduler (or Zoom Events registration) link once it exists, and the
 * iframe will render your live available dates/hours automatically.
 * Until then this renders a clear placeholder so the page still explains
 * exactly how booking will work.
 *
 * compact=true renders a shorter version for the Contact page.
 */
const ZOOM_SCHEDULER_URL = ""; // e.g. "https://scheduler.zoom.us/partypas/book-a-class"

export default function ZoomBooking({ compact = false }) {
  const { t } = useTranslation();
  const steps = t("appointment.steps.items", { returnObjects: true });

  return (
    <div className="zoom-booking">
      {!compact && (
        <div className="booking-steps">
          <h3>{t("appointment.steps.title")}</h3>
          <ol>
            {steps.map((step, i) => (
              <li key={i}>
                <strong>{step.title}</strong>
                <span>{step.text}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="booking-widget card">
        <h4>{t("appointment.widgetTitle")}</h4>
        {ZOOM_SCHEDULER_URL ? (
          <iframe
            title="PartyPas Zoom scheduler"
            src={ZOOM_SCHEDULER_URL}
            className="booking-iframe"
            loading="lazy"
          />
        ) : (
          <div className="booking-placeholder">
            <p>{t("appointment.widgetPlaceholder")}</p>
            <a
              className="btn btn-primary"
              href="mailto:letsdance@partypas.com?subject=Class%20booking%20request"
            >
              {t("appointment.cta")}
            </a>
          </div>
        )}
        <p className="booking-payment-note">{t("appointment.paymentNote")}</p>
      </div>
    </div>
  );
}
