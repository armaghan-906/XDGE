import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useFontsReady } from '../../hooks/useFontsReady';

/**
 * SplitHeading — Boldz-style line mask reveal.
 *
 * Each line sits inside an overflow-hidden clip and rises up from below,
 * cascading one-by-one. Transform-only, so it runs on the GPU compositor with
 * no scroll cost. Plays once per visit.
 *
 * ── Two details that decide whether this flickers ───────────────────────────
 *
 * TRAVEL vs CLIP PADDING. The clip carries `paddingBottom` so descenders and
 * heavy strokes are not shaved; that padding is part of the clip's box, so the
 * line must travel further than its own height to be fully hidden. Concretely
 * it must clear `height + PAD`, and the travel is a percentage of height — so
 * at the old 118% with a 0.14em pad and `line-height: 0.95` the clearance was
 * 0.171em vs 0.14em needed: about 0.03em of margin. Anything that nudged the
 * metrics (a font swap, a clamp() breakpoint) flipped it and let the cap-tops
 * peek out before the animation started, then snap. 130% against a smaller pad
 * roughly quadruples that headroom.
 *
 * FONT METRICS. The travel is a percentage of the line's own height, so it is
 * recomputed if that height changes. With `display=swap` the real display face
 * arrives mid-load and every heading re-lays-out — mid-animation that reads as
 * a jump. `useFontsReady` holds the reveal until metrics are final (capped), so
 * the animation only ever runs against a stable box.
 */
const PAD = '0.08em';

const lineMask = {
  hidden: { y: '130%' },
  visible: (i = 0) => ({
    y: '0%',
    transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.05 + i * 0.13 },
  }),
};

export function SplitHeading({ lines, style, tag = 'h2', lineClasses = [] }) {
  const Tag = motion[tag] || motion.h2;
  const ref = useRef(null);
  const fontsReady = useFontsReady();
  // Driven explicitly rather than with `whileInView`, because that prop's
  // `once: true` observer latches the moment the heading enters view — if fonts
  // had not settled yet it would latch on "hidden" and stop watching, leaving
  // the heading permanently invisible. `useInView` latches the *fact* of having
  // been seen, and the animate target is then free to flip when fonts land.
  const seen = useInView(ref, { once: true, amount: 0.2 });

  return (
    <Tag
      ref={ref}
      data-no-reveal
      initial="hidden"
      animate={seen && fontsReady ? 'visible' : 'hidden'}
      style={{ margin: 0, ...style }}
    >
      {lines.map((l, i) => (
        // The wrapper is the stationary clip; the inner span is what moves.
        // padding+negative-margin gives descenders/strokes room without
        // shifting layout.
        <span
          key={i}
          style={{
            display: 'block',
            overflow: 'hidden',
            paddingBottom: PAD,
            marginBottom: `-${PAD}`,
          }}
        >
          <motion.span data-no-reveal
            custom={i}
            variants={lineMask}
            className={lineClasses[i] || undefined}
            style={{ display: 'block' }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
