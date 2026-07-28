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
// Headings + text rise up on scroll; cards/blocks reveal as a single unit.
// Anti-nesting means inner text of a card (article / [data-reveal]) is skipped
// so the card animates as ONE unit (no piecemeal). Framer-animated headings
// (SplitHeading + inline motion.h*) carry data-no-reveal so they're left to
// their own line-mask and never double-animate here.
const UNIT = [
  'section h1', 'section h2', 'section h3', 'section h4',
  'section p', 'section li', 'section blockquote',
  'section [data-reveal]',
  'section article',
  'section .xg-outcomes-card', 'section .xg-principle-row',
].join(', ');

export function ScrollReveal() {
  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          // Zero artificial delay delays on fast scrolling — elements emerge seamlessly and immediately
          el.style.transitionDelay = '0ms';
          requestAnimationFrame(() => el.classList.add('sr-visible'));
          observer.unobserve(el);
        });
      },
      // Anticipatory reveal: start fading in 350px BEFORE reaching visual viewport boundary
      { threshold: 0.0, rootMargin: '0px 0px 350px 0px' }
    );

    const scan = () => {
      const els = document.querySelectorAll(UNIT);
      const viewHeight = window.innerHeight || document.documentElement.clientHeight;
      for (const el of els) {
        if (el.classList.contains('sr-init') || el.classList.contains('sr-visible')) continue;
        // anti-nesting: if an ancestor is also a reveal unit, let the ancestor animate
        if (el.parentElement && el.parentElement.closest(UNIT)) continue;
        // skip opt-outs (interaction-only motion), preloader, and drag carousels
        if (el.closest('[data-no-reveal]')) continue;
        if (el.closest('[style*="z-index: 99999"]')) continue;
        if (el.closest('[style*="cursor: grab"]')) continue;
        
        // Anti-Flicker: If the element is within or above our visual boundary,
        // render immediately without dropping opacity to zero.
        const rect = el.getBoundingClientRect();
        if (rect.top < viewHeight * 1.15 && rect.bottom > -100) {
          el.classList.add('sr-init', 'sr-visible');
          continue;
        }

        el.classList.add('sr-init');
        observer.observe(el);
      }
    };

    let rafId = requestAnimationFrame(scan);
    // 0ms scan too: after a React.lazy Suspense fallback->page swap, the rAF
    // tick can miss the first real DOM of a new route (cards would pop in).
    const t0 = setTimeout(scan, 0);

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
      clearTimeout(t0);
      observer.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
