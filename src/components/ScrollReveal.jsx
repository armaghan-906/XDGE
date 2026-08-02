import { useLayoutEffect } from 'react';

/**
 * ScrollReveal — the CSS-driven scroll reveal engine for PLAIN content
 * (headings, copy, images, standalone card blocks).
 *
 * It is deliberately the *second* of two reveal systems in this app. The first
 * is framer-motion (`Reveal` / `Group` / `SplitHeading`). The single most
 * important rule here is that the two must NEVER animate the same element or
 * the same subtree — see "Partitioning" below.
 *
 * ── Why this file is shaped the way it is ───────────────────────────────────
 *
 * 1. PRE-PAINT ARMING (kills the page-load flash).
 *    `.sr-init` sets opacity:0. If that class lands *after* the browser has
 *    already painted the element, the user sees content appear, vanish, then
 *    fade back in — a flash on every load and every route change. So the scan
 *    runs SYNCHRONOUSLY: directly in useLayoutEffect (before the first paint of
 *    already-mounted DOM) and directly inside the MutationObserver callback,
 *    which is delivered as a microtask at the end of the current task — still
 *    before the next paint. No requestAnimationFrame anywhere in the hide path.
 *
 * 2. PARTITIONING (kills the double animation).
 *    Every self-animating framer element carries `data-no-reveal`, which puts its
 *    whole subtree off-limits to this engine. Without that, e.g. an Insights card
 *    would fade+rise under framer while the <h3> and <p> *inside* it independently
 *    fade+rise under CSS, on a different curve, duration and trigger point — which
 *    reads as the card's text juddering against its own frame. `.sr-init` also
 *    carries a `transition`, and a CSS transition on an element whose
 *    transform/opacity framer rewrites every frame makes the browser chase each
 *    new value over 0.65s: visible rubber-banding.
 *
 *    The marker is DECLARED, never inferred. This used to be a runtime guess that
 *    walked an element's ancestors and treated "has an inline transform AND an
 *    inline opacity" as "framer owns this". That silently missed any wrapper whose
 *    hidden variant sets only one of the two (`lineMask` sets just `y`, `diagLabel`
 *    just `opacity`), and it depended on framer having already written its initial
 *    styles by scan time — so whether a heading animated once, twice, or not at all
 *    varied by section and by timing. Roughly 30 elements had been hand-marked to
 *    patch individual symptoms; the remaining 67 are now marked too, and the guess
 *    is gone.
 *
 *    IMPORTANT when adding motion: mark a framer element `data-no-reveal` only if
 *    it animates ITSELF. Orchestrators whose `hidden` variant is empty (`stagger`,
 *    `cardStagger`, `listContainer`, and therefore `Group`) apply nothing of their
 *    own and must stay unmarked, or every plain child under them loses its reveal.
 *
 *    And watch the FACTORY form. `const MotionLink = motion(Link)` is every bit as
 *    framer-driven as `motion.a`, but it is used as `<MotionLink>` — so a search
 *    for `motion.` does not find it. WhoWeServe's cards are exactly that: a
 *    `MotionLink` carrying `variants={fadeUp}` wrapping the card's own <h3> and
 *    <p>. Left unmarked, framer faded the card while this engine independently
 *    faded the text inside it, and the card's contents flickered in and back out.
 *
 * 3. FONT-METRIC GATING (kills the heading judder).
 *    Fonts load with `display=swap`, so Archivo Black replaces the fallback
 *    mid-session and every heading re-lays-out. A heading that is mid-reveal
 *    (or already revealed) visibly jumps when that happens. Reveals therefore
 *    wait for `document.fonts.ready` — capped, so a slow font never blocks the
 *    page. This is now the ONLY gate: reveals used to also wait out the intro
 *    preloader's full ~4s runtime, which is why the page sat dead on load.
 *
 * Elements animate ONCE and are then unobserved, and `will-change` is applied
 * only for the duration of each element's own transition — so there is no
 * standing GPU layer cost and no ongoing scroll cost.
 */

// Reveal units as SIMPLE selectors (no `section ` prefix) so `closest()` can be
// used for the anti-nesting test. The old scoped form ('section h3', …) could
// never match via closest() — a descendant selector needs the ancestor in the
// chain — so anti-nesting silently never fired and inner text of every card was
// revealed separately from the card. Section membership is checked separately.
const UNIT_PARTS = [
  'h1', 'h2', 'h3', 'h4',
  'p', 'li', 'blockquote',
  '[data-reveal]',
  'article',
  '.xg-outcomes-card', '.xg-principle-row',
];
const UNIT = UNIT_PARTS.join(', ');
const UNIT_SCOPED = UNIT_PARTS.map((s) => `section ${s}`).join(', ');

// Cap on waiting for webfonts before revealing anyway.
const FONT_WAIT_MS = 1200;

