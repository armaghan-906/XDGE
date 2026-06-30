import { Suspense, useEffect } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { theme } from '../theme';
import { getLenis } from './SmoothScroll';

/**
 * PageTransition — plain page wrapper (no curtain overlay).
 * New page renders immediately with a light opacity fade-in (compositor-only),
 * and scrolls to top on route change.
 */
export function PageTransition() {
  const { pathname } = useLocation();
  const outlet = useOutlet();

  useEffect(() => {
    // Reset through Lenis so its internal target doesn't lerp back to a stale
    // position; fall back to native when smooth-scroll is disabled.
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div
      key={pathname}
      style={{ animation: 'xg-page-fadein 1s cubic-bezier(0.22, 1, 0.36, 1) backwards' }}
    >
      <Suspense fallback={<div style={{ minHeight: '100vh', background: theme.dark }} />}>
        {outlet}
      </Suspense>
    </div>
  );
}
