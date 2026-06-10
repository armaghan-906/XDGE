import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// The climax frame for the cinematic explosion happens around 5 seconds in.
const CLIMAX_DELAY = 4.5; 

export function CinematicReveal({ onComplete }) {
  const [showShockwave, setShowShockwave] = useState(false);

  useEffect(() => {
    // Trigger the shockwave exactly at the climax
    const timer = setTimeout(() => {
      setShowShockwave(true);
    }, CLIMAX_DELAY * 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      background: '#000000',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
    }}>
      {/* 1. The Background RGB Sequence */}
      <video
        src="/assets/videos/magical_rgb.mp4"
        autoPlay
        muted
        playsInline
        onEnded={onComplete} // if used in preloader, this triggers the end
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      />

      {/* 2. The Tangero Logo (fades and scales exactly at climax) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, filter: 'brightness(4) blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'brightness(1) blur(0px)' }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: CLIMAX_DELAY }}
        style={{
          position: 'relative',
          zIndex: 5,
          width: '100%',
          maxWidth: '500px',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img 
          src="/assets/main_logo.png" 
          alt="Tangero Logo" 
          style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
        />
      </motion.div>

      {/* 3. The Shockwave (plays exactly at climax over the logo with screen blend) */}
      {showShockwave && (
        <video
          src="/assets/videos/magical_shockwave.mp4"
          autoPlay
          muted
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 10,
            mixBlendMode: 'screen', // This seamlessly composites the black background out!
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
}
