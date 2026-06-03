import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Tilt — "Dimension" principle. The wrapped element tilts in 3D toward the
 * cursor with a soft spring, and an optional light "shine" tracks the pointer.
 * Put content that should float above the surface with `transform: translateZ(40px)`.
 *
 *   import { Tilt } from '../Tilt';
 *
 *   <Tilt max={12} style={{ width: 300, height: 380 }}>
 *     <img src="/assets/experience-card-2.webp" alt="" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}} />
 *     <div style={{ transform: 'translateZ(50px)' }}>The Edge</div>
 *   </Tilt>
 *
 * Props: max (deg of tilt), shine (bool), radius (border-radius of the inner card).
 */
export function Tilt({ children, max = 12, shine = true, radius = 16, className, style, ...rest }) {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 220, damping: 18, mass: 0.4 });

  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const shineBg = useTransform([px, py], ([x, y]) =>
    `radial-gradient(420px circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.18), transparent 45%)`
  );

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onMove = (e) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => { px.set(0.5); py.set(0.5); };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ perspective: 900, display: 'inline-block', ...style }}
      {...rest}
    >
      <motion.div
        className={className}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: radius,
          overflow: 'hidden',
        }}
      >
        {children}
        {shine && (
          <motion.div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              borderRadius: 'inherit',
              zIndex: 2,
              background: shineBg,
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
