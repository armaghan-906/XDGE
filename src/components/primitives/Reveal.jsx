import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../../theme';

// Fire reveals when section is just barely entering viewport (5-8%).
// User sees content smoothly rising into place as they scroll into the
// section — the motion is the point. Higher thresholds (20%+) made
// reveals look like "things popping in late" once user already arrived.
const REVEAL_VIEWPORT = { once: true, amount: 0.08 };
const GROUP_VIEWPORT = { once: true, amount: 0.05 };

export function Reveal({ children, variants = fadeUp, ...rest }) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={REVEAL_VIEWPORT}
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
      viewport={GROUP_VIEWPORT}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
