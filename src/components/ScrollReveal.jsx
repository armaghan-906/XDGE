import { useLayoutEffect } from 'react';

/**
 * ScrollReveal — Global Intersection Observer using CSS classes.
 *
 * Instead of imperatively setting opacity:0 / transform via JS (which causes
 * flash-of-invisible-content and main-thread animate() calls during scroll),
 * we add a CSS class `.sr-init` that hides elements, then flip to `.sr-visible`
 * when they enter the viewport. The transition runs entirely on the compositor
 * thread via CSS transitions defined in index.css.
 *
 * This eliminates:
 *  - The FOIC (elements briefly visible then snapping to invisible)
 *  - Framer Motion animate() calls competing with scroll on the main thread
 *  - Stagger delay accumulation causing long reveal waits
 */
export function ScrollReveal() {
  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Use requestAnimationFrame to batch class additions to a single frame
            requestAnimationFrame(() => {
              entry.target.classList.add('sr-visible');
            });
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    const initObserver = () => {
      const selectors = [
        'section h1', 'section h2', 'section h3', 'section h4',
        'section p', 'section li', 'section blockquote'
      ].join(', ');

      const elements = document.querySelectorAll(selectors);

      for (const el of elements) {
        // Skip if already initialized, or managed by Framer Motion
        if (el.classList.contains('sr-init') || el.classList.contains('sr-visible')) continue;
        if (el.closest('[data-framer-appear-id]')) continue;
        // Skip elements inside the preloader
        if (el.closest('[style*="z-index: 99999"]')) continue;

        el.classList.add('sr-init');
        observer.observe(el);
      }
    };

    // Run on next frame so the DOM is fully painted first
    const rafId = requestAnimationFrame(initObserver);

    // Re-run on route changes
    const handleRouteChange = () => {
      // Small delay so the new page's DOM is ready
      setTimeout(initObserver, 200);
    };
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return null;
}
