import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeUp, stagger } from '../../theme';

/**
 * Reveal / Group — the framer-motion half of the reveal system.
 *
 * `Reveal` animates its own root, so it stamps `data-no-reveal` to put that
 * whole subtree off-limits to the CSS engine in ScrollReveal. Without it the
 * root fades+rises under framer while the <h3>/<p> inside it fade+rise
 * separately under CSS — different curve, duration and trigger — and the text
 * visibly judders against the block it sits in. It also stops `.sr-init`'s CSS
 * `transition` from landing on an element whose transform/opacity framer
 * rewrites every frame, which makes the browser chase each new value over
 * 0.65s (rubber-banding).
 *
 * `Group` deliberately does NOT stamp it. Group is only an orchestrator: its
 * `hidden` variant is empty, so it applies no transform/opacity of its own and
 * only drives children that declare their own `variants`. Plenty of Group
 * children (Culture, ExperienceJourney, WhoWeServe …) have no variants and are
 * legitimately revealed by the CSS engine — excluding the whole subtree here
 * would leave them with no animation at all. The framer-driven children carry
 * `data-no-reveal` individually instead.
 *
 * ── Why `useInView` and not `whileInView` ───────────────────────────────────
 *
 * `whileInView` with `once: true` latches its observer the moment the element is
 * seen, and if the variant does not resolve on that exact pass the element is
 * left on `hidden` — opacity 0 — with nothing still watching to correct it. That
 * is not theoretical: measured on mobile Home, the hero's "View All Programmes"
 * CTA sat stranded at opacity 0 for the whole session. SplitHeading and the
 * WhoWeServe cards were both moved off `whileInView` for exactly this, and this
 * is the last primitive that was still on it.
 *
 * `useInView` latches the FACT of having been seen instead, and `animate` is then
 * free to resolve late. Same single play per visit, same trigger geometry — just
 * no way to end up permanently invisible.
 */

// Shared trigger geometry: ANY pixel, not a fraction.
//
// Nested Reveal/Group used to trigger at different amounts (0.15 vs 0.1), so a
// heading inside a group could start on a different scroll frame than the group
// around it. One value keeps a section coherent — but requiring a *fraction* of the
// element turned out to be able to deadlock it.
//
// Measured on mobile Home. The hero CTA's layout position is 790-832, comfortably
// inside both its copy block (575-832) and the hero section (0-844). But while it
// sits on `fadeUp`'s hidden state it carries translateY(48px), and a transform
// counts towards the rendered box — so it was really occupying 838-880, past the
// section's bottom edge, and the section clips (`overflow: hidden`). Only 6px of 42
// remained visible: ratio 0.136 against a 0.15 threshold. It missed by 0.014, so it
// never triggered, so it never left the hidden state that was pushing it out — the
// offset was preventing the very reveal that would have removed the offset.
//
// Any-pixel cannot deadlock that way, and it matches how SplitHeading is armed.
const VIEWPORT = { once: true };

export function Reveal({ children, variants = fadeUp, ...rest }) {
  const ref = useRef(null);
  const seen = useInView(ref, VIEWPORT);

  return (
    <motion.div
      ref={ref}
      data-no-reveal
      variants={variants}
      initial="hidden"
      animate={seen ? 'visible' : 'hidden'}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Group({ children, variants = stagger, ...rest }) {
  const ref = useRef(null);
  const seen = useInView(ref, VIEWPORT);

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={seen ? 'visible' : 'hidden'}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
