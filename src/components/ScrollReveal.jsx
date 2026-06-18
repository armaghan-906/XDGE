import { useLayoutEffect } from 'react';

/**
 * ScrollReveal — global, GPU-only scroll reveal (Boldz-style) for headings,
 * text, images AND card/module blocks.
 *
 * IntersectionObserver adds `.sr-init` (opacity:0 + translateY) then
 * `.sr-visible` when an element enters the viewport. Transition is pure CSS
 * (opacity + transform) → runs on the compositor, and each element animates
 * ONCE (then unobserved) → zero ongoing scroll cost, no jank.
 *
 * Key details that keep it glitch-free:
 *  - Anti-nesting: a card/module reveals as a single unit; its inner
 *    headings/text/images are NOT separately revealed (no double animation).
 *  - Elements inside a drag carousel (cursor:grab) or the preloader, and
 *    framer-motion-managed elements, are skipped.
 *  - Elements entering together are staggered top-to-bottom for proper delay.
 */
const UNIT = [
  'section h1', 'section h2', 'section h3', 'section h4',
  'section p', 'section li', 'section blockquote',
  'section img', 'section figure',
  'section article',
  'section .xg-outcomes-card', 'section .xg-principle-row',
  'section [data-reveal]',
].join(', ');

export function ScrollReveal() {
  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      (entries) => {
        const entered = entries.filter((e) => e.isIntersecting);
        entered.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        entered.forEach((entry, i) => {
          const el = entry.target;
          // clear one-by-one cascade for elements that appear together
          if (!reduce) el.style.transitionDelay = `${Math.min(i * 110, 660)}ms`;
          requestAnimationFrame(() => el.classList.add('sr-visible'));
          observer.unobserve(el);
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    );

    const scan = () => {
      const els = document.querySelectorAll(UNIT);
      for (const el of els) {
        if (el.classList.contains('sr-init') || el.classList.contains('sr-visible')) continue;
        // anti-nesting: if an ancestor is also a reveal unit, let the ancestor animate
        if (el.parentElement && el.parentElement.closest(UNIT)) continue;
        // skip framer-managed, opt-outs, preloader, and drag carousels
        if (el.closest('[data-framer-appear-id]')) continue;
        if (el.closest('[data-no-reveal]')) continue;
        if (el.closest('[style*="z-index: 99999"]')) continue;
        if (el.closest('[style*="cursor: grab"]')) continue;
        el.classList.add('sr-init');
        observer.observe(el);
      }
    };

    let rafId = requestAnimationFrame(scan);

    // Re-scan on DOM changes (client-side route navigation).
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
