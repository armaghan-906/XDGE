import { Suspense, useEffect } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';

/**
 * PageTransition — animations DISABLED by user request.
 * Renders the routed outlet directly with no curtain wipe / crossfade.
 * Scroll resets to top on each navigation.
 */
export function PageTransition() {
  const { pathname } = useLocation();
  const outlet = useOutlet();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#000000' }} />}>
      {outlet}
    </Suspense>
  );
}
