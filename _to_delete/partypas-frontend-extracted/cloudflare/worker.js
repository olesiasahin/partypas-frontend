/**
 * PartyPas — geo-based default language (Cloudflare Worker)
 * ------------------------------------------------------------
 * Runs at the edge in front of partypas.com (which is proxied through
 * Cloudflare and served by GitHub Pages as the origin). On a visitor's
 * first request, it looks at Cloudflare's built-in geolocation
 * (request.cf.country) and sets a "pp_lang" cookie so the React app
 * (src/i18n/index.js) boots directly into the right language — no
 * redirect, no flash of the wrong language.
 *
 * If the visitor already has a pp_lang cookie (either set by this worker
 * before, or because they explicitly picked a language in the header —
 * see src/components/LanguageSwitcher.jsx, which also mirrors the choice
 * into localStorage), the worker leaves it alone and just passes the
 * request through untouched.
 *
 * Deploy:
 *   1. `npm install -g wrangler` (if not already installed)
 *   2. From this `cloudflare/` folder: `wrangler login`
 *   3. `wrangler deploy` (uses wrangler.toml in this folder)
 *   4. In the Cloudflare dashboard, add a Worker Route for
 *      partypas.com/* (and www.partypas.com/*) pointing at this worker.
 *      Workers > your worker > Triggers > Add route.
 */

const COUNTRY_TO_LANG = {
  TR: "tr",
  UA: "uk",
  RU: "ru",
  BY: "ru",
  FR: "fr",
  BE: "fr", // mixed FR/NL, but French is a safe, well-supported default
  MC: "fr",
  CH: "fr",
};

const SUPPORTED = new Set(["tr", "en", "uk", "ru", "fr"]);
const DEFAULT_LANG = "en";
const COOKIE_NAME = "pp_lang";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function getCookie(request, name) {
  const header = request.headers.get("Cookie") || "";
  const match = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export default {
  async fetch(request, env, ctx) {
    const existing = getCookie(request, COOKIE_NAME);

    // Already has a language preference (either set by us before, or by
    // the visitor explicitly choosing one) — don't touch it.
    if (existing && SUPPORTED.has(existing)) {
      return fetch(request);
    }

    const country = request.cf && request.cf.country;
    const lang = COUNTRY_TO_LANG[country] || DEFAULT_LANG;

    const response = await fetch(request);
    const newResponse = new Response(response.body, response);
    newResponse.headers.append(
      "Set-Cookie",
      `${COOKIE_NAME}=${lang}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`
    );
    return newResponse;
  },
};
