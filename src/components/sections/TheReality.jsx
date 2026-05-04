import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

const ACCENT = theme.ink;

export function TheReality() {
  const pillStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: 'clamp(16px, 2.4vw, 24px) clamp(28px, 4vw, 56px)',
    background: theme.ink,
    color: theme.base,
    borderRadius: 999,
    fontSize: 'clamp(16px, 2vw, 24px)',
    fontWeight: 700,
    fontFamily: theme.display,
    letterSpacing: '0.04em',
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
        padding: 'clamp(44px, 7vw, 84px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SplitHeading
          lines={['THE REALITY']}
          style={{
            fontFamily: theme.display, fontWeight: 900,
            fontSize: 'clamp(40px, 9vw, 140px)',
            lineHeight: 0.95, letterSpacing: '-0.02em',
            marginBottom: 'clamp(32px, 5vw, 64px)',
          }}
        />

        <Group
          className="xg-2"
          style={{
            gap: 'clamp(24px, 4vw, 56px)',
            alignItems: 'flex-start',
            marginBottom: 'clamp(28px, 4vw, 44px)',
          }}
        >
          <motion.div variants={fadeUp} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: theme.display, fontWeight: 900,
              fontSize: 'clamp(40px, 5vw, 70px)',
              lineHeight: 1, letterSpacing: '-0.01em',
              color: ACCENT,
              marginBottom: 10,
            }}>5%</div>
            <p style={{
              fontSize: 'clamp(13px, 1.4vw, 15px)',
              lineHeight: 1.45, color: '#3a3c3e',
              margin: '0 0 6px',
            }}>of applicants are admitted to</p>
            <a
              href="#"
              style={{
                fontSize: 'clamp(15px, 1.6vw, 18px)',
                fontWeight: 700, color: theme.ink,
                textDecoration: 'underline',
                textUnderlineOffset: 4,
              }}
            >Top Universities</a>
          </motion.div>

          <motion.div variants={fadeUp} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: theme.display, fontWeight: 900,
              fontSize: 'clamp(40px, 5vw, 70px)',
              lineHeight: 1, letterSpacing: '-0.01em',
              color: ACCENT,
              marginBottom: 10,
            }}>3%</div>
            <p style={{
              fontSize: 'clamp(13px, 1.4vw, 15px)',
              lineHeight: 1.45, color: '#3a3c3e',
              margin: '0 0 6px',
            }}>of applicants are invited to interviews with</p>
            <a
              href="#"
              style={{
                fontSize: 'clamp(15px, 1.6vw, 18px)',
                fontWeight: 700, color: theme.ink,
                textDecoration: 'underline',
                textUnderlineOffset: 4,
              }}
            >Competitive Employers</a>
          </motion.div>
        </Group>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.0, ease: [0.2, 0.7, 0.2, 1] }}
          style={{
            height: 1, background: 'rgba(0,0,0,0.16)',
            margin: '0 0 clamp(32px, 5vw, 56px)',
            transformOrigin: 'left',
          }}
        />

        <Group
          className="xg-2"
          style={{
            alignItems: 'center',
            gap: 'clamp(32px, 5vw, 80px)',
          }}
        >
          <div>
            <SplitHeading
              lines={['What are they', 'looking for?']}
              style={{
                fontFamily: theme.display, fontWeight: 900,
                fontSize: 'clamp(32px, 5vw, 76px)',
                lineHeight: 0.98, letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                marginBottom: 'clamp(20px, 3vw, 28px)',
              }}
            />

            <div style={{
              display: 'flex', alignItems: 'center',
              gap: 'clamp(12px, 2vw, 24px)',
              flexWrap: 'wrap',
            }}>
              <motion.div variants={fadeUp} style={pillStyle}>Grades</motion.div>
              <motion.div
                variants={fadeUp}
                style={{
                  fontFamily: theme.display, fontWeight: 900,
                  fontSize: 'clamp(28px, 4vw, 56px)',
                  lineHeight: 1, color: theme.ink,
                }}
              >+</motion.div>
              <motion.div variants={fadeUp} style={pillStyle}>Stand Out Factor</motion.div>
            </div>
          </div>

          <motion.div
            variants={fadeUp}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'clamp(12px, 1.5vw, 20px)',
              maxWidth: 480,
              justifySelf: 'end',
            }}
          >
            <div style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(60px, 9vw, 120px)',
              lineHeight: 0.7,
              color: 'rgba(0,0,0,0.18)',
              fontWeight: 700,
              flexShrink: 0,
              marginTop: 8,
            }}>“</div>
            <p style={{
              fontFamily: theme.italic,
              fontSize: 'clamp(18px, 2.2vw, 28px)',
              lineHeight: 1.35,
              fontStyle: 'italic',
              color: theme.ink,
              margin: 0,
              fontWeight: 400,
            }}>
              Grades get you considered.<br />
              Stand out gets you chosen.
            </p>
          </motion.div>
        </Group>
      </div>
    </section>
  );
}
