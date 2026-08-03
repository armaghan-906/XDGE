import { useEffect } from 'react';

/**
 * useVideoAutoplay — makes a background clip actually start on real phones.
 *
 * Desktop worked and mobile did not, and the difference was in the markup: Hero
 * carries an `autoPlay` attribute so the browser starts the clip itself, while
 * VideoBackground (every non-home hero) and FloatingVideo had only `loop muted
 * playsInline` and leaned entirely on a JS `play()`. That is the fragile path on a
 * phone, for three separate reasons this hook covers:
 *
 * 1. MUTED AS A PROPERTY, NOT AN ATTRIBUTE. React assigns `muted` via the DOM
 *    property, so the rendered element can lack the `muted` attribute — and Safari
 *    decides whether a video is allowed to autoplay by reading the attribute. An
 *    unmuted-looking video is refused. Set imperatively here so it is unambiguous.
 *
 * 2. play() CALLED TOO EARLY. iOS rejects `play()` on a video with no data yet, and
 *    the rejection was being swallowed, leaving the poster up forever. Retried on
 *    `loadeddata` / `canplay` instead of given up on.
 *
 * 3. AUTOPLAY REFUSED OUTRIGHT. In Low Power Mode iOS blocks it however it is
 *    started. Nothing can force that, but the first real user gesture lifts the
 *    restriction, so one is armed as a last resort — it costs nothing when
 *    playback already succeeded.
 */
export function useVideoAutoplay(ref, active = true) {
  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    // (1) unambiguous to the browser's autoplay policy, not just to the DOM
    v.muted = true;
    v.defaultMuted = true;

    if (!active) {
      v.pause();
      return;
    }

    let done = false;
    const attempt = () => {
      if (done || !ref.current) return;
      const p = ref.current.play();
      if (p && p.then) p.then(() => { done = true; }).catch(() => {});
      else done = true;
    };

    attempt();

    // (2) it may simply have been too early
    v.addEventListener('loadeddata', attempt);
    v.addEventListener('canplay', attempt);

    // (3) last resort — a gesture lifts a policy block
    const opts = { once: true, passive: true };
    window.addEventListener('touchstart', attempt, opts);
    window.addEventListener('pointerdown', attempt, opts);
    window.addEventListener('scroll', attempt, opts);

    return () => {
      v.removeEventListener('loadeddata', attempt);
      v.removeEventListener('canplay', attempt);
      window.removeEventListener('touchstart', attempt);
      window.removeEventListener('pointerdown', attempt);
      window.removeEventListener('scroll', attempt);
    };
  }, [ref, active]);
}
