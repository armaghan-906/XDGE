import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useSmallScreen } from '../../hooks/useSmallScreen';

export function FloatingVideo({ src, style }) {
  const videoRef = useRef(null);
  // These are purely decorative overlays at 0.4 opacity, so on a phone they are
  // dropped outright rather than swapped for a still — nothing is lost from the
  // layout and it removes a whole video decode.
  const small = useSmallScreen();
  // 150px, matching VideoBackground. At 400px several of these ambient clips on
  // Home counted as "in view" at once, so four were decoding concurrently through
  // most of a scroll — measured as 4 playing videos at any point on the page.
  const isInView = useInView(videoRef, { margin: "150px" });

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(e => console.warn(e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  if (small) return null;

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: 'clamp(200px, 25vw, 400px)',
        borderRadius: 24,
        overflow: 'hidden',
        pointerEvents: 'none',
        ...style,
        // Forced AFTER the spread: mixBlendMode:'screen' over a (scaled) video is
        // the known scroll-jank source — its repaint tail stretches across every
        // inertial glide. On these black sections 'normal' looks ~identical.
        mixBlendMode: 'normal',
      }}
    >
      <video
        ref={videoRef}
        loop muted playsInline
        src={src}
        style={{
          width: '100%',
          display: 'block',
        }}
      />
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#000000',
        opacity: 0.2,
      }} />
    </motion.div>
  );
}
