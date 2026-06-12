import { motion } from 'framer-motion';
import { theme } from '../../theme';

export function WhatWeDo() {
  return (
    <section data-screen-label="02 Build The Leader" data-section-theme="dark" style={{
      background: theme.dark, color: theme.base,
      padding: 'clamp(140px, 20vw, 300px) clamp(20px, 4vw, 40px)',
      display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 style={{
            fontFamily: theme.display,
            fontSize: 'clamp(42px, 6vw, 84px)',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            color: theme.base,
            margin: '0 0 24px',
            fontWeight: 700,
          }}>
            Build The Leader Behind What Inspires You.
          </h2>
          <p style={{
            fontFamily: theme.body,
            fontSize: 'clamp(16px, 1.8vw, 22px)',
            lineHeight: 1.5,
            color: theme.subtitle,
            margin: 0,
            fontWeight: 400,
          }}>
            Build real-world experience, leadership capability, and professional skills that help you stand out in applications, interviews, and future opportunities.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
