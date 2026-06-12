import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';

export function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Prevent scrolling while the preloader is active
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [show]);

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
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '100%', padding: '0 20px',
              zIndex: 5,
            }}
          >
            <Logo style={{ fontSize: 'clamp(64px, 15vw, 200px)' }} />
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
