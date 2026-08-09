# Cloudflare geo-language routing

partypas.com is a static React site on GitHub Pages, sitting behind
Cloudflare. Cloudflare can't run React logic, but it *can* tell us the
visitor's country on every request via `request.cf.country`. This worker
uses that to set a `pp_lang` cookie before the page ever loads, and the
React app (`src/i18n/index.js`) reads that cookie to pick its initial
language — Turkish visitors land on the Turkish site, Ukrainian visitors
on the Ukrainian site, and so on, with English as the fallback.

## How it fits together

1. `worker.js` runs at Cloudflare's edge in front of `partypas.com`.
2. On a visitor's first request (no `pp_lang` cookie yet), it maps their
   country to one of the 5 supported languages and sets the cookie.
3. GitHub Pages serves the static `index.html`/JS as usual — the worker
   only adds a cookie, it doesn't change the HTML.
4. `src/i18n/index.js` reads `pp_lang` on load and initializes i18next
   with that language.
5. If a visitor manually changes the language in the header
   (`src/components/LanguageSwitcher.jsx`), that choice is saved to
   `localStorage` and takes priority over the geo default from then on —
   changing language never re-navigates, per spec.

## Country → language mapping (edit in `worker.js` as needed)

| Country            | Language   |
|--------------------|------------|
| Turkey (TR)        | Turkish    |
| Ukraine (UA)       | Ukrainian  |
| Russia (RU), Belarus (BY) | Russian |
| France (FR), Belgium (BE), Monaco (MC), Switzerland (CH) | French |
| Everywhere else    | English (default) |

## Deploying

```bash
npm install -g wrangler
cd cloudflare
wrangler login
wrangler deploy
```

Then in the Cloudflare dashboard: **Workers & Pages → partypas-geo-lang →
Triggers → Add route**, and add:

- `partypas.com/*`
- `www.partypas.com/*`

Make sure the DNS record for `partypas.com` is **proxied** (orange
cloud) in Cloudflare — an unproxied ("DNS only") record bypasses Workers
entirely.

## Testing

- Use a VPN or Cloudflare's "Trace" tool to simulate different countries.
- Or temporarily hardcode `country` in `worker.js` for a quick check.
- Clear the `pp_lang` cookie between tests, or the worker will skip
  setting it again (by design, so it never overrides a visitor's own
  choice).
