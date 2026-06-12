import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

export function ClosingCTA() {
  return (
    <section data-screen-label="08 CTA" data-section-theme="dark" style={{
      background: theme.dark, color: theme.base,
      padding: 'clamp(32px, 4vw, 40px) clamp(20px, 4vw, 40px) clamp(120px, 15vw, 240px)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        borderTop: `1px solid ${theme.borderDark}`,
        paddingTop: 'clamp(48px, 8vw, 80px)',
      }}>
        {/* Decorative image row — small student/study shots flanking the heading area */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          gap: 16, marginBottom: 'clamp(24px, 4vw, 40px)',
        }}>
          <div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
            style={{
              width: 'clamp(96px, 13vw, 180px)',
              aspectRatio: '1/1',
              overflow: 'hidden',
              flexShrink: 0,
              border: `1px solid ${theme.borderDark}`,
            }}
          >
            <img
              src="/assets/blog-02.webp"
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
          <div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1], delay: 0.15 }}
            style={{
              width: 'clamp(96px, 13vw, 180px)',
              aspectRatio: '1/1',
              overflow: 'hidden',
              flexShrink: 0,
              border: `1px solid ${theme.borderDark}`,
            }}
          >
            <img
              src="/assets/blog-03.webp"
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>

        <SplitHeading
          lines={["LET'S BUILD THE", 'LEADER BEHIND', 'WHAT INSPIRES YOU']}
          style={{
            fontFamily: theme.display, fontWeight: 900,
            fontSize: 'clamp(67.5px, 10.5vw, 135px)',
            lineHeight: 1.0, letterSpacing: '-0.02em',
            marginBottom: 'clamp(32px, 5vw, 56px)',
            maxWidth: 1100,
          }}
        />

        <Group className="xg-2" style={{ alignItems: 'flex-end' }}>
          <p
            variants={fadeUp}
            style={{
              fontSize: 'clamp(15px, 1.7vw, 18px)', lineHeight: 1.55,
              color: theme.subtitle, margin: 0, maxWidth: 520,
            }}
          >
            Let's talk about your ambition and how we can help you operate
            at next level standard.
          </p>
          <div
            variants={fadeUp}
            style={{
              justifySelf: 'end',
              display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center',
            }}
          >
            <a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="#"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 12, padding: '18px 30px',
                background: theme.dark, color: theme.base, borderRadius: 999,
                textDecoration: 'none', fontSize: 14, fontWeight: 600, letterSpacing: '0.005em',
              }}
            >Book A Call <span style={{ fontSize: 16 }}>→</span></a>
            <a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="#"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 12, padding: '18px 30px',
                background: 'transparent', color: theme.base, borderRadius: 999,
                border: `1px solid ${theme.base}`,
                textDecoration: 'none', fontSize: 14, fontWeight: 600, letterSpacing: '0.005em',
              }}
            >Apply <span style={{ fontSize: 16 }}>→</span></a>
          </div>
        </Group>
      </div>
    </section>
  );
}
