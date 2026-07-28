import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * VideoBackground — Full-bleed looping video background for hero sections.
 * 
 * Configured for maximum browser compatibility (autoplay, muted, playsInline).
 * The video uses object-fit: cover to fill the container perfectly.
 */
export function VideoBackground({
  src,
  poster,
  // playbackRate < 1 slows the clip so it reads as calm/ambient rather than frantic.
  playbackRate = 0.45,
  // Overlay darkness (0–1) — raise to push the video further back behind text.
  overlayOpacity = 0.22,
  // Style overrides merged onto the <video>. Default fills the section (cover);
  // pass an anchored/sized box to make the graphic smaller and enter from a side.
  videoStyle,
  // Fade the smaller/anchored video into black at its inner edge so there's no
  // hard rectangle seam against the section background.
  edgeFade,
}) {
  const videoRef = useRef(null);
  const isInView = useInView(videoRef, { margin: "150px" });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
      if (isInView) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [src, isInView, playbackRate]);

  if (!src) return null;

  const maskStyle = edgeFade
    ? {
        WebkitMaskImage: `linear-gradient(${edgeFade}, transparent 0%, #000 45%)`,
        maskImage: `linear-gradient(${edgeFade}, transparent 0%, #000 45%)`,
      }
    : null;

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
          ...maskStyle,
          ...videoStyle,
        }}
      />
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#000000',
        opacity: overlayOpacity,
      }} />
      {/* Optional film grain overlay to blend the video into the black aesthetic */}
      <div className="xg-hero-grain" />
    </motion.div>
  );
}
