import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../../theme';

/**
 * Reveal — scroll-triggered fade-up (framer). `once: true` = animate once.
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
