import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

export function ClosingCTA() {
  return (
    <section data-screen-label="08 CTA" style={{
      background: theme.dark, color: theme.base,
      padding: 'clamp(32px, 4vw, 40px) clamp(20px, 4vw, 40px) clamp(64px, 10vw, 120px)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        borderTop: `1px solid ${theme.borderDark}`,
        paddingTop: 'clamp(48px, 8vw, 80px)',
      }}>
        <SplitHeading
          lines={['lets build', 'the leader', 'behind what', 'drives you.']}
          style={{
            fontFamily: theme.display, fontWeight: 900,
            fontSize: 'clamp(48px, 11vw, 180px)',
            lineHeight: 0.98, letterSpacing: '-0.01em', marginBottom: 'clamp(32px, 5vw, 48px)',
            maxWidth: 1100, textTransform: 'lowercase',
          }}
        />
        <Group className="xg-2" style={{ alignItems: 'flex-end' }}>
          <motion.p variants={fadeUp} style={{ fontSize: 'clamp(15px, 1.6vw, 17px)', lineHeight: 1.55, color: theme.subtitle, margin: 0, maxWidth: 520 }}>
            Let's talk about how we help you build the leader behind your ambition.
          </motion.p>
          <motion.div variants={fadeUp} style={{ justifySelf: 'end' }}>
            <motion.a
              whileHover={{ scale: 1.02 }}
              href="#"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 12, padding: '20px 32px',
                background: theme.base, color: theme.ink, borderRadius: 999,
                textDecoration: 'none', fontSize: 15, fontWeight: 600,
              }}
            >Book A Call <span style={{ fontSize: 18 }}>→</span></motion.a>
          </motion.div>
        </Group>
      </div>
    </section>
  );
}
