import { motion } from 'framer-motion';

/**
 * AnimatedIcon — line marks that draw themselves on scroll-into-view.
 *
 * Uses framer-motion's `pathLength` so each stroke draws on with your
 * signature ease. Strokes stagger within an icon. Set `once={false}` to
 * redraw every time it re-enters the viewport.
 *
 *   import { AnimatedIcon } from '../AnimatedIcon';
 *   <AnimatedIcon name="cohort" size={64} />
 *
 * Names: 'cohort' | 'edge' | 'trajectory' | 'focus'
 */

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
};

const stroke = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.2, ease: [0.2, 0.7, 0.2, 1] },
      opacity: { duration: 0.01 },
    },
  },
};

// shared stroke props for every shape
const S = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  variants: stroke,
};

const ICONS = {
  cohort: [
    <motion.circle key="a" cx="22" cy="24" r="8" {...S} />,
    <motion.circle key="b" cx="44" cy="24" r="8" {...S} />,
    <motion.path key="c" d="M8 52c0-9 6-14 14-14s14 5 14 14" {...S} />,
    <motion.path key="d" d="M36 40c2-2 5-2 8-2 8 0 14 5 14 14" {...S} />,
  ],
  edge: [
    <motion.circle key="a" cx="32" cy="32" r="24" {...S} />,
    <motion.path key="b" d="M32 8 L40 32 L32 56 L24 32 Z" {...S} />,
    <motion.line key="c" x1="8" y1="32" x2="56" y2="32" {...S} />,
  ],
  trajectory: [
    <motion.polyline key="a" points="8,48 24,34 36,42 56,16" {...S} />,
    <motion.polyline key="b" points="44,16 56,16 56,28" {...S} />,
  ],
  focus: [
    <motion.circle key="a" cx="32" cy="32" r="24" {...S} />,
    <motion.circle key="b" cx="32" cy="32" r="13" {...S} />,
    <motion.circle key="c" cx="32" cy="32" r="3" {...S} />,
  ],
};

export function AnimatedIcon({ name = 'cohort', size = 64, once = true, amount = 0.5, style, ...rest }) {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      style={{ color: 'currentColor', display: 'block', overflow: 'visible', ...style }}
      {...rest}
    >
      {ICONS[name] || ICONS.cohort}
    </motion.svg>
  );
}
