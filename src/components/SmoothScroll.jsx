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
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (reduce || coarse) return; // mobile/touch + reduced-motion stay 100% native

    const lenis = new Lenis({
      lerp: 0.075,          // lower = slower, more floaty glide
      wheelMultiplier: 0.9,
      smoothWheel: true,
      syncTouch: false,     // never fight native touch momentum
      touchMultiplier: 1.5,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
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
