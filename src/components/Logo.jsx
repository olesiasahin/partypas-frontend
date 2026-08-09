/**
 * PartyPas brand mark. `logo-lockup.png` (icon + wordmark, transparent
 * background) is the everyday header/footer version; pass
 * variant="full" to use `logo-full.png`, which also includes the
 * "Move. Smile. Repeat." tagline — nice for a larger footer or a
 * standalone brand moment. The favicon uses the icon alone (see
 * index.html / public/favicon.ico) with no wordmark, per spec.
 */
export default function Logo({ size = 44, variant = "lockup" }) {
  const src = variant === "full" ? "/logo-full.png" : "/logo-lockup.png";
  return (
    <img
      src={src}
      alt="PartyPas — Move. Smile. Repeat."
      style={{ height: size, width: "auto", display: "block" }}
    />
  );
}
