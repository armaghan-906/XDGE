import { useEffect } from 'react';

/**
 * useScrollLock — freezes the page behind an overlay WITHOUT the layout jumping.
 *
 * The naive `body { overflow: hidden }` removes the scrollbar, and because this site
 * styles `::-webkit-scrollbar` to a real 8px width (macOS would otherwise use an
 * overlay scrollbar that costs no layout), removing it widens the viewport. Measured
 * on opening the menu: documentElement.clientWidth 1432 -> 1440, so everything
 * behind the panel jumped 8px sideways at the exact moment it started sliding down,
 * and jumped back on close. Frame timings stayed at a clean 16.7ms throughout — it
 * is one reflow, not dropped frames, which is why it never showed up as jank in any
 * frame measurement while still reading as the animation stuttering.
 *
 * `scrollbar-gutter: stable` does not solve it: it is supported here and computes to
 * `stable` on <html>, but the gutter is not reserved for an `overflow: hidden` box —
 * verified by measurement, the 8px shift persisted with it in place.
 *
 * So the width the scrollbar occupied is measured and handed back as padding, via a
 * custom property so that fixed-position chrome (the header) can compensate too —
 * fixed boxes are laid out against the viewport and would otherwise slide 8px right
 * on their own.
 */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;

    const html = document.documentElement;
    const width = window.innerWidth - html.clientWidth;

    const prevOverflow = html.style.overflow;
    const prevPad = html.style.paddingRight;

    html.style.setProperty('--xg-lock-pad', `${width}px`);
    html.style.overflow = 'hidden';
    html.style.paddingRight = `${width}px`;

    return () => {
      html.style.overflow = prevOverflow;
      html.style.paddingRight = prevPad;
      html.style.setProperty('--xg-lock-pad', '0px');
    };
  }, [locked]);
}
