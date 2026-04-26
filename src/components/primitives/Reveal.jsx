import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../../theme';

export function Reveal({ children, variants = fadeUp, ...rest }) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
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
      viewport={{ once: true, amount: 0.15 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
