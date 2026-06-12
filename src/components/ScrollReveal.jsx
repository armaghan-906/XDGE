import { useLayoutEffect } from 'react';
import { animate } from 'framer-motion';

/**
 * ScrollReveal — Global Intersection Observer.
 * Premium "Boldz Studio" style animation: very smooth, staggered, 
 * longer duration (1.2s), elegant slide-up (40px) and fade.
 */
export function ScrollReveal() {
  useLayoutEffect(() => {
    let pendingEntries = [];
    let rafId = null;

    const processBatch = () => {
      // Sort elements by their vertical position to guarantee top-down stagger
      pendingEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      
      pendingEntries.forEach((entry, idx) => {
        const tag = entry.target.tagName.toLowerCase();
        let extraDelay = 0;
        
        // Paragraphs and lists get a slightly longer delay so they appear after headings
        if (['p', 'li', 'blockquote', 'div', 'span'].includes(tag)) {
          extraDelay = 0.15;
        }

        const baseDelay = idx * 0.08;
        
        // Boldz Studio style premium reveal
        animate(entry.target, 
          { opacity: [0, 1], y: [40, 0] },
          { 
            duration: 1.2, 
            delay: baseDelay + extraDelay, 
            ease: [0.16, 1, 0.3, 1] 
          }
        );
      });

      pendingEntries = [];
      rafId = null;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            pendingEntries.push(entry);
            observer.unobserve(entry.target);
          }
        });

        if (pendingEntries.length > 0 && !rafId) {
          rafId = requestAnimationFrame(processBatch);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const initObserver = () => {
      const selectors = [
        'section h1', 'section h2', 'section h3', 'section h4',
        'section p', 'section li', 'section blockquote'
      ].join(', ');

      const elements = document.querySelectorAll(selectors);

      const targets = Array.from(elements).filter(el => {
        // Skip elements that already have opacity or are managed by framer-motion
        return !el.hasAttribute('data-sr-init') && !el.style.opacity && !el.closest('[data-framer-appear-id]');
      });

      targets.forEach(el => {
        el.setAttribute('data-sr-init', 'true');
        // Instantly hide the element before the browser paints it
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        observer.observe(el);
      });
    };

    // Run immediately
    initObserver();

    // Re-run on route changes or dynamic content
    const handleRouteChange = () => setTimeout(initObserver, 300);
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return null;
}
