import { motion } from 'framer-motion';
import { theme } from '../../theme';

export function WhoWeAreBanner() {
  return (
    <section
      data-screen-label="Who We Are Banner"
      data-section-theme="dark"
      style={{
        width: '100%',
        background: theme.dark,
        overflow: 'hidden',
        lineHeight: 0,
      }}
    >
      <motion.img
        src="/assets/who-we-are-banner.webp"
        alt=""
        initial={{ scale: 1.06, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.4, ease: [0.2, 0.7, 0.2, 1] }}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />
    </section>
  );
}
