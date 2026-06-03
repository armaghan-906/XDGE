import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Magnetic — playful springy hover. Wrap any button, link, chip or card and
 * it eases toward the cursor while hovered, pops on hover, dips on press, and
 * springs back with a little overshoot when the cursor leaves.
 *
 *   import { Magnetic } from '../Magnetic';
 *
 *   <Magnetic>
 *     <Link to="/cohorts" className="xg-btn">Apply now</Link>
 *   </Magnetic>
 *
 * Props:
 *   strength — how far it follows the cursor (0 = none, 0.5 = lively). Default 0.35.
 *   pop      — hover scale. Default 1.04.
 *   as       — wrapper tag/element. Default 'span' (inline-flex).
 */
export function Magnetic({
  children,
  strength = 0.35,
  pop = 1.04,
  as = 'span',
  style,
  ...rest
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // low damping = a touch of overshoot on settle — playful
  const sx = useSpring(x, { stiffness: 220, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 14, mass: 0.4 });

  const reduced = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onMove = (e) => {
    if (reduced()) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const MotionTag = motion[as] || motion.span;

  return (
    <MotionTag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, display: 'inline-flex', ...style }}
      whileHover={{ scale: pop }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
