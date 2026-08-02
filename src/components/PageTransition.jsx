import { Suspense, useEffect } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { theme } from '../theme';

/**
 * PageTransition — plain page wrapper (no curtain overlay).
 * New page renders immediately with a light opacity fade-in (compositor-only),
 * and scrolls to top on route change.
 */
export function PageTransition() {
  const { pathname } = useLocation();
  const outlet = useOutlet();

  useEffect(() => {
    // Native scroll owns the position (Lenis was removed — a JS-driven scroll
    // always trails the wheel input, which is what read as the page "sticking").
    window.scrollTo(0, 0);
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
