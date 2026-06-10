import { motion } from 'framer-motion';
import { theme } from '../../theme';
import { VideoBackground } from '../primitives/VideoBackground';

function HeroHeading() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1], delay: 0.2 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        zIndex: 10,
        margin: '10px 0',
      }}
    >
      <img 
        src="/assets/unnamed.png" 
        alt="Logo" 
        style={{
          width: '100%',
          maxWidth: '500px',
          height: 'auto',
          objectFit: 'contain',
        }}
      />
    </motion.div>
  );
}

import { FullLogo } from '../Logo';
import { CinematicReveal } from '../primitives/CinematicReveal';

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
      <CinematicReveal onComplete={() => {}} />
    </section>
  );
}
