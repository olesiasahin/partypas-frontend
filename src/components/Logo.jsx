/**
 * PartyPas brand mark. `logo-circle.png` is the icon alone — the dancer
 * artwork encapsulated in a circular badge, background kept intact, no
 * text baked in — used everywhere (header, footer, favicon) so the mark
 * is never square. The "PartyPas" wordmark next to it is real text, not
 * part of the image, so it stays crisp at any size and doesn't need to
 * be regenerated if copy or language changes.
 */
export default function Logo({ size = 44, withWordmark = true }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <img
        src="/logo-circle.png"
        alt="PartyPas"
        style={{ height: size, width: size, borderRadius: "50%", display: "block" }}
      />
      {withWordmark && <span className="logo-word">PartyPas</span>}
    </span>
  );
}
