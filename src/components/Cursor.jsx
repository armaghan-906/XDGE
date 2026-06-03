import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const SIZE = 24;
const INTERACTIVE = 'a, button, [role="button"], [data-cursor="grow"], input, textarea, select';

export function Cursor() {
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const isInteractive = (el) => !!(el && el.closest && el.closest(INTERACTIVE));
    const over = (e) => { if (isInteractive(e.target)) setHovering(true); };
    const out = (e) => { if (isInteractive(e.target)) setHovering(false); };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    document.addEventListener('mousedown', down);
    document.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
      document.removeEventListener('mousedown', down);
      document.removeEventListener('mouseup', up);
    };
  }, [x, y]);

  return (
    <motion.div
      className="xdge-cursor"
      style={{
        position: 'fixed',
        top: -SIZE / 2, left: -SIZE / 2,
        x: sx, y: sy,
        width: SIZE, height: SIZE,
        borderRadius: '50%',
        background: 'rgba(0,0,0,0.85)',
        border: '1px solid rgba(255,255,255,0.6)',
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform',
      }}
      animate={{ scale: pressed ? 0.8 : hovering ? 1.8 : 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    />
  );
}
