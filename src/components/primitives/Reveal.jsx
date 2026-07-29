import { motion } from 'framer-motion';
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
 * would leave them with no animation at all. ScrollReveal instead detects the
 * individual framer-driven children; see `framerOwned` there.
 *
 * `once: true` — plays a single time per visit, so there is no ongoing scroll
 * cost and no re-animation when scrolling back up.
 */

// Shared trigger geometry. Nested Reveal/Group used to trigger at different
// amounts (0.15 vs 0.1), so a heading inside a group could start on a different
// scroll frame than the group around it. One value keeps a section coherent.
const VIEWPORT = { once: true, amount: 0.15 };

export function Reveal({ children, variants = fadeUp, ...rest }) {
  return (
    <motion.div
      data-no-reveal
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Group({ children, variants = stagger, ...rest }) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
