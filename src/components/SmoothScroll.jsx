import { useLayoutEffect } from 'react';
import Lenis from 'lenis';

/**
 * SmoothScroll — inertial smooth scrolling (Lenis) for that slow, gliding
 * "Boldz" feel.
 *
 * Lenis drives the REAL native scroll position (no transform wrapper), so the
 * IntersectionObserver reveals, the TopBar section-theme spy, framer useScroll
 * parallax, and every position:fixed element keep working untouched.
 *
 * Hard bypass on touch/coarse-pointer (native iOS/Android momentum is better)
 * and on prefers-reduced-motion (accessibility). Exposes the instance via
 * getLenis() so PageTransition can reset scroll through Lenis on route change.
 */
let lenisInstance = null;
export const getLenis = () => lenisInstance;

export function SmoothScroll() {
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    const coarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (coarse) return; // mobile/touch stays 100% native; desktop always glides (brand)

    const lenis = new Lenis({
      lerp: 0.15,           // Ultra-responsive, fluid inertia without artificial sluggish drag
      wheelMultiplier: 1.0, // Natural 1:1 scroll wheel speed translation
      smoothWheel: true,
      syncTouch: false,     // never fight native touch momentum
      touchMultiplier: 1.2,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      autoResize: true,     // Prevent stuck scroll clamping when dynamic content renders
      autoRaf: false,       // we drive a single shared RAF loop
      overscroll: false,
    });
    lenisInstance = lenis;

    let raf = 0;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}
