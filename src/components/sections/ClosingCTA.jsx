import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

export function ClosingCTA() {
  return (
    <section data-screen-label="08 CTA" style={{ background: theme.dark, color: theme.base, padding: '40px 40px 120px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', borderTop: `1px solid ${theme.borderDark}`, paddingTop: 80 }}>
        <SplitHeading
          lines={['lets build', 'the leader', 'behind what', 'drives you.']}
          style={{
            fontFamily: theme.display, fontWeight: 900,
            fontSize: 'clamp(80px, 11vw, 180px)',
            lineHeight: 0.98, letterSpacing: '-0.01em', marginBottom: 48,
            maxWidth: 1100, textTransform: 'lowercase',
          }}
        />
        <Group style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'flex-end' }}>
          <motion.p variants={fadeUp} style={{ fontSize: 17, lineHeight: 1.55, color: theme.subtitle, margin: 0, maxWidth: 520 }}>
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