export function ScrollReveal() {
  useLayoutEffect(() => {
    let armed = false;
    let disposed = false;
    const pending = new Set();
    // Units this instance has claimed. See `consider` for why membership here,
    // rather than the presence of the `sr-init` class, is what marks a unit done.
    const handled = new WeakSet();

    // Reveal one element.
    //
    // Deliberately does NOT set `will-change`. Setting it here would ask the
    // browser to build a new compositor layer in the very same frame the
    // transition starts, putting that layer's first paint on the critical path —
    // a hitch at the exact moment the element begins to move, which is the worst
    // possible timing. Chrome already promotes an element for the duration of a
    // transition on `opacity`/`transform` by itself, so the hint bought nothing
    // and cost a frame. (`will-change` only helps when set *ahead* of the
    // animation, which for scroll reveals would mean holding a standing layer for
    // every not-yet-revealed element on the page.)
    const reveal = (el) => {
      el.classList.add('sr-visible');
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target;
          observer.unobserve(el);
          // Every element reveals on its own as it enters — no artificial
          // delay, which is what makes fast scrolling look continuous rather
          // than queued.
          el.style.transitionDelay = '0ms';
          if (armed) reveal(el);
          else pending.add(el);
        }
      },
      // Start the fade ~320px before the element reaches the viewport edge, so
      // it has finished moving by the time it is actually looked at.
      { threshold: 0, rootMargin: '0px 0px 320px 0px' }
    );

    const consider = (el) => {
      // Already finished — nothing left to do.
      if (el.classList.contains('sr-visible')) return;

      // Already claimed by THIS instance. Deliberately tracked per-instance
      // instead of testing for the `sr-init` class: StrictMode double-invokes
      // this layout effect in dev (mount → cleanup → mount), and the first run
      // leaves `sr-init` — i.e. opacity 0 — on every unit before its observer is
      // disconnected. Keyed off the class, the second run then treated all of
      // them as handled and never observed them with its own observer, so 38
      // elements on Home (the WHAT YOU LEAVE WITH marquee, the journey steps,
      // the Insights block) stayed invisible for the whole session with nothing
      // left alive to reveal them. Re-observing is safe and flash-free: the
      // class is already on the element, so nothing repaints.
      if (handled.has(el)) return;

      // Anti-nesting: if an ancestor is itself a reveal unit, let the ancestor
      // animate and leave this element alone, so a card moves as a single
      // object instead of piece by piece.
      if (el.parentElement && el.parentElement.closest(UNIT)) return;

      // The ONLY opt-out: an explicitly-marked framer-driven subtree. Every
      // self-animating framer element carries `data-no-reveal` — the primitives
      // stamp it themselves, section-level ones declare it in their JSX.
      if (el.closest('[data-no-reveal]')) return;

      handled.add(el);
      el.classList.add('sr-init');
      observer.observe(el);
    };

    // Hide + observe every not-yet-handled unit under `root`. MUST stay
    // synchronous — see PRE-PAINT ARMING above.
    const scan = (root) => {
      if (disposed) return;
      if (root.nodeType === 1 && root.matches(UNIT_SCOPED)) consider(root);
      for (const el of root.querySelectorAll(UNIT_SCOPED)) consider(el);
    };

    // Hiding happens now, before the browser paints — nothing ever flashes.
    scan(document);

    // Route changes and React.lazy chunk swaps bring in DOM after mount. The
    // MutationObserver callback is a microtask, so hiding that new DOM still
    // beats the paint. Do NOT defer this into rAF.
    // Only the newly-added subtrees are scanned, not the whole document. The
    // observer watches childList only, so framer's inline-style writes and this
    // engine's own class changes (both attribute mutations) never re-enter here.
    const mo = new MutationObserver((records) => {
      for (const rec of records) {
        for (const node of rec.addedNodes) {
          if (node.nodeType === 1) scan(node);
        }
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // ── Arming ───────────────────────────────────────────────────────────────
    // Everything above the fold has already tripped the observer by the time we
    // arm, so flushing it all in one frame would slam the whole first screen in
    // at once. Cascade it top-to-bottom instead — a deliberate entrance rather
    // than a pop. Scroll-triggered reveals after this keep zero delay, which is
    // what makes fast scrolling read as continuous.
    const arm = () => {
      if (armed || disposed) return;
      armed = true;

      const first = [...pending].sort(
        (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top
      );
      pending.clear();
      first.forEach((el, i) => {
        el.style.transitionDelay = `${Math.min(i * 70, 420)}ms`;
        reveal(el);
      });
    };

    const capped = (promise, ms) =>
      Promise.race([promise, new Promise((r) => setTimeout(r, ms))]);

    // Webfonts: wait for final text metrics so no heading reflows mid-reveal.
    const fonts = document.fonts
      ? capped(document.fonts.ready, FONT_WAIT_MS)
      : Promise.resolve();

    // Fonts are the only gate now. The intro preloader used to hold reveals for
    // its full ~4s runtime, so nothing on the page could animate until it lifted
    // — the single biggest contributor to the page feeling stuck on load.
    fonts.then(arm);

    return () => {
      disposed = true;
      observer.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
