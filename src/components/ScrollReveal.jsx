import { useLayoutEffect } from 'react';

/**
 * ScrollReveal — global, GPU-only scroll reveal (Boldz-style).
 *
 * IntersectionObserver adds `.sr-init` (opacity:0 + translateY) to text and
 * images, then `.sr-visible` when they enter the viewport. The transition is
 * pure CSS (opacity + transform) so it runs entirely on the compositor — no
 * main-thread animation during scroll, and each element animates ONCE
 * (unobserved after), so there is zero ongoing scroll cost → no jank.
 *
 *  - Elements entering together are staggered (top-to-bottom) for a sequential feel.
 *  - A MutationObserver re-scans on DOM changes so client-side route
 *    navigation (About / Programmes / …) animates too, not just the first page.
 *  - Framer-motion-managed elements are left alone (their inline styles win).
 */
export function ScrollReveal() {
  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      (entries) => {
        const entered = entries.filter((e) => e.isIntersecting);
        // stagger top-to-bottom for the ones that appear in the same step
        entered.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        entered.forEach((entry, i) => {
          const el = entry.target;
          if (!reduce) el.style.transitionDelay = `${Math.min(i * 70, 350)}ms`;
          requestAnimationFrame(() => el.classList.add('sr-visible'));
          observer.unobserve(el);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const SELECTOR = [
      'section h1', 'section h2', 'section h3', 'section h4',
      'section p', 'section li', 'section blockquote',
      'section img', 'section figure',
    ].join(', ');

    const scan = () => {
      const els = document.querySelectorAll(SELECTOR);
      for (const el of els) {
        if (el.classList.contains('sr-init') || el.classList.contains('sr-visible')) continue;
        if (el.closest('[data-framer-appear-id]')) continue;   // framer-managed
        if (el.closest('[data-no-reveal]')) continue;           // opt-out hook
        if (el.closest('[style*="z-index: 99999"]')) continue;  // preloader
        el.classList.add('sr-init');
        observer.observe(el);
      }
    };

    let rafId = requestAnimationFrame(scan);

    // Re-scan on DOM changes (covers React Router client-side navigation).
    let queued = false;
    const mo = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => { queued = false; scan(); });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
