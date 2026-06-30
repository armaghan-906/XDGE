import { motion } from 'framer-motion';

/**
 * SplitHeading — Boldz-style line mask reveal.
 * Each line sits inside an overflow-hidden clip and rises up from below
 * (translateY 118% -> 0), cascading one-by-one. Transform-only, so it runs
 * on the GPU compositor with no scroll cost. Plays once per visit.
 */
const lineMask = {
  hidden: { y: '118%' },
  visible: (i = 0) => ({
    y: '0%',
    transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.05 + i * 0.13 },
  }),
};

export function SplitHeading({ lines, style, tag = 'h2', lineClasses = [] }) {
  const Tag = motion[tag] || motion.h2;
  return (
    <Tag
      data-no-reveal
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
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
            paddingBottom: '0.14em',
            marginBottom: '-0.14em',
          }}
        >
          <motion.span
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
