import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

const disciplines = [
  'Behavioural Science',
  'Sports Performance',
  'Military Strategy',
  'Decision Science',
  'Enterprise Leadership',
];

export function AboutApproach() {
  return (
    <section
      data-screen-label="Our Approach"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        padding: 'clamp(120px, 15vw, 240px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Group className="xg-2" style={{ alignItems: 'flex-start', gap: 'clamp(32px, 6vw, 80px)' }}>
          <div variants={fadeUp}>
            <SplitHeading
              lines={['OUR', 'APPROACH']}
              style={{
                fontFamily: theme.display, fontWeight: 900,
                fontSize: 'clamp(36px, 5.5vw, 86px)',
                lineHeight: 0.95, letterSpacing: '-0.02em',
              }}
            />
          </div>

          <div
            variants={fadeUp}
            style={{
              display: 'flex', flexDirection: 'column',
              gap: 'clamp(16px, 2vw, 22px)',
              paddingTop: 'clamp(8px, 1.5vw, 16px)',
              maxWidth: 560,
            }}
          >
            <p style={{
              fontSize: 'clamp(15px, 1.6vw, 17px)',
              lineHeight: 1.6, margin: 0,
              color: theme.base,
            }}>
              Grounded in behavioural science and informed by disciplines including
              sports performance, military strategy, decision science, and
              enterprise leadership.
            </p>
            <p style={{
              fontSize: 'clamp(15px, 1.6vw, 17px)',
              lineHeight: 1.6, margin: 0,
              color: theme.subtitle,
            }}>
              Our programmes develop confident, capable young leaders through
              immersive, engaging experiences that build real-world leadership,
              professional skills, and self-belief.
            </p>

            <ul style={{
              listStyle: 'none', margin: 'clamp(16px, 2vw, 24px) 0 0', padding: 0,
              display: 'flex', flexWrap: 'wrap',
              gap: 10,
            }}>
              {disciplines.map((d) => (
                <li
                  key={d}
                  style={{
                    fontSize: 12, letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: theme.base, fontWeight: 600,
                    padding: '8px 14px',
                    border: `1px solid ${theme.borderDark}`,
                    borderRadius: 999,
                  }}
                >{d}</li>
              ))}
            </ul>
          </div>
        </Group>
      </div>
    </section>
  );
}
