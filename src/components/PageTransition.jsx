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
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div
      key={pathname}
      style={{ animation: 'xg-page-fadein 0.5s cubic-bezier(0.16, 1, 0.3, 1) both' }}
    >
      <Suspense fallback={<div style={{ minHeight: '100vh', background: theme.dark }} />}>
        {outlet}
      </Suspense>
    </div>
  );
}
