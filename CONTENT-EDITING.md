# Editing PartyPas content

The site has an admin panel at **https://partypas.com/admin/** — no WordPress,
no server, no hosting bill. It's [Sveltia CMS](https://sveltiacms.app/), a
git-based CMS: it reads and writes the content files in this repository
through the GitHub API.

**What happens when you press Save:** the panel commits the change to `main` →
GitHub Actions rebuilds the site (`.github/workflows/deploy.yml`) → the change
is live, usually in about two minutes. Every edit is a normal git commit, so
nothing is ever lost and anything can be rolled back.

---

## One-time setup

### 1. Push this branch

The panel loads its configuration from `main` on GitHub. Nothing works until
`public/admin/` and `src/content/` are pushed.

### 2. Create a GitHub access token

1. Go to **github.com → Settings → Developer settings →
   Personal access tokens → Fine-grained tokens → Generate new token**
2. **Repository access:** Only select repositories → `olesiasahin/partypas-frontend`
3. **Permissions → Repository permissions → Contents: Read and write**
   (that's the only permission needed)
4. **Expiration:** whatever you're comfortable with — you'll repeat this step
   when it expires
5. Generate, and copy the token

### 3. Sign in

Open https://partypas.com/admin/ → **Sign In with Token** → paste it.

The token is stored in your browser only. It never goes into the repository
and is never sent anywhere except GitHub.

> **Later, if you want a proper "Sign in with GitHub" button** instead of
> pasting a token — worth doing if someone other than you will edit the site —
> deploy [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) as a
> Cloudflare Worker (you're already on Cloudflare) and add its URL as
> `base_url:` under `backend:` in `public/admin/config.yml`.

---

## What you can edit

### Website texts

All five languages appear **side by side on the same screen** — Turkish is the
default, and you can fill in English, Ukrainian, Russian and French without
leaving the page.

| Entry | Covers |
|---|---|
| **Menu, brand & footer** | Menu labels, brand name, tagline, footer lines |
| **Home page** | Hero, the three class blocks, "How it works", teacher block, closing CTA |
| **Inner pages** | Title / intro / body for Classical, Ballroom, Stretching, Why online, About, Programs, Contact, Start your classes |
| **Programs & prices** | The program cards — add, remove, reorder, reprice |
| **Booking page** | Booking steps, calendar heading, payment note |
| **Contact page** | Headings of the four contact cards, and the WhatsApp link text |
| **Blog & FAQ** | Blog posts and FAQ questions — add, remove, reorder |

**Line breaks.** Headlines like the hero use hard line breaks for their rhythm.
In the panel they're normal multi-line text boxes: each new line becomes a
line break on the page. Keep them short — the design depends on it.

**Blog posts.** A post has a title, a teaser and an optional full text. Leave
the full text empty and the card stays a teaser (as today); fill it in and
"Read more" expands it in place. A blank line starts a new paragraph.

### Site settings

Not translated — one value used in all five languages.

- **Contact details** — e-mail, phone, WhatsApp link, Instagram. Clearing a
  field hides that block on the Contact page and in the footer entirely.
  Phone and WhatsApp are separate cards: the phone card dials the number,
  the WhatsApp card opens the chat. Their *headings* are translated text
  (Website texts → Contact page); the values themselves live here.
- **Photos** — the seven site photos. Upload a new one and it replaces the old
  one everywhere it's used. Use similar proportions to the file you're
  replacing; the layout crops to fixed heights.
- **Logos** — the gold lockup used on the dark header/footer and the burgundy
  watermark used over photography.

---

## Good to know

- **Editing in the panel and editing locally both write to `main`.** If you
  save something in the panel, `git pull` before you next work on the repo
  locally, or you'll get a conflict.
- **Adding a language** means adding it to `i18n.locales` in
  `public/admin/config.yml`, to `SUPPORTED_LANGUAGES` in `src/i18n/index.js`,
  and adding a `src/content/<code>/` folder. Not a panel-only change.
- **Adding a whole new section of copy** is a code change too — the panel edits
  the fields that exist, it doesn't invent new ones.
- **Sveltia CMS is pre-1.0** and pinned to a specific version in
  `public/admin/index.html`. It won't change under you. To update, bump the
  version in that file and check the panel still loads.

## How the content is stored

```
src/content/
├─ settings.json          ← Site settings (not translated)
├─ tr/  en/  uk/  ru/  fr/
   ├─ site.json           ← menu, brand, footer
   ├─ home.json           ← everything on the home page
   ├─ pages.json          ← the inner pages
   ├─ programs.json       ← programs & prices
   ├─ booking.json        ← booking page
   ├─ contact.json        ← contact page
   └─ blog.json           ← blog posts & FAQ
```

`src/i18n/index.js` merges every file in a locale folder back into one
translation object at build time, so `t("hero.title")` and every other lookup
in the components works exactly as it did before. Adding a new section file
needs no change there.
