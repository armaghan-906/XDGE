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
    <motion.div
      style={{
        position: 'absolute',
        width: 'clamp(200px, 25vw, 400px)',
        borderRadius: 24,
        overflow: 'hidden',
        pointerEvents: 'none',
        mixBlendMode: 'normal',
        ...style,
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
