import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';

export function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Failsafe: if the video doesn't finish (e.g. autoPlay blocked on mobile),
    // force-hide quickly so it never blocks taps/links for long.
    const timer = setTimeout(() => setShow(false), 3000);
    // Prevent scrolling while the preloader is active
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { 
      clearTimeout(timer);
      document.body.style.overflow = ''; 
    };
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
