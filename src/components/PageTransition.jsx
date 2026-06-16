import { Suspense, useEffect } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { theme } from '../theme';

/**
 * PageTransition — simplified page wrapper.
 *
 * AnimatePresence mode="wait" was removed because it blocks rendering the
 * incoming page until the exit animation completes, creating a visible blank
 * gap (perceived as a jerk). Instead, the new page renders immediately with
 * a simple opacity fade-in via CSS, which runs on the compositor thread and
 * doesn't block layout or paint.
 */
export function PageTransition() {
  const { pathname } = useLocation();
  const outlet = useOutlet();

  useEffect(() => {
    // Scroll to top instantly when route changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div
      key={pathname}
      style={{
        animation: 'xg-page-fadein 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
      }}
    >
      <Suspense fallback={<div style={{ minHeight: '100vh', background: theme.dark }} />}>
        {outlet}
      </Suspense>
    </div>
  );
}
