import { motion, useScroll, useSpring } from 'framer-motion';
import { theme } from '../theme';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  return (
    <motion.div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 2,
        background: theme.accent, transformOrigin: 'left',
        scaleX, zIndex: 100, pointerEvents: 'none',
      }}
    />
  );
}
