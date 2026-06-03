import { useState } from 'react';
import { motion } from 'framer-motion';
import { theme } from '../theme';

/**
 * MorphCard — "Transform & Morph" principle. A rounded thumbnail morphs into a
 * full banner (and back), carrying the eye between states. The image gently
 * un-zooms as it expands (a touch of "masking"), and the label fades in once open.
 *
 *   import { MorphCard } from '../MorphCard';
 *
 *   <MorphCard
 *     src="/assets/journey-banner.webp"
 *     label="The Journey"
 *     small={{ width: 180, height: 130, radius: 80 }}
 *     large={{ width: '100%', height: 320, radius: 14 }}
 *   />
 *
 * Click toggles the morph. Pass `start="large"` to begin expanded, or drive it
 * yourself by passing `open` + `onToggle` (controlled).
 */
const EASE = [0.2, 0.7, 0.2, 1];

export function MorphCard({
  src,
  alt = '',
  label,
  small = { width: 180, height: 130, radius: 80 },
  large = { width: '100%', height: 320, radius: 14 },
  start = 'small',
  open: openProp,
  onToggle,
  style,
  ...rest
}) {
  const [openState, setOpenState] = useState(start === 'large');
  const open = openProp != null ? openProp : openState;
  const toggle = () => (onToggle ? onToggle(!open) : setOpenState((o) => !o));
  const s = open ? large : small;

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-pressed={open}
      animate={{ width: s.width, height: s.height, borderRadius: s.radius }}
      transition={{ duration: 0.9, ease: EASE }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 0,
        border: 'none',
        cursor: 'pointer',
        display: 'block',
        background: theme.dark,
        boxShadow: '0 30px 80px -40px rgba(0,0,0,0.9)',
        ...style,
      }}
      {...rest}
    >
      <motion.img
        src={src}
        alt={alt}
        animate={{ scale: open ? 1.02 : 1.2 }}
        transition={{ duration: 0.9, ease: EASE }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      {label && (
        <motion.span
          animate={{ opacity: open ? 1 : 0, y: open ? 0 : 10 }}
          transition={{ duration: 0.5, ease: EASE, delay: open ? 0.3 : 0 }}
          style={{
            position: 'absolute',
            left: 20,
            bottom: 16,
            fontFamily: theme.display,
            fontWeight: 700,
            textTransform: 'uppercase',
            color: theme.base,
            fontSize: 'clamp(20px, 3vw, 40px)',
            letterSpacing: '-0.01em',
            lineHeight: 1,
            textShadow: '0 2px 30px rgba(0,0,0,0.6)',
            pointerEvents: 'none',
          }}
        >
          {label}
        </motion.span>
      )}
    </motion.button>
  );
}
