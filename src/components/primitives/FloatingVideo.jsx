import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

export function FloatingVideo({ src, style }) {
  const videoRef = useRef(null);
  const isInView = useInView(videoRef, { margin: "400px" });

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(e => console.warn(e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  return (
    <motion.video
      ref={videoRef}
      loop muted playsInline
      src={src}
      style={{
        position: 'absolute',
        width: 'clamp(200px, 25vw, 400px)',
        borderRadius: 24,
        opacity: 0.8,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
        ...style
      }}
    />
  );
}
