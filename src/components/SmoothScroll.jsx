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
      // Each frame closes this fraction of the remaining distance, so the time to
      // actually arrive is ln(0.01)/ln(1-lerp) frames. At the previous 0.15 that
      // was ~28 frames — measured, one small wheel notch was still drifting
      // 487ms after the input and only fully stopped at 654ms. Fast flicks hid
      // it, but scrolling slowly means living inside that tail permanently, with
      // the page always trailing the input: it reads as the page being "slow"
      // even though every frame renders in 16.7ms.
      // 0.3 halves the settle (~215ms) and keeps an obvious glide.
      lerp: 0.3,
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
