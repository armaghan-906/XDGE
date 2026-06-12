import { motion } from 'framer-motion';
import { theme } from '../../theme';
import { Logo } from '../Logo';

export function Hero() {
  return (
    <section
      data-screen-label="01 Hero"
      data-cursor="light"
      data-section-theme="dark"
      style={{
        background: '#000000', color: theme.base,
        height: '100vh', display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
        alignItems: 'center', justifyContent: 'center',
      }}
    >
      <video
        src="/assets/videos/logo_reveal.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
          opacity: 0.8,
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1 }}
        style={{
          position: 'relative',
          zIndex: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Logo style={{ fontSize: 'clamp(64px, 15vw, 200px)' }} />
      </motion.div>
    </section>
  );
}
