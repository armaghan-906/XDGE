import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * VideoBackground — Full-bleed looping video background for hero sections.
 * 
 * Configured for maximum browser compatibility (autoplay, muted, playsInline).
 * The video uses object-fit: cover to fill the container perfectly.
 */
export function VideoBackground({ src, poster }) {
  const videoRef = useRef(null);
  const isInView = useInView(videoRef, { margin: "400px" });

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(e => console.warn("Video autoplay failed:", e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [src, isInView]);

  if (!src) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="xg-video-bg-container"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          opacity: 0.8 // slight dimming to ensure text readability
        }}
      />
      {/* Optional film grain overlay to blend the video into the black aesthetic */}
      <div className="xg-hero-grain" />
    </motion.div>
  );
}
