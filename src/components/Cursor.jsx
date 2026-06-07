import { useEffect, useRef, useState } from 'react';

const SIZE = 24;
const INTERACTIVE = 'a, button, [role="button"], [data-cursor="grow"], input, textarea, select';

// Plain-JS custom cursor — no framer-motion. Outer wrapper tracks mouse
// position via direct transform updates (every mousemove). Inner element
// handles the scale-on-hover/press state via React.
export function Cursor() {
  const wrapRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const move = (e) => {
      wrap.style.transform = `translate3d(${e.clientX - SIZE / 2}px, ${e.clientY - SIZE / 2}px, 0)`;
    };
    const isInteractive = (target) => !!(target && target.closest && target.closest(INTERACTIVE));
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
  }, []);

  const scale = pressed ? 0.8 : hovering ? 1.8 : 1;
  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: SIZE, height: SIZE,
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate3d(-100px, -100px, 0)',
        willChange: 'transform',
      }}
    >
      <div
        className="xdge-cursor"
        style={{
          width: SIZE, height: SIZE,
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.85)',
          border: '1px solid rgba(255,255,255,0.6)',
          transform: `scale(${scale})`,
        }}
      />
    </div>
  );
}
