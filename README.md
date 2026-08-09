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
public/favicon.svg, public/logo.svg   brand mark
```

## Brand colors

Defined as CSS variables in `src/styles/theme.css`. The project brief named
these six colors without exact hex codes, so the values below are a
reasonable first pass — **swap them for your official swatches** whenever
you have them; every component reads from these variables, so it's a
one-file change.

| Name           | Variable            | Current hex |
|----------------|----------------------|-------------|
| Vanilla Silk   | `--vanilla-silk`     | `#F7EFE4`   |
| Alpine Oat     | `--alpine-oat`       | `#EAE0CE`   |
| Warm Greige    | `--warm-greige`      | `#C8BBA9`   |
| Cherry Velvet  | `--cherry-velvet`    | `#8A1F2E`   |
| Bordeaux Noir  | `--bordeaux-noir`    | `#2B0A10`   |
| Gold           | `--gold`             | `#C7A143`   |

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
