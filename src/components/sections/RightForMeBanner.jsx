import { motion } from 'framer-motion';
import { theme } from '../../theme';

export function RightForMeBanner() {
  return (
    <section
      data-screen-label="Right For Me Banner"
      data-section-theme="dark"
      style={{
        width: '100%',
        background: theme.dark,
        overflow: 'hidden',
        lineHeight: 0,
        padding: 'clamp(20px, 3vw, 48px) 0',
      }}
    >
      <img
        src="/assets/right-for-me-banner.webp"
        alt=""
        loading="eager"
        decoding="async"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />
    </section>
  );
}
