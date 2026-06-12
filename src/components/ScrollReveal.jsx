import { useEffect } from 'react';

/**
 * ScrollReveal — Global Intersection Observer that adds `.revealed` class
 * to every section's text elements when they scroll into view.
 * This provides a smooth fade-up + slide animation for all text content.
 */
export function ScrollReveal() {
  useEffect(() => {
    const selectors = [
      'section h1', 'section h2', 'section h3', 'section h4',
      'section p', 'section li', 'section blockquote',
      'section .scroll-reveal'
    ].join(', ');

    const elements = document.querySelectorAll(selectors);

    // Only target elements that don't already have framer-motion animation
    const targets = Array.from(elements).filter(el => {
      // Skip elements that framer-motion is already animating
      return !el.style.opacity && !el.closest('[data-framer-appear-id]');
    });

    targets.forEach(el => {
      if (!el.classList.contains('sr-init')) {
        el.classList.add('sr-init');
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add stagger delay based on sibling index
            const parent = entry.target.parentElement;
            if (parent) {
              const siblings = Array.from(parent.children).filter(c => c.classList.contains('sr-init'));
              const idx = siblings.indexOf(entry.target);
              entry.target.style.transitionDelay = `${idx * 0.08}s`;
            }
            entry.target.classList.add('sr-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Re-run on route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setTimeout(() => {
        const selectors = [
          'section h1', 'section h2', 'section h3', 'section h4',
          'section p', 'section li', 'section blockquote',
          'section .scroll-reveal'
        ].join(', ');

        const elements = document.querySelectorAll(selectors);
        const targets = Array.from(elements).filter(el => {
          return !el.classList.contains('sr-init') && !el.style.opacity && !el.closest('[data-framer-appear-id]');
        });

        targets.forEach(el => el.classList.add('sr-init'));

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const parent = entry.target.parentElement;
                if (parent) {
                  const siblings = Array.from(parent.children).filter(c => c.classList.contains('sr-init'));
                  const idx = siblings.indexOf(entry.target);
                  entry.target.style.transitionDelay = `${idx * 0.08}s`;
                }
                entry.target.classList.add('sr-visible');
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        targets.forEach(el => observer.observe(el));
      }, 300);
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  return null;
}
