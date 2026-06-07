import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../../theme';

/**
 * Reveal — scroll-triggered fade-up with Framer Motion.
 * Uses `once: true` so each element only animates in once (no re-trigger on scroll back).
 * `amount: 0.15` means the animation fires when 15% of the element is in the viewport.
 */
export function Reveal({ children, variants = fadeUp, ...rest }) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Group({ children, ...rest }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
