/**
 * PartyPas brand mark — a minimal line-art dancer inside a broken circle.
 *
 * The full lockup artwork (icon + "PartyPas" wordmark + tagline baked
 * into one image) reads beautifully large, but its wordmark becomes an
 * illegible smudge once scaled down to a 44–56px header/footer height.
 * So here — same as the previous build — we use the icon alone
 * (`logo-gold-icon.png`, cropped from the same artwork) and set
 * "PartyPas" as real text next to it: crisp at any size, and it never
 * needs regenerating if the wordmark styling changes.
 */
export default function Logo({ height = 56, withWordmark = true }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: height * 0.16 }}>
      <img
        src="/logo-gold-icon.png"
        alt="PartyPas"
        style={{ height, width: height, objectFit: "contain", display: "block" }}
      />
      {withWordmark && <span className="logo-word">PartyPas</span>}
    </span>
  );
}
