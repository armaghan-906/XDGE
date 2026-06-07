import { useState } from 'react';
import { theme } from '../theme';

// All animations DISABLED — MorphCard renders at its current size (small
// or large) with no transition between states. Click toggles size instantly.
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
    <button
      type="button"
      onClick={toggle}
      aria-pressed={open}
      style={{
        width: s.width,
        height: s.height,
        borderRadius: s.radius,
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
      <img
        src={src}
        alt={alt}
        loading="eager"
        decoding="async"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      {label && open && (
        <span
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
        </span>
      )}
    </button>
  );
}
