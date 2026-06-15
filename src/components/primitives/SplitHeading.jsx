import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../../theme';

/**
 * SplitHeading — each line animates in with a stagger.
 * Uses once:true so it only plays once per visit.
 */
export function SplitHeading({ lines, style, tag = 'h2', lineClasses = [] }) {
  const Tag = motion[tag] || motion.h2;
  return (
    <Tag
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      style={{ margin: 0, ...style }}
    >
      {lines.map((l, i) => (
        // lineClasses lets a heading mix the home-page treatments per line,
        // e.g. ['hollow-text', 'cyan-text'] for outline + gradient.
        <motion.span key={i} variants={fadeUp} className={lineClasses[i] || undefined} style={{ display: 'block' }}>
          {l}
        </motion.span>
      ))}
    </Tag>
  );
}
