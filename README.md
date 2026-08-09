# PartyPas — Dance School Website

React + Vite site for PartyPas, an online dance school teaching Ballroom,
Classic, Ballet and Latino. Deployed to GitHub Pages on the custom domain
`partypas.com`, proxied through Cloudflare.

_"Move. Smile. Repeat."_

## Stack

- **React 19 + Vite** — app shell, `react-router-dom` for routing
- **react-i18next** — 5 languages: Turkish, English, Ukrainian, Russian, French
- **Plain CSS** with brand tokens in `src/styles/theme.css`
- **Cloudflare Worker** (`/cloudflare`) — sets initial language by visitor country
- **GitHub Actions** (`.github/workflows/deploy.yml`) — builds and deploys to GitHub Pages on every push to `main`

## Local development

```bash
npm install
npm run dev
```

## Project structure

```
src/
  components/     Header, Footer, LanguageSwitcher, Logo, ZoomBooking
  pages/          Home, DanceStyles, Appointment, Contact, Blog (+FAQ)
  i18n/           i18next config + locales/{en,tr,uk,ru,fr}.json
  styles/theme.css  brand color variables & shared UI primitives
cloudflare/       Worker script + deploy instructions for geo-based language
.github/workflows/deploy.yml   CI build & deploy to GitHub Pages
public/CNAME      custom domain (partypas.com) for GitHub Pages
public/favicon.ico, public/logo-*.png   brand mark (see "Logo" below)
```

## Design language

Editorial/luxury pass, styled after high-jewelry and fashion houses
(Cartier, YSL, Moss). The site lives on a **Warm Greige** canvas with
**Burgundy Noir** ink for all text — high-contrast and warm, not the
flat-gold-on-light mistake. Burgundy Noir is kept as two deliberate dark
"anchor" bands (the CTA band and the footer) for light/dark rhythm.
**Gold is rendered as a metallic gradient** everywhere it appears as a
fill — buttons, the CTA/email-card frame rules, the eyebrow underline —
rather than a flat swatch, and is never used as small body text (fails
legibility against the light canvas). Font throughout is **Bodoni Moda**
(loaded from Google Fonts in `index.html`). Cherry Velvet remains
retired from the palette.

Defined as CSS variables in `src/styles/theme.css` — swap any of these
for your official swatches whenever you have them; every component reads
from these variables, so it's a one-file change.

| Name                    | Variable                  | Current value            |
|-------------------------|----------------------------|--------------------------|
| Warm Greige (main canvas) | `--warm-greige`         | `#C8BBA9`                |
| Burgundy Noir (main ink)  | `--burgundy-noir`       | `rgb(70, 20, 19)` — "noble burgundy" |
| Burgundy Noir, raised (CTA band) | `--burgundy-noir-raised` | `#2e100f` |
| Burgundy Noir, deep (footer) | `--burgundy-noir-deep` | `#200a09` |
| Vanilla Silk            | `--vanilla-silk`          | `#F7EFE4`                |
| Alpine Oat              | `--alpine-oat`            | `#EAE0CE`                |
| Gold (flat, hairlines)  | `--gold`                  | `#C7A143`                |
| Gold, metallic (fills, rules) | `--gold-metallic` / `--gold-metallic-h` | multi-stop gradient, see `theme.css` |

## Logo

`src/components/Logo.jsx` renders `public/logo-lockup.png` (icon +
wordmark, transparent background) in the header/footer by default, or
`public/logo-full.png` (adds the tagline) via `variant="full"`. The
favicon (`public/favicon.ico` + PNG sizes + `apple-touch-icon.png`) uses
the icon alone, no text, on a solid burgundy background for tab
legibility. All are generated from the source artwork — regenerate them
if the logo changes.

## Booking (Zoom)

`src/components/ZoomBooking.jsx` is the shared appointment block used on
the **Book a Class** page and embedded (compact) on the **Contact** page.
It's built to embed a real **Zoom Scheduler** link as an iframe — set
`ZOOM_SCHEDULER_URL` at the top of that file once you have one. Until
then it shows a clear placeholder with a "reserve" mailto fallback.
Payment is explicitly called out as manual/offline everywhere the booking
flow is shown, per the current scope (no payment processor yet).

## Deploying

1. Push this repo to GitHub, enable **Pages → Source: GitHub Actions** in
   repo settings.
2. Push to `main` — the workflow in `.github/workflows/deploy.yml` builds
   and deploys automatically.
3. In Cloudflare DNS, point `partypas.com` at GitHub Pages
   (`<username>.github.io`) with a proxied (orange cloud) CNAME/A record,
   per GitHub's [custom domain docs](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).
4. Deploy the geo-language Cloudflare Worker — see `cloudflare/README.md`.

## Languages & the header switcher

Changing the language in the header (`LanguageSwitcher.jsx`) **never
navigates** — it just calls `i18n.changeLanguage()`, and the current page
re-renders with the new strings in place, per spec. The choice is saved
to `localStorage` so it persists across visits and pages.

The **default** language on a first-time visit is set by the Cloudflare
Worker based on the visitor's country (see `cloudflare/README.md`) —
Turkish visitors see Turkish, Ukrainian visitors see Ukrainian, and so on,
falling back to English.
