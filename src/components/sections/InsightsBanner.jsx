import { motion } from 'framer-motion';
import { theme } from '../../theme';

export function InsightsBanner() {
  return (
    <section
      
      data-screen-label="Insights Banner"
      data-section-theme="dark"
      style={{
        width: '100%',
        background: theme.dark,
        overflow: 'hidden',
        lineHeight: 0,
        padding: 0,
      }}
    >
      <img
        src="/assets/new/pic-lead-2.webp"
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
