// Site-wide, non-translated settings — the React counterpart of the
// prototype's `settings` block in content.js.
//
// The values now live in src/content/settings.json so they can be edited
// from the CMS panel at /admin ("Site settings"). This module keeps the
// same named exports, so nothing that imports it had to change.
//
// Contact: setting a value to "" hides that line/card in the footer and on
// the Contact page.
import settings from "./content/settings.json";

export const CONTACT = settings.contact;
export const IMAGES = settings.images;
export const LOGOS = settings.logos;

export default settings;
