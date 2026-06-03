import { Suspense, useEffect, useRef, useState } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { motion, useAnimationControls } from 'framer-motion';
import { theme } from '../theme';

/**
 * PageTransition — curtain-wipe route transition.
 *
 * Wraps your routed <Outlet/>. On every navigation it:
 *   1. sweeps a solid panel UP from the bottom (cover)
 *   2. swaps the page + resets scroll while hidden behind the panel
 *   3. sweeps the panel OFF the top (reveal)
 *
 * The Suspense boundary is INSIDE this component, around just the page
 * content — so when a lazy route chunk is loading (network-bound on prod)
 * the curtain stays mounted and the wipe completes cleanly. In dev, chunks
 * load in milliseconds so this isn't visible — but on Vercel/network the
 * outer-Suspense pattern would unmount the curtain mid-animation.
 */

const SWEEP = [0.76, 0, 0.24, 1];

export function PageTransition() {
  const { pathname } = useLocation();
  const outlet = useOutlet();
  const [shown, setShown] = useState(outlet);

  const curtainRef = useRef(null);
  const curtain = useAnimationControls();
  const mark = useAnimationControls();
  const content = useAnimationControls();
  const firstRender = useRef(true);

  useEffect(() => {
    // Skip the wipe on first load — the hero already has its own entrance.
    if (firstRender.current) {
      firstRender.current = false;
      setShown(outlet);
      return;
    }

    let cancelled = false;
    const run = async () => {
      // 1 · COVER — panel sweeps up from the bottom (fast)
      if (curtainRef.current) curtainRef.current.style.transformOrigin = 'bottom';
      mark.set({ opacity: 0, y: 18 });
      await curtain.start({ scaleY: 1, transition: { duration: 0.3, ease: SWEEP } });
      if (cancelled) return;

      // 2 · SWAP — new page mounts behind the panel, scroll resets
      setShown(outlet);
      window.scrollTo(0, 0);
      content.set({ opacity: 0 });
      mark.start({ opacity: 1, y: 0, transition: { duration: 0.22, ease: SWEEP } });
      // Hold long enough that the mark fully reaches opacity 1 (0.22s rise)
      // AND sits solid for a beat before the reveal starts fading it out.
      await new Promise((r) => setTimeout(r, 380));
      if (cancelled) return;

      // 3 · REVEAL — content fades up, mark drifts up + fades, panel sweeps off
      content.start({ opacity: 1, transition: { duration: 0.32, ease: SWEEP } });
      mark.start({ opacity: 0, y: -8, transition: { duration: 0.22, ease: SWEEP } });
      if (curtainRef.current) curtainRef.current.style.transformOrigin = 'top';
      await curtain.start({ scaleY: 0, transition: { duration: 0.36, ease: SWEEP } });
    };
    run();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <motion.div animate={content} style={{ willChange: 'opacity' }}>
        {/* Suspense is INSIDE this motion.div so a lazy chunk load doesn't
            unmount the curtain (the curtain is the sibling motion.div below).
            On first page load the fallback shows under the empty curtain.
            On route navigation the curtain is fully covering, so the fallback
            is invisible — the wipe completes cleanly even on slow networks. */}
        <Suspense fallback={<div style={{ minHeight: '100vh', background: '#000000' }} />}>
          {shown}
        </Suspense>
      </motion.div>

      <motion.div
        ref={curtainRef}
        aria-hidden="true"
        initial={{ scaleY: 0 }}
        animate={curtain}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1200,
          background: theme.base,
          transformOrigin: 'bottom',
          display: 'grid',
          placeItems: 'center',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      >
        <motion.span
          animate={mark}
          initial={{ opacity: 0 }}
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
        </motion.span>
      </motion.div>
    </>
  );
}
