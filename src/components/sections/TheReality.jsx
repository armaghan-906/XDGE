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
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        padding: 'clamp(44px, 7vw, 84px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SplitHeading
          lines={['THE REALITY']}
          style={{
            fontFamily: theme.display, fontWeight: 900,
            fontSize: 'clamp(36px, 10.5vw, 157.5px)',
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
          <div data-reveal style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: theme.display, fontWeight: 900,
              fontSize: 'clamp(60px, 7.5vw, 105px)',
              lineHeight: 1, letterSpacing: '-0.01em',
              color: ACCENT,
              marginBottom: 10,
            }}>5%</div>
            <p style={{
              fontSize: 'clamp(15px, 1.6vw, 18px)',
              lineHeight: 1.45, color: theme.base,
              fontWeight: 500,
              margin: 0,
            }}>
              Top Colleges Admit only<br />5% of Applicants
            </p>
          </div>

          <div data-reveal style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: theme.display, fontWeight: 900,
              fontSize: 'clamp(60px, 7.5vw, 105px)',
              lineHeight: 1, letterSpacing: '-0.01em',
              color: ACCENT,
              marginBottom: 10,
            }}>3%</div>
            <p style={{
              fontSize: 'clamp(15px, 1.6vw, 18px)',
              lineHeight: 1.45, color: theme.base,
              fontWeight: 500,
              margin: 0,
            }}>
              Top employers interview only<br />3% of applicants.
            </p>
          </div>
        </Group>

        <div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: 1, background: 'rgba(0,0,0,0.16)',
            margin: '0 0 clamp(32px, 5vw, 56px)',
            transformOrigin: 'left',
          }}
        />

        <div style={{ textAlign: 'center' }}>
          <SplitHeading
            lines={['What gets you chosen?']}
            style={{
              fontFamily: theme.display, fontWeight: 900,
              fontSize: 'clamp(36px, 10.5vw, 169.5px)',
              lineHeight: 0.98, letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              marginBottom: 'clamp(32px, 4vw, 48px)',
              textAlign: 'center',
            }}
          />

          <div className="xg-reality-pills" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 'clamp(12px, 2vw, 24px)',
            flexWrap: 'nowrap',
            whiteSpace: 'nowrap',
            marginBottom: 'clamp(40px, 6vw, 64px)',
          }}>
            <div data-reveal style={pillStyle}>Grades</div>
            <div
              data-reveal
              style={{
                fontFamily: theme.display, fontWeight: 900,
                fontSize: 'clamp(42px, 6vw, 84px)',
                lineHeight: 1, color: theme.base,
              }}
            >+</div>
            <div data-reveal style={pillStyle}>Your Stand Out Edge</div>
          </div>

          <div
            data-reveal
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'clamp(12px, 1.5vw, 20px)',
              maxWidth: 520,
              marginLeft: 'auto',
            }}
          >
            <div style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(36px, 10.5vw, 135px)',
              lineHeight: 0.7,
              color: 'rgba(255,255,255,0.18)',
              fontWeight: 700,
              flexShrink: 0,
              marginTop: 8,
            }}>“</div>
            <p style={{
              fontFamily: theme.italic,
              fontSize: 'clamp(18px, 2.2vw, 28px)',
              lineHeight: 1.35,
              fontStyle: 'italic',
              color: theme.base,
              margin: 0,
              fontWeight: 400,
              textAlign: 'left',
            }}>
              Grades get you considered.<br />
              Your Edge gets you chosen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
