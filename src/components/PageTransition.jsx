import { Suspense, useEffect, useRef, useState } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { motion, useAnimationControls } from 'framer-motion';
import { theme } from '../theme';

/**
 * PageTransition — opacity-only curtain crossfade.
 *
 * Replaced the earlier scaleY sweep with a pure opacity fade. Opacity
 * transitions on a fixed-position element are composited entirely on the
 * GPU — there is zero main-thread paint cost while the curtain shows or
 * hides. This eliminates the perceived jerk during route changes,
 * especially on production where the lazy chunk load was competing for
 * main-thread time with the previous scaleY animation.
 *
 * Suspense is INSIDE this component so a slow lazy chunk doesn't unmount
 * the curtain mid-fade.
 */

const EASE = [0.4, 0, 0.2, 1];

export function PageTransition() {
  const { pathname } = useLocation();
  const outlet = useOutlet();
  const [shown, setShown] = useState(outlet);

  const curtain = useAnimationControls();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      setShown(outlet);
      return;
    }

    let cancelled = false;
    const run = async () => {
      // 1 · Cover — overlay fades in (GPU-composited, no main-thread cost).
      await curtain.start({ opacity: 1, transition: { duration: 0.28, ease: EASE } });
      if (cancelled) return;

      // 2 · Swap — new page mounts behind the overlay, scroll resets.
      setShown(outlet);
      window.scrollTo(0, 0);
      // Brief settle so the new page commits before we start uncovering.
      await new Promise((r) => setTimeout(r, 140));
      if (cancelled) return;

      // 3 · Reveal — overlay fades out.
      await curtain.start({ opacity: 0, transition: { duration: 0.32, ease: EASE } });
    };
    run();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <div>
        <Suspense fallback={<div style={{ minHeight: '100vh', background: '#000000' }} />}>
          {shown}
        </Suspense>
      </div>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={curtain}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1200,
          background: theme.base,
          display: 'grid',
          placeItems: 'center',
          pointerEvents: 'none',
          willChange: 'opacity',
        }}
      >
        <span
          style={{
            fontFamily: theme.display,
            fontWeight: 700,
            textTransform: 'uppercase',
            color: theme.dark,
            fontSize: 'clamp(48px, 9vw, 120px)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          XDGE
        </span>
      </motion.div>
    </>
  );
}
