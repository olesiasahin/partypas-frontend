import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * A single-page app keeps the window's scroll position when the view
 * changes, so navigating away from halfway down one page lands you halfway
 * down the next one. This resets to the top whenever the page actually
 * changes.
 *
 * Three cases are deliberately NOT a page change:
 *  - only `?lang=` changed — the language switcher rewrites the query in
 *    place, and you should stay exactly where you were reading;
 *  - the URL carries a hash (`/?page=home#classes`, `#how`) — those links
 *    are meant to land on a section, and Home.jsx scrolls to it;
 *  - the first render — the browser has already positioned the page.
 *
 * `scrollRestoration` is set to manual so Back/Forward also start at the
 * top instead of the browser restoring a position we're about to override.
 */
export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();
  const page = new URLSearchParams(search).get("page") || "home";
  const key = `${pathname}|${page}|${hash}`;
  const previous = useRef(key);

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    if (previous.current === key) return;
    previous.current = key;
    if (hash) return;
    // `instant` overrides the stylesheet's `scroll-behavior: smooth`, which
    // would otherwise animate the whole page height on every navigation.
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } catch {
      window.scrollTo(0, 0);
    }
  }, [key, hash]);

  return null;
}
