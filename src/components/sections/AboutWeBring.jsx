import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

const fadeEase = [0.2, 0.7, 0.2, 1];

export function AboutWeBring() {
  return (
    <section
      data-screen-label="We Bring The Professional World"
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
              lines={['WE BRING THE', 'PROFESSIONAL', 'WORLD TO YOU']}
              style={{
                fontFamily: theme.display, fontWeight: 900,
                fontSize: 'clamp(36px, 5.5vw, 66px)',
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
              fontFamily: theme.italic, fontStyle: 'italic',
              fontSize: 'clamp(18px, 2vw, 24px)',
              lineHeight: 1.45,
              color: theme.base, margin: 0, fontWeight: 500,
            }}>
              Young people are too often kept outside the professional world.
            </p>
            <p style={{
              fontSize: 'clamp(15px, 1.6vw, 17px)',
              lineHeight: 1.6, margin: 0,
              color: theme.subtitle,
            }}>
              We bring that world to them through real industry leaders, exciting
              meaningful projects, and authentic expectations.
            </p>
            <p style={{
              fontSize: 'clamp(15px, 1.6vw, 17px)',
              lineHeight: 1.6, margin: 0,
              color: theme.subtitle,
            }}>
              This is leadership development that builds confidence, raises
              standards, and prepares young people to perform in the real world.
            </p>
          </div>
        </Group>
      </div>
    </section>
  );
}
