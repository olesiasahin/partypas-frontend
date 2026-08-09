export default function Logo({ size = 40, withWordmark = true }) {
  return (
    <span className="logo" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden="true">
        <circle cx="60" cy="60" r="58" fill="var(--bordeaux-noir)" />
        <path
          d="M40 86V34h20.5c9.7 0 16.9 6.6 16.9 16.2 0 9.6-7.2 16.2-16.9 16.2H49.6V86H40Zm9.6-27.7h9.8c5.1 0 8.5-3 8.5-7.5s-3.4-7.5-8.5-7.5h-9.8v15Z"
          fill="var(--vanilla-silk)"
        />
        <path d="M60 86c14-6 24-10 24-22" stroke="var(--gold)" strokeWidth="4" strokeLinecap="round" fill="none" />
        <circle cx="86" cy="60" r="4.5" fill="var(--gold)" />
      </svg>
      {withWordmark && <span className="logo-word">PartyPas</span>}
    </span>
  );
}
