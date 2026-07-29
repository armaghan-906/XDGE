import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import { getLenis } from './SmoothScroll';

// Slower intro reveal (matches the calmer hero loop).
//
// This rate is not purely cosmetic: the clip is 1.67s, and the intro is held for
// duration/rate + 0.7s, so it sets how long every visitor waits before seeing
// the page. 0.5 => ~4.0s. Going much below ~0.35 pushes the intro past the
// INTRO_WAIT_MS failsafe in ScrollReveal, after which reveals would start firing
// behind the curtain and the entrance would be spent on a hidden page.
const INTRO_VIDEO_RATE = 0.5;

export function Preloader() {
  // ?skipintro query param bypasses the intro (used for automated screenshots/tests)
  const [show, setShow] = useState(() => {
    const skip = window.location.search.includes('skipintro');
    // Flagged here, during render, and NOT in an effect: ScrollReveal reads this
    // attribute from a useLayoutEffect, and every layout effect runs before any
    // passive effect — so setting it in an effect would always be too late and
    // the page entrance would fire behind the curtain. Idempotent, so React's
    // double-invoked initializer in StrictMode is harmless.
    if (!skip) document.documentElement.setAttribute('data-xg-intro', '');
    return !skip;
  });
  const failsafeRef = useRef(null);

  useEffect(() => {
    // Failsafe: if the video doesn't finish (e.g. autoPlay blocked), force-hide
    // so it never blocks the page. Recomputed from the real (slowed) runtime
    // once metadata loads; this initial value only covers a never-loading video.
    failsafeRef.current = setTimeout(() => setShow(false), 4500);

    // Scroll lock goes through Lenis when it owns the scroll. Setting
    // `body { overflow: hidden }` underneath a running Lenis does not actually
    // stop it — Lenis keeps integrating wheel deltas against documentElement, so
    // the page could be sitting at a non-zero offset when the curtain lifted,
    // and releasing the lock snapped it. Only fall back to the CSS lock on
    // touch/reduced-motion, where Lenis deliberately does not run.
    const lenis = getLenis();
    if (show) {
      if (lenis) lenis.stop();
      else document.body.style.overflow = 'hidden';
    } else {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
        lenis.start();
      }
      document.body.style.overflow = '';
      // Released as the curtain begins its fade, so the page entrance
      // crossfades out from under it instead of starting on a static page.
      document.documentElement.removeAttribute('data-xg-intro');
      window.dispatchEvent(new Event('xg:intro-done'));
    }

    return () => {
      clearTimeout(failsafeRef.current);
      document.body.style.overflow = '';
      // Never leave the page scroll-locked. The `data-xg-intro` gate is
      // deliberately NOT cleared here: StrictMode double-invokes this effect, and
      // the attribute is set once during render, so clearing it on the throwaway
      // cleanup would drop the gate before the intro had even played. A genuine
      // unmount mid-intro is covered by INTRO_WAIT_MS in ScrollReveal.
      const l = getLenis();
      if (l) l.start();
    };
  }, [show]);

  // Set the slower rate and extend the failsafe to cover the full slowed clip
  // (duration / rate) so the intro is never cut off before it finishes.
  const onMeta = (e) => {
    const v = e.currentTarget;
    v.playbackRate = INTRO_VIDEO_RATE;
    if (Number.isFinite(v.duration)) {
      clearTimeout(failsafeRef.current);
      failsafeRef.current = setTimeout(() => setShow(false), (v.duration / INTRO_VIDEO_RATE) * 1000 + 700);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999, // ensures it sits above everything, including the TopBar
            background: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <video
            src="/assets/videos/logo_reveal.mp4"
            autoPlay
            muted
            playsInline
            onLoadedMetadata={onMeta}
            onEnded={() => setShow(false)}
            onError={() => setShow(false)} // Fail gracefully if the video is missing or broken
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {/* Logo Overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: '100%', padding: '0 20px',
              zIndex: 5,
            }}
          >
            <Logo style={{ fontSize: 'clamp(64px, 15vw, 200px)' }} />
            <div style={{ textAlign: 'center', marginTop: 'clamp(16px, 2vw, 24px)' }}>
              <div style={{ 
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(10px, 1.8vw, 24px)', 
                letterSpacing: '0.2em', 
                color: '#ffffff', 
                marginBottom: 'clamp(8px, 1.2vw, 16px)', 
                fontWeight: 400 
              }}>
                LEAD YOUR OWN OPPORTUNITIES.
              </div>
              <div className="cyan-text" style={{ 
                fontSize: 'clamp(10px, 1.8vw, 24px)', 
                letterSpacing: '0.3em', 
                fontWeight: 600 
              }}>
                TRAIN • BUILD • LEAD • IMPACT
              </div>
            </div>
          </motion.div>
          {/* Fallback button so the user is never permanently stuck */}
          <button 
            onClick={() => setShow(false)}
            style={{
              position: 'absolute', bottom: 40,
              background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.5)', padding: '8px 16px',
              borderRadius: 999, cursor: 'pointer', fontSize: 12,
              zIndex: 10,
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            Skip Intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
