import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useSmallScreen } from '../../hooks/useSmallScreen';
import { mobileVideo } from '../../utils/mobileVideo';
import { useVideoAutoplay } from '../../hooks/useVideoAutoplay';

export function FloatingVideo({ src, style }) {
  const videoRef = useRef(null);
  // Kept on phones, at 640px. These are decorative overlays at 0.4 opacity, so the
  // smaller source costs nothing visually and decodes for a fraction of the work.
  const small = useSmallScreen();
  const clip = small ? mobileVideo(src) : src;
  // 150px, matching VideoBackground. At 400px several of these ambient clips on
  // Home counted as "in view" at once, so four were decoding concurrently through
  // most of a scroll — measured as 4 playing videos at any point on the page.
  const isInView = useInView(videoRef, { margin: "150px" });

  useVideoAutoplay(videoRef, isInView);

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
        loop muted autoPlay playsInline preload="metadata"
        src={clip}
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
