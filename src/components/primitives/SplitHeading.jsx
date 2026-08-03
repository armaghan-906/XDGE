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
// The clip must hide the line BELOW it and nothing else. Every other edge needs
// slack, because `overflow: hidden` clips all four sides and the line box is
// smaller than the glyphs that sit in it.
//
// BOTTOM (was the only one that existed, at 0.08em): descenders and heavy strokes.
// TOP: these headings run `line-height` 0.85–0.95, i.e. tighter than the font's
//   own ascent, so cap-tops sit above the line box and were being shaved. Measured
//   on the PROVES heading: 26px off the top of the middle line, and 4px off the
//   hollow line — which uses a different family and weight ('Archivo' 500 vs
//   'Archivo Black' 900) and so overflows its box by a different amount again.
// Deliberately VERTICAL only. Side padding was tried and reverted: it does stop a
// long line being cut, but the clip's border box then extends past the container,
// and in any section without its own `overflow: hidden` that lands in the
// document's scrollable area — measured 2200px of scrollWidth against a 1920px
// viewport on /how-it-works, /cohorts and /about, i.e. the whole page could be
// scrolled sideways. CSS cannot express "clip Y, leave X alone" either: with one
// axis visible and the other hidden, the visible one computes to auto. Lines that
// overflow their container are capped at the source instead, per heading.
//
// Each padding is cancelled by an equal negative margin and `box-sizing:
// content-box`, so the clip's content box — and therefore the layout — is exactly
// as it was; only the clipping rectangle grows.
//
// Travel is 160%, up from 130%, because the bottom padding grew. The line has to
// clear `height + PAD_BOTTOM` PLUS however far its glyphs overflow their own line
// box, and at 130% three lines were left peeking before their reveal — measured
// 3px on PROVES, 9px on IS THIS RIGHT, 12px on OUR PERFORMANCE. The two kickers
// are the tight case: they set `font-size: 0.45em` on an inner span, so their line
// box is small while PAD_BOTTOM is a fraction of the h2's much larger size. 160%
// gives 0.60x the line height of clearance, which covers all of them. Starting
// further below costs nothing visually — it is hidden either way.
const PAD_BOTTOM = '0.15em';
const PAD_TOP = '0.25em';

// All lines rise TOGETHER — one delay, no per-line offset.
//
// This used to cascade at `0.05 + i * 0.13`, so a three-line heading finished
// 0.26s after it started and the parts read as separate objects arriving one
// after another rather than as one heading. Each line still has its own clip
// (that is what makes the mask work at all), but they now share a single
// timing, so the whole heading lifts as a single block.
const lineMask = {
  hidden: { y: '160%' },
  visible: {
    y: '0%',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 },
  },
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
  //
  // Fires 300px BEFORE the heading reaches the viewport, not once 20% of it is
  // already on screen. Together with the shorter mask above this is what stops a
  // heading arriving late: at `amount: 0.2` + 1.4s, a ~340px heading started only
  // after 68px of it had appeared and was still animating as it left the screen at
  // anything past ~800px/s of scroll — perfect frames the whole time, but the
  // content visibly trailing the scroll. 300px early + 0.8s settles it before it
  // is read. Matches how the plain-text reveal has always been armed.
  const seen = useInView(ref, { once: true, margin: '0px 0px 300px 0px' });

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
        // Padding grows the clipping rectangle on every edge except where the
        // mask needs it tight; the matching negative margins cancel it out of the
        // layout, so nothing shifts.
        <span
          key={i}
          style={{
            display: 'block',
            overflow: 'hidden',
            boxSizing: 'content-box',
            paddingTop: PAD_TOP,
            marginTop: `-${PAD_TOP}`,
            paddingBottom: PAD_BOTTOM,
            marginBottom: `-${PAD_BOTTOM}`,
          }}
        >
          <motion.span data-no-reveal
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
