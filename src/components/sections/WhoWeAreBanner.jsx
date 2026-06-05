import { motion } from 'framer-motion';
import { theme } from '../../theme';

export function WhoWeAreBanner() {
  return (
    <section
      className="xg-stick-pin"
      data-screen-label="Who We Are Banner"
      data-section-theme="dark"
      style={{
        width: '100%',
        background: theme.dark,
        overflow: 'hidden',
        lineHeight: 0,
        padding: 'clamp(20px, 3vw, 48px) 0',
      }}
    >
      <motion.img
        src="/assets/new/pic-lead-4.webp"
        alt=""
        loading="lazy"
        decoding="async"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1] }}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />
    </section>
  );
}
