import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

export function TheReality() {
  const pillStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: 'clamp(16px, 2.4vw, 24px) clamp(28px, 4vw, 56px)',
    background: theme.ink,
    color: theme.base,
    borderRadius: 999,
    fontSize: 'clamp(18px, 2.4vw, 30px)',
    fontWeight: 700,
    fontFamily: theme.display,
    letterSpacing: '-0.005em',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  };

  return (
    <section
      data-screen-label="The Reality"
      data-section-theme="light"
      style={{
        background: theme.base,
        color: theme.ink,
        padding: 'clamp(64px, 10vw, 120px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Group className="xg-2" style={{ alignItems: 'flex-start', marginBottom: 'clamp(48px, 7vw, 80px)' }}>
          <motion.div
            variants={fadeUp}
            style={{
              fontSize: 12, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: '#7d7e7c', fontWeight: 600,
            }}
          >(The Reality)</motion.div>
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 'clamp(15px, 1.6vw, 17px)', lineHeight: 1.55,
              color: theme.ink, margin: 0, maxWidth: 520,
            }}
          >
            The bar to stand out keeps rising. Selection is no longer about good
            grades — it's about who has the edge.
          </motion.p>
        </Group>

        <Group className="xg-2" style={{ gap: 'clamp(32px, 5vw, 64px)', alignItems: 'flex-start' }}>
          <motion.div variants={fadeUp}>
            <div style={{
              fontFamily: theme.display, fontWeight: 900,
              fontSize: 'clamp(96px, 16vw, 220px)',
              lineHeight: 0.9, letterSpacing: '-0.02em',
              color: theme.accent,
            }}>5%</div>
            <p style={{
              marginTop: 12,
              fontSize: 'clamp(15px, 1.7vw, 18px)',
              lineHeight: 1.5, color: theme.ink,
              maxWidth: 360, fontWeight: 500,
            }}>
              of applicants are admitted to top universities.
            </p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <div style={{
              fontFamily: theme.display, fontWeight: 900,
              fontSize: 'clamp(96px, 16vw, 220px)',
              lineHeight: 0.9, letterSpacing: '-0.02em',
              color: theme.accent,
            }}>3%</div>
            <p style={{
              marginTop: 12,
              fontSize: 'clamp(15px, 1.7vw, 18px)',
              lineHeight: 1.5, color: theme.ink,
              maxWidth: 360, fontWeight: 500,
            }}>
              of applicants are invited to interview at competitive employers.
            </p>
          </motion.div>
        </Group>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.0, ease: [0.2, 0.7, 0.2, 1] }}
          style={{
            height: 1, background: 'rgba(0,0,0,0.18)',
            margin: 'clamp(48px, 7vw, 80px) 0 clamp(40px, 6vw, 64px)',
            transformOrigin: 'left',
          }}
        />

        <SplitHeading
          lines={['What are they', 'looking for?']}
          style={{
            fontFamily: theme.display, fontWeight: 900,
            fontSize: 'clamp(48px, 9vw, 130px)',
            lineHeight: 0.95, letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            marginBottom: 'clamp(32px, 5vw, 56px)',
          }}
        />

        <Group style={{
          display: 'flex', alignItems: 'center',
          gap: 'clamp(16px, 3vw, 32px)',
          flexWrap: 'wrap',
        }}>
          <motion.div variants={fadeUp} style={pillStyle}>Grades</motion.div>
          <motion.div
            variants={fadeUp}
            style={{
              fontFamily: theme.display, fontWeight: 900,
              fontSize: 'clamp(36px, 5.5vw, 72px)',
              lineHeight: 1, color: theme.accent,
            }}
          >+</motion.div>
          <motion.div variants={fadeUp} style={pillStyle}>Stand Out Factor</motion.div>
        </Group>
      </div>
    </section>
  );
}
