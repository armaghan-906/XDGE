import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useSmallScreen } from '../../hooks/useSmallScreen';
import { mobileVideo } from '../../utils/mobileVideo';

/**
 * VideoBackground — Full-bleed looping video background for hero sections.
 * 
 * Configured for maximum browser compatibility (autoplay, muted, playsInline).
 * The video uses object-fit: cover to fill the container perfectly.
 */
export function VideoBackground({
  src,
  poster,
  // Native rate. A rate below 1 does not add frames, it just holds each one longer,
  // so it trades smoothness for slowness — the ambient clips are retimed assets now
  // (real interpolated in-between frames) and are slow at rate 1. See HeroAmbient.
  playbackRate = 1,
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
  // Phones get the clip, just a 640px one — decode scales with pixels, so it is
  // 2-9x less work per frame than the desktop source. Poster still covers the gap
  // before the first frame decodes.
  const small = useSmallScreen();
  const posterSrc = poster || (src ? src.replace(/\.mp4$/, '_poster.jpg') : null);
  const clip = small ? mobileVideo(src) : src;

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
    <motion.div data-no-reveal
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
        src={clip}
        poster={posterSrc}
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
