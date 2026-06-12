import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

const rejectedItems = ['Good grades', 'Generic applications', 'No leadership evidence'];
const selectedItems = ['Clear thinking', 'Persuasive communication', 'Leadership and initiative'];

const REJECT = '#d97a7a';

export function TheEdge() {
  return (
    <section
      data-screen-label="The Edge"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        padding: 'clamp(120px, 15vw, 240px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Group className="xg-2" style={{ alignItems: 'flex-start', marginBottom: 'clamp(48px, 7vw, 80px)' }}>
          <div
            variants={fadeUp}
            style={{
              fontSize: 12, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: theme.subtitle, fontWeight: 600,
            }}
          >(Considered vs Selected)</div>
          <p
            variants={fadeUp}
            style={{
              fontSize: 'clamp(15px, 1.6vw, 17px)', lineHeight: 1.55,
              color: theme.base, margin: 0, maxWidth: 520,
            }}
          >
            Same grades. Different outcomes. Selection is shaped by what only
            stand-out applicants bring to the room.
          </p>
        </Group>

        <Group className="xg-2" style={{ gap: 24, marginBottom: 'clamp(56px, 8vw, 96px)' }}>
          <div
            variants={fadeUp}
            style={{
              border: `1px solid ${theme.borderDark}`,
              padding: 'clamp(28px, 4vw, 40px)',
              background: 'rgba(255,255,255,0.02)',
              display: 'flex', flexDirection: 'column', gap: 24,
            }}
          >
            <div style={{
              alignSelf: 'flex-start',
              padding: '8px 18px',
              borderRadius: 999,
              background: 'rgba(217,122,122,0.16)',
              color: REJECT,
              fontSize: 11, fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase',
            }}>Rejected</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {rejectedItems.map((item) => (
                <div
                  key={item}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    fontSize: 'clamp(15px, 1.7vw, 18px)',
                  }}
                >
                  <span style={{
                    color: REJECT, fontSize: 22, fontWeight: 700,
                    width: 22, textAlign: 'center', lineHeight: 1,
                  }}>×</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            variants={fadeUp}
            style={{
              border: `1px solid ${theme.borderDark}`,
              padding: 'clamp(28px, 4vw, 40px)',
              background: 'rgba(255,255,255,0.02)',
              display: 'flex', flexDirection: 'column', gap: 24,
            }}
          >
            <div style={{
              alignSelf: 'flex-start',
              padding: '8px 18px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.12)',
              color: theme.accent,
              fontSize: 11, fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase',
            }}>Selected</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {selectedItems.map((item) => (
                <div
                  key={item}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    fontSize: 'clamp(15px, 1.7vw, 18px)',
                  }}
                >
                  <span style={{
                    color: theme.accent, fontSize: 18, fontWeight: 700,
                    width: 22, textAlign: 'center', lineHeight: 1,
                  }}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Group>

        <SplitHeading
          lines={['Grades get you considered.', 'Capability gets you selected.']}
          style={{
            fontFamily: theme.display, fontWeight: 900,
            fontSize: 'clamp(42px, 7.5vw, 120px)',
            lineHeight: 1.05, letterSpacing: '-0.01em',
            maxWidth: 1100,
          }}
        />
      </div>
    </section>
  );
}
