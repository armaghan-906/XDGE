import { Suspense, useEffect, useRef, useState } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';

/**
 * PageTransition — CSS-transition curtain crossfade.
 *
 * The curtain's opacity is driven by a CSS class toggle, NOT by JS animation.
 * Why this matters: CSS opacity transitions run on the browser's compositor
 * thread independently of the main thread. When React mounts the new page
 * (which can block the main thread for 100-200ms with dozens of components
 * initializing), a framer-motion-driven opacity animation would stall in that
 * window — visible as a jerk. The CSS transition keeps playing smoothly
 * regardless of what JS is doing.
 *
 * Suspense is INSIDE this component so a slow lazy chunk doesn't unmount
 * the curtain mid-fade.
 */

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function PageTransition() {
  const { pathname } = useLocation();
  const outlet = useOutlet();
  const [shown, setShown] = useState(outlet);
  const [covering, setCovering] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      setShown(outlet);
      return;
    }

    let cancelled = false;
    const run = async () => {
      // 1 · Cover — CSS class toggle, browser handles opacity 0 → 1 on the
      //              compositor thread. Slower than before so it reads as a
      //              deliberate transition rather than a quick flash/flicker.
      setCovering(true);
      await sleep(500);
      if (cancelled) return;

      // 2 · Swap — new page mounts behind the (fully opaque) curtain.
      setShown(outlet);
      window.scrollTo(0, 0);
      // Settle hold while the new page commits.
      await sleep(320);
      if (cancelled) return;

      // 3 · Reveal — CSS class toggle, opacity 1 → 0 on compositor.
      setCovering(false);
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
      <div
        aria-hidden="true"
        className={`xg-curtain${covering ? ' is-show' : ''}`}
      >
        <span className="xg-curtain-mark">XDGE</span>
      </div>
    </>
  );
}
